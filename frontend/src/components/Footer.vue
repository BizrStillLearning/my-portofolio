<script setup>
import { Github, Linkedin, Mail, Twitter, Heart, MapPin, Globe, ExternalLink } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const socialLinks = [
  { icon: Github, href: 'https://github.com/zidqy', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:abidzardzakwan36@gmail.com', label: 'Email' },
];

const quickLinks = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' }
];

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-white/5 py-16 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div class="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <Globe class="w-5 h-5 text-white" />
            </div>
            <span class="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                kaizer<span class="text-blue-600">dev</span>
             </span>
          </div>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
            {{ t('about.desc_1') }}
          </p>
          <div class="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 w-fit px-3 py-1.5 rounded-full border border-green-500/20">
             <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
            AVAILABLE FOR PROJECTS
          </div>
        </div>

        <div>
          <h4 class="text-sm font-black uppercase tracking-[0.2em] mb-8 text-slate-900 dark:text-white">Navigasi</h4>
          <ul class="space-y-4">
            <li v-for="item in quickLinks" :key="item.key">
              <a
                  :href="item.href"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-bold transition-all flex items-center gap-2 group"
              >
                <span class="w-0 group-hover:w-4 h-[2px] bg-blue-600 transition-all duration-300"></span>
                {{ t(`nav.${item.key}`) }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-black uppercase tracking-[0.2em] mb-8 text-slate-900 dark:text-white">Hubungi Saya</h4>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-blue-600 shrink-0" />
              <span class="text-slate-500 dark:text-slate-400 text-sm font-medium italic">Surabaya, East Java, Indonesia</span>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-blue-600 shrink-0" />
              <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">abidzardzakwan36@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-black uppercase tracking-[0.2em] mb-8 text-slate-900 dark:text-white">Ikuti Saya</h4>
          <div class="grid grid-cols-2 gap-3">
            <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                class="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-400 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-sm"
            >
              <component :is="social.icon" class="w-4 h-4" />
              <span class="text-xs font-bold">{{ social.label }}</span>
            </a>
          </div>
        </div>

      </div>

      <div class="pt-10 border-t border-slate-200 dark:border-white/5">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-widest">
            © {{ currentYear }} KAIZER<span class="text-blue-600">DEV</span>. ALL RIGHTS RESERVED.
          </div>

          <div class="flex items-center gap-6">
            <a href="#" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>

          <p class="text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center gap-2">
            MADE WITH
            <Heart class="w-4 h-4 text-red-500 fill-current animate-pulse" />
            IN INDONESIA
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
header, footer {
  transition-property: all;
}
</style>