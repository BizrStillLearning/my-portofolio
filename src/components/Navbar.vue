<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useThemeStore } from '../stores/themeStore';
import {
  Menu,
  X,
  Code2,
  Sun,
  Moon,
  ChevronDown,
  UserCheck
} from 'lucide-vue-next';

const themeStore = useThemeStore();
const { locale, t } = useI18n();
const router = useRouter();
const route = useRoute();

const isOpen = ref(false);
const isLangOpen = ref(false);
const activeSection = ref('home');

const scrollY = ref(0);
const handleScroll = () => {
  scrollY.value = window.scrollY;

  if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
    activeSection.value = 'contact';
  }
};
const isScrolled = computed(() => scrollY.value > 20);

const languages = [
  { code: 'en', label: 'English', flagCode: 'us' },
  { code: 'id', label: 'Indonesia', flagCode: 'id' },
  { code: 'jp', label: '日本語', flagCode: 'jp' },
  { code: 'kr', label: '한국어', flagCode: 'kr' },
  { code: 'zh', label: '中文', flagCode: 'cn' },
  { code: 'es', label: 'Español', flagCode: 'es' },
  { code: 'ar', label: 'العربية', flagCode: 'sa' }
];

const currentFlagUrl = computed(() => {
  const current = languages.find(lang => lang.code === locale.value);
  const code = current ? current.flagCode : 'us';
  return `https://flagcdn.com/w40/${code}.png`;
});

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact', href: '#contact' },
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      if (!isAtBottom) {
        activeSection.value = entry.target.id;
      }
    }
  });
}, { threshold: 0.3 });

const changeLang = (newLang) => {
  locale.value = newLang;
  localStorage.setItem('user_lang', newLang);
  isLangOpen.value = false;
  isOpen.value = false;
};

const goToLogin = () => {
  router.push('/login');
  isOpen.value = false;
};

const scrollToSection = (e, href) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  themeStore.applyTheme();

  navItems.forEach(item => {
    const el = document.querySelector(item.href);
    if (el) observer.observe(el);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  observer.disconnect();
});
</script>

