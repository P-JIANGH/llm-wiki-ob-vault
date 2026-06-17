# FireRed-OpenStoryline 源码分析

> 来源：https://github.com/FireRedTeam/FireRed-OpenStoryline，2026-02-10 开源，Apache 2.0
> 分析时间：2026-04-13

## 基本信息

- **全称**：FireRed-OpenStoryline
- **定位**：AI 视频创作工具——将复杂视频制作转化为对话式体验
- **团队**：FireRedTeam（HuggingFace / ModelScope）
- **Slogan**："星星之火，可以燎原"
- **开源时间**：2026-02-10
- **License**：Apache 2.0
- **Python**：>= 3.11

## 核心特性

1. **智能素材搜索与整理**：自动在线搜索下载图片/视频片段，基于主题进行片段拆分与内容理解
2. **智能文案生成**：结合主题、画面理解与情绪识别自动构建故事线及旁白，支持 Few-shot 风格仿写
3. **智能推荐音乐、配音与字体**：根据视频内容和情绪自动推荐 BGM 并智能卡点，支持私有歌单导入
4. **对话式精修**：通过自然语言对片段、文案、视觉元素进行增删改
5. **剪辑技能沉淀**：一键保存为专属 Skill，记录完整剪辑逻辑，支持批量复刻

## 架构总览

```
User Query
    ↓
LangChain Agent (create_agent)
    ↓ (tools + skills)
MultiServerMCPClient → Local FastMCP Server
    ↓ (StructuredTool per node)
NodeManager (orchestrates 15+ video processing nodes)
    ↓
ArtifactStore (session-based artifact persistence)
```

## 核心模块解析

### 1. agent.py — Agent 构建

使用 LangChain 的 `create_agent` 运行时处理多轮工具调用循环：

```python
agent = create_agent(
    model=llm,
    tools=tools+skills,
    middleware=[log_tool_request, handle_tool_errors],
    store=store,
    context_schema=ClientContext,
)
```

**关键设计**：
- **双模型架构**：LLM（文案/决策）+ VLM（视觉理解），各自独立配置 API Key/BaseURL
- **API Key 验证**：启动时用 httpx 直连 `/chat/completions` 验证，不走 LangChain 解析层
- **MCP Client**：`MultiServerMCPClient` 管理本地 MCP Server 连接，session_kwargs 注入 `sampling_callback`
- **sampling_callback**：`make_sampling_callback(llm, vlm)` 处理多轮采样对话
- **middleware**：`log_tool_request`（日志）+ `handle_tool_errors`（错误处理）
- **Skill 加载**：`load_skills(cfg.skills.skill_dir)` 动态加载 Agent Skills

**ClientContext** 携带运行时信息：
- session_id, media_dir, bgm_dir, outputs_dir
- node_manager, chat_model_key, vlm_model_key
- llm_pool（模型实例池）

### 2. node_manager.py — 节点编排引擎

核心数据结构：
```python
kind_to_node_ids          # node_kind → [node_ids]（按 priority 排序）
id_to_tool                # node_id → StructuredTool
id_to_next                # node_id → [后续可执行 node_ids]
id_to_require_prior_kind  # node_id → [依赖的 node_kind 列表]
kind_to_dependent_nodes   # node_kind → [依赖此 kind 的 node_ids]
```

**节点元数据驱动**：
```python
metadata = {
    'node_id': 'split_shots',
    'node_kind': 'shot_segmentation',
    'priority': 10,
    'next_available_node': ['understand_clips', 'asr_node'],
    'require_prior_kind': ['media_loading'],
    'default_require_prior_kind': [],
}
```

**check_excutable()**：检查前置依赖是否满足（从 ArtifactStore 取最新输出），返回可执行状态和缺失的 kind。

### 3. mcp/server.py — FastMCP 服务

使用 FastMCP 框架，核心特点：
- **session_lifespan**：启动时创建 `SessionLifecycleManager`，关闭时清理过期 session
- **stateless_http**：可配置 HTTP 无状态模式
- **工具注册**：`register_tools.register(server, runtime_ctx)` 注入所有节点工具

### 4. storage/agent_memory.py — 会话记忆

ArtifactStore 是会话级持久化存储：
- **结构**：`outputs/<session_id>/<node_id>/<artifact_id>.json`
- **meta.json**：记录所有 artifact 的元数据（session_id, node_id, path, summary, created_at）
- **get_latest_meta()**：按 node_id + session_id 取最新 artifact
- **Base64 媒体传输**：节点间通过 base64 编码传递媒体文件，解压缩后存盘

