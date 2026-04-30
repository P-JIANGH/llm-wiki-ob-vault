# Open Design — GitHub Source

**URL:** https://github.com/nexu-io/open-design
**Fetched:** 2026-04-29
**License:** Apache-2.0
**Stars:** (see GitHub)
**Author:** nexu-io

## Original README (abbreviated — see full at source)

Open Design 是 Claude Design 的开源替代品。本地优先、可部署到 Vercel、每一层都 BYOK —— 你机器上已经装好的 coding agent（Claude Code、Codex、Cursor Agent、Gemini CLI、OpenCode、Qwen）就是设计引擎，由 19 个可组合 Skills 和 71 套品牌级 Design System 驱动。

核心 6 条设计：
1. 不带 agent，委托给用户已有的 CLI
2. Skill 是文件（SKILL.md），不是插件
3. Design System 是 Markdown（DESIGN.md），不是 theme JSON
4. 初始化问题表单防止 80% 的返工
5. Daemon 让 agent 感觉就在你笔记本上（真实的 cwd + SQLite 持久化）
6. 提示词栈本身就是产品

架构：Vite + React SPA + Express daemon + SQLite + child_process spawn

支持：Claude Code（stream-json）、Codex、Cursor Agent、Gemini CLI、OpenCode、Qwen

内置 19 Skills：web-prototype, saas-landing, dashboard, pricing-page, docs-page, blog-post, mobile-app, simple-deck, guizang-ppt（默认deck）, pm-spec, weekly-update, meeting-notes, eng-runbook, finance-report, hr-onboarding, invoice, kanban-board, team-okrs

内置 71 Design Systems：Linear, Stripe, Vercel, Airbnb, Tesla, Notion, Anthropic, Apple, Cursor, Supabase, Figma...

5 视觉方向：Editorial Monocle / Modern Minimal / Tech Utility / Brutalist / Soft Warm

4 个上游引用：
- alchaincyf/huashu-design — 设计哲学 compass，Junior-Designer workflow，5步品牌资产协议，anti-AI-slop checklist，五维自评审
- op7418/guizang-ppt-skill — deck mode，杂志风，单文件 HTML
- OpenCoworkAI/open-codesign — UX 北极星，流式 artifact 循环，沙盒 iframe 预览，5 种导出
- multica-ai/multica — daemon 架构，PATH 扫描 agent 检测，agent-as-teammate
