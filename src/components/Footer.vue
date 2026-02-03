<script setup>
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-vue-next';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
];

const quickLinks = ['Beranda', 'Tentang', 'Keahlian', 'Proyek', 'Kontak'];
</script>

<template>
  <footer class="bg-slate-950 border-t border-purple-500/10 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-3 gap-8 mb-8">

        <div>
          <h3 class="text-xl font-bold text-gradient mb-4">Portfolio</h3>
          <p class="text-gray-400">
            Menciptakan pengalaman digital yang indah dan fungsional dengan passion dan dedikasi.
          </p>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="item in quickLinks" :key="item">
              <a
                  :href="`#${item.toLowerCase()}`"
                  class="text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4 text-white">Ikuti Saya</h4>
          <div class="flex gap-4">
            <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
                v-motion
                :initial="{ opacity: 0, scale: 0.8 }"
                :enter="{ opacity: 1, scale: 1 }"
                :hovered="{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 0.2)' }"
                class="p-3 bg-slate-800 rounded-lg text-gray-400 hover:text-purple-400 transition-all duration-300"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-purple-500/10">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">
            © 2026 Portfolio. All rights reserved.
          </p>
          <p class="text-gray-400 text-sm flex items-center gap-2">
            Dibuat dengan
            <Heart class="w-4 h-4 text-red-500 fill-current animate-pulse" />
            menggunakan Vue 3 & Tailwind CSS v4
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>