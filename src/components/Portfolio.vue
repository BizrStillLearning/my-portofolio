<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { supabase } from '../supabase';
import { Code2, Trophy, Layers, Star, GitFork, Users, BookOpen } from 'lucide-vue-next';

import ProjectsTab from './portfolio/ProjectsTab.vue';
import CertificatesTab from './portfolio/CertificatesTab.vue';
import TechStackTab from './portfolio/TechStackTab.vue';

const { t } = useI18n();
const activeTab = ref('projects');

const certificatesFromDB = ref([]);
const projectsFromDB = ref([]);
const techStack = ref([]);
const githubProfile = ref(null);
const isLoadingProjects = ref(false);
const isLoadingTech = ref(false);

const GITHUB_USERNAME = 'BizrStillLearning';

const tabs = [
  { id: 'projects', label: 'portfolio.tabs.projects', icon: Code2, count: computed(() => projectsFromDB.value.length) },
  { id: 'certificates', label: 'portfolio.tabs.certificates', icon: Trophy, count: computed(() => certificatesFromDB.value.length) },
  { id: 'tech', label: 'portfolio.tabs.tech', icon: Layers, count: computed(() => techStack.value.length) },
];

const techMap = {
  'Vue': { icon: 'vuedotjs/41B883', cat: 'Frontend Framework', color: 'bg-[#41B883]' },
  'JavaScript': { icon: 'javascript/F7DF1E', cat: 'Core Language', color: 'bg-[#F7DF1E]' },
  'TypeScript': { icon: 'typescript/3178C6', cat: 'Core Language', color: 'bg-[#3178C6]' },
  'PHP': { icon: 'php/777BB4', cat: 'Backend', color: 'bg-[#777BB4]' },
  'Python': { icon: 'python/3776AB', cat: 'AI/Data', color: 'bg-[#3776AB]' },
  'HTML': { icon: 'html5/E34F26', cat: 'Markup', color: 'bg-[#E34F26]' },
  'CSS': { icon: 'tailwindcss/06B6D4', cat: 'Tailwind CSS', color: 'bg-[#06B6D4]' },
  'Java': { icon: 'java/007396', cat: 'Backend', color: 'bg-[#007396]' },
  'Kotlin': { icon: 'kotlin/7F52FF', cat: 'Mobile', color: 'bg-[#7F52FF]' },
  'Dart': { icon: 'flutter/02569B', cat: 'Mobile Framework', color: 'bg-[#02569B]' },
  'C++': { icon: 'cplusplus/00599C', cat: 'System', color: 'bg-[#00599C]' },
  'C#': { icon: 'csharp/239120', cat: 'Backend', color: 'bg-[#239120]' },
  'Go': { icon: 'go/00ADD8', cat: 'Backend', color: 'bg-[#00ADD8]' },
  'Blade': { icon: 'laravel/FF2D20', cat: 'Template Engine', color: 'bg-[#FF2D20]' },
  'SCSS': { icon: 'sass/CC6699', cat: 'Styling', color: 'bg-[#CC6699]' }
};

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

