<script setup>
import { reactive } from 'vue';
import { Mail, MapPin, Send, MessageCircle } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const formData = reactive({
  name: '',
  email: '',
  message: '',
});

const personalInfo = {
  whatsapp: '6289601261250',
  email: 'abidzardzakwan36@gmail.com',
  location: 'Surabaya, Indonesia'
};

const handleSubmit = () => {
  const waMessage = encodeURIComponent(
      `Halo Abidzar, saya ${formData.name}.\n\n${formData.message}`
  );
  window.open(`https://wa.me/${personalInfo.whatsapp}?text=${waMessage}`, '_blank');

  formData.name = '';
  formData.email = '';
  formData.message = '';
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: personalInfo.email,
    link: `mailto:${personalInfo.email}`,
    color: 'text-blue-400'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+62 896-0126-1250',
    link: `https://wa.me/${personalInfo.whatsapp}`,
    color: 'text-green-500'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: personalInfo.location,
    link: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.9651705792667!2d112.71535617463752!3d-7.244803692761594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f934f9df75f3%3A0x3360b06d15cea5a6!2sJl.%20Babadan%20Rukun%20VII%20No.31B%2C%20Dupak%2C%20Kec.%20Krembangan%2C%20Surabaya%2C%20Jawa%20Timur%2060179!5e0!3m2!1sid!2sid!4v1771102680628!5m2!1sid!2sid"',
    color: 'text-red-400'
  },
];
</script>

<template>
  <section id="contact" class="py-20 relative overflow-hidden transition-colors duration-500 bg-white dark:bg-slate-950">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-16"
      >
        <h2 class="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          {{ t('contact.title_part1') }} <span class="text-gradient">{{ t('contact.title_part2') }}</span>
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
        <p class="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
            class="space-y-8"
        >
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('contact.connect_title') }}</h3>

            <div class="space-y-4">
              <a
                  v-for="(info, index) in contactInfo"
                  :key="info.title"
                  :href="info.link"
                  target="_blank"
                  class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer shadow-sm"
              >
                <div class="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  <component :is="info.icon" class="w-6 h-6" :class="info.color" />
                </div>
                <div>
                  <p class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{{ info.title }}</p>
                  <p class="text-slate-900 dark:text-white font-bold">{{ info.value }}</p>
                </div>
              </a>
            </div>
          </div>

          <div class="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 h-64 shadow-lg">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.9651705792667!2d112.71535617463752!3d-7.244803692761594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f934f9df75f3%3A0x3360b06d15cea5a6!2sJl.%20Babadan%20Rukun%20VII%20No.31B%2C%20Dupak%2C%20Kec.%20Krembangan%2C%20Surabaya%2C%20Jawa%20Timur%2060179!5e0!3m2!1sid!2sid!4v1771102680628!5m2!1sid!2sid""
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600, delay: 400 } }"
            class="bg-slate-50 dark:bg-slate-900/40 p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Name</label>
                <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white"
                    placeholder="Abidzar..."
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Email</label>
                <input
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white"
                    placeholder="email@example.com"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Message</label>
              <textarea
                  v-model="formData.message"
                  required
                  rows="5"
                  class="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white resize-none"
                  placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
                type="submit"
                class="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer shadow-lg"
            >
              <Send class="w-5 h-5" />
              {{ t('contact.send_btn') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>