<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import { useThemeStore } from '../stores/themeStore.js';
import { ArrowLeft, Lock, ArrowRight, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-vue-next';
import Swal from 'sweetalert2';

const themeStore = useThemeStore();
const password = ref('');
const showPassword = ref(false);
const router = useRouter();
const isSubmitting = ref(false);
const loginError = ref(false);

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const login = async () => {
  loginError.value = false;

  if (!password.value) {
    loginError.value = true;
    return;
  }

  if (!ADMIN_EMAIL) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Konfigurasi email admin belum diset.',
      confirmButtonColor: '#2563EB',
      background: themeStore.isDark ? '#020617' : '#ffffff',
      color: themeStore.isDark ? '#f8fafc' : '#0f172a'
    });
    return;
  }

  isSubmitting.value = true;

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: password.value,
    });

    if (error) throw error;

    Swal.fire({
      icon: 'success',
      title: 'Selamat Datang',
      text: 'Mengalihkan ke Dashboard...',
      showConfirmButton: false,
      timer: 1500,
      background: themeStore.isDark ? '#020617' : '#ffffff',
      color: themeStore.isDark ? '#f8fafc' : '#0f172a'
    }).then(() => {
      router.push('/admin-dashboard');
    });

  } catch (err) {
    loginError.value = true;
    password.value = '';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-6 font-sans dark:bg-[#020617]">
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center opacity-[0.15] dark:opacity-[0.07] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,black,transparent)]"></div>

      <svg
          class="absolute inset-0 h-full w-full text-slate-400 opacity-[0.45] dark:text-slate-600 dark:opacity-[0.3]"
          style="mask-image: radial-gradient(ellipse 45% 40% at 50% 45%, black, transparent)"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 800"
          fill="none"
      >
        <g stroke="currentColor" stroke-width="1.2" opacity="0.5">
          <path d="M-60 300 C 120 220, 260 400, 190 520 C 130 620, -30 580, -70 490"/>
          <path d="M-60 340 C 105 270, 225 430, 170 515 C 120 585, -10 555, -55 490"/>
        </g>
        <g stroke="currentColor" stroke-width="1.2" opacity="0.4">
          <path d="M1260 480 C 1100 400, 980 560, 1040 670 C 1090 750, 1240 710, 1280 620"/>
          <path d="M1260 520 C 1120 455, 1020 590, 1070 665 C 1110 725, 1230 690, 1265 620"/>
        </g>
        <g fill="currentColor" opacity="0.5">
          <circle cx="300" cy="200" r="2.4"/>
          <circle cx="340" cy="240" r="1.7"/>
          <circle cx="900" cy="640" r="2.2"/>
          <circle cx="940" cy="600" r="1.6"/>
        </g>
        <g stroke="currentColor" stroke-width="1.4" opacity="0.45" stroke-linecap="round">
          <path d="M480 160 v16 M472 168 h16"/>
          <path d="M720 680 v14 M713 687 h14"/>
        </g>
      </svg>

      <div class="absolute inset-0 opacity-[0.35] mix-blend-overlay dark:opacity-[0.5]" style="background-image:url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E&quot;)"></div>
    </div>

    <div class="absolute top-7 left-7 z-20">
      <router-link
          to="/"
          class="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft class="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Kembali
      </router-link>
    </div>

    <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: [0.22, 1, 0.36, 1] } }"
        class="relative z-10 w-full max-w-sm"
    >
      <div class="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8 sm:p-10 shadow-[0_25px_60px_-20px_rgba(2,6,23,0.25)] dark:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)]">

        <div class="mb-8 text-center">
          <div class="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
            <Lock class="w-5 h-5" />
          </div>
          <h1 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Area</h1>
          <p class="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Masukkan kata sandi untuk melanjutkan.</p>
        </div>

        <form @submit.prevent="login" class="space-y-5" :class="{ 'animate-[shake_0.4s_ease-in-out]': loginError }">
          <div>
            <label for="admin-password" class="sr-only">Kata Sandi</label>
            <div
                class="relative rounded-xl border bg-slate-50 transition-all dark:bg-white/[0.04]"
                :class="loginError
                ? 'border-rose-500/60 ring-2 ring-rose-500/20'
                : 'border-slate-200 focus-within:border-blue-500/40 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-white/10'"
            >
              <input
                  id="admin-password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Kata sandi"
                  autocomplete="current-password"
                  :disabled="isSubmitting"
                  class="w-full bg-transparent px-4 py-3.5 pr-12 text-center text-lg tracking-[0.25em] text-slate-900 placeholder:tracking-normal placeholder:text-slate-400 focus:outline-none disabled:opacity-50 dark:text-white"
              >
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                  class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <Eye v-if="!showPassword" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
            </div>

            <transition name="fade">
              <p v-if="loginError" class="mt-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                <AlertCircle class="w-3.5 h-3.5" />
                {{ password ? 'Kata sandi tidak valid. Coba lagi.' : 'Kata sandi wajib diisi.' }}
              </p>
            </transition>
          </div>

          <button
              type="submit"
              :disabled="isSubmitting"
              class="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:translate-y-0 disabled:opacity-50 disabled:cursor-wait dark:bg-white dark:text-slate-900 cursor-pointer"
          >
            <template v-if="!isSubmitting">
              Lanjutkan
              <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </template>
            <template v-else>
              <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-slate-900/30 dark:border-t-slate-900"></span>
              Memproses...
            </template>
          </button>
        </form>

        <div class="mt-8 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-5 dark:border-white/5">
          <ShieldCheck class="w-3.5 h-3.5 text-slate-400" />
          <p class="text-[11px] text-slate-400 dark:text-slate-600">Akses terbatas — terverifikasi via Supabase Auth</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>