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
  <div>
    <div v-if="isLoading" class="grid md:grid-cols-2 gap-6">
      <div v-for="n in 4" :key="n" class="animate-pulse rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-7">
        <div class="flex justify-between mb-5">
          <div class="h-6 w-2/3 rounded-lg bg-slate-200 dark:bg-white/10"></div>
          <div class="h-6 w-10 rounded-lg bg-slate-200 dark:bg-white/10"></div>
        </div>
        <div class="space-y-2.5 mb-6">
          <div class="h-3.5 w-full rounded bg-slate-200 dark:bg-white/10"></div>
          <div class="h-3.5 w-4/5 rounded bg-slate-200 dark:bg-white/10"></div>
        </div>
        <div class="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10 mb-2"></div>
        <div class="flex gap-2 mb-6">
          <div class="h-5 w-14 rounded-md bg-slate-200 dark:bg-white/10"></div>
          <div class="h-5 w-16 rounded-md bg-slate-200 dark:bg-white/10"></div>
        </div>
        <div class="h-24 rounded-xl bg-slate-200 dark:bg-white/10"></div>
      </div>
    </div>

    <div v-else-if="projectsData.length === 0" class="py-20 text-center">
      <Github class="w-8 h-8 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
      <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Belum ada repositori publik di GitHub.</p>
    </div>

    <div v-else class="grid md:grid-cols-2 gap-6">
      <div
          v-for="(project, index) in projectsData"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 70, ease: [0.22, 1, 0.36, 1] } }"
          class="group flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.25)] dark:hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] hover:border-slate-300 dark:hover:border-white/20"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <h3 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white capitalize leading-snug">
            {{ project.title }}
          </h3>
          <span class="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
            <Star class="w-3.5 h-3.5 text-amber-400 fill-current" />
            {{ project.stars }}
          </span>
        </div>

        <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-5 line-clamp-2">
          {{ project.description }}
        </p>

        <div v-if="project.tags.length > 0" class="flex flex-wrap gap-1.5 mb-5">
          <span
              v-for="tag in project.tags.slice(0, 5)"
              :key="tag"
              class="rounded-md border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-500 dark:text-slate-400"
          >
            {{ tag }}
          </span>
          <span v-if="project.tags.length > 5" class="rounded-md px-2 py-1 text-[11px] font-medium text-slate-400">
            +{{ project.tags.length - 5 }}
          </span>
        </div>

        <div v-if="project.repoLangs && project.repoLangs.length > 0" class="mb-5">
          <div class="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
            <div
                v-for="lang in project.repoLangs"
                :key="lang.name"
                :class="lang.color"
                :style="{ width: lang.percent + '%' }"
                class="h-full first:rounded-l-full last:rounded-r-full transition-all duration-700"
            ></div>
          </div>
          <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <div v-for="lang in project.repoLangs" :key="lang.name" class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full" :class="lang.color"></span>
              <span class="text-[11px] font-medium text-slate-600 dark:text-slate-400">{{ lang.name }}</span>
              <span class="text-[11px] text-slate-400 tabular-nums">{{ lang.percent }}%</span>
            </div>
          </div>
        </div>

        <div v-if="project.timeline.length > 0" class="mb-6 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] px-4 py-3.5">
          <div class="flex items-center gap-1.5 mb-3">
            <Clock3 class="w-3.5 h-3.5 text-slate-400" />
            <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Timeline</span>
          </div>
          <div class="space-y-2.5">
            <div v-for="(log, lIdx) in project.timeline.slice(-2)" :key="lIdx" class="flex items-start gap-2.5">
              <GitCommitVertical class="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
              <div class="min-w-0">
                <p class="text-xs font-bold text-slate-900 dark:text-white leading-none mb-1">{{ log.month }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ log.summary }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
          <a
              v-if="project.github && project.github !== '#'"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="group/link inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Github class="w-4 h-4 transition-transform duration-200 group-hover/link:-rotate-12" />
            Lihat Repositori
            <ChevronRight class="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>