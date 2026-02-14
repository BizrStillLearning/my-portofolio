<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Code, Palette, Rocket, Users } from 'lucide-vue-next';

const { t, tm, rt } = useI18n();

const features = computed(() => {
  const rawFeatures = tm('about.features');
  const icons = [Code, Palette, Rocket, Users];

  return Array.isArray(rawFeatures) ? rawFeatures.map((feature, index) => ({
    ...feature,
    title: rt(feature.title),
    description: rt(feature.description),
    icon: icons[index]
  })) : [];
});

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
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      id="about" class="py-20 relative overflow-hidden transition-colors duration-500 bg-white dark:bg-slate-950">

    <div class="absolute inset-0 z-0 opacity-30 dark:opacity-10">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div
          v-motion
          :initial="sectionScroll.initial"
          :visible-once="sectionScroll.visibleOnce"
          class="text-center mb-16"
      >
        <h2 class="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          {{ t('about.title_part1') }} <span class="text-gradient">{{ t('about.title_part2') }}</span>
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto rounded-full"></div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
        >
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
                alt="Developer workspace"
                class="relative rounded-2xl shadow-2xl w-full h-96 object-cover border border-white/10"
            />
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 400 } }"
            class="space-y-6"
        >
          <h3 class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ t('about.subtitle') }}
          </h3>


          <p class="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {{ t('about.desc_1') }}
          </p>
          <p class="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {{ t('about.desc_2') }}
          </p>

          <div class="flex flex-wrap gap-4 pt-2">
            <div class="flex flex-col">
              <span class="text-blue-600 dark:text-blue-400 font-black text-2xl tracking-tighter italic">2+</span>
              <span class="text-[10px] text-slate-500 uppercase font-bold">{{ t('about.stats.exp') }}</span>
            </div>
            <div class="h-10 w-[1px] bg-slate-200 dark:bg-white/10 mx-2"></div>
            <div class="flex flex-col">
              <span class="text-blue-600 dark:text-blue-400 font-black text-2xl tracking-tighter italic">20+</span>
              <span class="text-[10px] text-slate-500 uppercase font-bold">{{ t('about.stats.projects') }}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
            v-for="(feature, index) in features"
            :key="feature.title"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 + (index * 100) } }"
            class="p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-200 dark:border-blue-500/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-2 group"
        >
          <component :is="feature.icon" class="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
          <h4 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">{{ feature.title }}</h4>
          <p class="text-slate-600 dark:text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>