<script setup>
import { reactive, ref } from 'vue';
import { Mail, MapPin, Send, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isSuccess = ref(false);
const isError = ref(false);
const isSubmitting = ref(false);

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

  isSubmitting.value = true;

  const waMessage = encodeURIComponent(
      `Halo Abidzar, saya ${formData.name} (${formData.email}).\n\n${formData.message}`
  );

  setTimeout(() => {
    isSubmitting.value = false;
    isSuccess.value = true;

    window.open(`https://wa.me/${personalInfo.whatsapp}?text=${waMessage}`, '_blank');

    formData.name = '';
    formData.email = '';
    formData.message = '';

    setTimeout(() => isSuccess.value = false, 3000);
  }, 800);
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
    link: 'https://maps.google.com/?q=-7.2575,112.7521',
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

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">

        <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }"
            class="space-y-8"
        >
          <h3 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
            {{ t('contact.connect_title') }}
          </h3>

          <div class="space-y-4">
            <a
                v-for="info in contactInfo"
                :key="info.title"
                :href="info.link"
                target="_blank"
                v-motion
                :hovered="{ x: 8, scale: 1.01 }"
                class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div class="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <component :is="info.icon" class="w-5 h-5" :class="info.color" />
              </div>
              <div>
                <p class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-0.5">{{ info.title }}</p>
                <p class="text-slate-900 dark:text-white font-bold text-sm tracking-tight">{{ info.value }}</p>
              </div>
            </a>
          </div>

          <div
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :visible-once="{ opacity: 1, scale: 1, transition: { delay: 300 } }"
              class="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 h-64 shadow-sm relative group bg-slate-100 dark:bg-slate-900 mt-6"
          >
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253255.4534571994!2d112.57324317135043!3d-7.284362145325143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac213%3A0x3027a76e352be40!2sSurabaya%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1715972800000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full grayscale-[20%] dark:grayscale-[60%] dark:invert-[90%] dark:hue-rotate-180 transition-all duration-700"
            ></iframe>
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible-once="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80, damping: 20, delay: 200 } }"
            class="bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl relative h-fit"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
                <input
                    v-model="formData.name"
                    type="text"
                    required
                    :disabled="isSubmitting"
                    class="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 disabled:opacity-50"
                    placeholder="Abidzar..."
                />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Address</label>
                <input
                    v-model="formData.email"
                    type="email"
                    required
                    :disabled="isSubmitting"
                    class="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 disabled:opacity-50"
                    placeholder="your@email.com"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Your Message</label>
              <textarea
                  v-model="formData.message"
                  required
                  rows="4"
                  :disabled="isSubmitting"
                  class="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white text-sm font-bold resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600 disabled:opacity-50"
                  placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <div class="h-6">
              <transition name="fade">
                <div v-if="isError" class="flex items-center gap-2 text-rose-500 text-xs font-black ml-2">
                  <AlertCircle class="w-4 h-4" /> Lengkapi semua kolom!
                </div>
                <div v-else-if="isSuccess" class="flex items-center gap-2 text-emerald-500 text-xs font-black ml-2">
                  <CheckCircle2 class="w-4 h-4" /> Mengalihkan ke WhatsApp...
                </div>
              </transition>
            </div>

            <button
                type="submit"
                :disabled="isSubmitting || isSuccess"
                v-motion
                :hovered="{ scale: 1.02 }"
                :active="{ scale: 0.98 }"
                class="w-full flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              <Send v-if="!isSubmitting" class="w-4 h-4" />
              <div v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {{ isSubmitting ? 'Memproses...' : t('contact.send_btn') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
