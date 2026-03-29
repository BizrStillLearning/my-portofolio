<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Simple Icons CDN base URL
const iconBase = "https://cdn.simpleicons.org/";

const skillCategories = [
  {
    category: 'Frontend & Frameworks',
    skills: [
      { name: 'Vue.js', level: 80, icon: 'vuedotjs/41B883' },
      { name: 'JavaScript', level: 95, icon: 'javascript/F7DF1E' },
      { name: 'Next.js', level: 10, icon: 'nextdotjs/000000', needsInvert: true },
      { name: 'React', level: 75, icon: 'react/61DAFB' },
      { name: 'Tailwind CSS', level: 95, icon: 'tailwindcss/06B6D4' },
    ],
  },
  {
    category: 'Backend & Languages',
    skills: [
      { name: 'Go', level: 20, icon: 'go/00ADD8' },
      { name: 'Rust', level: 15, icon: 'rust/000000', needsInvert: true },
      { name: 'Express.js', level: 18, icon: 'express/000000', needsInvert: true },
      { name: 'Laravel', level: 60, icon: 'laravel/FF2D20' },
      { name: 'PHP', level: 85, icon: 'php/777BB4' },
    ],
  },
  {
    category: 'Mobile & AI/Data',
    skills: [
      { name: 'Android', level: 20, icon: 'android/3DDC84' },
      { name: 'Kotlin', level: 30, icon: 'kotlin/7F52FF' },
      { name: 'Swift', level: 50, icon: 'swift/F05138' },
      { name: 'Flutter', level: 82, icon: 'flutter/02569B' },
      { name: 'Python', level: 90, icon: 'python/3776AB' },
    ],
  },
];

const learningTech = [
  { name: 'Deep Learning', icon: 'scikitlearn/F7931E' },
  { name: 'Machine Learning', icon: 'anaconda/44A833' },
  { name: 'Computer Vision', icon: 'nvidia/76B900' },
  { name: 'LLM', icon: 'openai/000000', needsInvert: true },
  { name: 'Web3', icon: 'ethereum/3C3C3D', needsInvert: true }
];

const sectionScroll = {
  initial: { opacity: 0, y: 50 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: { duration: 600 }
  }
};
</script>

<template>
  <section
      id="skills"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      class="py-20 relative overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950"
  >
    <div
        class="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div
          v-motion
          :initial="sectionScroll.initial"
          :visible-once="sectionScroll.visibleOnce"
          class="text-center mb-16"
      >
        <h2 class="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          {{ t('skills.title_part1') }} <span class="text-gradient">{{ t('skills.title_part2') }}</span>
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
        <p class="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {{ t('skills.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
            v-for="(cat, catIndex) in skillCategories"
            :key="cat.category"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 600, delay: catIndex * 200 }
            }"
            class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 shadow-xl"
        >
          <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-8 tracking-tight">{{ cat.category }}</h3>

          <div class="space-y-6">
            <div v-for="(skill, sIndex) in cat.skills" :key="skill.name" class="group">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <img
                      :src="`${iconBase}${skill.icon}`"
                      class="w-6 h-6 group-hover:scale-110 transition-transform"
                      :class="{'dark:invert': skill.needsInvert}"
                      :alt="skill.name"
                  >
                  <span class="text-slate-700 dark:text-gray-300 font-bold text-sm">{{ skill.name }}</span>
                </div>
                <span class="text-xs font-black text-blue-500 italic">{{ skill.level }}%</span>
              </div>

              <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                    v-motion
                    :initial="{ width: '0%' }"
                    :visible-once="{
                      width: `${skill.level}%`,
                      transition: {
                        duration: 1500,
                        delay: (catIndex * 200) + (sIndex * 150),
                        ease: [0.23, 1, 0.32, 1]
                      }
                    }"
                    class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: 800 }
          }"
          class="mt-16 text-center"
      >
        <p class="text-slate-500 dark:text-gray-500 font-bold text-xs uppercase tracking-[0.3em] mb-8">
          {{ t('skills.learning_label') }}
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <div
              v-for="(tech, tIndex) in learningTech"
              :key="tech.name"
              v-motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :visible-once="{
                opacity: 1,
                scale: 1,
                transition: { delay: 1000 + (tIndex * 100), type: 'spring' }
              }"
              class="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm hover:border-blue-500/50 transition-all group"
          >
            <img
                :src="`${iconBase}${tech.icon}`"
                class="w-4 h-4 grayscale group-hover:grayscale-0 transition-all"
                :class="{'dark:invert': tech.needsInvert}"
                :alt="tech.name"
            >
            <span class="text-xs font-bold text-slate-600 dark:text-gray-400 group-hover:text-blue-500">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>