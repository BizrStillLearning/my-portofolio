<script setup>
import { reactive, ref } from 'vue';
import { Mail, MapPin, Send, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isSuccess = ref(false);
const isError = ref(false);

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
  if (!formData.name || !formData.email || !formData.message) {
    isError.value = true;
    setTimeout(() => isError.value = false, 3000);
    return;
  }

  const waMessage = encodeURIComponent(
      `Halo Abidzar, saya ${formData.name} (${formData.email}).\n\n${formData.message}`
  );

  isSuccess.value = true;

  setTimeout(() => {
    window.open(`https://wa.me/${personalInfo.whatsapp}?text=${waMessage}`, '_blank');
    formData.name = '';
    formData.email = '';
    formData.message = '';
    isSuccess.value = false;
  }, 1000);
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: personalInfo.email,
    link: `mailto:${personalInfo.email}`,
    color: 'text-blue-500'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+62 896-0126-1250',
    link: `https://wa.me/${personalInfo.whatsapp}`,
    color: 'text-emerald-500'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: personalInfo.location,
    link: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.20966144577!2d112.6302820556247!3d-7.275971708893791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381843b9%3A0x4027a763a1056a0!2sSurabaya%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1711410000000!5m2!1sid!2sid',
    color: 'text-rose-500'
  },
];
</script>

<template>
  <section id="contact" class="py-24 relative overflow-hidden transition-colors duration-700 bg-white dark:bg-[#020617]">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }"
          class="text-center mb-20"
      >
        <h2 class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
          {{ t('contact.title_part1') }} <span class="text-gradient font-black">{{ t('contact.title_part2') }}</span>
        </h2>
        <div class="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full mb-8 shadow-lg shadow-blue-500/20"></div>
        <p class="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }"
            class="space-y-10"
        >
          <div class="space-y-8">
            <h3 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{{ t('contact.connect_title') }}</h3>

            <div class="space-y-4">
              <a
                  v-for="(info, index) in contactInfo"
                  :key="info.title"
                  :href="info.link"
                  target="_blank"
                  v-motion
                  :hovered="{ x: 10, scale: 1.02 }"
                  class="flex items-center gap-6 p-6 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 group"
              >
                <div class="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm group-hover:rotate-6 transition-transform">
                  <component :is="info.icon" class="w-6 h-6" :class="info.color" />
                </div>
                <div>
                  <p class="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-1">{{ info.title }}</p>
                  <p class="text-slate-900 dark:text-white font-black text-sm tracking-tight">{{ info.value }}</p>
                </div>
              </a>
            </div>
          </div>

          <div
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :visible-once="{ opacity: 1, scale: 1, transition: { delay: 300 } }"
              class="rounded-[3rem] overflow-hidden border-8 border-white dark:border-slate-800 h-72 shadow-2xl relative group bg-slate-200 dark:bg-slate-900"
          >
            <iframe
                :src="contactInfo[2].link"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                class="w-full h-full"
            ></iframe>
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80, damping: 20, delay: 200 } }"
            class="bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-12 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-2xl relative"
        >
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div class="grid sm:grid-cols-2 gap-8">
              <div class="space-y-3">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-3">Full Name</label>
                <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-7 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600"
                    placeholder="Abidzar..."
                />
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-3">Email Address</label>
                <input
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-7 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600"
                    placeholder="your@email.com"
                />
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-3">Your Message</label>
              <textarea
                  v-model="formData.message"
                  required
                  rows="4"
                  class="w-full px-7 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 dark:text-white font-bold resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <div class="h-6">
              <transition name="fade">
                <div v-if="isError" class="flex items-center gap-2 text-rose-500 text-xs font-black px-2">
                  <AlertCircle class="w-4 h-4" /> {{ t('contact.error_msg') || 'Fill all fields!' }}
                </div>
                <div v-else-if="isSuccess" class="flex items-center gap-2 text-emerald-500 text-xs font-black px-2">
                  <CheckCircle2 class="w-4 h-4" /> {{ t('contact.success_msg') || 'Opening WhatsApp...' }}
                </div>
              </transition>
            </div>

            <button
                type="submit"
                :disabled="isSuccess"
                v-motion
                :hovered="{ scale: 1.02 }"
                :active="{ scale: 0.98 }"
                class="w-full flex items-center justify-center gap-3 px-8 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              <Send class="w-4 h-4" />
              {{ t('contact.send_btn') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>