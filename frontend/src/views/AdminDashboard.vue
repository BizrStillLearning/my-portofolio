<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase'; // Pastikan path ke file supabase.js sudah benar
import {
  LayoutDashboard,
  Trophy,
  Code2,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Save,
  Loader2
} from 'lucide-vue-next';

// State Navigasi
const activeMenu = ref('home');

// State Global & Loading
const isLoading = ref(false);

// Teks Statis Admin
const adminName = "Abidzar Dzakwan Sahudi";

// State Data dari Supabase
const certificates = ref([]);
const projects = ref([]);

// State Form Certificates
const certForm = ref({ id: null, title: '', issuer: '', date: '', link: '' });
const isEditingCert = ref(false);

// State Form Projects
const projectForm = ref({
  id: null,
  title: '',
  description: '',
  progress: 0,
  github_url: '',
  tagsInput: '',
  timelineInput: ''
});
const isEditingProject = ref(false);

// Fetch Data Awal Dinamis (Supabase Only)
const fetchData = async () => {
  try {
    isLoading.value = true;

    // Fetch Certificates
    const { data: certs } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
    certificates.value = certs || [];

    // Fetch Projects
    const { data: projs } = await supabase.from('projects').select('*').order('id', { ascending: true });
    projects.value = projs || [];

  } catch (err) {
    console.error('Gagal mengambil data:', err.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

// ==========================================
// LOGIK GERAKAN DATA: LOGOUT
// ==========================================
const handleLogout = async () => {
  if (!confirm('Apakah Anda yakin ingin keluar dari Dashboard Admin?')) return;
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    alert('Berhasil logout!');
    window.location.href = '/';
  } catch (err) {
    alert('Gagal logout: ' + err.message);
  } finally {
    isLoading.value = false;
  }
};

// ==========================================
// LOGIK GERAKAN DATA: CERTIFICATES
// ==========================================
const handleCertSubmit = async () => {
  try {
    isLoading.value = true;
    const payload = {
      title: certForm.value.title,
      issuer: certForm.value.issuer,
      date: certForm.value.date,
      link: certForm.value.link
    };

    if (isEditingCert.value) {
      const { error } = await supabase.from('certificates').update(payload).eq('id', certForm.value.id);
      if (error) throw error;
      alert('Sertifikat berhasil diperbarui!');
    } else {
      const { error } = await supabase.from('certificates').insert([payload]);
      if (error) throw error;
      alert('Sertifikat berhasil ditambahkan!');
    }
    resetCertForm();
    fetchData();
    activeMenu.value = 'edit-certificates';
  } catch (err) {
    alert(err.message);
  } finally {
    isLoading.value = false;
  }
};

const editCert = (cert) => {
  isEditingCert.value = true;
  certForm.value = { ...cert };
  activeMenu.value = 'upload-certificates';
};

const deleteCert = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')) return;
  try {
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) throw error;
    fetchData();
  } catch (err) {
    alert(err.message);
  }
};

const resetCertForm = () => {
  certForm.value = { id: null, title: '', issuer: '', date: '', link: '' };
  isEditingCert.value = false;
};

// ==========================================
// LOGIK GERAKAN DATA: PROJECTS (Sempurna & Valid)
// ==========================================
const handleProjectSubmit = async () => {
  try {
    isLoading.value = true;

    // 1. Konversi string tags (koma) menjadi Array Javascript murni
    const tagsArray = projectForm.value.tagsInput
        ? projectForm.value.tagsInput.split(',').map(t => t.trim()).filter(t => t)
        : [];

    // 2. Validasi & Parsing data Timeline agar terhindar dari crash JSON parse
    let timelineObj = [];
    if (projectForm.value.timelineInput) {
      try {
        // Coba baca jika format inputan user adalah JSON Array valid
        timelineObj = JSON.parse(projectForm.value.timelineInput);
      } catch (e) {
        // Fallback: Jika user hanya mengetik teks narasi biasa, bungkus ke object logs default
        timelineObj = [{ month: "Logs Activity", summary: projectForm.value.timelineInput }];
      }
    }

    const payload = {
      title: projectForm.value.title,
      description: projectForm.value.description,
      progress: parseInt(projectForm.value.progress) || 0,
      github_url: projectForm.value.github_url || null, // Menghindari string kosong di PostgreSQL URL field
      tags: tagsArray, // Masuk ke kolom JSONB
      timeline: timelineObj // Masuk ke kolom JSONB
    };

    if (isEditingProject.value) {
      const { error } = await supabase.from('projects').update(payload).eq('id', projectForm.value.id);
      if (error) throw error;
      alert('Proyek berhasil diperbarui!');
    } else {
      const { error } = await supabase.from('projects').insert([payload]);
      if (error) throw error;
      alert('Proyek berhasil ditambahkan!');
    }

    resetProjectForm();
    await fetchData();
    activeMenu.value = 'edit-project';
  } catch (err) {
    alert('Gagal memproses project: ' + err.message);
  } finally {
    isLoading.value = false;
  }
};

