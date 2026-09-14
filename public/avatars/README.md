# Character Avatars

This directory contains character portrait images used throughout the D&D adventure UI.

## Current Status

✅ **Production-ready Dreamina portraits approved for intro-quest adventure**

These high-quality AI-generated portraits match the dark fantasy theme of the solo D&D experience.

## Character Portraits

Five character portraits for the intro quest "雾镇的失踪事件" (The Disappearances in Fog Town):

1. **player.png** - Default player adventurer portrait
   - Used in: Character sheet throughout the adventure

2. **mayor.png** - Town mayor character
   - Used in: `hook_tavern`, `investigate_mayor` scenes

3. **cloak_figure.png** - Mysterious cloaked figure in the tavern
   - Used in: `tavern_clue_success`, `cloak_figure` scenes

4. **dock_youth.png** - Frightened youth at the docks
   - Used in: `dock_response` scene

5. **cultist.png** - Ritual cultist performing dark ceremonies
   - Used in: `ritual_cave` and all ending scenes

## Image Specifications

- **Format**: PNG
- **Source**: Dreamina AI art generation
- **Size**: ~1.6-2.5MB per portrait (high quality)
- **Style**: Consistent dark fantasy aesthetic with atmospheric fog-town setting
- **Display**: Rendered at 48-56px in-game with circular crop

## Asset Path

These images are served as static assets at `/dnd-story/avatars/` when the app is built.

The avatar mapping logic is defined in `src/src/game/avatars.ts`.
