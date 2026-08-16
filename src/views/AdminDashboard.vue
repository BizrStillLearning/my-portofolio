<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import Swal from 'sweetalert2';
import { useThemeStore } from "../stores/themeStore.js";
import { LayoutDashboard, Trophy, FileText, LogOut } from 'lucide-vue-next';

import CertificateManager from '../components/admin/CertificateManager.vue';
import CVManager from '../components/admin/CVManager.vue';

const themeStore = useThemeStore();
const activeMenu = ref('home');
const adminName = "Abidzar Dzakwan Sahudi";

const handleLogout = () => {
  Swal.fire({
    title: 'Akhiri Sesi?',
    text: "Anda akan keluar dari Admin Control Hub.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#2563EB',
    cancelButtonColor: '#DC2626',
    confirmButtonText: 'Ya, Logout',
    background: themeStore.isDark ? '#0f172a' : '#ffffff',
    color: themeStore.isDark ? '#f8fafc' : '#0f172a'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await supabase.auth.signOut();
      window.location.href = '/';
    }
  });
};
</script>

<template>
  <div class="flex h-screen bg-slate-100 dark:bg-[#020617] font-sans transition-colors duration-300">

    <aside class="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 flex flex-col justify-between shrink-0">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">Z</div>
          <span class="text-sm font-black uppercase text-slate-800 dark:text-white tracking-widest">Admin Hub</span>
        </div>

        <nav class="space-y-1">
          <button @click="activeMenu = 'home'" :class="activeMenu === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <LayoutDashboard class="w-4 h-4" /> Home
          </button>

          <div class="pt-6 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Content Management</div>
          <button @click="activeMenu = 'certificates'" :class="activeMenu === 'certificates' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <Trophy class="w-4 h-4" /> Certificates
          </button>

          <button @click="activeMenu = 'cv'" :class="activeMenu === 'cv' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <FileText class="w-4 h-4" /> Manage CV
          </button>
        </nav>
      </div>

      <div class="p-6">
        <button @click="handleLogout" class="flex items-center justify-center gap-3 w-full px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm">
          <LogOut class="w-4 h-4" /> Terminate Session
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto p-10 relative">

      <div v-if="activeMenu === 'home'" class="space-y-6">
        <div>
          <h1 class="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Overview Dashboard</h1>
          <p class="text-xs font-medium text-slate-500 mt-1">
            Selamat datang kembali, <span class="font-bold text-blue-600 dark:text-blue-400">{{ adminName }}</span>!
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm flex items-center gap-4">
            <div class="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500"><LayoutDashboard class="w-6 h-6" /></div>
            <div>
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Sistem Status</p>
              <h3 class="text-sm font-black text-slate-900 dark:text-white mt-2">Semua Layanan Berjalan</h3>
            </div>
          </div>
        </div>
      </div>

      <CertificateManager v-if="activeMenu === 'certificates'" />

      <CVManager v-if="activeMenu === 'cv'" />

    </main>
  </div>
</template>