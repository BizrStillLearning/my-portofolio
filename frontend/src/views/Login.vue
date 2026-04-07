<script setup>
import { ref } from 'vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useThemeStore } from "../stores/themeStore.js";
import { LockKeyhole, ArrowLeft, ShieldCheck } from "lucide-vue-next";

const themeStore = useThemeStore();
const email = ref('');
const password = ref('');
const router = useRouter();
const errorMsg = ref('');
const isSubmitting = ref(false);
const isLoading = ref(true);

const login = async () => {
  if (!email.value || !password.value) {
    errorMsg.value = "Harap isi semua kolom.";
    return;
  }

  isSubmitting.value = true;
  errorMsg.value = '';

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/admin-dashboard');
  } catch (err) {
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      errorMsg.value = "Email atau Password salah.";
    } else {
      errorMsg.value = "Terjadi kesalahan: " + err.message;
    }
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden p-6 bg-slate-50 dark:bg-[#020617] transition-colors duration-700">

    <div class="absolute top-10 left-10 z-20">
      <router-link
          to="/"
          class="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all shadow-sm"
      >
        <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span class="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
      </router-link>
    </div>

    <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

    <div
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        class="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative z-10"
    >
      <div class="flex flex-col items-center mb-10">
        <div class="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/40 mb-6">
          <LockKeyhole class="w-8 h-8 text-white" />
        </div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter text-center">
          Admin <span class="text-blue-600">Access</span>
        </h2>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Authorized Personnel Only</p>
      </div>

      <form @submit.prevent="login" class="space-y-5">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
          <input
              v-model="email"
              type="email"
              placeholder=""
              class="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-600/50 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-600/10 transition-all duration-300"
          />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
          <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-600/50 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-600/10 transition-all duration-300"
          />
        </div>

        <div v-if="errorMsg"
             v-motion
             :initial="{ opacity: 0, y: -10 }"
             :enter="{ opacity: 1, y: 0 }"
             class="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl"
        >
          <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <p class="text-red-500 text-[10px] font-black uppercase tracking-widest leading-none">
            {{ errorMsg }}
          </p>
        </div>

        <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-xl shadow-blue-500/25 active:scale-[0.98]"
        >
          <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
            Verify Identity <ShieldCheck class="w-4 h-4" />
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        </button>
      </form>

      <div class="mt-10 text-center">
        <router-link to="/" class="group inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
          <ArrowLeft class="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Back to Portofolio
        </router-link>
      </div>
    </div>
  </div>
</template>