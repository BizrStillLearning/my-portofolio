<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { Menu, X, Code2, Globe, Sun, Moon, ChevronDown } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useThemeStore } from '../stores/themeStore';

const themeStore = useThemeStore();
const { locale, t } = useI18n();
const router = useRouter();
const route = useRoute();

const isOpen = ref(false);
const isLangOpen = ref(false);

const scrollY = ref(0);
const animatedY = ref(0);

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'jp', label: '日本語', flag: '🇯🇵' },
  { code: 'kr', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
];

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' }
];

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const animate = () => {
  const lerpFactor = 0.08;
  animatedY.value += (scrollY.value - animatedY.value) * lerpFactor;
  if (Math.abs(scrollY.value - animatedY.value) < 0.01) {
    animatedY.value = scrollY.value;
  }
  requestAnimationFrame(animate);
};

const isScrolled = computed(() => scrollY.value > 20);

const navTransform = computed(() => {
  const limit = Math.min(animatedY.value, 100);
  return {
    transform: `translateY(${limit * 0.05}px) scale(${1 - limit * 0.0002})`,
  };
});

const changeLang = (newLang) => {
  locale.value = newLang;
  localStorage.setItem('user_lang', newLang);
  router.push({ params: { lang: newLang }, hash: route.hash });
  isLangOpen.value = false;
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
  animate();
  themeStore.applyTheme();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
      class="fixed left-1/2 -translate-x-1/2 z-[100] w-full px-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
      :style="{ top: isScrolled ? '1.5rem' : '0rem' }"
  >
    <nav
        :style="navTransform"
        :class="[
        'mx-auto flex items-center justify-between border relative',
        'transition-[max-width,padding,background-color,border-color,border-radius,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]',
        isScrolled
          ? 'max-w-[1100px] bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] px-6 py-2 border-slate-200/50 dark:border-white/10 shadow-xl'
          : 'max-w-full bg-transparent px-8 py-6 border-transparent shadow-none backdrop-blur-0'
      ]"
    >
      <div class="flex items-center space-x-2 cursor-pointer group shrink-0" @click="scrollToSection($event, '#home')">
        <div class="bg-gradient-to-br from-blue-600 to-indigo-500 p-2 rounded-xl shadow-md group-hover:rotate-6 transition-transform">
          <Code2 class="w-5 h-5 text-white" />
        </div>
        <span class="font-bold text-lg tracking-tight text-slate-900 dark:text-white transition-colors duration-500">
          Kaizer<span class="text-blue-600 dark:text-blue-400">dev</span>
        </span>
      </div>

      <div class="hidden md:flex items-center bg-slate-100/50 dark:bg-white/10 border border-slate-200 dark:border-white/10 p-1 rounded-full backdrop-blur-sm">
        <a
            v-for="item in navItems"
            :key="item.key"
            :href="item.href"
            @click="scrollToSection($event, item.href)"
            class="px-5 py-1.5 text-sm font-semibold transition-all rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <div class="hidden lg:block relative lang-picker">
          <button
              @click="isLangOpen = !isLangOpen"
              class="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white text-[11px] font-bold rounded-full pl-4 pr-3 py-2 hover:bg-white dark:hover:bg-slate-700 active:scale-95 transition-all"
          >
            <Globe class="w-4 h-4 text-blue-500" />
            <span>{{ languages.find(l => l.code === locale)?.flag }}</span>
            <span class="uppercase">{{ locale }}</span>
            <ChevronDown class="w-3 h-3 transition-transform duration-300" :class="{ 'rotate-180': isLangOpen }" />
          </button>

          <transition name="dropdown">
            <div
                v-if="isLangOpen"
                class="absolute top-full right-0 mt-2 w-36 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden"
            >
              <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="changeLang(lang.code)"
                  class="w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold transition-colors hover:bg-blue-50 dark:hover:bg-white/5"
                  :class="locale === lang.code ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10' : 'text-slate-600 dark:text-slate-400'"
              >
                <div class="flex items-center gap-2">
                  <span>{{ lang.flag }}</span>
                  <span>{{ lang.label }}</span>
                </div>
              </button>
            </div>
          </transition>
        </div>

        <button
            @click="themeStore.toggleTheme()"
            class="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-blue-400 hover:bg-white dark:hover:bg-white/20 transition-all shadow-sm active:scale-90"
        >
          <transition name="fade-icon" mode="out-in">
            <Sun v-if="themeStore.isDark" :key="'sun'" class="w-5 h-5" />
            <Moon v-else :key="'moon'" class="w-5 h-5" />
          </transition>
        </button>

        <button @click="isOpen = !isOpen" class="md:hidden p-2 text-slate-600 dark:text-white rounded-full transition-colors">
          <component :is="isOpen ? X : Menu" class="w-6 h-6" />
        </button>
      </div>

      <transition name="mobile-menu">
        <div v-if="isOpen" class="absolute top-full left-0 right-0 mt-4 md:hidden bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-[150]">
          <div class="flex flex-col space-y-4">
            <a
                v-for="item in navItems"
                :key="item.key"
                :href="item.href"
                @click="scrollToSection($event, item.href)"
                class="px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-white/5 rounded-2xl transition"
            >
              {{ t(`nav.${item.key}`) }}
            </a>

            <div class="pt-4 border-t border-slate-200 dark:border-white/10">
              <p class="text-[10px] uppercase font-bold text-slate-400 mb-3 px-2 tracking-widest">Select Language</p>
              <div class="grid grid-cols-3 gap-2">
                <button
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="changeLang(lang.code)"
                    :class="locale === lang.code ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'"
                    class="py-2 rounded-xl text-[10px] font-bold uppercase transition active:scale-95"
                >
                  {{ lang.code }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.fade-icon-enter-active, .fade-icon-leave-active {
  transition: all 0.3s ease;
}
.fade-icon-enter-from { opacity: 0; transform: rotate(-90deg) scale(0); }
.fade-icon-leave-to { opacity: 0; transform: rotate(90deg) scale(0); }

.mobile-menu-enter-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.mobile-menu-leave-active {
  transition: all 0.3s ease-in;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

header, nav {
  will-change: transform, top, max-width;
  backface-visibility: hidden;
}
</style>