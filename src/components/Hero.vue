<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Swal from 'sweetalert2';
import { supabase } from '../supabase';
import { useThemeStore } from '../stores/themeStore';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ChevronRight,
  ArrowDown,
  FileText
} from 'lucide-vue-next';

const { t, tm, rt, locale } = useI18n();
const themeStore = useThemeStore();

const displayText = ref('');
const roleIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);

const roles = computed(() => {
  const rawRoles = tm('hero.roles');
  return Array.isArray(rawRoles) ? rawRoles.map((role) => rt(role)) : [];
});

let typeTimer = null;

const typeEffect = () => {
  if (roles.value.length === 0) return;
  const currentRole = roles.value[roleIndex.value];

  let delay;

  if (isDeleting.value) {
    displayText.value = currentRole.slice(0, charIndex.value - 1);
    charIndex.value--;
    delay = 35;
  } else {
    displayText.value = currentRole.slice(0, charIndex.value + 1);
    charIndex.value++;
    delay = 55 + Math.random() * 55;
  }

  if (!isDeleting.value && charIndex.value === currentRole.length) {
    isDeleting.value = true;
    delay = 2400;
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false;
    roleIndex.value = (roleIndex.value + 1) % roles.value.length;
    delay = 420;
  }

  typeTimer = setTimeout(typeEffect, delay);
};

watch(locale, () => {
  displayText.value = '';
  charIndex.value = 0;
  roleIndex.value = 0;
  isDeleting.value = false;
});

const cvUrl = ref(null);
const isCvLoading = ref(true);

const fetchCV = async () => {
  try {
    isCvLoading.value = true;

    const { data, error } = await supabase.storage.from('documents').list('', {
      search: 'cv-abidzar.pdf'
    });

    if (data && data.length > 0) {
      const { data: publicUrlData } = supabase.storage.from('documents').getPublicUrl('cv-abidzar.pdf');
      cvUrl.value = `${publicUrlData.publicUrl}?t=${Date.now()}`;
    } else {
      cvUrl.value = null;
    }
  } catch (error) {
    console.error('Gagal mengecek status CV:', error.message);
  } finally {
    isCvLoading.value = false;
  }
};

const handleDownloadCV = () => {
  if (cvUrl.value) {
    window.open(cvUrl.value, '_blank');
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Sedang Diperbarui',
      text: 'Dokumen CV saat ini sedang dalam tahap pembaruan. Silakan periksa kembali beberapa saat lagi!',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#2563EB',
      background: themeStore.isDark ? '#020617' : '#ffffff',
      color: themeStore.isDark ? '#f8fafc' : '#0f172a',
      customClass: { popup: 'rounded-2xl' }
    });
  }
};

const scrollToPortfolio = () => {
  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
};

const sectionRef = ref(null);
const glowX = ref(50);
const glowY = ref(40);

const handleMouseMove = (e) => {
  const rect = sectionRef.value?.getBoundingClientRect();
  if (!rect) return;
  glowX.value = ((e.clientX - rect.left) / rect.width) * 100;
  glowY.value = ((e.clientY - rect.top) / rect.height) * 100;
};

const tiltRef = ref(null);
const tiltX = ref(0);
const tiltY = ref(0);

const handleTilt = (e) => {
  const rect = tiltRef.value?.getBoundingClientRect();
  if (!rect) return;
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  tiltX.value = py * -6;
  tiltY.value = px * 8;
};

const resetTilt = () => {
  tiltX.value = 0;
  tiltY.value = 0;
};

onMounted(() => {
  typeEffect();
  fetchCV();
});

onUnmounted(() => clearTimeout(typeTimer));

const profileData = {
  name: 'Abidzar Dzakwan Sahudi',
  socials: [
    { icon: Github, link: 'https://github.com/BizrStillLearning', label: 'GitHub' },
    { icon: Linkedin, link: 'https://www.linkedin.com/in/abidzar-dzakwan-sahudi-011593388/', label: 'LinkedIn' },
    { icon: Mail, link: 'mailto:abidzardzakwan36@gmail.com', label: 'Email' },
    { icon: Instagram, link: 'https://www.instagram.com/bizrrr_ae/', label: 'Instagram' }
  ]
};
</script>

