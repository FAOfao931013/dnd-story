<template>
  <section class="action-list" v-if="scene && scene.options.length">
    <h3>你打算怎么做？</h3>
    <div class="action-buttons">
      <button
        v-for="option in scene.options"
        :key="option.id"
        class="btn"
        type="button"
        @click="onChoose(option)"
      >
        {{ option.label }}
      </button>
    </div>
  </section>
  <section v-else-if="scene?.type === 'ending'" class="action-list">
    <p class="muted">
      冒险已经到达结局，可以返回主页开始新的故事。
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAdventureStore } from '../store/adventureStore';
import type { SceneOption } from '../game/engine';

const store = useAdventureStore();

const scene = computed(() => store.currentScene);

function onChoose(option: SceneOption) {
  store.chooseOption(option);
}
</script>

<style scoped>
.action-list {
  margin-top: 1.25rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn {
  width: 100%;
  justify-content: flex-start;
}
</style>