<template>
  <header
      class="fixed left-1/2 -translate-x-1/2 z-[100] w-full px-4 pointer-events-none transition-all duration-500"
      :style="{ top: isScrolled ? '1.5rem' : '0rem' }"
      v-motion
      :initial="{ y: -100, opacity: 0 }"
      :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } }"
  >
    <nav
        :class="[
        'mx-auto flex items-center justify-between border-none transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto',
        isScrolled
          ? 'w-[92%] max-w-[1100px] rounded-[2.5rem] px-6 py-2 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-xl bg-white/70 dark:bg-slate-900/80'
          : 'w-full max-w-full rounded-none px-6 md:px-10 py-6 shadow-none backdrop-blur-0 bg-transparent'
      ]"
    >
      <div
          class="flex items-center space-x-2 cursor-pointer group shrink-0"
          @click="scrollToSection($event, '#home')"
          v-motion
          :hovered="{ scale: 1.05 }"
      >
        <div class="bg-gradient-to-br from-blue-600 to-indigo-500 p-2 rounded-xl shadow-md group-hover:rotate-6 transition-transform">
          <Code2 class="w-5 h-5 text-white" />
        </div>
        <span class="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
          Kaizer<span class="text-blue-600 dark:text-blue-400">dev</span>
        </span>
      </div>

      <div class="hidden md:flex items-center bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 p-1 rounded-full backdrop-blur-sm">
        <a
            v-for="item in navItems"
            :key="item.key"
            :href="item.href"
            @click="scrollToSection($event, item.href)"
            class="px-5 py-1.5 text-sm font-bold transition-all rounded-full relative"
            :class="[
            activeSection === item.key
              ? 'text-blue-600 dark:text-white bg-white dark:bg-white/20 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'
          ]"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">

        <div class="hidden lg:block relative">
          <button
              @click="isLangOpen = !isLangOpen"
              v-motion
              :hovered="{ scale: 1.05 }"
              :active="{ scale: 0.95 }"
              class="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-white/10 text-slate-700 dark:text-white text-xs font-black rounded-full pl-3 pr-2.5 py-2 cursor-pointer transition-colors"
          >
            <img :src="currentFlagUrl" class="w-5 h-3.5 object-cover rounded-sm shadow-sm" alt="current flag" />
            <span class="uppercase tracking-wider font-bold">{{ locale }}</span>
            <ChevronDown class="w-3.5 h-3.5 transition-transform duration-300 text-slate-400" :class="{ 'rotate-180': isLangOpen }" />
          </button>

          <div
              v-if="isLangOpen"
              v-motion
              :initial="{ opacity: 0, y: -10, scale: 0.95 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              class="absolute top-full right-0 mt-3 w-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[110]"
          >
            <button
                v-for="lang in languages"
                :key="lang.code"
                @click="changeLang(lang.code)"
                class="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold transition-colors hover:bg-blue-50 dark:hover:bg-white/5 cursor-pointer"
                :class="locale === lang.code ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-white/10' : 'text-slate-600 dark:text-slate-400'"
            >
              <img :src="`https://flagcdn.com/w40/${lang.flagCode}.png`" class="w-5 h-3.5 object-cover rounded-sm shadow-sm shrink-0" alt="lang flag" />
              <span>{{ lang.label }}</span>
            </button>
          </div>
        </div>

        <button
            @click="themeStore.toggleTheme()"
            v-motion
            :hovered="{ scale: 1.1, rotate: 15 }"
            :active="{ scale: 0.9 }"
            class="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-blue-400 cursor-pointer"
        >
          <Sun v-if="themeStore.isDark" class="w-5 h-5" />
          <Moon v-else class="w-5 h-5" />
        </button>

        <button
            @click="goToLogin"
            v-motion
            :hovered="{ scale: 1.1 }"
            :active="{ scale: 0.9 }"
            class="hidden sm:flex p-2.5 rounded-full bg-blue-600 text-white border border-blue-500 shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all items-center justify-center cursor-pointer"
            title="Admin Access Control"
        >
          <UserCheck class="w-5 h-5" />
        </button>

        <button
            @click="isOpen = !isOpen"
            v-motion
            :active="{ scale: 0.9 }"
            class="md:hidden p-2 text-slate-600 dark:text-white rounded-full cursor-pointer"
        >
          <X v-if="isOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>

      <div
          v-if="isOpen"
          v-motion
          :initial="{ opacity: 0, y: -20, scale: 0.95 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          class="absolute top-full left-0 right-0 mt-4 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2rem] p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-[150]"
      >
        <div class="flex flex-col space-y-2">
          <a
              v-for="item in navItems"
              :key="item.key"
              :href="item.href"
              @click="scrollToSection($event, item.href)"
              :class="[
              'px-4 py-3 font-bold rounded-2xl transition-all',
              activeSection === item.key
                ? 'text-blue-600 bg-blue-50 dark:text-white dark:bg-white/10'
                : 'text-slate-700 dark:text-slate-400'
            ]"
          >
            {{ t(`nav.${item.key}`) }}
          </a>

          <button
              @click="goToLogin"
              class="flex items-center justify-center gap-3 px-4 py-4 mt-2 font-black uppercase tracking-widest text-[11px] bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 cursor-pointer"
          >
            <UserCheck class="w-4 h-4" />
            Admin Control Hub
          </button>

          <div class="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
            <p class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-4 px-2">
              Select Language
            </p>
            <div class="grid grid-cols-3 gap-2">
              <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="changeLang(lang.code)"
                  :class="[
                  'flex flex-col items-center gap-2 p-3 rounded-xl transition-all border cursor-pointer',
                  locale === lang.code
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                    : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-600 dark:text-slate-400'
                ]"
              >
                <img :src="`https://flagcdn.com/w40/${lang.flagCode}.png`" class="w-6 h-4 object-cover rounded-sm shadow-sm mb-1" alt="mobile flag" />
                <span class="text-[9px] font-black uppercase tracking-wider">{{ lang.code }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>