<script setup>
import { ref, computed } from 'vue';
import { ExternalLink, Github, Star } from 'lucide-vue-next';

const filter = ref('all');

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'fullstack',
    description: 'Platform e-commerce modern dengan fitur lengkap termasuk payment gateway, admin dashboard, dan real-time analytics.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'frontend',
    description: 'Aplikasi manajemen task dengan drag & drop, kolaborasi tim, dan notifikasi real-time.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind', 'Firebase'],
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Social Media Dashboard',
    category: 'frontend',
    description: 'Dashboard analytics untuk mengelola multiple social media accounts dengan visualisasi data yang interaktif.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Chart.js', 'API Integration'],
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'AI Chat Application',
    category: 'fullstack',
    description: 'Aplikasi chat dengan integrasi AI untuk customer service automation dan sentiment analysis.',
    image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=600&fit=crop',
    tags: ['React', 'OpenAI', 'WebSocket', 'Express'],
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    id: 5,
    title: 'Portfolio CMS',
    category: 'fullstack',
    description: 'Content Management System khusus untuk portfolio dengan customizable templates dan SEO optimization.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel'],
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Weather Forecast App',
    category: 'frontend',
    description: 'Aplikasi prakiraan cuaca dengan visualisasi interaktif dan lokasi berbasis GPS.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
    tags: ['React', 'Weather API', 'Leaflet', 'PWA'],
    github: '#',
    demo: '#',
    featured: false,
  },
];

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'fullstack', label: 'Full Stack' },
];

const filteredProjects = computed(() => {
  return filter.value === 'all'
      ? projects
      : projects.filter(project => project.category === filter.value);
});
</script>

<template>
  <section id="projects" class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-12"
      >
        <h2 class="text-4xl sm:text-5xl font-bold mb-4">
          Proyek <span class="text-gradient">Saya</span>
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Beberapa proyek terbaik yang telah saya kerjakan dengan dedikasi dan passion
        </p>
      </div>

      <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="flex flex-wrap justify-center gap-4 mb-12"
      >
        <button
            v-for="cat in categories"
            :key="cat.id"
            @click="filter = cat.id"
            :class="[
            'px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer',
            filter === cat.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
              : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 600, delay: index * 100 }
            }"
            class="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2"
        >
          <div
              v-if="project.featured"
              class="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-[10px] uppercase tracking-wider font-bold text-white shadow-lg"
          >
            <Star class="w-3 h-3 fill-current" />
            Featured
          </div>

          <div class="relative h-48 overflow-hidden">
            <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
          </div>

          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-md text-[11px] font-medium text-purple-400"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex gap-4 pt-4 border-t border-slate-700/50">
              <a
                  :href="project.github"
                  class="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm font-medium"
              >
                <Github class="w-4 h-4" />
                Code
              </a>
              <a
                  :href="project.demo"
                  class="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm font-medium"
              >
                <ExternalLink class="w-4 h-4" />
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
          v-motion
          :initial="{ opacity: 0 }"
          :visible-once="{ opacity: 1, transition: { duration: 600, delay: 600 } }"
          class="text-center mt-16"
      >
        <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/50 rounded-full transition-all duration-300 group"
        >
          <Github class="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Lihat Lebih Banyak di GitHub
        </a>
      </div>
    </div>
  </section>
</template>