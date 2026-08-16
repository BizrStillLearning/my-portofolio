<script setup>
import { Github, FolderGit2, Users } from 'lucide-vue-next';

defineProps({
  techStack: {
    type: Array,
    required: true
  },
  githubProfile: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div class="relative space-y-8">
    <div v-if="isLoading" class="py-20 text-center w-full">
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">
        Establishing GitHub Uplink...
      </p>
    </div>

    <div v-else class="space-y-8">
      <div v-if="githubProfile" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" class="flex flex-wrap gap-4 justify-center">
        <a :href="githubProfile.html_url" target="_blank" class="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/50 transition-colors group">
          <Github class="w-6 h-6 text-slate-900 dark:text-white group-hover:scale-110 transition-transform" />
          <div>
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Developer Profile</p>
            <p class="text-sm font-bold text-slate-900 dark:text-white">@{{ githubProfile.login }}</p>
          </div>
        </a>

        <div class="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5">
          <FolderGit2 class="w-6 h-6 text-blue-600" />
          <div>
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Public Repos</p>
            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ githubProfile.public_repos }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5">
          <Users class="w-6 h-6 text-purple-600" />
          <div>
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Followers</p>
            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ githubProfile.followers }}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Top Languages & Frameworks (Live from GitHub)</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          <div
              v-for="tech in techStack"
              :key="tech.name"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 50 } }"
              class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              :class="{ 'border-blue-500/50 ring-1 ring-blue-500/20': tech.level >= 30 }"
          >
            <div class="absolute top-4 right-4 text-[10px] font-black text-slate-300 dark:text-slate-600">
              {{ tech.level }}%
            </div>

            <img :src="`https://cdn.simpleicons.org/${tech.icon}`" class="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" :alt="tech.name" />
            <h4 class="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tighter">{{ tech.name }}</h4>
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]" :class="{ 'text-blue-600': tech.level >= 30 }">{{ tech.cat }}</span>

            <div class="mt-4 w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-blue-600 transition-all duration-1000" :style="{ width: tech.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoadingTech && techStack.length === 0" class="py-20 text-center">
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
        No tech data found.
      </p>
    </div>
  </div>
</template>