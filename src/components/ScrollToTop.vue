<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronUp } from 'lucide-vue-next';

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility);
});

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility);
});
</script>

<template>
  <button
      v-if="isVisible"
      v-motion
      :initial="{ opacity: 0, scale: 0 }"
      :enter="{ opacity: 1, scale: 1 }"
      :leave="{ opacity: 0, scale: 0 }"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer group"
      aria-label="Scroll to top"
  >
    <ChevronUp class="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
  </button>
</template>