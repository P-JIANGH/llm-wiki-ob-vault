# OpenWolf 项目源码分析

Source: ~/openwolf/ (完整源码分析)
Date: 2026-05-06
Type: AI 开发者效率工具 / Claude Code 增强层

## 项目概览

**OpenWolf** 是 Claude Code 的"第二大脑"，通过 6 个无感知 Hook 脚本实现项目索引、记忆累积和 token 追踪。核心价值：让 Claude 每次会话减少约 80% token 消耗（实测 3.4M → 425K tokens）。

- **License**: AGPL-3.0
- **作者**: Farhan Palathinkal (Cytostack)
- **npm**: `openwolf` (~5KB)
- **要求**: Node.js 20+
- **仓库**: github.com/cytostack/openwolf

## 核心机制：6 个生命周期 Hook

| Hook | 时机 | 作用 |
|------|------|------|
| `session-start` | 会话开始 | 初始化 session 状态、检查 cerebrum 新鲜度、提醒学习 |
| `pre-read` | 文件读取前 | 查 anatomy.md 告知文件描述+token估算；重复读取警告 |
| `post-read` | 文件读取后 | 记录 token 消耗、更新 session 状态 |
| `pre-write` | 写/编辑前 | 检查 cerebrum Do-Not-Repeat 黑名单；搜索 buglog 类似 bug |
| `post-write` | 写/编辑后 | 更新 anatomy.md；追加 memory.md；自动检测 bug-fix 模式 |
| `stop` | 会话结束 | 汇总 session 数据写入 token-ledger.json |

所有 Hook 通过 `readStdin()` 解析 Claude 传入的 JSON（`tool_input`/`tool_output`），无任何侵入。

## `.wolf/` 目录结构

```
.wolf/
├── anatomy.md          # 项目文件地图（描述+token估算）
├── cerebrum.md         # 学习记忆：Do-Not-Repeat / 用户偏好 / 关键学习
├── memory.md           # 时序操作日志
├── buglog.json         # Bug 记忆（可搜索，自动检测 fix 模式）
├── token-ledger.json   # 生命周期 token 统计
├── identity.md         # Agent persona
├── OPENWOLF.md         # Claude 必读操作协议
├── hooks/              # 6 个 JS hook 脚本（纯 Node.js）
├── config.json
├── cron-manifest.json
├── cron-state.json
└── designqc-captures/  # Design QC 截图
```

## 核心技术亮点

### 1. extractDescription() — 智能文件描述提取
支持 20+ 编程语言的智能描述生成：
- React: 组件名 + 渲染元素类型（form/table/modal）
- Next.js: page.tsx/route.ts 等约定识别
- Laravel: Controller 方法列表、Model 表名/字段数、Migration 检测
- Django/FastAPI: 路由端点数量
- tRPC/Zod: schema 名称提取
- Rust trait/enum、Go interface/struct、C# Controller、SwiftUI 等

### 2. Bug 自动检测 (post-write.ts)
`detectFixPattern()` 识别 11 种常见修复模式：
- `error-handling`: 添加 try/catch
- `null-safety`: 添加 `?.` / `??`
- `guard-clause`: 添加早期返回
- `wrong-value`: 字符串/数字字面值错误
- `operator-fix`: `===` vs `==`、`>` vs `>=`
- `missing-import`: 缺少 import
- `async-fix`: 缺少 await/async
- `type-fix`: TypeScript 类型错误

### 3. Cerebrum Do-Not-Repeat 黑名单
`pre-write.ts` 在编辑前用正则检测黑名单模式，命中则 stderr 警告。

### 4. Token 估算
```typescript
// 代码: 3.5 chars/token, 散文: 4.0 chars/token
const tokens = Math.ceil(content.length / ratio);
```

### 5. 节省计算 (stop.ts)
```
savedFromAnatomy = anatomyHits × 200
savedFromRepeats = Σ(重复读取tokens × (count-1))
```

## CLI 命令

```
openwolf init              # 初始化 .wolf/ 并注册 hooks
openwolf status            # 健康检查、统计
openwolf scan [--check]    # 重新扫描 / 验证是否过期
openwolf dashboard         # 实时 Web 仪表板
openwolf daemon start|stop|restart|logs
openwolf cron list|run <id>|retry <id>
openwolf designqc [--url <url>] [--routes ...]
openwolf bug search <term>
openwolf update            # 更新所有已注册项目
openwolf restore [backup]
```

## Daemon / Cron 系统

- 基于 `node-cron` 调度定时任务
- `scan_project`: 定时重新扫描 anatomy
- `consolidate_memory`: 7 天前日志压缩
- `generate_token_report`: waste 检测
- `ai_task`: 调用 `claude -p` 执行 prompt
- 失败重试：指数/线性退避 + Dead Letter Queue
- 通过 PM2 持久运行

## Design QC 功能

- 自动检测 dev server（读取 `package.json`）
- Puppeteer 分段截图（大页面按 viewport 高度分块）
- 输出 JPEG 到 `.wolf/designqc-captures/`
- 供 Claude 评估设计（shadcn/ui / Tailwind 标准）

## init.ts 初始化流程关键细节

1. 强制 Node.js 20+
2. 升级 vs 新装：升级保留用户数据，只更新 hooks 和配置
3. Hook 注册写入 `.claude/settings.json`（4 个事件）
4. CLAUDE.md 拼接：在开头插入 OpenWolf snippet（不覆盖）
5. Hook 脚本始终从 dist 复制（支持 bugfix 升级）
6. PM2 daemon 自动检测和启动

## 项目结构

```
src/
├── cli/          # Commander.js CLI + 11 个子命令
├── hooks/        # 6 个 TypeScript hook（shared.ts ~592 行）
├── scanner/      # anatomy 扫描器
├── tracker/      # token 追踪
├── daemon/       # 后台调度（cron + file-watcher）
├── dashboard/    # Web 仪表板
├── designqc/     # Puppeteer 截图
├── templates/    # 14 个模板文件
└── utils/        # fs-safe（原子写入）、logger、paths、platform
```

## 局限性

- Claude Code hooks 是较新特性，老版本 fallback 到 CLAUDE.md
- Token 追踪是估算（非精确 API 计数），误差约 ±15%
- cerebrum.md 依赖 Claude 遵守指令更新，合规率约 85-90%
