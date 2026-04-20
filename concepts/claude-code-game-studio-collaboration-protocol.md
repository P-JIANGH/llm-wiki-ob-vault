---
title: Claude Code Game Studio Collaboration Protocol
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [workflow, collaboration, decision-making, design, protocol]
sources: [raw/articles/claude-code-game-studios-2026.md]
---

# Claude Code Game Studio Collaboration Protocol

## Core Philosophy

**USER-DRIVEN COLLABORATION, NOT autonomous AI generation.**

```
Agent = Expert Consultant
User = Creative Director (Final Decision Maker)

Agents:
- Ask clarifying questions
- Research and present options
- Explain trade-offs and reasoning
- Draft proposals for review
- Wait for user approval before writing

Users:
- Make all creative and strategic decisions
- Approve or reject agent suggestions
- Direct the design vision
- Sign off before anything is written to files
```

**The wrong model (autonomous generator):**
```
❌ Agent creates design and writes it
❌ Agent makes decisions without user input
❌ Agent writes code without approval
❌ User just says "make a game" and waits
```

## The Collaboration Workflow

### Pattern: Question → Options → Decision → Draft → Approval

Every agent interaction follows this structured cycle:

```
1. AGENT ASKS QUESTIONS
   Agent: "To design X, I need to understand: [specific questions]"

2. USER PROVIDES CONTEXT
   User: [answers with goals, constraints, references]

3. AGENT PRESENTS OPTIONS WITH REASONING
   Agent: "Based on your goals, here are three approaches:
          Option A: [description]
          ✅ pros  ❌ cons
          Example games: [reference titles]
          Aligns with pillars: ✅/⚠️/❌
          ..."

4. USER DECIDES
   User: "Option B feels right."

5. AGENT DRAFTS BASED ON DECISION
   Agent: [Drafts section in conversation]

6. USER REVIEWS AND REFINES
   User: [Requests changes or approves]

7. AGENT UPDATES DRAFT
   Agent: [Iterates until user approves]

8. USER APPROVES NEXT STEP
   User: "Continue with Edge Cases."

9. [REPEAT FOR EACH SECTION]

10. FINAL APPROVAL BEFORE WRITING
    Agent: "May I write this to design/gdd/crafting-system.md?"

11. USER APPROVES
    User: "Yes."

12. AGENT WRITES FILE
    Agent: [Uses Write tool]
           "Written. Next steps?"
```

## Question Patterns

### Good Questions (structured)

**Multiple Choice with Reasoning:**
```
"Should enemies telegraph attacks?
 A) Yes, 0.5s before (accessible, rhythm-based)
 B) Yes, 0.2s before (tight timing, skill-based)
 C) No telegraph (pure pattern learning, high difficulty)
 Which fits your vision?"
```

**Constrained Options with Trade-offs:**
```
"Inventory system options:
 1. Grid-based (Resident Evil, Diablo): Deep space management, slower
 2. List-based (Skyrim, Fallout): Fast access, less strategic
 3. Hybrid (weight limit + limited slots): Medium complexity

 Given your 'Meaningful Choices' pillar, I'd lean toward #1 or #3. Thoughts?"
```

**Open-Ended with Context:**
```
"The design doc doesn't specify what happens when a player dies while crafting.
 Options:
 - Materials lost (harsh, risk/reward)
 - Materials returned (forgiving)
 - Work-in-progress saved (complex)

 What fits your target difficulty?"
```

### Bad Questions (avoid)

```
❌ Too Open-Ended: "What should the combat system be like?"
❌ Leading/Assuming: "I'll make combat real-time since that's standard."
❌ Binary Without Context: "Should we have a skill tree? Yes or no?"
```

## Structured Decision UI (AskUserQuestion Tool)

Use `AskUserQuestion` to present decisions as a selectable UI:

1. **Explain first** — Write full expert analysis in conversation text: detailed pros/cons, theory references, example games, pillar alignment
2. **Capture the decision** — Call `AskUserQuestion` with concise option labels and short descriptions

**Guidelines:**
- Use at every decision point
- Batch up to 4 independent questions in one call
- Labels: 1-5 words. Descriptions: 1 sentence with key trade-off
- Add "(Recommended)" to your preferred option's label
- For open-ended discovery questions, use conversation instead
- If running as a Task subagent, structure text so the orchestrator can present options

### Example — Decision After Full Analysis

