<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ShieldCheck, Clock3, ExternalLink, Search, ArrowUpDown, FileText } from 'lucide-vue-next';

const { t } = useI18n();

const props = defineProps({
  certificatesData: {
    type: Array,
    required: true
  }
});

const searchQuery = ref('');
const sortOrder = ref('newest');

const parseDateString = (dateStr) => {
  if (!dateStr) return 0;

  const lowerDate = dateStr.toLowerCase();

  const months = {
    'jan': 0, 'januari': 0, 'january': 0,
    'feb': 1, 'februari': 1, 'february': 1,
    'mar': 2, 'maret': 2, 'march': 2,
    'apr': 3, 'april': 3,
    'mei': 4, 'may': 4,
    'jun': 5, 'juni': 5, 'june': 5,
    'jul': 6, 'juli': 6, 'july': 6,
    'agu': 7, 'agustus': 7, 'august': 7,
    'sep': 8, 'september': 8,
    'okt': 9, 'oktober': 9, 'october': 9,
    'nov': 10, 'november': 10,
    'des': 11, 'desember': 11, 'december': 11
  };

  let day = 1;
  let month = 0;
  let year = 0;

  const yearMatch = lowerDate.match(/\d{4}/);
  if (yearMatch) year = parseInt(yearMatch[0], 10);

  const dayMatch = lowerDate.match(/\b(\d{1,2})\b/);
  if (dayMatch && parseInt(dayMatch[0], 10) <= 31) {
    day = parseInt(dayMatch[0], 10);
  }

  for (const [key, val] of Object.entries(months)) {
    if (lowerDate.includes(key)) {
      month = val;
      break;
    }
  }

  if (year > 0) {
    return new Date(year, month, day).getTime();
  }

  return new Date(dateStr).getTime() || 0;
};

const filteredAndSortedCerts = computed(() => {
  let result = [...props.certificatesData];

  if (searchQuery.value) {
    const keyword = searchQuery.value.toLowerCase();
    result = result.filter(cert =>
        cert.title.toLowerCase().includes(keyword) ||
        cert.issuer.toLowerCase().includes(keyword)
    );
  }

  result.sort((a, b) => {
    const timeA = parseDateString(a.date);
    const timeB = parseDateString(b.date);

    return sortOrder.value === 'newest' ? timeB - timeA : timeA - timeB;
  });

  return result;
});

const isPdf = (url) => {
  if (!url) return false;
  return url.toLowerCase().split('?')[0].endsWith('.pdf');
};
</script>

<template>
  <div class="space-y-8">

    <div v-if="certificatesData.length > 0" class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      <div class="relative w-full sm:w-72">
        <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari sertifikat atau issuer..."
            class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
        />
      </div>

      <div class="relative w-full sm:w-44">
        <ArrowUpDown class="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <select
            v-model="sortOrder"
            class="w-full appearance-none pl-10 pr-8 py-2.5 text-sm font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer transition-all"
        >
          <option value="newest">Terbaru dulu</option>
          <option value="oldest">Terlama dulu</option>
        </select>
        <svg class="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>

    <div v-if="certificatesData.length === 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 3" :key="n" class="animate-pulse rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
        <div class="h-40 bg-slate-200 dark:bg-white/10"></div>
        <div class="p-5 space-y-3">
          <div class="h-4 w-4/5 rounded bg-slate-200 dark:bg-white/10"></div>
          <div class="h-3 w-3/5 rounded bg-slate-200 dark:bg-white/10"></div>
          <div class="h-9 w-full rounded-xl bg-slate-200 dark:bg-white/10 mt-4"></div>
        </div>
      </div>
    </div>

    <div v-else-if="filteredAndSortedCerts.length === 0" class="py-16 text-center">
      <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
        Tidak ada sertifikat yang cocok dengan "<span class="text-slate-900 dark:text-white font-semibold">{{ searchQuery }}</span>".
      </p>
      <button
          @click="searchQuery = ''"
          class="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
      >
        Hapus pencarian
      </button>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      <div
          v-for="(cert, cIdx) in filteredAndSortedCerts"
          :key="cIdx"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: cIdx * 60, ease: [0.22, 1, 0.36, 1] } }"
          class="group flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.25)] dark:hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] hover:border-slate-300 dark:hover:border-white/20"
      >
        <div class="relative h-40 shrink-0 overflow-hidden border-b border-slate-100 dark:border-white/5 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <div v-if="isPdf(cert.image)" class="flex flex-col items-center gap-2 transition-transform duration-500 group-hover:scale-105">
            <FileText class="w-9 h-9 text-blue-500/60" />
            <span class="text-[11px] font-semibold text-slate-400">PDF Document</span>
          </div>
          <img
              v-else
              :src="cert.image"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              @error="(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Error+Loading'"
              alt="Certificate"
              loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div class="p-5 flex flex-1 flex-col">
          <div class="flex items-start gap-2 mb-2">
            <ShieldCheck class="w-4 h-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
            <h3 class="text-sm font-bold leading-snug text-slate-900 dark:text-white line-clamp-2">
              {{ cert.title }}
            </h3>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400 italic mb-1">{{ cert.issuer }}</p>
          <div class="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
            <Clock3 class="w-3 h-3" />
            <span>{{ cert.date }}</span>
          </div>

          <a
              :href="cert.link || cert.image"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2.5 text-xs font-semibold text-white dark:text-slate-900 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group/btn"
          >
            {{ t('portfolio.verify') }}
            <ExternalLink class="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>