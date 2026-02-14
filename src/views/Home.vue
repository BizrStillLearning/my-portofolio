<script setup>
import { ref, onMounted } from 'vue';

import Navbar from '../components/Navbar.vue';
import Hero from '../components/Hero.vue';

import About from '../components/About.vue';
import Skills from '../components/Skills.vue';
import Projects from '../components/Project.vue';
import Contact from '../components/Contact.vue';
import Footer from '../components/Footer.vue';
import ScrollToTop from '../components/ScrollToTop.vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 600);
});
</script>

<template>
  <Transition
      v-motion
      :leave="{ opacity: 0, transition: { duration: 500 } }"
  >
    <div v-if="isLoading" class="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center">
      <div class="relative w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
    </div>
  </Transition>

  <div v-if="!isLoading" class="min-h-screen bg-slate-950 custom-scrollbar overflow-x-hidden">
    <Navbar />

    <main>
      <Hero /> <About />
      <Skills />
      <Projects />
      <Contact />
    </main>

    <Footer />
    <ScrollToTop />
  </div>
</template>