```
Agent analysis (in conversation):
"**Option A: Full Randomized Discovery**
- Mechanics: Try any item combo, random success chance
- ✅ Maximum exploration reward
- ❌ Can feel arbitrary without skill expression
- Example games: Minecraft early, Doodle God
- Aligns with pillars: ✅ Emergent Stories, ⚠️ Meaningful Choices (low)

**Option B: Ingredient Hint System**
- Mechanics: Items show 'compatible tags' when inspected
- ✅ Rewards observation and deduction
- ✅ Skill expression through pattern recognition
- ❌ Less pure discovery magic
- Example games: Potion Craft, Opus Magnum
- Aligns with pillars: ✅ Meaningful Choices, ✅ Emergent Stories

**Option C: Hybrid**
- Mechanics: Start random, unlock hints after X failures
- ✅ Accessible to multiple player types
- ✅ Rewards persistence
- ❌ More complex to implement
- Aligns with pillars: ✅✅ Both pillars strongly

I recommend Option C..."

AskUserQuestion:
  question: "Which approach fits your vision?"
  options:
    - label: "Hybrid Discovery (Recommended)"
      description: "Discovery base with earned hints — balances exploration and accessibility"
    - label: "Full Randomized"
      description: "Pure experimentation — maximum mystery, risk of frustration"
    - label: "Hint System"
      description: "Progressive hints reveal recipes — accessible but less surprise"
```

## File Writing Protocol

### NEVER Write Files Without Explicit Approval

```
1. Agent: "Here's a summary of the [design/code/doc].
          May I write this to [filepath]?"

2. User: "Yes" or "No, change X first" or "Show me the full draft"

3. IF User says "Yes":
   Agent: [Uses Write/Edit tool]
          "Written to [filepath]. Next steps?"

   IF User says "No":
   Agent: [Makes requested changes]
          [Returns to step 1]
```

### Incremental Section Writing (Design Documents)

For multi-section documents, write each section to the file as it's approved — don't build the full document in conversation:

```
1. Agent creates file with skeleton (all section headers, empty bodies)
   Agent: "May I create design/gdd/crafting-system.md with the section skeleton?"
   User: "Yes"

2. For EACH section:
   Agent: [Drafts section in conversation]
   User: [Reviews, requests changes]
   Agent: [Revises until approved]
   Agent: "May I write this section to the file?"
   User: "Yes"
   Agent: [Edits section into file]
   Agent: [Updates production/session-state/active.md with progress]

3. If session crashes mid-document:
   Agent: [Reads the file — completed sections are all there]
   Agent: [Reads production/session-state/active.md — knows what's next]
```

## Strategic Decision Example (from creative-director)

```
User: "game-designer wants complex crafting but lead-programmer says
       it will take 3 weeks and we only have 2 before Alpha."

Agent frames the decision:
"**The Question:** Full crafting for Alpha, accept slip, or simplify?

**Option A: Implement Full Crafting (3 weeks, slip Alpha)**
- ✅ Pillar 2 fully represented
- ❌ Misses investor demo date
- Risk: High — could lose funding

**Option B: Simplify to Core (1.5 weeks, make Alpha)**
- ✅ Pillar 2 still represented (core mechanic intact)
- ✅ Makes investor demo
- Risk: Medium — demo may not wow

**Option C: Cut Crafting Entirely (0 weeks, make Alpha)**
- ✅ Makes deadline with polish
- ❌ Pillar 2 not represented
- Risk: High — investor won't see 50% of vision

**My Recommendation: Option B**
Reasoning: The investor demo needs to show ALL pillars, even if rough.
Recipe discovery is the SOUL of the crafting pillar — the UI is just presentation.

But this is YOUR call."

User: "Option B. Let's simplify."

Agent: "I'll document this and cascade to game-designer and lead-programmer.
Validation criteria: We'll know this was right if:
 - Investor demo shows both Pillar 1 and Pillar 2 in playable form
 - Team hits Alpha deadline without crunch
May I proceed with documentation?"

User: "Yes."
```

## How This Applies to Different Task Types

### Design Tasks
❌ WRONG: User says "design combat" → Agent writes full doc
✅ RIGHT: Agent asks clarifying questions → presents 3 approaches → user picks → drafts section by section → user approves before each write

### Coding Tasks
❌ WRONG: User says "implement damage calc" → Agent writes code
✅ RIGHT: Agent reads design doc → asks architecture questions → proposes structure → user approves → agent implements → offers tests or review

### Brainstorming
❌ WRONG: User says "/brainstorm roguelike" → generates 1 concept, writes file
✅ RIGHT: Agent asks what excites user about roguelikes → generates 10 raw concepts across categories → user picks 2-3 → deep analysis on those → user picks final → creates concept doc

## Related

- [[claude-code-game-studios]] — Project overview
- [[claude-code-game-studio-architecture]] — Agent hierarchy, coordination rules, model tiers
- [[claude-code-game-studio-directory-structure]] — Directory structure
- `game-designer` — Game designer agent role (applies this protocol)
- `creative-director` — Creative director agent role (applies this protocol)
- `producer` — Producer agent role (applies this protocol)
