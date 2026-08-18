import type { AbilityKey, DifficultyKey, CheckDefinition, CharacterState } from './engine';

export interface DiceRollResult {
  die: 'd20';
  roll: number;
  modifier: number;
  total: number;
  target: number;
  outcome: 'success' | 'partial' | 'failure';
}

const difficultyTarget: Record<DifficultyKey, number> = {
  easy: 10,
  normal: 13,
  hard: 16
};

export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

function abilityModifier(score: number): number {
  // 简化版：-1 ~ +3 区间
  if (score <= 0) return -1;
  if (score === 1) return 0;
  if (score === 2) return 1;
  if (score === 3) return 2;
  return 3;
}

function hasRelevantTag(character: CharacterState, tag?: string): boolean {
  if (!tag) return false;
  return character.tags.includes(tag);
}

export function resolveCheck(
  character: CharacterState,
  check: CheckDefinition
): DiceRollResult {
  const base = character.abilities[check.ability as AbilityKey] ?? 0;
  let modifier = abilityModifier(base);

  if (hasRelevantTag(character, check.skillTag)) {
    modifier += 1;
  }

  const roll = rollD20();
  const total = roll + modifier;
  const target = difficultyTarget[check.difficulty];

  let outcome: DiceRollResult['outcome'] = 'failure';
  if (total >= target + 5) {
    outcome = 'success';
  } else if (total >= target) {
    outcome = 'partial';
  }

  return {
    die: 'd20',
    roll,
    modifier,
    total,
    target,
    outcome
  };
}

