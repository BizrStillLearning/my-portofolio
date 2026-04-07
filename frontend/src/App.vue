<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useThemeStore } from "./stores/themeStore.js";
import { RouterView, useRoute } from 'vue-router';

const themeStore = useThemeStore();
const route = useRoute();
const isLoading = ref(true);

onBeforeMount(() => {
  themeStore.applyTheme();
  setTimeout(() => {
    isLoading.value = false;
  }, 600);
});

watch(() => route.path, () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 400);
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">

    <transition name="fade">
      <div v-if="isLoading" class="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white dark:bg-[#020617]">
        <div class="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <div class="animate-pulse text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">Initializing...</div>
      </div>
    </transition>

    <main v-show="!isLoading">
      <RouterView :key="route.fullPath" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>