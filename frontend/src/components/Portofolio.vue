<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { supabase } from '../supabase';
import {
  Code2,
  ExternalLink,
  Github,
  Trophy,
  Layers,
  Clock3,
  GitCommitVertical,
  ChevronRight,
  ShieldCheck
} from 'lucide-vue-next';

const { t, tm, rt } = useI18n();
const activeTab = ref('projects');

// State penyimpanan data dari Supabase
const certificatesFromDB = ref([]);
const projectsFromDB = ref([]);
const isLoadingProjects = ref(false);

const tabs = [
  { id: 'projects', label: 'portfolio.tabs.projects', icon: Code2 },
  { id: 'certificates', label: 'portfolio.tabs.certificates', icon: Trophy },
  { id: 'tech', label: 'portfolio.tabs.tech', icon: Layers },
];

// FETCH DATA: Certificates dari Supabase
const fetchCertificates = async () => {
  try {
    const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    certificatesFromDB.value = data || [];
  } catch (error) {
    console.error('Error fetching certificates:', error.message);
  }
};

// FETCH DATA: Projects dari Supabase
const fetchProjects = async () => {
  try {
    isLoadingProjects.value = true;
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });

    if (error) throw error;
    projectsFromDB.value = data || [];
  } catch (error) {
    console.error('Error fetching projects:', error.message);
  } finally {
    isLoadingProjects.value = false;
  }
};

onMounted(() => {
  fetchCertificates();
  fetchProjects();
});

// LOGIK GERAKAN DATA: Projects Terintegrasi Supabase (Mendukung JSONB tags & timeline)
const projectsData = computed(() => {
  return projectsFromDB.value.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    progress: project.progress || 0,
    github: project.github_url || '#',
    // Memastikan data jsonb aman dibaca sebagai array di Vue template
    tags: Array.isArray(project.tags) ? project.tags : [],
    timeline: Array.isArray(project.timeline) ? project.timeline : []
  }));
});

// LOGIK GERAKAN DATA: Certificates Terintegrasi Supabase (Gaya Clean Minimalis Tanpa Gambar)
const certificatesData = computed(() => {
  return certificatesFromDB.value.map((cert) => {
    return {
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      link: cert.link || '#'
    };
  });
});

const techStack = [
  { name: 'Vue.js', level: 92, icon: 'vuedotjs/41B883', cat: 'Core Frontend' },
  { name: 'Tailwind CSS', level: 95, icon: 'tailwindcss/06B6D4', cat: 'Core Design' },
  { name: 'PHP', level: 88, icon: 'php/777BB4', cat: 'Core Backend' },
  { name: 'React', level: 85, icon: 'react/61DAFB', cat: 'Frontend' },
  { name: 'Next.js', level: 82, icon: 'nextdotjs/000000', cat: 'Framework' },
  { name: 'Flutter', level: 78, icon: 'flutter/02569B', cat: 'Mobile' },
  { name: 'Python', level: 88, icon: 'python/3776AB', cat: 'AI/Data' },
  { name: 'Go', level: 75, icon: 'go/00ADD8', cat: 'Backend' },
  { name: 'Laravel', level: 90, icon: 'laravel/FF2D20', cat: 'Framework' },
  { name: 'Vercel', level: 90, icon: 'vercel/000000', cat: 'Deployment' },
];

const setTab = (id) => {
  activeTab.value = id;
};
</script>

