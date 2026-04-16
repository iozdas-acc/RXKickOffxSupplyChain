Rewrite site copy in the RX Manifesto voice. Arguments: either a raw phrase in quotes, a page slug (e.g. `chapter-01`, `intro`), or a file path (e.g. `site/components/intro/Hero.tsx`).

Target: $ARGUMENTS

---

## Invocation

**ALWAYS invoke the `rx-voice` skill first** using the Skill tool. Do not attempt to rewrite from general knowledge — the skill loads the manifesto source, voice patterns, lexicon, and calibration examples that define the voice.

After the skill loads:

1. Follow the skill's Step 1 — Read the four reference files in order:
   - `.claude/skills/rx-voice/references/manifesto-source.md`
   - `.claude/skills/rx-voice/references/voice-patterns.md`
   - `.claude/skills/rx-voice/references/lexicon.md`
   - `.claude/skills/rx-voice/references/examples.md`

2. Classify $ARGUMENTS per skill Step 2:
   - Quoted raw text → inline rewrite, before/after block
   - Page slug → read `site/data/chapters.ts` and `site/components/chapters/Chapter*.tsx` (or `site/components/intro/Hero.tsx` for `intro`), extract visible copy, propose rewrites section by section
   - File path → read the file, extract visible strings, propose rewrites
   - Empty → show the user the three modes and ask which copy to rewrite

3. Apply rewrite rules from skill Step 3 (rhythm · lexicon · structure · what-never).

4. Present before/after per skill Step 4. Table or side-by-side. One-line "Why this works" for each.

5. Wait for user approval before editing any file (skill Step 5). Only apply `Edit` after approval.

6. Run the 5-question calibration from the skill before handing back.

---

## Scope

- This command only touches copy. It does not change layouts, components, tokens, or logic.
- It works on the RX side of the presentation. Sainsbury's co-brand copy is untouched unless the user explicitly asks.
- If the user wants net-new strategy rather than a voice-adapt, route to `/plan` instead.
