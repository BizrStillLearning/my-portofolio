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
    { icon: Github, link: 'https://www.linkedin.com/in/abidzar-dzakwan-sahudi-011593388/' },
    { icon: Linkedin, link: 'https://linkedin.com' },
    { icon: Mail, link: 'mailto:abidzardzakwan36@gmail.com' },
    { icon: Instagram, link: 'https://www.instagram.com/bizrrr_ae/' }
  ]
};
</script>

<template>
  <section
      id="home"
      class="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-32 px-6 pb-20 transition-colors duration-700 bg-[#F8FAFC] dark:bg-[#020617]"
  >
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10"></div>
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-10 animate-pulse"></div>
      <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-10 animate-pulse delay-2000"></div>
    </div>

    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="flex flex-col items-center md:flex-row md:items-center gap-12 md:gap-16">

        <div
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 1000, type: 'spring' } }"
            class="w-full md:w-2/5 flex justify-center order-1 md:order-2"
        >
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-400 rounded-full animate-spin-slow opacity-20 blur-3xl"></div>
            <div class="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10 p-2 rounded-full border-2 border-dashed border-blue-500/30">
              <div class="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative bg-slate-100 dark:bg-slate-900">
                <img
                    src="../assets/img/profile.png"
                    alt="Abidzar Profile"
                    class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                >
              </div>
            </div>
            <div class="absolute -top-2 -right-2 bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-full shadow-xl z-20 animate-bounce-slow border border-slate-100 dark:border-white/10">
              <Code2 class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500" />
            </div>
            <div class="absolute -bottom-2 -left-2 bg-blue-600 p-4 sm:p-5 rounded-full shadow-xl z-20 animate-bounce-slow-reverse shadow-blue-500/40">
              <Rocket class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>

        <div class="w-full md:w-3/5 text-center md:text-left order-2 md:order-1">
          <h1
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER * 1 } }"
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
          >
            {{ t('hero.hello') }} <span class="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">{{ profileData.name }}</span> <br>
            <span class="text-2xl sm:text-3xl md:text-4xl font-mono text-blue-600 dark:text-blue-400">
              {{ displayText }}<span class="animate-pulse">|</span>
            </span>
          </h1>

          <p
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER * 2 } }"
              class="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed"
          >
            {{ t('hero.desc') }}
          </p>

          <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: DURATION, delay: STAGGER * 3 } }"
              class="flex flex-col gap-8 items-center md:items-start"
          >
            <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4 w-full sm:w-auto">
              <a href="#projects" class="group bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center">
                {{ t('hero.projects_btn') }} <ChevronRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/cv.pdf" class="border-2 border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                {{ t('hero.cv_btn') }} <Download class="w-4 h-4 ml-2" />
              </a>
            </div>

            <div class="flex justify-center md:justify-start gap-4">
              <a
                  v-for="social in profileData.socials"
                  :key="social.link"
                  :href="social.link"
                  target="_blank"
                  class="group relative p-3 sm:p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div class="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <component :is="social.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors relative z-10" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
.animate-bounce-slow-reverse { animation: bounce-slow 4s infinite ease-in-out reverse; }
.animate-spin-slow { animation: spin 20s linear infinite; }

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

section {
  transition: background-color 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>