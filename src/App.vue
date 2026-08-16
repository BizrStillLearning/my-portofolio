<script setup>
import { onBeforeMount } from 'vue';
import { useThemeStore } from "./stores/themeStore.js";
import { RouterView, useRoute } from 'vue-router';

const themeStore = useThemeStore();
const route = useRoute();

onBeforeMount(() => {
  themeStore.applyTheme();
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
    <main>
      <RouterView :key="route.fullPath" v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&display=swap');

:root, body, html {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

