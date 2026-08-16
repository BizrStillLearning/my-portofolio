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

    if (sortOrder.value === 'newest') {
      return timeB - timeA;
    } else {
      return timeA - timeB;
    }
  });

  return result;
});

const isPdf = (url) => {
  if (!url) return false;
  return url.toLowerCase().split('?')[0].endsWith('.pdf');
};
</script>

<template>
  <div class="space-y-6">

    <div v-if="certificatesData.length > 0" class="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-200 dark:border-white/5">

      <div class="relative w-full sm:w-72">
        <Search class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari sertifikat..."
            class="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-700 dark:text-slate-300 transition-all"
        />
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <ArrowUpDown class="w-4 h-4 text-slate-400" />
        <select
            v-model="sortOrder"
            class="w-full sm:w-auto px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer appearance-none text-center"
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
        </select>
      </div>

    </div>

    <div v-if="certificatesData.length === 0" class="py-20 text-center">
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Fetching Credentials...</p>
    </div>

    <div v-else-if="filteredAndSortedCerts.length === 0" class="py-20 text-center">
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sertifikat tidak ditemukan.</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      <div
          v-for="(cert, cIdx) in filteredAndSortedCerts"
          :key="cIdx"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: cIdx * 50 } }"
          class="group bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl h-full flex flex-col"
      >
        <div class="relative h-44 overflow-hidden border-b border-slate-200 dark:border-white/5 shrink-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">

          <div v-if="isPdf(cert.image)" class="text-center group-hover:scale-110 transition-transform duration-700">
            <FileText class="w-12 h-12 text-blue-500/50 mx-auto mb-2" />
            <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">PDF Document</span>
          </div>

          <img
              v-else
              :src="cert.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              @error="(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Error+Loading'"
              alt="Certificate"
              loading="lazy"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            <a :href="cert.link || cert.image" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 group/btn">
              {{ t('portfolio.verify') }} <ExternalLink class="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>