import type { AdventureState } from '../game/engine';

const ADVENTURE_KEY = 'solo_dnd_current_adventure';

export function saveAdventureState(state: AdventureState) {
  try {
    localStorage.setItem(ADVENTURE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function loadAdventureState(): AdventureState | null {
  try {
    const raw = localStorage.getItem(ADVENTURE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdventureState;
  } catch {
    return null;
  }
}

export function clearAdventureState() {
  try {
    localStorage.removeItem(ADVENTURE_KEY);
  } catch {
    // ignore
  }
}