### 5. nodes/core_nodes/ — 视频处理节点（15个）

| 节点 | 功能 | 关键输入 |
|------|------|----------|
| `load_media` | 加载本地媒体 | media_dir |
| `search_media` | 从 Pexels 搜索素材 | keyword, photo_number, video_number |
| `split_shots` | 场景切分（镜头检测） | min/max_shot_duration |
| `asr_node` | ASR 语音识别 | — |
| `speech_rough_cut` | 口播粗剪（去语气词/重复） | gap_threshold |
| `understand_clips` | VLM 理解画面生成描述 | — |
| `filter_clips` | 按需求过滤片段 | user_request |
| `group_clips` | 将片段组织成叙事段落 | user_request |
| `generate_script` | 生成旁白文案 + 标题 | style（文艺/幽默/碎碎念） |
| `select_bgm` | 选择背景音乐 | mood, scene, genre 过滤 |
| `generate_voiceover` | TTS 旁白生成 | user_request |
| `script_template_rec` | 推荐文案模板 | filter_include |
| `recommend_effects` | 推荐转场/特效 | — |
| `generate_ai_transition` | AI 生成转场视频（第三方 AIGC） | 依赖 MiniMax/Wan 等 |
| `plan_timeline` | 编排时间线（对齐 BGM 节拍） | use_beats, is_speech_rough_cut |
| `plan_timeline_pro` | Pro 版时间线编排 | — |
| `plan_timeline_ai_transition` | AI 转场时间线 | — |
| `render_video` | FFmpeg 渲染最终视频 | aspect_ratio, font_size, crf 等 |

**典型 Pipeline**：
```
load_media → split_shots → understand_clips → filter_clips → group_clips
→ generate_script → select_bgm → generate_voiceover → plan_timeline → render_video
```

### 6. prompts/tasks/ — 双语提示词模板

每个 Task 有独立目录：`prompts/tasks/<task_name>/<lang>/system.md | user.md`

**generate_script**（文案生成）示例：
- 支持 3 种风格：文艺抒情 / 幽默有趣 / 日常碎碎念
- 字数约束 `script_chars_budget`，禁止括号和省略号
- 第一人称叙事，拒绝模板套话
- 输出 JSON：group_scripts + title

### 7. node_schema.py — 数据模型

用 Pydantic 定义所有数据结构：
- `Media` / `Clip` / `SubtitleUnit` — 媒体与片段
- `GroupClips` / `GroupScript` — 叙事组织
- `Voiceover` / `BGM` — 音频元素
- `TimelineTracks` — 时间线（ClipTrack / SubtitleTrack / BgmTrack / VoiceoverTrack）
- 各节点的 Input/Output Schema（如 `GenerateScriptInput`）

## 技术栈

- **LangChain**：`create_agent`，Agent 运行时
- **LangChain-MCP-Adapters**：`MultiServerMCPClient`
- **FastMCP**：本地 MCP Server
- **MoviePy**：视频编辑
- **FFmpeg**：媒体处理
- **Pydantic**：数据模型
- **httpx**：API 验证
- **LangChain OpenAI**：ChatOpenAI 封装

## 亮点设计

1. **节点即工具，工具即节点**：每个视频处理步骤是 `StructuredTool`，元数据驱动编排
2. **双模型各司其职**：LLM 管逻辑/文案，VLM 管视觉理解
3. **ArtifactStore 会话持久化**：每个 session 独立存储，节点间通过 JSON + base64 媒体传递
4. **MCP 协议接入**：既能本地 FastMCP 运行，也支持 OpenClaw/Claude Code 通过 Agent Skills 调用
5. **Few-shot 风格仿写**：文案生成支持用户输入参考文本精准复刻风格
6. **节拍对齐**：BGM 选曲后自动分析 BPM，时间线编排时对齐片段切换与节拍

## 与我们项目的关联

- FireRedTeam 的 `openstoryline-install` 和 `openstoryline-use` 两个 OpenClaw Skills 已经可以让我们通过 Agent 直接调用
- 核心架构（LangChain Agent + MCP + 节点编排）与我们的 [[nanobot]] / [[deer-flow]] 有相似之处，但专注领域完全不同（视频创作 vs 对话 Agent）
- [[openclaw]] 是该项目的 Agent Skills 来源
