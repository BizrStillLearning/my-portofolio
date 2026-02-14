<script setup>
import { ref, onMounted } from 'vue';
import {useThemeStore} from "./stores/themeStore.js";
import Home from "./views/Home.vue";

const themeStore = useThemeStore();
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 600);
});

onMounted(() => {
  themeStore.applyTheme();
});
</script>

<template>
  <Home />
</template>