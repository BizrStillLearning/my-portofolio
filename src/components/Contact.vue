<script setup>
import { reactive } from 'vue';
import { Mail, MapPin, Phone, Send } from 'lucide-vue-next';

// State Form menggunakan reactive
const formData = reactive({
  name: '',
  email: '',
  message: '',
});

const handleSubmit = () => {
  alert('Terima kasih! Pesan Anda telah diterima.');
  // Reset form
  formData.name = '';
  formData.email = '';
  formData.message = '';
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@example.com',
    link: 'mailto:hello@example.com',
  },
  {
    icon: Phone,
    title: 'Telepon',
    value: '+62 812 3456 7890',
    link: 'tel:+6281234567890',
  },
  {
    icon: MapPin,
    title: 'Lokasi',
    value: 'Jakarta, Indonesia',
    link: '#',
  },
];
</script>

<template>
  <section id="contact" class="py-20 bg-slate-900 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-16"
      >
        <h2 class="text-4xl sm:text-5xl font-bold mb-4">
          Hubungi <span class="text-gradient">Saya</span>
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Punya project atau ide menarik? Mari diskusi dan wujudkan bersama!
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">

        <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
        >
          <h3 class="text-2xl font-bold mb-6 text-white">Mari Terhubung</h3>
          <p class="text-gray-400 mb-8">
            Saya selalu terbuka untuk diskusi tentang proyek baru, peluang kreatif, atau kerjasama.
            Jangan ragu untuk menghubungi saya!
          </p>

          <div class="space-y-6">
            <a
                v-for="(info, index) in contactInfo"
                :key="info.title"
                :href="info.link"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 + index * 100 } }"
                class="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div class="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <component :is="info.icon" class="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p class="text-sm text-gray-400">{{ info.title }}</p>
                <p class="text-white font-medium">{{ info.value }}</p>
              </div>
            </a>
          </div>

          <div
              v-motion
              :initial="{ opacity: 0 }"
              :visible-once="{ opacity: 1, transition: { duration: 600, delay: 800 } }"
              class="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl"
          >
            <p class="text-gray-300 italic">
              "Kreativitas adalah kecerdasan yang bersenang-senang. Mari ciptakan sesuatu yang amazing bersama!"
            </p>
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 400 } }"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
              <input
                  v-model="formData.name"
                  type="text"
                  id="name"
                  required
                  class="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white"
                  placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                  v-model="formData.email"
                  type="email"
                  id="email"
                  required
                  class="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white"
                  placeholder="email@example.com"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Pesan</label>
              <textarea
                  v-model="formData.message"
                  id="message"
                  required
                  rows="6"
                  class="w-full px-4 py-3 bg-slate-800 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white resize-none"
                  placeholder="Ceritakan tentang project atau ide Anda..."
              ></textarea>
            </div>

            <button
                type="submit"
                class="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <Send class="w-5 h-5" />
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>