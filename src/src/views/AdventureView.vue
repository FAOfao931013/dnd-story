<template>
  <section class="page page-adventure">
    <div class="layout">
      <div class="layout-main">
        <ScenePanel />
        <ActionList />
      </div>
      <aside class="layout-side">
        <CharacterSheet />
        <TimelineLog />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import ScenePanel from '../components/ScenePanel.vue';
import ActionList from '../components/ActionList.vue';
import CharacterSheet from '../components/CharacterSheet.vue';
import TimelineLog from '../components/TimelineLog.vue';
</script>
