<template>
  <div class="timeline-log">
    <h3>冒险日志</h3>
    <ol>
      <li v-for="entry in logs" :key="entry.id" :class="entry.type">
        <p v-if="entry.title" class="title">
          {{ entry.title }}
        </p>
        <p class="body">
          {{ entry.text }}
        </p>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAdventureStore } from '../store/adventureStore';

const store = useAdventureStore();
const { logs } = storeToRefs(store);
</script>

<style scoped>
.timeline-log {
  font-size: 0.9rem;
}

ol {
  list-style: none;
  padding-left: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 320px;
  overflow-y: auto;
}

li {
  border-left: 2px solid rgba(255, 255, 255, 0.08);
  padding-left: 0.75rem;
}

.title {
  margin: 0;
  font-weight: 600;
}

.body {
  margin: 0.1rem 0 0;
  opacity: 0.85;
}

.choice .body {
  opacity: 0.9;
}

.check .body {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  font-size: 0.82rem;
}
</style>

