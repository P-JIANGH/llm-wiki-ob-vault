# Wiki Lint 修复计划

## Goal

按优先级修复 wiki 健康检查发现的所有问题，使 wiki 从当前状态恢复到零断裂链接、标签合规、frontmatter 完整、索引完整的状态。

## 当前状态

- 总页面: 703
- 真正断裂 wikilinks: 388
- 标签溢出: 1,407 处使用了 SCHEMA 未定义标签
- 无 frontmatter: 10 页
- YAML 损坏: 4 页
- 孤立页面: 140 页
- Index 不完整: 210 页未出现在 index.md
- 超大页面: 10 个 >200 行

## Step-by-Step Plan

### Phase 1: 修复断裂 wikilinks (388 个) — 最高优先级

断裂链接影响 wiki 的互连性和 Obsidian 导航。分为三类处理：

#### 1A. 内部命名不一致（快速修复，~10 个）

这些页面存在但 wikilink 用了不同名称，需要修正为正确的 basename 或添加 wikilink alias：

| 断裂 wikilink | 实际文件 | 操作 |
|---|---|---|
| `[[Eino]]` | `entities/eino-framework.md` | 在 eino-framework.md frontmatter 加 `aliases: [Eino]` |
| `[[MiniCPM]]` | 有 `minicpm-2b`, `minicpm-llama3-v-2.5`, `minicpm-v-4.0` | 需要决定：创建 `minicpm.md` 综述页，还是将链接改为具体版本 |
| `[[UnityChatGPT]]` | `ai-game-devtools/unity-openai-api-integration` | 改为 `[[ai-game-devtools/unity-openai-api-integration]]` |
| `[[claude-code-game-studio-directory-structure]]` | `entities/claude-code-game-studios` | 检查内容后修正 |
| ``creative-director`` / ``producer`` / ``game-designer`` / ``technical-director`` / ``lead-programmer`` | 不存在 | 这些是角色页面，需决定：创建还是在引用处改为纯文本 |

#### 1B. 知名项目未建页（批量创建，~20-30 个）

高频断裂目标是知名 AI/开发项目，应创建简短实体页。按引用频率排序：

1. `[[LLaVA]]` — 8 页引用 — 创建 `ai-game-devtools/llava.md`
2. `[[vLLM]]` — 6 页引用 — 创建 `ai-game-devtools/vllm.md`
3. `[[DeerFlow]]` — 5 页引用 — 创建 `ai-game-devtools/deer-flow.md`（已有 `entities/deer-flow.md`，检查是否 wikilink 路径不一致）
4. `[[AutoGPT]]` — 5 页引用 — 已有 `ai-game-devtools/auto-gpt.md`，可能是大小写问题
5. `[[RWKV-Runner]]` — 4 页引用 — 创建或检查
6. `[[Haystack]]` — 4 页引用 — 创建 `ai-game-devtools/haystack.md`
7. `[[nanoGPT]]` — 4 页引用 — 创建 `ai-game-devtools/nanogpt.md`
8. `[[SGLang]]` — 4 页引用 — 创建 `ai-game-devtools/sglang.md`
9. `[[llama.cpp]]` — 4 页引用 — 创建 `ai-game-devtools/llama-cpp.md`
10. `[[RWKV-LM]]` — 4 页引用 — 创建或检查
11. `[[BLIP-2]]` — 2 页引用 — 检查是否已有
12. `[[Open Interpreter]]` — 3 页引用 — 检查 `ai-game-devtools/01-project.md`
13. `[[MiniCPM]]` — 3 页引用 — 见 1A

**每个页面的创建步骤：**
1. 快速 web_search 获取关键信息
2. 创建标准 frontmatter + 概述 + 关键事实 + wikilinks
3. 加入 index.md
4. 记录到 log.md

#### 1C. 低频次断裂（<3 引用，约 350 个）

大部分是代码片段中的工具名、框架名被意外 wikilinked。策略：
- 在页面中搜索 ``XXX``，如果是纯技术名词（如 `agent`、`MCP`、`Streamlit` 等），改为反引号代码格式 `` `XXX` ``
- 如果有对应页面但名称不同，改为正确 wikilink

