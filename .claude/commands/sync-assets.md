Scan assets/raw/ for unregistered files and walk through logging them into assets/manifest.md.

## Step 1 — Inventory
List all files in `assets/raw/` (including subdirectories). Ignore `.DS_Store` and hidden files.

## Step 2 — Compare against manifest
Read `assets/manifest.md`. Extract all registered filenames.

Find files in `assets/raw/` that have no corresponding entry in the manifest.

If none: tell the user "All assets in assets/raw/ are registered. Nothing to do." and stop.

## Step 3 — Register each unregistered file
For each unregistered file, ask:

1. "What kind of asset is this?" — options:
   - `logo` → prefix LOGO
   - `image / photography` → prefix IMG
   - `mockup / wireframe / reference` → prefix MOCK
   - `document / PDF` → prefix DOC
   - `video` → prefix VID
   - `font` → prefix FONT
   - `icon / SVG` → prefix ICON

2. "One-line description of what this is and what it's for?"

3. "Which page(s) does it belong to?" — or `global`

4. "What is its status?" — `uploaded` (just added) or `approved` (client has signed off)

Then assign the next available ID for that type from `assets/manifest.md` and write the entry.

## Step 4 — Update manifest
Append all new entries to the correct sections in `assets/manifest.md`.
Update the By Page index table.
Update the Counts table.

## Step 5 — Update MEMORY.md
If MEMORY.md has an assets table, add the new entries there too.

## Step 6 — Confirm
Print a summary: X assets registered, list their IDs and names.
