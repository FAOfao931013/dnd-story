<template>
  <section class="page page-home">
    <form class="page-card" @submit.prevent="onStart">
      <h2>欢迎来到单人 DND 冒险</h2>
      <p class="muted">
        创建一个角色，踏上一段适合单人体验的 D&D 风格奇幻旅程。
      </p>
      <label class="field">
        <span>角色名字</span>
        <input v-model="name" required placeholder="例如：伊瑞斯、罗恩…" />
      </label>
      <label class="field">
        <span>角色概念 / 背景一句话</span>
        <input
          v-model="concept"
          required
          placeholder="例如：曾经的雇佣兵，如今守护小镇的调查者"
        />
      </label>
      <div class="actions">
        <button class="btn primary" type="submit">
          开始新冒险
        </button>
        <RouterLink class="btn" to="/adventure">
          继续上次冒险
        </RouterLink>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { useAdventureStore } from '../store/adventureStore';

const router = useRouter();
const store = useAdventureStore();

const name = ref('');
const concept = ref('');

function onStart() {
  if (!name.value || !concept.value) return;
  store.startNewAdventure(name.value, concept.value);
  router.push('/adventure');
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

input {
  padding: 0.4rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(8, 8, 8, 0.9);
  color: inherit;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
</style>

