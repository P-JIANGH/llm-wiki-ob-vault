---
title: DeerFlow-Sandbox
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [sandbox, agent, security, architecture]
sources: [modules:sandbox/sandbox.py+sandbox/tools.py+sandbox/security.py+sandbox/local/local_sandbox.py]
---

# DeerFlow Sandbox 系统

DeerFlow 的隔离执行环境，通过虚拟路径映射让 Agent 操作文件/命令而不暴露 host 系统结构。

## 核心接口

`Sandbox` 抽象类（`sandbox/sandbox.py`）：

```python
class Sandbox(ABC):
    _id: str
    def execute_command(self, command: str) -> str
    def read_file(self, path: str) -> str
    def write_file(self, path: str, content: str, append: bool = False) -> None
    def list_dir(self, path: str, max_depth=2) -> list[str]
    def glob(self, path: str, pattern: str, *, max_results=200) -> tuple[list[str], bool]
    def grep(self, path: str, pattern: str, *, glob, literal, max_results=100) -> tuple[list[GrepMatch], bool]
```

`SandboxProvider` 抽象类（`sandbox/sandbox_provider.py`）：
```python
class SandboxProvider(ABC):
    def acquire(self, thread_id: str | None) -> str  # 获取沙箱，返回 sandbox_id
    def get(self, sandbox_id: str) -> Sandbox | None   # 通过 ID 获取实例
    def release(self, sandbox_id: str) -> None         # 销毁沙箱
```

**单例缓存**：`get_sandbox_provider()` 缓存实例，`reset_sandbox_provider()` 清缓存，`shutdown_sandbox_provider()` 彻底清理。

## 虚拟路径体系

### 三类虚拟路径

| 虚拟路径 | 映射目标 | 说明 |
|---------|---------|------|
| `/mnt/user-data/workspace/` | `thread_data['workspace_path']/` | Agent 工作目录 |
| `/mnt/user-data/uploads/` | `thread_data['uploads_path']/` | 用户上传文件 |
| `/mnt/user-data/outputs/` | `thread_data['outputs_path']/` | 生成输出 |
| `/mnt/skills/` | skills host 路径 | 只读，技能文件 |
| `/mnt/acp-workspace/` | per-thread 或全局 acp-workspace | ACP agent 工作区 |

### 最长前缀匹配

多个映射重叠时，选 container_path 最长的那个（最具体优先）。

```python
# 路径解析（_resolve_path）
for mapping in sorted(self.path_mappings, key=lambda m: len(m.container_path), reverse=True):
    if path_str == container_path or path_str.startswith(container_path + "/"):
        relative = path_str[len(container_path):].lstrip("/")
        return str(Path(local_path) / relative) if relative else local_path
```

## 双向路径翻译

### 命令中路径翻译

Agent 视角的命令包含虚拟路径，执行前必须翻译成 host 路径：

```python
def _resolve_paths_in_command(self, command: str) -> str:
    # 正则：匹配虚拟路径（segment boundary 保护，防止 /mnt/skills 匹配 /mnt/skills-extra）
    pattern = re.compile("|".join(
        f"({re.escape(m.container_path)}(?=/|$|[\\s\"';&|<>()])(?:/[^\\s\"';&|<>()]*)?)"
        for m in sorted_mappings
    ))
    return pattern.sub(replace_match, command)
```

### 输出反向映射

命令执行结果中的 host 路径必须翻译回虚拟路径，防止 host 结构泄露：

```python
def _reverse_resolve_paths_in_output(self, output: str) -> str:
    # 用相同最长前缀原则，将 host 路径替换回 container 路径
    for mapping in sorted_mappings:
        pattern = re.compile(re.escape(str(Path(mapping.local_path).resolve())) + r"(?:[/\\][^\s\"';&|<>()]*)?")
        result = pattern.sub(replace_match, result)
    return result
```

### 路径样式保留

Windows (`C:\Users\...`) vs Unix (`/home/...`) 分隔符自动适配：
```python
def _path_separator_for_style(path: str) -> str:
    return "\\" if "\\" in path and "/" not in path else "/"
```

## LocalSandbox 实现

`LocalSandbox` 是 `Sandbox` 在 host 文件系统上的实现：

```python
class LocalSandbox(Sandbox):
    def __init__(self, id: str, path_mappings: list[PathMapping] | None = None):
        # PathMapping: container_path + local_path + read_only(bool)
```

**Shell 检测**：
- Unix: `/bin/zsh` → `/bin/bash` → `/bin/sh`（按序找第一个可执行）
- Windows: `pwsh` → `powershell` → `cmd.exe`

**命令执行**：
```python
def execute_command(self, command: str) -> str:
    resolved_command = self._resolve_paths_in_command(command)  # 先翻译路径
    # subprocess.run(shell=False)，Windows PowerShell 用 -NoProfile -Command
```

## 安全门控

```python
# security.py
LOCAL_HOST_BASH_DISABLED_MESSAGE = "Host bash execution is disabled for LocalSandboxProvider..."

def is_host_bash_allowed(config=None) -> bool:
    if not uses_local_sandbox_provider(config):
        return True  # 非本地 provider（Docker 等）默认允许
    return bool(getattr(sandbox_cfg, "allow_host_bash", False))  # 默认 False
```

**规则**：
- LocalSandboxProvider 下 bash 默认禁用（`allow_host_bash: false`）
- bash subagent 同样禁用
- 必须显式 `sandbox.allow_host_bash: true`

## 与 LangChain Tools 的集成

`sandbox/tools.py`（1345行）定义了 LangChain `Tool`：
- `@tool` decorator 暴露为 Agent 工具
- 路径验证：`validate_local_tool_path()` 检查虚拟路径合法性
- 错误掩码：`_sanitize_error()` 将 host 路径错误信息中的路径掩码回虚拟路径

## 相关概念

- [[sandbox]] — 通用隔离执行环境模式
- [[deer-flow]] — sandbox 系统的宿主框架
- [[deer-flow-runtime]] — sandbox 在 runtime 中的生命周期管理