const editProject = (proj) => {
  isEditingProject.value = true;
  projectForm.value = {
    id: proj.id,
    title: proj.title,
    description: proj.description,
    progress: proj.progress,
    github_url: proj.github_url || '',
    tagsInput: proj.tags ? proj.tags.join(', ') : '',
    timelineInput: proj.timeline ? JSON.stringify(proj.timeline, null, 2) : '[]'
  };
  activeMenu.value = 'upload-project';
};

const deleteProject = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus proyek ini secara permanen?')) return;
  try {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    fetchData();
  } catch (err) {
    alert(err.message);
  }
};

const resetProjectForm = () => {
  projectForm.value = { id: null, title: '', description: '', progress: 0, github_url: '', tagsInput: '', timelineInput: '' };
  isEditingProject.value = false;
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
          <button @click="activeMenu = 'home'" :class="activeMenu === 'home' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <LayoutDashboard class="w-4 h-4" /> Home
          </button>

          <div class="pt-4 pb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Certificates</div>
          <button @click="activeMenu = 'upload-certificates'; resetCertForm()" :class="activeMenu === 'upload-certificates' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <Plus class="w-4 h-4" /> Add Certificate
          </button>
          <button @click="activeMenu = 'edit-certificates'" :class="activeMenu === 'edit-certificates' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <Trophy class="w-4 h-4" /> Manage Certs
          </button>

          <div class="pt-4 pb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Projects</div>
          <button @click="activeMenu = 'upload-project'; resetProjectForm()" :class="activeMenu === 'upload-project' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <Plus class="w-4 h-4" /> Add Project
          </button>
          <button @click="activeMenu = 'edit-project'" :class="activeMenu === 'edit-project' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
            <Code2 class="w-4 h-4" /> Manage Projects
          </button>
        </nav>
      </div>

      <div class="p-6">
        <button @click="handleLogout" class="flex items-center gap-3 w-full px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
          <LogOut class="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto p-10 relative">

      <div v-if="isLoading" class="absolute inset-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <Loader2 class="w-8 h-8 text-blue-600 animate-spin" />
      </div>

      <div v-if="activeMenu === 'home'" class="space-y-6">
        <div>
          <h1 class="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Overview Dashboard</h1>
          <p class="text-xs font-medium text-slate-500 mt-1">
            Selamat datang kembali, <span class="font-bold text-blue-600 dark:text-blue-400">{{ adminName }}</span>! Berikut rangkuman data portfolio aktif Anda.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm flex items-center gap-4">
            <div class="p-4 bg-blue-600/10 rounded-2xl text-blue-600"><Trophy class="w-6 h-6" /></div>
            <div>
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Kredensial</p>
              <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-1">{{ certificates.length }} Sertifikat</h3>
            </div>
          </div>
          <div class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm flex items-center gap-4">
            <div class="p-4 bg-purple-600/10 rounded-2xl text-purple-600"><Code2 class="w-6 h-6" /></div>
            <div>
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Karya</p>
              <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-1">{{ projects.length }} Project</h3>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeMenu === 'upload-certificates'" class="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
          {{ isEditingCert ? 'Edit Kredensial Sertifikat' : 'Upload Sertifikat Baru' }}
        </h2>
        <form @submit.prevent="handleCertSubmit" class="space-y-5">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Judul Sertifikat</label>
            <input v-model="certForm.title" type="text" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Penerbit / Issuer</label>
              <input v-model="certForm.issuer" type="text" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white" />
            </div>
            <div>
              <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Tanggal Terbit</label>
              <input v-model="certForm.date" type="text" placeholder="Contoh: April 2026" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white" />
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Link Verifikasi (URL Dokumen / PDF)</label>
            <input v-model="certForm.link" type="url" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white" />
          </div>
          <div class="flex gap-3 pt-4">
            <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20">
              <Save class="w-4 h-4" /> Simpan Data
            </button>
            <button type="button" @click="activeMenu = 'edit-certificates'; resetCertForm()" class="px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 cursor-pointer">
              Batal
            </button>
          </div>
        </form>
      </div>

      <div v-if="activeMenu === 'edit-certificates'" class="space-y-6">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Daftar Sertifikat Terpublikasi</h2>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
            <tr class="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
              <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Judul</th>
              <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Issuer</th>
              <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Tanggal</th>
              <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400 text-right">Aksi</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-white/5">
            <tr v-for="cert in certificates" :key="cert.id" class="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
              <td class="p-4 text-xs font-bold text-slate-900 dark:text-white uppercase">{{ cert.title }}</td>
              <td class="p-4 text-xs text-slate-500 dark:text-slate-400 font-medium">{{ cert.issuer }}</td>
              <td class="p-4 text-xs text-slate-500 dark:text-slate-400 font-medium">{{ cert.date }}</td>
              <td class="p-4 text-right space-x-2">
                <button @click="editCert(cert)" class="p-2 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all cursor-pointer"><Pencil class="w-3.5 h-3.5" /></button>
                <button @click="deleteCert(cert.id)" class="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"><Trash2 class="w-3.5 h-3.5" /></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeMenu === 'upload-project'" class="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
          {{ isEditingProject ? 'Edit Informasi Project' : 'Upload Project Baru' }}
        </h2>
        <form @submit.prevent="handleProjectSubmit" class="space-y-5">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Nama Project</label>
            <input v-model="projectForm.title" type="text" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white" />
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Deskripsi Singkat</label>
            <textarea v-model="projectForm.description" rows="3" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Progress Kerja (%)</label>
              <input v-model="projectForm.progress" type="number" min="0" max="100" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white" />
            </div>
            <div>
              <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Link Repository GitHub</label>
              <input v-model="projectForm.github_url" type="url" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white" />
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Tags Teknologi (Pisahkan dengan koma)</label>
            <input v-model="projectForm.tagsInput" type="text" placeholder="Contoh: Vue.js, Tailwind, Golang" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white" />
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Timeline Activity (Format JSON Array)</label>
            <textarea v-model="projectForm.timelineInput" rows="4" placeholder='[\n  { "month": "Maret", "summary": "Rilis Fitur Auth" }\n]' class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white"></textarea>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20">
              <Save class="w-4 h-4" /> {{ isEditingProject ? 'Perbarui Project' : 'Publish Project' }}
            </button>
            <button type="button" @click="activeMenu = 'edit-project'; resetProjectForm()" class="px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 cursor-pointer">
              Batal
            </button>
          </div>
        </form>
      </div>

      <div v-if="activeMenu === 'edit-project'" class="space-y-6">
        <h2 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Daftar Project Terpublikasi</h2>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
            <tr class="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
              <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Nama Project</th>
              <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Progress</th>
              <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Tech Stack</th>
              <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400 text-right">Aksi</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-white/5">
            <tr v-for="proj in projects" :key="proj.id" class="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
              <td class="p-4 text-xs font-bold text-slate-900 dark:text-white uppercase">{{ proj.title }}</td>
              <td class="p-4 text-xs text-slate-500 dark:text-slate-400 font-medium">{{ proj.progress }}%</td>
              <td class="p-4 text-xs text-slate-500 dark:text-slate-400 font-medium flex flex-wrap gap-1 items-center h-full pt-5">
                <span class="inline-block px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded text-[10px] font-bold uppercase" v-for="tag in proj.tags" :key="tag">{{ tag }}</span>
              </td>
              <td class="p-4 text-right space-x-2">
                <button @click="editProject(proj)" class="p-2 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all cursor-pointer"><Pencil class="w-3.5 h-3.5" /></button>
                <button @click="deleteProject(proj.id)" class="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"><Trash2 class="w-3.5 h-3.5" /></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>