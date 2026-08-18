import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // 如果仓库名不是 dnd-story，改成对应仓库名
  base: '/dnd-story/',
  server: {
    port: 6316
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
