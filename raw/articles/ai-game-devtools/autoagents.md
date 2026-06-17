# AutoAgents — 原始源

> 来源: https://github.com/Link-AGI/AutoAgents
> 克隆时间: 2026-04-15
> License: MIT

## README 摘要

AutoAgents 是一个基于 LLM 的自动多智能体生成框架，发表在 IJCAI 2024。其核心思想是由 LLM 驱动，自主生成多个专业角色（Agent）协作完成复杂任务。

### 核心架构（6 大组件）

1. **Planner** — 根据问题确定需要哪些专家角色，以及具体的执行计划
2. **Tools** — 可用工具集，当前仅兼容搜索工具（SerpAPI/Serper/Google）
3. **Observers** — 负责反思 Planner 和执行过程中的结果是否合理，包括对 Agents、Plan、Action 的反射检查
4. **Agents** — Planner 生成的专家角色代理，包含 name、expertise、使用的 tools、LLM 增强
5. **Plan** — 由生成的专家角色组成的执行计划，每个执行步骤至少有一个专家角色
6. **Actions** — 专家角色在执行计划中的具体动作，如调用工具或输出结果

### 部署模式

- **命令行模式**: `python main.py --mode commandline --idea "..."`
- **WebSocket 服务模式**: `python main.py --mode service --host 127.0.0.1 --port 9000`
- **Docker**: `docker run -it --rm -p 7860:7860 linksoul.ai/autoagents:1.0`

### 关键依赖

- OpenAI API（默认 gpt-4o，可配置）
- SerpAPI API Key（搜索工具）
- 基于 MetaGPT 的 system/action/role 架构构建

### 目录结构

```
autoagents/
├── main.py              # 入口，支持 commandline/service 模式
├── cfg.py               # 配置加载
├── startup.py           # 启动脚本
├── ws_service.py        # WebSocket 服务
├── autoagents/
│   ├── system/          # 底层系统（LLM、Memory、Tools、Config、Logs）
│   ├── roles/           # 角色定义（Manager、Observer、Group、Role Bank）
│   ├── actions/         # 动作定义（CreateRoles、CheckRoles、CheckPlans 等）
│   └── explorer.py      # 探索器
```

### 核心角色文件

- `roles/manager.py` — Manager 角色，运行 CreateRoles/CheckRoles/CheckPlans 三步迭代收敛
- `roles/observer.py` — ObserverAgents + ObserverPlans，分别检查角色和计划的合理性
- `roles/group.py` — 角色组，协调多个 Agent 协作

### 许可证

MIT License

### 引用

```bibtex
@inproceedings{ijcai2024p3,
  title     = {{AutoAgents}: A Framework for Automatic Agent Generation},
  author    = {Chen, Guangyao et al.},
  booktitle = {Proceedings of IJCAI-24},
  pages     = {22--30},
  year      = {2024},
  month     = {8},
}
```
