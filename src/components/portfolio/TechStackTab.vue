<script setup>
import { computed } from 'vue';
import { Github, BadgeCheck } from 'lucide-vue-next';

const props = defineProps({
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

const barColor = (icon) => {
  const m = icon?.match(/([0-9A-Fa-f]{6})$/);
  return m ? `#${m[1]}` : '#2563EB';
};

const maxLevel = computed(() =>
    props.techStack.length ? Math.max(...props.techStack.map(t => t.level)) : 0
);
</script>

<template>
  <div>
    <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <div v-for="n in 10" :key="n" class="animate-pulse rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5">
        <div class="h-8 w-8 mx-auto rounded-lg bg-slate-200 dark:bg-white/10 mb-3"></div>
        <div class="h-3.5 w-2/3 mx-auto rounded bg-slate-200 dark:bg-white/10 mb-2"></div>
        <div class="h-2.5 w-1/2 mx-auto rounded bg-slate-200 dark:bg-white/10 mb-4"></div>
        <div class="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10"></div>
      </div>
    </div>

    <template v-else>
      <div v-if="githubProfile" class="flex items-center justify-center gap-2 mb-10 text-sm text-slate-500 dark:text-slate-400">
        <BadgeCheck class="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>Data bahasa dihitung langsung dari repositori publik</span>
        <a
            :href="githubProfile.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Github class="w-4 h-4" />
          @{{ githubProfile.login }}
        </a>
      </div>

      <div v-if="techStack.length === 0" class="py-20 text-center">
        <Github class="w-8 h-8 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Tidak ada data bahasa yang ditemukan.</p>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
            v-for="(tech, idx) in techStack"
            :key="tech.name"
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: idx * 40, ease: [0.22, 1, 0.36, 1] } }"
            class="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-white/20"
            :class="{ 'ring-1 ring-blue-500/30 border-blue-500/40': tech.level === maxLevel && maxLevel > 0 }"
        >
          <span class="absolute top-3.5 right-3.5 text-xs font-bold text-slate-400 dark:text-slate-500 tabular-nums">
            {{ tech.level }}%
          </span>

          <img
              :src="`https://cdn.simpleicons.org/${tech.icon}`"
              class="w-8 h-8 mb-4 transition-transform duration-300 group-hover:scale-110"
              :alt="tech.name"
              loading="lazy"
          >

          <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{{ tech.name }}</h4>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mb-4">{{ tech.cat }}</p>

          <div class="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
            <div
                class="h-full rounded-full transition-all duration-1000 ease-out"
                :style="{ width: tech.level + '%', backgroundColor: barColor(tech.icon) }"
            ></div>
          </div>
        </div>
      </div>

      <p class="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
        Persentase dihitung dari jumlah byte kode per bahasa di seluruh repositori publik.
      </p>
    </template>
  </div>
</template>