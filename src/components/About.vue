<script setup>
import { ref } from 'vue';
import { Code, Palette, Rocket, Users } from 'lucide-vue-next';

const features = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Menulis kode yang rapi, terstruktur dan mudah dimaintain',
  },
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Mendesain interface yang menarik dan user-friendly',
  },
  {
    icon: Rocket,
    title: 'Fast Performance',
    description: 'Optimasi performa untuk pengalaman pengguna terbaik',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Bekerja sama dalam tim dengan komunikasi yang baik',
  },
];

const sectionScroll = {
  initial: { opacity: 0, y: 50 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: { duration: 600 }
  }
};

</script>

<template>
  <section
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      id="about" class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div
          v-motion
          :initial="sectionScroll.initial"
          :visible-once="sectionScroll.visibleOnce"
          class="text-center mb-16"
      >
        <h2 class="text-4xl sm:text-5xl font-bold mb-4">
          Tentang <span class="text-gradient">Saya</span>
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center mb-16">

        <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{
            opacity: 1,
            x: 0,
            transition: { duration: 600, delay: 200 }
          }"
        >
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
                alt="Developer workspace"
                class="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible-once="{
            opacity: 1,
            x: 0,
            transition: { duration: 600, delay: 400 }
          }"
            class="space-y-6"
        >
          <h3 class="text-3xl font-bold text-purple-400">Passionate Developer & Designer</h3>
          <p class="text-gray-300 text-lg leading-relaxed">
            Saya adalah seorang developer yang passionate dalam menciptakan pengalaman digital yang luar biasa.
            Dengan fokus pada pengembangan aplikasi web yang tidak hanya fungsional tapi juga aesthetic.
          </p>
          <p class="text-gray-300 text-lg leading-relaxed">
            Saya percaya bahwa kombinasi antara desain yang indah dan kode yang efisien adalah kunci untuk
            menciptakan produk yang sukses.
          </p>

          <div class="flex flex-wrap gap-4">
            <span class="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400">
              5+ Tahun Pengalaman
            </span>
            <span class="px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-400">
              50+ Project Selesai
            </span>
            <span class="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
              30+ Klien Puas
            </span>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
            v-for="(feature, index) in features"
            :key="feature.title"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: 600 + (index * 100) }
          }"
            class="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2"
        >
          <component :is="feature.icon" class="w-12 h-12 text-purple-400 mb-4" />
          <h4 class="text-xl font-semibold mb-2">{{ feature.title }}</h4>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>