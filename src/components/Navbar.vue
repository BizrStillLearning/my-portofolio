<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X, Code2 } from 'lucide-vue-next';


const isOpen = ref(false);
const scrolled = ref(false);

const navItems = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang', href: '#about' },
  { name: 'Keahlian', href: '#skills' },
  { name: 'Proyek', href: '#projects' },
  { name: 'Kontak', href: '#contact' },
];

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const scrollToSection = (e, href) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav
      v-motion
      :initial="{ y: -100, opacity: 0 }"
      :enter="{ y: 0, opacity: 1 }"
      :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-purple-500/10'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <div
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0 }"
            class="flex items-center space-x-2"
        >
          <Code2 class="w-8 h-8 text-purple-500" />
          <span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Portfolio
          </span>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a
              v-for="(item, index) in navItems"
              :key="item.name"
              :href="item.href"
              @click="scrollToSection($event, item.href)"
              v-motion
              :initial="{ opacity: 0, y: -20 }"
              :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: index * 100 }
            }"
              class="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group"
          >
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <button
            @click="isOpen = !isOpen"
            class="md:hidden text-white p-2 hover:bg-purple-500/10 rounded-lg transition-colors cursor-pointer"
        >
          <component :is="isOpen ? X : Menu" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div
        v-if="isOpen"
        v-motion
        :initial="{ opacity: 0, height: 0 }"
        :enter="{ opacity: 1, height: 'auto' }"
        class="md:hidden bg-slate-900/95 backdrop-blur-md overflow-hidden"
    >
      <div class="px-4 pt-2 pb-4 space-y-2">
        <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click="scrollToSection($event, item.href)"
            class="block px-4 py-2 text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Tailwind v4 fokus pada modern CSS, gradient text dibuat lebih eksplisit di class */
</style>