<template>
  <section id="portfolio" class="py-24 relative overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-700">
    <div class="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center"></div>
    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

      <div v-motion :initial="{ opacity: 0, y: 30 }" :visible-once="{ opacity: 1, y: 0 }" class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
          {{ t('portfolio.title_part1') }} <span class="text-gradient font-black">{{ t('portfolio.title_part2') }}</span>
        </h2>

        <div class="inline-flex p-1.5 bg-slate-100 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-white/10 mt-4">
          <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="setTab(tab.id)"
              class="flex items-center gap-2 px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all duration-500 relative cursor-pointer"
              :class="activeTab === tab.id ? 'text-white' : 'text-slate-500 dark:text-slate-400 hover:text-blue-600'"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            <span class="hidden sm:block ml-2">{{ t(tab.label) }}</span>
            <div v-if="activeTab === tab.id" v-motion-layout class="absolute inset-0 bg-blue-600 rounded-[1.5rem] -z-10 shadow-lg shadow-blue-500/40"></div>
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'projects'" class="space-y-6">
        <div v-if="isLoadingProjects" class="py-20 text-center">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing Projects Grid...</p>
        </div>

        <div v-else-if="projectsData.length === 0" class="py-20 text-center text-slate-400 text-xs font-medium uppercase tracking-wider">
          Belum ada project terpublikasi di database.
        </div>

        <div v-else class="grid md:grid-cols-2 gap-8">
          <div
              v-for="(project, index) in projectsData"
              :key="project.id"
              v-motion
              :initial="{ opacity: 0, scale: 0.95 }"
              :enter="{ opacity: 1, scale: 1, transition: { delay: index * 100 } }"
              class="group bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col justify-between"
          >
            <div class="p-8 pb-4">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{{ project.title }}</h3>
                <div class="text-right shrink-0">
                  <span class="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-1">{{ t('portfolio.progress') }}</span>
                  <p class="text-xl font-black text-slate-900 dark:text-white">{{ project.progress }}%</p>
                </div>
              </div>

              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">{{ project.description }}</p>

              <div class="flex flex-wrap gap-1.5 mb-6">
                <span v-for="tag in project.tags" :key="tag" class="px-2.5 py-1 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/5 rounded-lg text-[9px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">{{ tag }}</span>
              </div>

              <div v-if="project.timeline.length > 0" class="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5">
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clock3 class="w-3 h-3" /> {{ t('portfolio.recent_activity') }}
                </p>
                <div class="space-y-4">
                  <div v-for="(log, lIdx) in project.timeline.slice(-2)" :key="lIdx" class="flex gap-3 items-start group/log">
                    <GitCommitVertical class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p class="text-[10px] font-black text-slate-900 dark:text-white uppercase leading-none mb-1">{{ log.month }}</p>
                      <p class="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{{ log.summary }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-8 pb-8 pt-4 border-t border-slate-200 dark:border-white/5 flex gap-4 items-center">
              <a v-if="project.github && project.github !== '#'" :href="project.github" target="_blank" class="flex items-center gap-2 text-xs font-black uppercase text-slate-500 hover:text-blue-600 transition-colors group/link">
                <Github class="w-4 h-4 transition-transform group-hover/link:rotate-12" /> Github
              </a>
              <a href="#" class="flex items-center gap-2 text-xs font-black uppercase text-slate-500 hover:text-blue-600 transition-colors group/link ml-auto">
                {{ t('portfolio.details') }} <ChevronRight class="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'certificates'" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <div v-if="certificatesFromDB.length === 0" class="col-span-full py-20 text-center">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Fetching Credentials...</p>
        </div>

        <div
            v-else
            v-for="(cert, cIdx) in certificatesData"
            :key="cIdx"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: cIdx * 100 } }"
            class="group bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl h-full flex flex-col"
        >
          <div class="relative h-24 bg-gradient-to-br from-blue-600/10 to-purple-600/10 flex items-center justify-center border-b border-slate-200 dark:border-white/5 shrink-0">
            <div class="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Trophy class="w-8 h-8 text-blue-600" />
            </div>
            <div class="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div class="block">
              <div class="flex items-start gap-2 mb-3">
                <ShieldCheck class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <h3 class="text-sm font-black text-slate-900 dark:text-white uppercase leading-tight line-clamp-2">{{ cert.title }}</h3>
              </div>

              <div class="flex flex-col gap-1 mb-6">
                <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest italic">{{ cert.issuer }}</p>
                <div class="flex items-center gap-1.5 text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase">
                  <Clock3 class="w-3 h-3" />
                  <span>{{ cert.date }}</span>
                </div>
              </div>
            </div>

            <div class="block mt-auto">
              <a :href="cert.link" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 group/btn">
                {{ t('portfolio.verify') }} <ExternalLink class="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'tech'" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
            v-for="tech in techStack"
            :key="tech.name"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 50 } }"
            class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
            :class="{ 'border-blue-500/50 ring-1 ring-blue-500/20': tech.cat.includes('Core') }"
        >
          <img :src="`https://cdn.simpleicons.org/${tech.icon}`" class="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" :alt="tech.name" />
          <h4 class="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tighter">{{ tech.name }}</h4>
          <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]" :class="{ 'text-blue-600': tech.cat.includes('Core') }">{{ tech.cat }}</span>
          <div class="mt-4 w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div class="h-full bg-blue-600 transition-all duration-1000" :style="{ width: tech.level + '%' }"></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>