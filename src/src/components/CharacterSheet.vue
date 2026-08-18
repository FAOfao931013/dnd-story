<template>
  <section class="character-sheet" v-if="character">
    <header class="header">
      <h3>{{ character.name || '未命名角色' }}</h3>
      <p class="concept">
        {{ character.concept || '点击下方开始设定你的角色概念' }}
      </p>
    </header>
    <div class="abilities">
      <div
        v-for="(value, key) in character.abilities"
        :key="key"
        class="ability"
      >
        <span class="label">{{ abilityLabel(key) }}</span>
        <span class="value">{{ value }}</span>
      </div>
    </div>
    <div class="tags">
      <h4>性格与特质</h4>
      <p v-if="!character.tags.length" class="muted small">
        初版中标签暂不在 UI 中编辑，你可以在脑海中想象角色的性格与背景。
      </p>
      <div v-else class="tag-list">
        <span v-for="tag in character.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </section>
  <section v-else class="character-sheet">
    <p class="muted">
      暂无进行中的冒险，返回首页创建新角色并开始故事。
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAdventureStore } from '../store/adventureStore';
import type { AbilityKey } from '../game/engine';

const store = useAdventureStore();

const character = computed(() => store.state?.character ?? null);

function abilityLabel(key: string): string {
  const map: Record<AbilityKey, string> = {
    str: '力量',
    dex: '敏捷',
    con: '体质',
    int: '智力',
    wis: '感知',
    cha: '魅力'
  };
  return map[key as AbilityKey] ?? key;
}
</script>

<style scoped>
.character-sheet {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.header h3 {
  margin: 0;
}

.concept {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  opacity: 0.8;
}

.abilities {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.35rem 0.75rem;
  font-size: 0.86rem;
}

.ability {
  display: flex;
  justify-content: space-between;
}

.value {
  font-weight: 600;
}

.tags h4 {
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
}

.small {
  font-size: 0.8rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag {
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 0.8rem;
}
</style>