<template>
  <section
      ref="sectionRef"
      id="home"
      @mousemove="handleMouseMove"
      class="relative min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-[#020617] pt-28 pb-24"
  >
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">

      <div class="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center opacity-[0.15] dark:opacity-[0.07] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"></div>

      <svg
          class="absolute inset-0 w-full h-full opacity-[0.55] dark:opacity-[0.4] text-slate-400 dark:text-slate-600"
          style="mask-image: radial-gradient(ellipse 75% 65% at 50% 45%, black, transparent)"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 800"
      >
      <g fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.5">
        <path d="M-60 220 C 120 120, 260 320, 180 460 C 120 560, -40 520, -80 420"/>
        <path d="M-60 260 C 100 170, 220 340, 160 450 C 110 530, -20 500, -60 420"/>
        <path d="M-60 300 C 90 220, 190 360, 145 440 C 105 505, 0 480, -45 415"/>
        <path d="M-60 340 C 80 270, 165 380, 130 430 C 95 478, 15 462, -30 410"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.45">
        <path d="M1260 560 C 1080 480, 960 640, 1030 760 C 1085 850, 1240 810, 1280 720"/>
        <path d="M1260 600 C 1100 530, 1000 660, 1060 755 C 1105 825, 1230 790, 1265 715"/>
        <path d="M1260 640 C 1120 580, 1040 680, 1090 750 C 1125 802, 1220 772, 1250 710"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="1" opacity="0.5">
        <circle cx="1050" cy="140" r="14"/>
        <circle cx="1050" cy="140" r="26"/>
        <circle cx="1050" cy="140" r="38" opacity="0.6"/>
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="300" cy="640" r="2.5"/>
        <circle cx="340" cy="670" r="1.8"/>
        <circle cx="270" cy="680" r="1.5"/>
        <circle cx="880" cy="120" r="2.2"/>
        <circle cx="920" cy="150" r="1.6"/>
        <circle cx="620" cy="90" r="2"/>
        <circle cx="150" cy="580" r="2.2"/>
        <circle cx="1120" cy="420" r="2.4"/>
        <circle cx="1160" cy="460" r="1.6"/>
      </g>
      <g stroke="currentColor" stroke-width="1.4" opacity="0.5" stroke-linecap="round">
        <path d="M420 160 v18 M411 169 h18"/>
        <path d="M760 700 v16 M752 708 h16"/>
        <path d="M180 380 v14 M173 387 h14"/>
        <path d="M1000 620 v18 M991 629 h18"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="1" opacity="0.35">
        <path d="M480 760 A 90 90 0 0 1 570 700"/>
        <path d="M700 60 A 70 70 0 0 1 760 130"/>
      </g>
      </svg>

      <div class="absolute inset-0 opacity-30 dark:opacity-25">
        <svg
            class="absolute w-[140%] h-[140%] -top-[20%] -left-[20%] animate-[drift_26s_ease-in-out_infinite_alternate] text-blue-500 dark:text-blue-400"
            fill="none"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="currentColor" stroke-width="1" opacity="0.35">
            <path d="M100 700 C 300 500, 500 750, 700 550 C 850 400, 1000 600, 1150 450"/>
            <path d="M50 650 C 280 470, 520 700, 720 520 C 860 390, 1020 560, 1180 420"/>
            <path d="M150 750 C 330 540, 520 780, 720 580 C 870 430, 1030 630, 1200 480"/>
          </g>
          <g fill="currentColor" opacity="0.3">
            <circle cx="240" cy="590" r="3"/>
            <circle cx="540" cy="660" r="2.2"/>
            <circle cx="840" cy="500" r="2.6"/>
            <circle cx="1080" cy="560" r="2"/>
          </g>
        </svg>
      </div>

      <div
          class="absolute inset-0 transition-[background] duration-300 ease-out"
          :style="{ background: `radial-gradient(560px circle at ${glowX}% ${glowY}%, rgba(37,99,235,0.10), transparent 65%)` }"
      ></div>

      <div class="absolute inset-0 opacity-[0.35] dark:opacity-[0.5] mix-blend-overlay" style="background-image:url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E&quot;)"></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-6xl px-6">
      <div class="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20">
        <div class="w-full lg:w-3/5 lg:text-left text-center">
          <h1
              v-motion
              :initial="{ opacity: 0, y: 24 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200, ease: [0.22, 1, 0.36, 1] } }"
              class="text-4xl sm:text-5xl md:text-[3.6rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-5"
          >
            {{ t('hero.hello') }}
            <span class="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400">
              {{ profileData.name }}
            </span>
          </h1>

          <div
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { duration: 600, delay: 350 } }"
              class="h-9 sm:h-11 mb-7 flex lg:justify-start justify-center"
          >
            <span class="text-xl sm:text-2xl md:text-[1.7rem] font-mono font-semibold text-slate-700 dark:text-slate-300">
              {{ displayText }}<span class="inline-block w-[2px] h-[1.1em] align-[-0.15em] bg-blue-600 dark:bg-blue-400 animate-[blink_1.05s_step-end_infinite]"></span>
            </span>
          </div>

          <p
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 450 } }"
              class="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
          >
            {{ t('hero.desc') }}
          </p>

          <div
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 550 } }"
              class="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-12"
          >
            <button
                @click="scrollToPortfolio"
                class="group relative w-full sm:w-auto px-7 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold text-sm tracking-wide transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              {{ t('hero.projects_btn') }}
              <ChevronRight class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span class="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 dark:ring-black/10"></span>
            </button>
            <button
                @click="handleDownloadCV"
                :disabled="isCvLoading"
                class="group w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide border transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer
           border-slate-300 dark:border-white/15 text-slate-900 dark:text-white hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5
           disabled:opacity-50 disabled:cursor-wait disabled:hover:translate-y-0"
            >
              <FileText :class="['w-4 h-4', { 'animate-pulse': isCvLoading }]" />

              <span>{{ t('hero.cv_btn') }}</span>

              <span v-if="!isCvLoading && cvUrl" class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </button>
          </div>

          <div
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { duration: 600, delay: 700 } }"
              class="flex justify-center lg:justify-start items-center gap-3"
          >
            <a
                v-for="social in profileData.socials"
                :key="social.label"
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
                class="group flex items-center p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-all duration-300 ease-out hover:-translate-y-0.5"
            >
              <component :is="social.icon" class="w-4 h-4 shrink-0" />

              <span class="text-xs font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2.5">
      {{ social.label }}
    </span>
            </a>
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, scale: 0.96 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 300, ease: [0.22, 1, 0.36, 1] } }"
            class="w-full lg:w-2/5 flex justify-center"
        >
          <div
              ref="tiltRef"
              @mousemove="handleTilt"
              @mouseleave="resetTilt"
              class="relative select-none"
              style="perspective: 900px"
          >
            <div class="absolute -inset-[3px] rounded-[1.75rem] opacity-70 dark:opacity-50 animate-[spin_9s_linear_infinite]" style="background: conic-gradient(from 0deg, transparent 0%, rgba(59,130,246,0.6) 12%, transparent 26%, transparent 55%, rgba(99,102,241,0.5) 68%, transparent 82%)"></div>
            <div class="absolute -inset-[3px] rounded-[1.75rem] bg-slate-50 dark:bg-[#020617]"></div>

            <div
                class="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px] rounded-[1.6rem] overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-[0_25px_60px_-15px_rgba(2,6,23,0.35)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out"
                :style="{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }"
            >
              <img
                  src="../assets/img/Profile.png"
                  alt="Foto profil Abidzar Dzakwan Sahudi"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out"
                  :style="{ transform: `scale(1.02) translate(${tiltY * 1.5}px, ${tiltX * -1.5}px)` }"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
        @click="scrollToPortfolio"
        aria-label="Scroll ke portfolio"
        class="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 1200 } }"
    >
      <span class="text-[10px] font-medium uppercase tracking-[0.2em]">{{ t('hero.scroll', 'Scroll') }}</span>
      <ArrowDown class="w-4 h-4 animate-bounce" />
    </button>
  </section>
</template>

<style scoped>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes drift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-1.5%, 1%) scale(1.02); }
  100% { transform: translate(1%, -1.5%) scale(1); }
}
</style>
