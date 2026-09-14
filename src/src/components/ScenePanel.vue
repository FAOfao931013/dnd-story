<template>
  <section v-if="scene" class="scene-panel">
    <header class="scene-header">
      <div class="scene-header-content">
        <div v-if="sceneAvatarUrl" class="scene-avatar-container">
          <img
            :src="sceneAvatarUrl"
            :alt="sceneAvatarAlt"
            class="scene-avatar"
            @error="onAvatarError"
          />
        </div>
        <div class="scene-title-group">
          <h2>{{ scene.title }}</h2>
          <p v-if="adventure" class="scene-subtitle">
            冒险：{{ adventure.title }}
          </p>
        </div>
      </div>
    </header>
    <p class="scene-text">
      {{ scene.text }}
    </p>
  </section>
  <section v-else class="scene-panel empty">
    <p class="muted">当前没有进行中的冒险。</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAdventureStore } from '../store/adventureStore';
import { getSceneAvatar, getAvatarUrl, avatars, type AvatarId } from '../game/avatars';

const store = useAdventureStore();

const scene = computed(() => store.currentScene);
const adventure = computed(() => store.currentAdventure);

const sceneAvatarId = computed<AvatarId | null>(() => {
  if (!scene.value) return null;
  return getSceneAvatar(scene.value.id);
});

const sceneAvatarUrl = computed(() => {
  const avatarId = sceneAvatarId.value;
  return avatarId ? getAvatarUrl(avatarId) : null;
});

const sceneAvatarAlt = computed(() => {
  const avatarId = sceneAvatarId.value;
  return avatarId ? avatars[avatarId].alt : '';
});

function onAvatarError(event: Event) {
  const img = event.target as HTMLImageElement;
  // Hide avatar on error instead of showing placeholder
  img.style.display = 'none';
}
</script>

<style scoped>
.scene-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.scene-header-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.scene-avatar-container {
  flex-shrink: 0;
}

.scene-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.15);
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.scene-title-group {
  flex: 1;
  min-width: 0;
}

.scene-header h2 {
  margin: 0;
}

.scene-subtitle {
  margin: 0.15rem 0 0;
  font-size: 0.86rem;
  opacity: 0.7;
}

.scene-text {
  line-height: 1.7;
  margin: 0.4rem 0 0;
}

.empty {
  text-align: center;
}
</style>

