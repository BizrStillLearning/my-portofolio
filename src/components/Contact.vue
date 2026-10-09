<script setup>
import { reactive, ref } from 'vue';
import { Mail, MapPin, Send, MessageCircle, AlertCircle, CheckCircle2, ArrowUpRight } from 'lucide-vue-next';
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
    tint: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+62 896-0126-1250',
    link: `https://wa.me/${personalInfo.whatsapp}`,
    tint: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: personalInfo.location,
    link: 'https://maps.google.com/?q=-7.2575,112.7521',
    tint: 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
  },
];
</script>

<template>
  <section id="contact" class="relative py-28 overflow-hidden bg-slate-50 dark:bg-[#020617]">
    <!-- ============ LAPISAN LATAR (konsisten) ============ -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center opacity-[0.15] dark:opacity-[0.07] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"></div>

      <!-- Corak SVG organik -->
      <svg
          class="absolute inset-0 w-full h-full opacity-[0.45] dark:opacity-[0.3] text-slate-400 dark:text-slate-600"
          style="mask-image: radial-gradient(ellipse 55% 50% at 85% 50%, black, transparent)"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 800"
          fill="none"
      >
        <g stroke="currentColor" stroke-width="1.2" opacity="0.5">
          <path d="M1260 180 C 1100 100, 970 260, 1030 380 C 1080 470, 1240 430, 1280 340"/>
          <path d="M1260 220 C 1120 150, 1010 290, 1060 375 C 1105 450, 1230 415, 1265 340"/>
          <path d="M1260 260 C 1140 200, 1050 320, 1095 370 C 1130 420, 1220 400, 1250 335"/>
        </g>
        <g fill="currentColor" opacity="0.5">
          <circle cx="140" cy="200" r="2.4"/>
          <circle cx="180" cy="240" r="1.7"/>
          <circle cx="320" cy="640" r="2.2"/>
          <circle cx="360" cy="600" r="1.6"/>
          <circle cx="880" cy="720" r="2.4"/>
        </g>
        <g stroke="currentColor" stroke-width="1.4" opacity="0.45" stroke-linecap="round">
          <path d="M460 140 v16 M452 148 h16"/>
          <path d="M700 660 v14 M693 667 h14"/>
        </g>
        <g stroke="currentColor" stroke-width="1" opacity="0.3">
          <path d="M120 720 A 80 80 0 0 1 200 665"/>
        </g>
      </svg>

      <div class="absolute inset-0 opacity-[0.35] dark:opacity-[0.5] mix-blend-overlay" style="background-image:url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E&quot;)"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">

      <div v-motion :initial="{ opacity: 0, y: 24 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: [0.22, 1, 0.36, 1] } }" class="mb-16">
        <div class="flex items-center gap-3 mb-5">
          <span class="h-px w-10 bg-blue-600/60"></span>
          <span class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            {{ t('contact.eyebrow', 'Contact') }}
          </span>
        </div>
        <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-2xl">
          {{ t('contact.title_part1') }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            {{ t('contact.title_part2') }}
          </span>
        </h2>
        <p class="mt-5 text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 lg:gap-16">

        <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: [0.22, 1, 0.36, 1] } }"
            class="lg:col-span-2"
        >
          <h3 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            {{ t('contact.connect_title') }}
          </h3>

          <div class="space-y-3 mb-8">
            <a
                v-for="info in contactInfo"
                :key="info.title"
                :href="info.link"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-white/20"
            >
              <div :class="info.tint" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <component :is="info.icon" class="w-[18px] h-[18px]" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs text-slate-400 dark:text-slate-500">{{ info.title }}</p>
                <p class="truncate text-sm font-semibold text-slate-900 dark:text-white">{{ info.value }}</p>
              </div>
              <ArrowUpRight class="w-4 h-4 shrink-0 text-slate-300 dark:text-slate-600 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </a>
          </div>

          <div class="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 h-56 bg-slate-100 dark:bg-slate-800">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253255.4534571994!2d112.57324317135043!3d-7.284362145325143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac213%3A0x3027a76e352be40!2sSurabaya%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1715972800000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Lokasi Surabaya"
                class="h-full w-full grayscale-[20%] dark:grayscale-[50%] dark:invert-[90%] dark:hue-rotate-180"
            ></iframe>
          </div>
        </div>

        <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150, ease: [0.22, 1, 0.36, 1] } }"
            class="lg:col-span-3"
        >
          <div class="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-7 sm:p-9">
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label for="contact-name" class="text-xs font-semibold text-slate-600 dark:text-slate-400">Nama</label>
                  <input
                      id="contact-name"
                      v-model="formData.name"
                      type="text"
                      required
                      :disabled="isSubmitting"
                      placeholder="Nama kamu"
                      class="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 disabled:opacity-50"
                  >
                </div>
                <div class="space-y-1.5">
                  <label for="contact-email" class="text-xs font-semibold text-slate-600 dark:text-slate-400">Email</label>
                  <input
                      id="contact-email"
                      v-model="formData.email"
                      type="email"
                      required
                      :disabled="isSubmitting"
                      placeholder="nama@email.com"
                      class="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 disabled:opacity-50"
                  >
                </div>
              </div>

              <div class="space-y-1.5">
                <label for="contact-message" class="text-xs font-semibold text-slate-600 dark:text-slate-400">Pesan</label>
                <textarea
                    id="contact-message"
                    v-model="formData.message"
                    required
                    rows="5"
                    :disabled="isSubmitting"
                    placeholder="Ceritakan project, kolaborasi, atau sekadar menyapa..."
                    class="w-full resize-none rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 disabled:opacity-50"
                ></textarea>
              </div>

              <div class="h-5">
                <transition name="fade">
                  <div v-if="isError" class="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-medium">
                    <AlertCircle class="w-4 h-4" /> Lengkapi semua kolom dulu ya.
                  </div>
                  <div v-else-if="isSuccess" class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                    <CheckCircle2 class="w-4 h-4" /> Berhasil — membuka WhatsApp...
                  </div>
                </transition>
              </div>

              <button
                  type="submit"
                  :disabled="isSubmitting || isSuccess"
                  class="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-900 dark:bg-white px-6 py-3.5 text-sm font-semibold text-white dark:text-slate-900 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:translate-y-0 disabled:opacity-50 disabled:cursor-wait cursor-pointer"
              >
                <div v-if="isSubmitting" class="h-4 w-4 rounded-full border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 animate-spin"></div>
                <Send v-else class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                {{ isSubmitting ? 'Memproses...' : t('contact.send_btn') }}
              </button>

              <p class="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400 dark:text-slate-600">
                <MessageCircle class="w-3.5 h-3.5" />
                Pesan akan diarahkan ke WhatsApp — balasan biasanya cepat.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>