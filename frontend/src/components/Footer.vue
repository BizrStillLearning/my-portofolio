<script setup>
import { Github, Linkedin, Mail, Twitter, Heart, MapPin, Globe, ExternalLink, Instagram } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const socialLinks = [
  { icon: Github, href: 'https://github.com/BizrStillLearning/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/bizrrr_ae/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:abidzardzakwan36@gmail.com', label: 'Email' },
];

const quickLinks = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact', href: '#contact' }
];

const currentYear = new Date().getFullYear();

const scrollToSection = (e, href) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <footer
      class="bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-white/5 py-20 transition-colors duration-700 relative overflow-hidden"
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 25 } }"
  >
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-8 group cursor-pointer" @click="scrollToSection($event, '#home')">
            <div class="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-500">
              <Globe class="w-5 h-5 text-white" />
            </div>
            <span class="font-black text-2xl tracking-tighter text-slate-900 dark:text-white uppercase">
                kaizer<span class="text-blue-600">dev</span>
             </span>
          </div>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">
            {{ t('about.desc_1') }}
          </p>
          <div class="flex items-center gap-3 text-[10px] font-black tracking-widest text-emerald-500 bg-emerald-500/10 w-fit px-4 py-2 rounded-2xl border border-emerald-500/20 uppercase">
             <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
            {{ t('nav.cta') }}
          </div>
        </div>

        <div>
          <h4 class="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-slate-400 dark:text-slate-500">{{ t('portfolio.tabs.tech') || 'NAVIGASI' }}</h4>
          <ul class="space-y-5">
            <li v-for="item in quickLinks" :key="item.key">
              <a
                  :href="item.href"
                  @click="scrollToSection($event, item.href)"
                  class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-black uppercase tracking-widest transition-all flex items-center gap-3 group"
              >
                <div class="w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                {{ t(`nav.${item.key}`) }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-slate-400 dark:text-slate-500">{{ t('contact.connect_title') }}</h4>
          <ul class="space-y-6">
            <li class="flex items-start gap-4 group">
              <div class="p-2 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:bg-blue-600/10 transition-colors">
                <MapPin class="w-4 h-4 text-blue-600 shrink-0" />
              </div>
              <span class="text-slate-600 dark:text-slate-400 text-sm font-bold leading-relaxed">Surabaya, East Java, Indonesia</span>
            </li>
            <li class="flex items-center gap-4 group">
              <div class="p-2 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:bg-blue-600/10 transition-colors">
                <Mail class="w-4 h-4 text-blue-600 shrink-0" />
              </div>
              <span class="text-slate-600 dark:text-slate-400 text-sm font-bold tracking-tight">abidzardzakwan36@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-slate-400 dark:text-slate-500 italic">IKUTI SAYA</h4>
          <div class="grid grid-cols-2 gap-3">
            <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                v-motion
                :hovered="{ scale: 1.05, y: -2 }"
                class="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[1.25rem] text-slate-600 dark:text-slate-400 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-sm"
            >
              <component :is="social.icon" class="w-4 h-4 shrink-0" />
              <span class="text-[10px] font-black uppercase tracking-widest">{{ social.label }}</span>
            </a>
          </div>
        </div>

      </div>

      <div class="pt-12 border-t border-slate-200 dark:border-white/5">
        <div class="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div class="text-slate-500 dark:text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">
            © {{ currentYear }} KAIZER<span class="text-blue-600">DEV</span>. ALL RIGHTS RESERVED.
          </div>
          <div class="flex items-center gap-8">
            <a href="#" class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>