<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ExternalLink, Github, Star, Smartphone, Globe, Brain, Code2, Layout, Database } from 'lucide-vue-next';

const { t, tm, rt } = useI18n();
const filter = ref('all');

const projectsData = computed(() => {
  const rawItems = tm('projects.items');

  const projectMetadata = [
    {
      id: 1,
      category: 'fullstack',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      tags: ['Laravel', 'MySQL', 'Livewire'],
      github: '#', demo: '#', featured: true
    },
    {
      id: 2,
      category: 'android',
      image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=800&h=600&fit=crop',
      tags: ['Kotlin', 'TensorFlow Lite', 'Android SDK'],
      github: '#', demo: '#', featured: true
    },
    {
      id: 3,
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      tags: ['Python', 'OpenCV', 'PyTorch'],
      github: '#', demo: '#', featured: false
    },
    {
      id: 4,
      category: 'frontend',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
      tags: ['Vue 3', 'Tailwind', 'Vite'],
      github: '#', demo: '#', featured: false
    },
    {
      id: 5,
      category: 'fullstack',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      tags: ['Next.js', 'Prisma', 'PostgreSQL'],
      github: '#', demo: '#', featured: false
    },
    {
      id: 6,
      category: 'android',
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&h=600&fit=crop',
      tags: ['Flutter', 'Dart', 'Firebase'],
      github: '#', demo: '#', featured: false
    }
  ];

  return Array.isArray(rawItems) ? rawItems.map((item, index) => ({
    ...projectMetadata[index],
    title: rt(item.title),
    description: rt(item.desc)
  })) : [];
});

const categories = [
  { id: 'all', label: 'Semua', icon: Code2 },
  { id: 'frontend', label: 'Frontend', icon: Globe },
  { id: 'android', label: 'Android', icon: Smartphone },
  { id: 'fullstack', label: 'Full Stack', icon: Database },
  { id: 'ai', label: 'AI/ML', icon: Brain },
];

const filteredProjects = computed(() => {
  return filter.value === 'all'
      ? projectsData.value
      : projectsData.value.filter(project => project.category === filter.value);
});
</script>

<template>
  <section id="projects" class="py-20 relative overflow-hidden transition-colors duration-500 bg-white dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div v-motion :initial="{ opacity: 0, y: 50 }" :visible-once="{ opacity: 1, y: 0 }" class="text-center mb-12">
        <h2 class="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          {{ t('projects.title_part1') }} <span class="text-gradient">{{ t('projects.title_part2') }}</span>
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
        <p class="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto italic">
          {{ t('projects.subtitle') }}
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 mb-16">
        <button
            v-for="cat in categories"
            :key="cat.id"
            @click="filter = cat.id"
            :class="[
            'flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border cursor-pointer active:scale-95',
            filter === cat.id
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-blue-500/50 hover:text-blue-500 hover:shadow-md'
          ]"
        >
          <component :is="cat.icon" class="w-4 h-4" />
          {{ cat.label }}
        </button>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <transition-group
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="transform translate-y-8 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            move-class="transition duration-500 ease-in-out"
        >
          <div
              v-for="project in filteredProjects"
              :key="project.id"
              class="group relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-3 cursor-default shadow-sm hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div v-if="project.featured" class="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-[10px] font-black text-white shadow-lg animate-pulse">
              <Star class="w-3 h-3 fill-current" /> TOP
            </div>

            <div class="relative h-56 overflow-hidden cursor-pointer">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
            </div>

            <div class="p-8">
              <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {{ project.title }}
              </h3>
              <p class="text-slate-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed font-medium">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-8">
                <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider transition-colors hover:bg-blue-600 hover:text-white cursor-default">
                  {{ tag }}
                </span>
              </div>

              <div class="flex gap-6 pt-6 border-t border-slate-200 dark:border-white/5">
                <a :href="project.github" class="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-xs font-bold cursor-pointer group/link">
                  <Github class="w-4 h-4 transition-transform group-hover/link:rotate-12" /> Code
                </a>
                <a :href="project.demo" class="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-xs font-bold cursor-pointer group/link">
                  <ExternalLink class="w-4 h-4 transition-transform group-hover/link:scale-110" /> Live
                </a>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <div class="text-center mt-20">
        <a href="https://github.com/zidqy" target="_blank" class="inline-flex items-center gap-3 px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group shadow-xl hover:shadow-blue-500/30 cursor-pointer active:scale-95">
          <Github class="w-5 h-5 font-bold group-hover:rotate-12 transition-transform" />
          <span class="font-black text-sm uppercase tracking-widest">{{ t('projects.more_btn') }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>