<template>
  <section class="character-sheet" v-if="character">
    <header class="header">
      <div class="avatar-container">
        <img
          :src="playerAvatarUrl"
          :alt="playerAvatarAlt"
          class="avatar"
          @error="onAvatarError"
        />
      </div>
      <div class="header-text">
        <h3>{{ character.name || '未命名角色' }}</h3>
        <p class="concept">
          {{ character.concept || '点击下方开始设定你的角色概念' }}
        </p>
      </div>
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
import { computed, ref } from 'vue';
import { useAdventureStore } from '../store/adventureStore';
import type { AbilityKey } from '../game/engine';
import { getAvatarUrl, avatars } from '../game/avatars';

const store = useAdventureStore();

const character = computed(() => store.state?.character ?? null);

const playerAvatarUrl = computed(() => getAvatarUrl('player'));
const playerAvatarAlt = computed(() => avatars.player.alt);

const avatarError = ref(false);

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

function onAvatarError(event: Event) {
  avatarError.value = true;
  const img = event.target as HTMLImageElement;
  // Fallback to a data URL placeholder on error
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23334155"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23cbd5e1" font-size="32" font-family="sans-serif"%3E?%3C/text%3E%3C/svg%3E';
}
</script>

<style scoped>
.character-sheet {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar-container {
  flex-shrink: 0;
}

.avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
}

.header-text {
  flex: 1;
  min-width: 0;
}

.header-text h3 {
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

