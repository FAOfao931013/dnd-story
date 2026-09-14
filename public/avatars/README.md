# Character Avatars

This directory contains character portrait images used throughout the D&D adventure UI.

## Current Status

⚠️ **The current PNG files are minimal placeholders for development.**

Replace these with the high-quality AI-generated character portraits for production use.

## Required Images

Five character portraits are needed (PNG or WebP format recommended):

1. **player.png** - Default player adventurer portrait
   - Used in: Character sheet

2. **mayor.png** - Town mayor character
   - Used in: `hook_tavern`, `investigate_mayor` scenes

3. **cloak_figure.png** - Mysterious cloaked figure
   - Used in: `tavern_clue_success`, `cloak_figure` scenes

4. **dock_youth.png** - Frightened youth at the docks
   - Used in: `dock_response` scene

5. **cultist.png** - Ritual cultist
   - Used in: `ritual_cave` and all ending scenes

## Image Specifications

- **Format**: PNG or WebP
- **Recommended size**: 256×256px minimum (displayed at 48-56px)
- **Style**: Dark fantasy themed, consistent art style across all portraits
- **Optimization**: Compress for web delivery (target < 50KB per image)

## Asset Path

These images are served as static assets at `/dnd-story/avatars/` when the app is built.

The avatar mapping logic is defined in `src/src/game/avatars.ts`.
