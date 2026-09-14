/**
 * Avatar mapping for characters in the game.
 * Maps character IDs to their avatar asset paths.
 * Assets are served from public/avatars/ and respect Vite's BASE_URL.
 */

export type AvatarId = 'player' | 'mayor' | 'cloak_figure' | 'dock_youth' | 'cultist';

interface AvatarInfo {
  id: AvatarId;
  path: string;
  alt: string;
}

/**
 * Get the full avatar URL for a given avatar ID.
 * Respects Vite's base path configuration.
 */
export function getAvatarUrl(avatarId: AvatarId): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}avatars/${avatarId}.png`;
}

/**
 * Avatar metadata for all characters.
 */
export const avatars: Record<AvatarId, AvatarInfo> = {
  player: {
    id: 'player',
    path: 'avatars/player.png',
    alt: '冒险者'
  },
  mayor: {
    id: 'mayor',
    path: 'avatars/mayor.png',
    alt: '镇长'
  },
  cloak_figure: {
    id: 'cloak_figure',
    path: 'avatars/cloak_figure.png',
    alt: '斗篷人'
  },
  dock_youth: {
    id: 'dock_youth',
    path: 'avatars/dock_youth.png',
    alt: '码头青年'
  },
  cultist: {
    id: 'cultist',
    path: 'avatars/cultist.png',
    alt: '仪式者'
  }
};

/**
 * Scene-to-avatar mapping for the intro quest.
 * Maps scene IDs to the primary character/NPC avatar that should be displayed.
 */
export const sceneAvatarMap: Record<string, AvatarId> = {
  // Hook and mayor scenes
  'hook_tavern': 'mayor',
  'investigate_mayor': 'mayor',
  
  // Cloak figure scenes
  'tavern_clue_success': 'cloak_figure',
  'cloak_figure': 'cloak_figure',
  
  // Dock youth scenes
  'dock_response': 'dock_youth',
  
  // Ritual/cultist scenes
  'ritual_cave': 'cultist',
  'ending_banished': 'cultist',
  'ending_partial': 'cultist',
  'ending_controlled': 'cultist',
  'ending_costly': 'cultist'
};

/**
 * Get avatar ID for a given scene, if one is mapped.
 */
export function getSceneAvatar(sceneId: string): AvatarId | null {
  return sceneAvatarMap[sceneId] ?? null;
}