**方法**: 用 execute_code 脚本批量替换，人工 review 变更。

### Phase 2: 标签治理 (1,407 处) — 高优先级

#### 2A. SCHEMA.md 扩展

高频使用的未定义标签应加入 SCHEMA 标签分类：
- `langchain`, `mcp`, `claude-code`, `bytedance` — 工具/组织标签
- `organization`, `security`, `education`, `games` — 通用标签
- `multi-agent`, `orchestration`, `autonomous-research` — AI 概念标签

#### 2B. 批量替换

统计所有使用的标签，将不在 taxonomy 中的加入 SCHEMA.md，然后更新使用处的标签。

### Phase 3: Frontmatter 修复 — 中优先级

#### 3A. 4 个 YAML 损坏页面

读取每个文件，手动修复 frontmatter 格式：
- `open-source-game/u7-revisited.md`
- `open-source-game/cataclysm-dark-days-ahead.md`
- `open-source-game/fish-folk-jumpy.md`
- `open-source-game/cube-2-sauerbraten.md`

#### 3B. 10 个无 frontmatter 页面

- `ai-game-devtools-learning-checklist.md` — 检查是否需要 frontmatter（可能是工具文件）
- `open-source-games-learning-checklist.md` — 同上
- `ai-game-devtools/rpbench-auto.md`
- `ai-game-devtools/phys-rig.md`
- `ai-game-devtools/llama-index.md`
- `memory-systems/mempalace.md`
- `open-source-game/hypersomnia.md`
- `open-source-game/endless-sky.md`
- `open-source-game/openlara.md`
- `CLAUDE.md` — 非 wiki 页面，忽略

### Phase 4: Index 补全 (210 页) — 中优先级

#### 4A. Concepts 全部缺失 (43 页)

全部 concepts 页面未出现在 index.md 的 "## Concepts" 下。需要：
1. 读取每个概念页的 frontmatter 获取 title
2. 生成 index 条目
3. 插入到 index.md 的 Concepts 段

#### 4B. Entities 缺失 (23 页)

同上，补到 index.md 的 "## Entities" 下。

#### 4C. ai-game-devtools 缺失 (131 页)

这是最大的缺口，批量处理。

#### 4D. open-source-game 缺失 (11 页)

少量，手动补。

### Phase 5: 超大页面拆分 — 低优先级

10 个超过 200 行的页面，标记但不立即拆分（影响可用性，不阻断功能）。

### Phase 6: 孤立页面 — 低优先级

140 个零入链页面。主要通过在相关页面添加 wikilink 来解决。批量处理，在 ingesting 相关源时顺带解决。

## Files Likely to Change

- `SCHEMA.md` — 添加新标签
- `index.md` — 补全缺失条目、更新 total count
- `log.md` — 每次操作追加
- `ai-game-devtools/*.md` — 新建 ~15-20 页（断裂目标页）
- 多个现有 `.md` 页面 — 修正 wikilink 格式、修复 frontmatter
- `entities/*.md` — 添加 aliases

## Tests / Validation

每次修复后运行 lint 脚本验证：
1. 断裂链接计数下降
2. 标签合规率提升
3. Frontmatter 完整性检查通过
4. Index 覆盖率提升

## Risks, Tradeoffs, Open Questions

1. **批量 wikilink 替换风险**: 自动替换可能误伤有意格式。需人工 review 或保守执行。
2. **页面创建质量**: 快速创建的页面可能信息不足。优先创建高频引用页面，低频次页面可延迟。
3. **标签扩张 vs 严格**: 添加太多标签会稀释分类效果。建议只添加在 5+ 页面中使用的标签，其余替换为已有标签。
4. **Open Questions**:
   - ``creative-director`` 等角色页面是否值得创建？（这些是游戏开发角色概念）
   - 低频次断裂 wikilink 是否应该批量转为纯文本/代码格式？（推荐是）
