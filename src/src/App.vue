<template>
  <div class="app-shell">
    <header class="app-header">
      <h1 class="app-title">单人 DND 冒险</h1>
      <nav class="app-nav">
        <RouterLink to="/">冒险</RouterLink>
        <RouterLink to="/history">冒险记录</RouterLink>
        <RouterLink to="/settings">设置</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>
