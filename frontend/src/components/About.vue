<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Code2, Palette, Rocket, Users, Milestone, Terminal } from 'lucide-vue-next';

const { t, tm, rt } = useI18n();

const features = computed(() => {
  const rawFeatures = tm('about.features');
  const icons = [Code2, Palette, Rocket, Users];

  return Array.isArray(rawFeatures) ? rawFeatures.map((feature, index) => ({
    ...feature,
    title: rt(feature.title),
    description: rt(feature.description),
    icon: icons[index] || Terminal
  })) : [];
});

const stats = [
  { value: '2+', label: 'about.stats.exp', icon: Milestone },
  { value: '20+', label: 'about.stats.projects', icon: Rocket }
];
</script>

<template>
  <section
      id="about"
      class="py-24 relative overflow-hidden transition-colors duration-700 bg-white dark:bg-[#020617]"
  >
    <div class="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-2000"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }"
          class="text-center mb-20"
      >
        <h2 class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          {{ t('about.title_part1') }} <span class="text-gradient font-black">{{ t('about.title_part2') }}</span>
        </h2>
        <div class="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full shadow-lg shadow-blue-500/20"></div>
      </div>

      <div class="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div
            v-motion
            :initial="{ opacity: 0, x: -50, rotate: -2 }"
            :visible-once="{ opacity: 1, x: 0, rotate: 0, transition: { duration: 800, type: 'spring' } }"
            class="relative group"
        >
          <div class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
          <div class="relative rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl aspect-[4/3] bg-slate-100 dark:bg-slate-900">
            <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
                alt="Developer workspace"
                class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
          </div>
          <div class="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/5 hidden md:block animate-bounce-slow">
            <Terminal class="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
            class="space-y-8"
        >
          <h3 class="text-3xl font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest text-sm">
            {{ t('about.subtitle') }}
          </h3>

          <div class="space-y-6">
            <p class="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium italic border-l-4 border-blue-600 pl-6">
              {{ t('about.desc_1') }}
            </p>
            <p class="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              {{ t('about.desc_2') }}
            </p>
          </div>

          <div class="flex flex-wrap gap-8 pt-6">
            <div v-for="(stat, sIdx) in stats" :key="sIdx" class="flex items-center gap-4 group">
              <div class="p-3 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                <component :is="stat.icon" class="w-6 h-6 text-blue-600" />
              </div>
              <div class="flex flex-col">
                <span class="text-slate-900 dark:text-white font-black text-3xl tracking-tighter italic">{{ stat.value }}</span>
                <span class="text-[10px] text-slate-500 uppercase font-black tracking-widest">{{ t(stat.label) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
            v-for="(feature, index) in features"
            :key="feature.title"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 + (index * 100) } }"
            class="p-8 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-3 group shadow-sm hover:shadow-2xl hover:shadow-blue-500/10"
        >
          <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
            <component :is="feature.icon" class="w-8 h-8 text-blue-600" />
          </div>
          <h4 class="text-xl font-black mb-3 text-slate-900 dark:text-white tracking-tight">{{ feature.title }}</h4>
          <p class="text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-medium">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>