<script setup>
import { Star, Clock3, GitCommitVertical, Github, ChevronRight } from 'lucide-vue-next';

defineProps({
  projectsData: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div class="space-y-6">
    <div v-if="isLoading" class="py-20 text-center">
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing Repositories from GitHub...</p>
    </div>

    <div v-else-if="projectsData.length === 0" class="py-20 text-center text-slate-400 text-xs font-medium uppercase tracking-wider">
      Belum ada repositori publik di GitHub.
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
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight capitalize">{{ project.title }}</h3>
            <div class="text-right shrink-0">
              <span class="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-1">Stars</span>
              <p class="text-xl font-black text-slate-900 dark:text-white flex items-center justify-end gap-1">
                <Star class="w-4 h-4 fill-current text-yellow-400" />
                {{ project.stars }}
              </p>
            </div>
          </div>

          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium line-clamp-2">{{ project.description }}</p>

          <div v-if="project.tags.length > 0" class="flex flex-wrap gap-1.5 mb-6">
            <span v-for="tag in project.tags" :key="tag" class="px-2.5 py-1 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/5 rounded-lg text-[9px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">{{ tag }}</span>
          </div>

          <div v-if="project.repoLangs && project.repoLangs.length > 0" class="mb-6">
            <div class="flex h-1.5 w-full rounded-full overflow-hidden mb-2 bg-slate-200 dark:bg-slate-800">
              <div v-for="lang in project.repoLangs" :key="lang.name" :class="lang.color" :style="{ width: lang.percent + '%' }"></div>
            </div>
            <div class="flex flex-wrap gap-x-3 gap-y-1">
              <div v-for="lang in project.repoLangs" :key="lang.name" class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-full" :class="lang.color"></span>
                <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400">{{ lang.name }} <span class="opacity-60">{{ lang.percent }}%</span></span>
              </div>
            </div>
          </div>

          <div v-if="project.timeline.length > 0" class="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock3 class="w-3 h-3" /> Timeline Repositori
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
          <a v-if="project.github && project.github !== '#'" :href="project.github" target="_blank" class="flex items-center gap-2 text-xs font-black uppercase text-slate-500 hover:text-blue-600 transition-colors group/link w-full justify-between">
            <span class="flex items-center gap-2">
              <Github class="w-4 h-4 transition-transform group-hover/link:rotate-12" /> Lihat Repositori
            </span>
            <ChevronRight class="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>