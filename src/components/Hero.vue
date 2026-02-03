<script setup>
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-vue-next';

// Konfigurasi durasi dan stagger
const STAGGER_DELAY = 150; // milidetik
const DURATION = 800;
</script>

<template>
  <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

      <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER_DELAY * 0 } }"
          class="mb-6"
      >
        <span class="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
          Selamat Datang di Portfolio Saya
        </span>
      </div>

      <h1
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER_DELAY * 1 } }"
          class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
      >
        Halo, Saya
        <span class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Creative Developer
        </span>
      </h1>

      <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER_DELAY * 2 } }"
          class="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto"
      >
        Saya membuat pengalaman digital yang indah dan fungsional dengan kombinasi desain kreatif dan kode yang bersih
      </p>

      <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER_DELAY * 3 } }"
          class="flex flex-wrap justify-center gap-4 mb-12"
      >
        <a
            href="#projects"
            class="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
        >
          Lihat Proyek Saya
        </a>
        <a
            href="#contact"
            class="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all duration-300"
        >
          Hubungi Saya
        </a>
      </div>

      <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER_DELAY * 4 } }"
          class="flex justify-center space-x-6"
      >
        <a
            v-for="(social, index) in [
            { icon: Github, link: 'https://github.com' },
            { icon: Linkedin, link: 'https://linkedin.com' },
            { icon: Mail, link: 'mailto:email@example.com' }
          ]"
            :key="index"
            :href="social.link"
            target="_blank"
            class="p-3 bg-slate-800 rounded-full hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
        >
          <component :is="social.icon" class="w-6 h-6" />
        </a>
      </div>

      <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: STAGGER_DELAY * 6 } }"
          class="mt-16 flex justify-center"
      >
        <ArrowDown class="w-6 h-6 text-purple-400 animate-bounce" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>