import introQuest from './adventures/intro-quest.json';

export type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export type DifficultyKey = 'easy' | 'normal' | 'hard';

export interface CheckDefinition {
  ability: AbilityKey;
  skillTag?: string;
  difficulty: DifficultyKey;
  onSuccess: string;
  onFailure: string;
}

export interface SceneOption {
  id: string;
  label: string;
  nextSceneId?: string;
  check?: CheckDefinition;
}

export type SceneType = 'narration' | 'ending';

export interface Scene {
  id: string;
  type: SceneType;
  title: string;
  text: string;
  options: SceneOption[];
  endingTag?: string;
}

export interface Adventure {
  id: string;
  title: string;
  description: string;
  startSceneId: string;
  scenes: Scene[];
}

export const adventures: Record<string, Adventure> = {
  'intro-quest': introQuest as Adventure
};

export function getAdventure(id: string): Adventure | undefined {
  return adventures[id];
}

export function getScene(adventure: Adventure, sceneId: string): Scene | undefined {
  return adventure.scenes.find((s) => s.id === sceneId);
}

export interface CharacterState {
  name: string;
  concept: string;
  abilities: Record<AbilityKey, number>;
  tags: string[];
}

export interface AdventureState {
  adventureId: string;
  currentSceneId: string;
  character: CharacterState;
}

export function createDefaultCharacter(name: string, concept: string): CharacterState {
  return {
    name,
    concept,
    abilities: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 1,
      cha: 1
    },
    tags: []
  };
}

export function createInitialState(
  adventureId: string,
  name: string,
  concept: string
): AdventureState | undefined {
  const adv = getAdventure(adventureId);
  if (!adv) return undefined;
  return {
    adventureId,
    currentSceneId: adv.startSceneId,
    character: createDefaultCharacter(name, concept)
  };
}

