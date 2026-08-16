<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { supabase } from '../supabase';
import { Code2, Trophy, Layers } from 'lucide-vue-next';

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
  { id: 'projects', label: 'portfolio.tabs.projects', icon: Code2 },
  { id: 'certificates', label: 'portfolio.tabs.certificates', icon: Trophy },
  { id: 'tech', label: 'portfolio.tabs.tech', icon: Layers },
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

      <ProjectsTab
          v-if="activeTab === 'projects'"
          :projectsData="projectsData"
          :isLoading="isLoadingProjects"
      />

      <CertificatesTab
          v-if="activeTab === 'certificates'"
          :certificatesData="certificatesData"
      />

      <TechStackTab
          v-if="activeTab === 'tech'"
          :techStack="techStack"
          :githubProfile="githubProfile"
          :isLoading="isLoadingTech"
      />

    </div>
  </section>
</template>