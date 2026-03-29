<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Code2,
  Rocket,
  Download,
  ChevronRight
} from 'lucide-vue-next';

const { t, tm, rt, locale } = useI18n();

const DURATION = 800;
const STAGGER = 100;

const displayText = ref("");
const roleIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);
const typeSpeed = ref(150);

const roles = computed(() => {
  const rawRoles = tm('hero.roles');
  return Array.isArray(rawRoles) ? rawRoles.map(role => rt(role)) : [];
});

const typeEffect = () => {
  if (roles.value.length === 0) return;
  const currentRole = roles.value[roleIndex.value];

  if (isDeleting.value) {
    displayText.value = currentRole.substring(0, charIndex.value - 1);
    charIndex.value--;
    typeSpeed.value = 50;
  } else {
    displayText.value = currentRole.substring(0, charIndex.value + 1);
    charIndex.value++;
    typeSpeed.value = 150;
  }

  if (!isDeleting.value && charIndex.value === currentRole.length) {
    isDeleting.value = true;
    typeSpeed.value = 2000;
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false;
    roleIndex.value = (roleIndex.value + 1) % roles.value.length;
    typeSpeed.value = 500;
  }
  setTimeout(typeEffect, typeSpeed.value);
};

watch(locale, () => {
  displayText.value = "";
  charIndex.value = 0;
  roleIndex.value = 0;
  isDeleting.value = false;
});

onMounted(() => {
  typeEffect();
});

const profileData = {
  name: "Abidzar Dzakwan Sahudi",
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
      id="home"
      class="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 px-6 pb-20 transition-colors duration-700 bg-slate-50 dark:bg-[#020617]"
  >
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10"></div>
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-2000"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col items-center lg:flex-row gap-16 lg:gap-24">

        <div class="w-full lg:w-3/5 text-center lg:text-left order-2 lg:order-1">
          <div
              v-motion
              :initial="{ opacity: 0, x: -50 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: DURATION, delay: STAGGER } }"
          >
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1]">
              {{ t('hero.hello') }} <br>
              <span class="text-gradient font-black">{{ profileData.name }}</span>
            </h1>

            <div class="h-12 sm:h-16 mb-6">
              <span class="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {{ displayText }}<span class="animate-pulse">|</span>
              </span>
            </div>
          </div>

          <p
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER * 2 } }"
              class="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            {{ t('hero.desc') }}
          </p>

          <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER * 3 } }"
              class="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12"
          >
            <a
                href="#projects"
                class="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              {{ t('hero.projects_btn') }}
              <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
                href="/cv.pdf"
                class="w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:border-blue-500/50 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {{ t('hero.cv_btn') }}
              <Download class="w-4 h-4" />
            </a>
          </div>

          <div
              class="flex justify-center lg:justify-start gap-4"
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { delay: STAGGER * 4 } }"
          >
            <a
                v-for="social in profileData.socials"
                :key="social.label"
                :href="social.link"
                target="_blank"
                v-motion
                :hovered="{ y: -5, scale: 1.1 }"
                class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
            >
              <component :is="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, scale: 0.8, rotate: 5 }"
            :enter="{ opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', damping: 15, delay: 200 } }"
            class="w-full lg:w-2/5 flex justify-center order-1 lg:order-2"
        >
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-full animate-spin-slow opacity-20 blur-3xl"></div>

            <div class="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] p-4 rounded-[3rem] border-2 border-dashed border-blue-500/20 flex items-center justify-center">
              <div class="w-full h-full rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900 group">
                <img
                    src="../assets/img/profile.png"
                    alt="Abidzar Profile"
                    class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                >
              </div>

              <div
                  v-motion
                  :initial="{ x: 50, opacity: 0 }"
                  :enter="{ x: 0, opacity: 1, transition: { delay: 600 } }"
                  class="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/5 animate-bounce-slow"
              >
                <Code2 class="w-8 h-8 text-blue-600" />
              </div>
              <div
                  v-motion
                  :initial="{ x: -50, opacity: 0 }"
                  :enter="{ x: 0, opacity: 1, transition: { delay: 800 } }"
                  class="absolute -bottom-4 -left-4 bg-blue-600 p-5 rounded-3xl shadow-2xl animate-bounce-slow-reverse"
              >
                <Rocket class="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>