const fetchGitHubData = async () => {
  try {
    isLoadingTech.value = true;
    isLoadingProjects.value = true;

    const headers = {};
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const profileRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
    if (profileRes.ok) {
      githubProfile.value = await profileRes.json();
    }

    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`, { headers });
    if (!reposRes.ok) throw new Error('Gagal mengambil repositori dari GitHub');
    const repos = await reposRes.json();

    const projectRepos = repos.filter(repo => !repo.fork).slice(0, 6);

    const projectPromises = projectRepos.map(async (repo) => {
      let repoLangs = [];
      if (repo.languages_url) {
        const langRes = await fetch(repo.languages_url, { headers });
        if (langRes.ok) {
          const langsData = await langRes.json();
          const totalBytes = Object.values(langsData).reduce((a, b) => a + b, 0);

          repoLangs = Object.entries(langsData).map(([lang, bytes]) => {
            let mappedName = lang;
            if (lang === 'CSS') mappedName = 'Tailwind';
            if (lang === 'Dart') mappedName = 'Flutter';

            return {
              name: mappedName,
              percent: Math.round((bytes / totalBytes) * 100),
              color: techMap[lang]?.color || 'bg-slate-500'
            };
          }).sort((a, b) => b.percent - a.percent).slice(0, 3);
        }
      }

      const createdDate = new Date(repo.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
      const updatedDate = new Date(repo.updated_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });

      return {
        id: repo.id,
        title: repo.name.replace(/[-_]/g, ' '),
        description: repo.description || 'Tidak ada deskripsi tersedia.',
        stars: repo.stargazers_count,
        github_url: repo.html_url,
        tags: repo.topics && repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : []),
        repoLangs: repoLangs,
        timeline: [
          { month: createdDate, summary: 'Repository Dibuat' },
          { month: updatedDate, summary: 'Update Terakhir' }
        ]
      };
    });

    projectsFromDB.value = await Promise.all(projectPromises);

    const languageTally = {};
    let totalBytesGlobal = 0;

    for (const repo of repos) {
      if (repo.languages_url) {
        const langRes = await fetch(repo.languages_url, { headers });
        if (langRes.ok) {
          const langs = await langRes.json();
          for (const [language, bytes] of Object.entries(langs)) {
            languageTally[language] = (languageTally[language] || 0) + bytes;
            totalBytesGlobal += bytes;
          }
        }
      }
    }

    techStack.value = Object.entries(languageTally)
        .map(([name, bytes]) => {
          const percentage = Math.round((bytes / totalBytesGlobal) * 100);
          const mapping = techMap[name] || { icon: 'github/000000', cat: 'Other' };

          let displayName = name;
          if (name === 'CSS') displayName = 'Tailwind';
          if (name === 'Dart') displayName = 'Flutter';

          return {
            name: displayName,
            level: percentage,
            icon: mapping.icon,
            cat: mapping.cat
          };
        })
        .filter(tech => tech.level > 0)
        .sort((a, b) => b.level - a.level)
        .slice(0, 10);

  } catch (error) {
    console.error('Error fetching data from GitHub:', error.message);
  } finally {
    isLoadingTech.value = false;
    isLoadingProjects.value = false;
  }
};

onMounted(() => {
  fetchCertificates();
  fetchGitHubData();
});

const projectsData = computed(() => {
  return projectsFromDB.value.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    stars: project.stars || 0,
    github: project.github_url || '#',
    tags: Array.isArray(project.tags) ? project.tags : [],
    repoLangs: project.repoLangs || [],
    timeline: Array.isArray(project.timeline) ? project.timeline : []
  }));
});

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/600x400?text=Certificate+Preview';
  if (imagePath.startsWith('http')) return imagePath;

  const { data } = supabase.storage.from('certificates').getPublicUrl(imagePath);
  return data.publicUrl;
};

const certificatesData = computed(() => {
  return certificatesFromDB.value.map((cert) => {
    return {
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      link: cert.link || '#',
      image: getImageUrl(cert.image)
    };
  });
});

const setTab = (id) => {
  activeTab.value = id;
};

const githubStats = computed(() => {
  if (!githubProfile.value) return [];
  const p = githubProfile.value;
  return [
    { icon: BookOpen, label: 'Repositories', value: p.public_repos },
    { icon: Users, label: 'Followers', value: p.followers },
    { icon: GitFork, label: 'Following', value: p.following },
    { icon: Star, label: 'Gists', value: p.public_gists }
  ].filter(s => typeof s.value === 'number');
});
</script>

<template>
  <section id="portfolio" class="relative py-28 overflow-hidden bg-slate-50 dark:bg-[#020617]">
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">

      <div class="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center opacity-[0.15] dark:opacity-[0.07] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"></div>

      <svg
          class="absolute inset-0 w-full h-full opacity-[0.5] dark:opacity-[0.35] text-slate-400 dark:text-slate-600"
          style="mask-image: radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 800"
          fill="none"
      >
        <g stroke="currentColor" stroke-width="1.2" opacity="0.5">
          <path d="M-60 140 C 140 60, 300 240, 220 380 C 160 480, -20 440, -70 350"/>
          <path d="M-60 180 C 120 110, 260 260, 195 370 C 145 450, 0 420, -55 350"/>
        </g>
        <g stroke="currentColor" stroke-width="1.2" opacity="0.4">
          <path d="M1260 240 C 1100 170, 990 320, 1050 430 C 1100 510, 1250 470, 1280 390"/>
          <path d="M1260 280 C 1120 220, 1030 340, 1080 425 C 1120 490, 1240 455, 1270 385"/>
        </g>
        <g stroke="currentColor" stroke-width="1" opacity="0.45">
          <circle cx="180" cy="620" r="12"/>
          <circle cx="180" cy="620" r="24"/>
          <circle cx="180" cy="620" r="36" opacity="0.6"/>
        </g>
        <g fill="currentColor" opacity="0.5">
          <circle cx="1020" cy="600" r="2.5"/>
          <circle cx="1060" cy="640" r="1.8"/>
          <circle cx="560" cy="120" r="2.2"/>
          <circle cx="600" cy="150" r="1.6"/>
          <circle cx="880" cy="700" r="2.4"/>
        </g>
        <g stroke="currentColor" stroke-width="1.4" opacity="0.45" stroke-linecap="round">
          <path d="M420 220 v16 M412 228 h16"/>
          <path d="M760 120 v14 M753 127 h14"/>
        </g>
        <g stroke="currentColor" stroke-width="1" opacity="0.3">
          <path d="M480 720 A 80 80 0 0 1 560 665"/>
        </g>
      </svg>

      <div class="absolute inset-0 opacity-[0.35] dark:opacity-[0.5] mix-blend-overlay" style="background-image:url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E&quot;)"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">

      <div v-motion :initial="{ opacity: 0, y: 24 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: [0.22, 1, 0.36, 1] } }" class="mb-14">
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-blue-600/60"></span>
          <span class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            {{ t('portfolio.eyebrow', 'Selected Work') }}
          </span>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-xl">
            {{ t('portfolio.title_part1') }}
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              {{ t('portfolio.title_part2') }}
            </span>
          </h2>

          <div v-if="githubStats.length" class="flex items-center gap-6 lg:gap-8">
            <div v-for="stat in githubStats" :key="stat.label" class="flex flex-col">
              <div class="flex items-center gap-1.5 text-slate-900 dark:text-white">
                <component :is="stat.icon" class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span class="text-xl font-bold tabular-nums">{{ stat.value }}</span>
              </div>
              <span class="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">{{ stat.label }}</span>
            </div>
            <a
                :href="`https://github.com/${GITHUB_USERNAME}`"
                target="_blank"
                rel="noopener noreferrer"
                class="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              @{{ GITHUB_USERNAME }}
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
          class="mb-12"
      >
        <div class="inline-flex w-full sm:w-auto p-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-none">
          <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="setTab(tab.id)"
              class="relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap"
              :class="activeTab === tab.id
              ? 'text-white dark:bg-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            <span>{{ t(tab.label) }}</span>
            <span
                v-if="tab.count.value > 0"
                class="text-[10px] font-bold px-1.5 py-0.5 rounded-md tabular-nums"
                :class="activeTab === tab.id
                ? 'bg-white/20 text-white'
                : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'"
            >
              {{ tab.count.value }}
            </span>
            <div
                v-if="activeTab === tab.id"
                v-motion-layout
                class="absolute inset-0 bg-slate-900 dark:bg-white rounded-xl -z-10 dark:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.25)]"
                :enter="{ transition: { type: 'spring', damping: 28, stiffness: 320 } }"
            ></div>
          </button>
        </div>
      </div>

      <Transition name="tab-fade" mode="out-in">
        <ProjectsTab
            v-if="activeTab === 'projects'"
            :projectsData="projectsData"
            :isLoading="isLoadingProjects"
        />

        <CertificatesTab
            v-else-if="activeTab === 'certificates'"
            :certificatesData="certificatesData"
        />

        <TechStackTab
            v-else-if="activeTab === 'tech'"
            :techStack="techStack"
            :githubProfile="githubProfile"
            :isLoading="isLoadingTech"
        />
      </Transition>

    </div>
  </section>
</template>

<style scoped>
.tab-fade-enter-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.tab-fade-leave-active {
  transition: opacity 0.2s ease;
}
.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.tab-fade-leave-to {
  opacity: 0;
}
</style>