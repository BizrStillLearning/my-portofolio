<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import { useThemeStore } from "../stores/themeStore.js";
import { ArrowLeft, Lock, ArrowRight } from "lucide-vue-next";
import Swal from 'sweetalert2';

const themeStore = useThemeStore();
const password = ref('');
const router = useRouter();
const isSubmitting = ref(false);

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const login = async () => {
  if (!password.value) {
    Swal.fire({
      icon: 'info',
      title: 'Akses Terkunci',
      text: 'Harap masukkan kata sandi.',
      confirmButtonColor: '#2563EB',
      background: themeStore.isDark ? '#0f172a' : '#ffffff',
      color: themeStore.isDark ? '#f8fafc' : '#0f172a'
    });
    return;
  }

  if (!ADMIN_EMAIL) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Konfigurasi email admin belum diset.' });
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
      background: themeStore.isDark ? '#0f172a' : '#ffffff',
      color: themeStore.isDark ? '#f8fafc' : '#0f172a'
    }).then(() => {
      router.push('/admin-dashboard');
    });

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Kata sandi tidak valid.',
      confirmButtonColor: '#DC2626',
      background: themeStore.isDark ? '#0f172a' : '#ffffff',
      color: themeStore.isDark ? '#f8fafc' : '#0f172a'
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-[#020617] font-sans transition-colors duration-700">

    <div class="absolute top-8 left-8">
      <router-link
          to="/"
          class="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors group"
      >
        <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span class="text-xs font-semibold uppercase tracking-wider">Kembali</span>
      </router-link>
    </div>

    <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="w-full max-w-[380px]"
    >
      <div class="mb-10 text-center space-y-3">
        <div class="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-900 dark:text-white border border-slate-200 dark:border-white/5">
          <Lock class="w-5 h-5" />
        </div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Area</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Silakan masukkan kata sandi Anda.</p>
      </div>

      <form @submit.prevent="login" class="space-y-6">

        <div>
          <label class="sr-only">Kata Sandi</label>
          <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              :disabled="isSubmitting"
              class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all text-slate-900 dark:text-white text-center text-xl tracking-[0.3em] font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700 disabled:opacity-50"
          />
        </div>

        <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
        >
          <span v-if="!isSubmitting">Lanjutkan</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses...
          </span>
          <ArrowRight v-if="!isSubmitting" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

      </form>
    </div>
  </div>
</template>