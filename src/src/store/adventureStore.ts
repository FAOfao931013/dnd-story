import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { AdventureState, Scene, SceneOption } from '../game/engine';
import { createInitialState, getAdventure, getScene } from '../game/engine';
import { resolveCheck, type DiceRollResult } from '../game/rules';
import { loadAdventureState, saveAdventureState, clearAdventureState } from '../utils/storage';

export interface LogEntry {
  id: string;
  type: 'scene' | 'choice' | 'check';
  title?: string;
  text: string;
  meta?: Record<string, unknown>;
}

export const useAdventureStore = defineStore('adventure', () => {
  const state = ref<AdventureState | null>(null);
  const logs = ref<LogEntry[]>([]);
  const lastRoll = ref<DiceRollResult | null>(null);

  const currentAdventure = computed(() =>
    state.value ? getAdventure(state.value.adventureId) : undefined
  );

  const currentScene = computed<Scene | undefined>(() => {
    if (!state.value || !currentAdventure.value) return undefined;
    return getScene(currentAdventure.value, state.value.currentSceneId);
  });

  function appendLog(entry: LogEntry) {
    logs.value.push(entry);
  }

  function startNewAdventure(name: string, concept: string) {
    const initial = createInitialState('intro-quest', name, concept);
    if (!initial) return;
    state.value = initial;
    logs.value = [];
    lastRoll.value = null;

    const scene = currentScene.value;
    if (scene) {
      appendLog({
        id: `scene-${scene.id}`,
        type: 'scene',
        title: scene.title,
        text: scene.text
      });
    }
    saveAdventureState(initial);
  }

  function loadFromStorage() {
    const loaded = loadAdventureState();
    if (loaded) {
      state.value = loaded;
      // 日志暂时只在本次会话中记录，不从存储中恢复
    }
  }

  function endAdventure() {
    state.value = null;
    lastRoll.value = null;
    clearAdventureState();
  }

  function chooseOption(option: SceneOption) {
    if (!state.value || !currentAdventure.value || !currentScene.value) return;

    appendLog({
      id: `choice-${Date.now()}`,
      type: 'choice',
      text: option.label
    });

    if (option.check) {
      const roll = resolveCheck(state.value.character, option.check);
      lastRoll.value = roll;
      appendLog({
        id: `check-${Date.now()}`,
        type: 'check',
        text: `掷 d20 结果：${roll.roll}，修正值：${roll.modifier >= 0 ? `+${roll.modifier}` : roll.modifier}，总计 ${roll.total}（目标 ${roll.target}）`,
        meta: roll
      });

      const nextId =
        roll.outcome === 'success' || roll.outcome === 'partial'
          ? option.check.onSuccess
          : option.check.onFailure;

      state.value.currentSceneId = nextId;
    } else if (option.nextSceneId) {
      state.value.currentSceneId = option.nextSceneId;
    }

    const scene = currentScene.value;
    if (scene) {
      appendLog({
        id: `scene-${scene.id}-${Date.now()}`,
        type: 'scene',
        title: scene.title,
        text: scene.text
      });
    }

    saveAdventureState(state.value);
  }

  return {
    state,
    logs,
    lastRoll,
    currentAdventure,
    currentScene,
    startNewAdventure,
    loadFromStorage,
    endAdventure,
    chooseOption
  };
});

