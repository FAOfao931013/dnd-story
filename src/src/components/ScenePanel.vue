<template>
  <section v-if="scene" class="scene-panel">
    <header class="scene-header">
      <h2>{{ scene.title }}</h2>
      <p v-if="adventure" class="scene-subtitle">
        冒险：{{ adventure.title }}
      </p>
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

const store = useAdventureStore();

const scene = computed(() => store.currentScene);
const adventure = computed(() => store.currentAdventure);
</script>

<style scoped>
.scene-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

