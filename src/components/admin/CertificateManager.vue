<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../../supabase';
import Swal from 'sweetalert2';
import {
  Pencil,
  Trash2,
  Save,
  Loader2,
  ImagePlus,
  Plus,
  List,
  Archive,
  ArchiveRestore,
  Eye,
  EyeOff,
  Search,
  X,
  FileText,
  Calendar,
  Building,
  CheckCircle2,
  ExternalLink
} from 'lucide-vue-next';

const isLoading = ref(false);
const certificates = ref([]);
const mode = ref('list'); // 'list' | 'form'
const isEditing = ref(false);
const filterStatus = ref('all'); // 'all' | 'published' | 'archived'
const searchQuery = ref('');

const certForm = ref({
  id: null,
  title: '',
  issuer: '',
  date: '',
  link: '',
  image: '',
  is_archived: false,
  imageFile: null
});

const filePreview = ref(null);

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http') || imagePath.startsWith('data:') || imagePath.startsWith('blob:')) {
    return imagePath;
  }
  const { data } = supabase.storage.from('certificates').getPublicUrl(imagePath);
  return data?.publicUrl || '';
};

const isPdf = (url) => {
  if (!url) return false;
  return url.toLowerCase().split('?')[0].endsWith('.pdf');
};

const stats = computed(() => {
  const total = certificates.value.length;
  const archived = certificates.value.filter(c => Boolean(c.is_archived)).length;
  const published = total - archived;
  return { total, published, archived };
});

const filteredCertificates = computed(() => {
  let list = certificates.value;

  if (filterStatus.value === 'published') {
    list = list.filter(c => !c.is_archived);
  } else if (filterStatus.value === 'archived') {
    list = list.filter(c => Boolean(c.is_archived));
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(c =>
      (c.title && c.title.toLowerCase().includes(q)) ||
      (c.issuer && c.issuer.toLowerCase().includes(q))
    );
  }

  return list;
});

const fetchData = async () => {
  try {
    isLoading.value = true;
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    certificates.value = (data || []).map(item => ({
      ...item,
      is_archived: Boolean(item.is_archived)
    }));
  } catch (err) {
    console.error('Error fetching certificates:', err.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const openCreateForm = () => {
  resetForm();
  mode.value = 'form';
};

const editCert = (cert) => {
  isEditing.value = true;
  certForm.value = {
    id: cert.id,
    title: cert.title || '',
    issuer: cert.issuer || '',
    date: cert.date || '',
    link: cert.link || '',
    image: cert.image || '',
    is_archived: Boolean(cert.is_archived),
    imageFile: null
  };
  if (filePreview.value) {
    URL.revokeObjectURL(filePreview.value);
    filePreview.value = null;
  }
  mode.value = 'form';
};

const cancelForm = () => {
  resetForm();
  mode.value = 'list';
};

const resetForm = () => {
  if (filePreview.value) {
    URL.revokeObjectURL(filePreview.value);
    filePreview.value = null;
  }
  certForm.value = {
    id: null,
    title: '',
    issuer: '',
    date: '',
    link: '',
    image: '',
    is_archived: false,
    imageFile: null
  };
  isEditing.value = false;
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  certForm.value.imageFile = file;
  if (filePreview.value) {
    URL.revokeObjectURL(filePreview.value);
  }
  filePreview.value = URL.createObjectURL(file);
};

const removeSelectedFile = () => {
  if (filePreview.value) {
    URL.revokeObjectURL(filePreview.value);
    filePreview.value = null;
  }
  certForm.value.imageFile = null;
};

const handleMissingColumnNotice = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Kolom Database Belum Tersedia',
    html: `
      <div style="text-align: left; font-size: 13px; line-height: 1.5;">
        <p class="mb-2">Kolom <code>is_archived</code> belum ada pada tabel <code>certificates</code> di Supabase.</p>
        <p class="mb-2">Silakan jalankan SQL berikut di <b>Supabase SQL Editor</b>:</p>
        <pre style="background: #1e293b; color: #34d399; padding: 10px; border-radius: 8px; font-family: monospace; font-size: 11px; white-space: pre-wrap; word-break: break-all;">ALTER TABLE certificates ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT FALSE;</pre>
      </div>
    `,
    confirmButtonText: 'Mengerti',
    confirmButtonColor: '#2563EB'
  });
};

const toggleArchive = async (cert) => {
  const nextState = !cert.is_archived;
  const actionLabel = nextState ? 'Arsipkan' : 'Publikasikan';

  const res = await Swal.fire({
    title: `${actionLabel} Sertifikat?`,
    text: nextState
      ? `"${cert.title}" akan disembunyikan dari tampilan portfolio publik.`
      : `"${cert.title}" akan kembali ditampilkan pada halaman portfolio publik.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: `Ya, ${actionLabel}`,
    cancelButtonText: 'Batal',
    confirmButtonColor: nextState ? '#F59E0B' : '#10B981',
    cancelButtonColor: '#64748B'
  });

  if (!res.isConfirmed) return;

  try {
    isLoading.value = true;
    const { error } = await supabase
      .from('certificates')
      .update({ is_archived: nextState })
      .eq('id', cert.id);

    if (error) {
      if (error.message && (error.message.includes('is_archived') || error.code === '42703' || error.code === 'PGRST204')) {
        handleMissingColumnNotice();
        return;
      }
      throw error;
    }

    cert.is_archived = nextState;
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: nextState ? 'Sertifikat telah diarsipkan!' : 'Sertifikat kini berstatus publik!',
      timer: 1500,
      showConfirmButton: false
    });
  } catch (err) {
    Swal.fire('Error', err.message, 'error');
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    let imagePath = certForm.value.image;

    if (certForm.value.imageFile) {
      const file = certForm.value.imageFile;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `certs/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('certificates').upload(filePath, file);
      if (uploadError) throw uploadError;
      imagePath = filePath;
    }

    const payload = {
      title: certForm.value.title,
      issuer: certForm.value.issuer,
      date: certForm.value.date,
      link: certForm.value.link || null,
      image: imagePath,
      is_archived: Boolean(certForm.value.is_archived)
    };

    if (isEditing.value) {
      const { error } = await supabase.from('certificates').update(payload).eq('id', certForm.value.id);
      if (error) {
        if (error.message && (error.message.includes('is_archived') || error.code === '42703' || error.code === 'PGRST204')) {
          delete payload.is_archived;
          const { error: retryError } = await supabase.from('certificates').update(payload).eq('id', certForm.value.id);
          if (retryError) throw retryError;
          handleMissingColumnNotice();
          resetForm();
          fetchData();
          mode.value = 'list';
          return;
        }
        throw error;
      }
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Sertifikat berhasil diperbarui!', timer: 1500, showConfirmButton: false });
    } else {
      const { error } = await supabase.from('certificates').insert([payload]);
      if (error) {
        if (error.message && (error.message.includes('is_archived') || error.code === '42703' || error.code === 'PGRST204')) {
          delete payload.is_archived;
          const { error: retryError } = await supabase.from('certificates').insert([payload]);
          if (retryError) throw retryError;
          handleMissingColumnNotice();
          resetForm();
          fetchData();
          mode.value = 'list';
          return;
        }
        throw error;
      }
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Sertifikat berhasil ditambahkan!', timer: 1500, showConfirmButton: false });
    }

    resetForm();
    fetchData();
    mode.value = 'list';
  } catch (err) {
    Swal.fire('Error', err.message, 'error');
  } finally {
    isLoading.value = false;
  }
};

const deleteCert = async (id, imagePath) => {
  const res = await Swal.fire({
    title: 'Hapus Sertifikat?',
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#64748B',
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal'
  });

  if (res.isConfirmed) {
    try {
      isLoading.value = true;
      if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        await supabase.storage.from('certificates').remove([imagePath]);
      }
      const { error } = await supabase.from('certificates').delete().eq('id', id);
      if (error) throw error;
      Swal.fire({ icon: 'success', title: 'Terhapus', text: 'Sertifikat telah dihapus', timer: 1500, showConfirmButton: false });
      fetchData();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <div class="space-y-6 relative">
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="absolute inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-3xl">
      <Loader2 class="w-10 h-10 text-blue-600 animate-spin mb-3" />
      <span class="text-xs font-bold text-slate-600 dark:text-slate-300">Memproses data...</span>
    </div>

    <!-- Top Navigation Tabs -->
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
      <div class="flex items-center gap-2">
        <button
          @click="cancelForm"
          :class="mode === 'list' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
        >
          <List class="w-4 h-4" />
          <span>Daftar Sertifikat</span>
          <span
            class="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="mode === 'list' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'"
          >
            {{ certificates.length }}
          </span>
        </button>

        <button
          v-if="isEditing && mode === 'form'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Pencil class="w-4 h-4" />
          <span>Edit Sertifikat</span>
        </button>

        <button
          v-else
          @click="openCreateForm"
          :class="mode === 'form' && !isEditing ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
        >
          <Plus class="w-4 h-4" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <!-- Quick mode info badge if in edit form -->
      <div v-if="mode === 'form'" class="hidden sm:flex items-center gap-2">
        <span
          class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
          :class="isEditing ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'"
        >
          {{ isEditing ? 'Mode Edit Data' : 'Mode Tambah Baru' }}
        </span>
      </div>
    </div>

    <!-- ================= LIST MODE ================= -->
    <div v-if="mode === 'list'" class="space-y-4">
      <!-- Toolbar: Stats, Filter & Search -->
      <div class="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <!-- Filter Tabs -->
        <div class="inline-flex p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
          <button
            @click="filterStatus = 'all'"
            :class="filterStatus === 'all' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Semua</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-md font-black" :class="filterStatus === 'all' ? 'bg-white/20 text-white dark:bg-slate-900/10 dark:text-slate-900' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'">
              {{ stats.total }}
            </span>
          </button>

          <button
            @click="filterStatus = 'published'"
            :class="filterStatus === 'published' ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Publik</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-md font-black" :class="filterStatus === 'published' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'">
              {{ stats.published }}
            </span>
          </button>

          <button
            @click="filterStatus = 'archived'"
            :class="filterStatus === 'archived' ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Diarsipkan</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-md font-black" :class="filterStatus === 'archived' ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'">
              {{ stats.archived }}
            </span>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full sm:w-72">
          <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari sertifikat atau issuer..."
            class="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Table Container -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr class="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
                <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Sertifikat</th>
                <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Penerbit (Issuer)</th>
                <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400 text-center">Status Publik</th>
                <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-white/5">
              <tr v-if="filteredCertificates.length === 0">
                <td colspan="4" class="p-10 text-center">
                  <div class="flex flex-col items-center justify-center text-slate-400">
                    <FileText class="w-10 h-10 mb-2 opacity-50" />
                    <p class="text-xs font-semibold">Tidak ada sertifikat yang ditemukan.</p>
                    <p v-if="searchQuery || filterStatus !== 'all'" class="text-[11px] text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau ubah tab filter.</p>
                  </div>
                </td>
              </tr>

              <tr
                v-for="cert in filteredCertificates"
                :key="cert.id"
                class="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <!-- Thumbnail + Title + Date -->
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                      <div v-if="isPdf(cert.image)" class="flex flex-col items-center">
                        <FileText class="w-5 h-5 text-blue-500" />
                        <span class="text-[8px] font-bold text-slate-400">PDF</span>
                      </div>
                      <img
                        v-else-if="cert.image"
                        :src="getImageUrl(cert.image)"
                        class="w-full h-full object-cover"
                        alt="Thumbnail"
                        @error="(e) => e.target.src = 'https://via.placeholder.com/100x100?text=Cert'"
                      />
                      <FileText v-else class="w-5 h-5 text-slate-400" />
                    </div>

                    <div class="min-w-0">
                      <p class="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {{ cert.title }}
                      </p>
                      <div class="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span class="flex items-center gap-1">
                          <Calendar class="w-3 h-3" /> {{ cert.date }}
                        </span>
                        <a
                          v-if="cert.link"
                          :href="cert.link"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink class="w-2.5 h-2.5" /> Link
                        </a>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Issuer -->
                <td class="p-4 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {{ cert.issuer }}
                </td>

                <!-- Status Badge -->
                <td class="p-4 text-center">
                  <span
                    v-if="cert.is_archived"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  >
                    <Archive class="w-3 h-3" />
                    Diarsipkan
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  >
                    <Eye class="w-3 h-3" />
                    Publik
                  </span>
                </td>

                <!-- Actions -->
                <td class="p-4 text-right">
                  <div class="inline-flex items-center gap-1.5">
                    <!-- Archive / Unarchive Button -->
                    <button
                      @click="toggleArchive(cert)"
                      :title="cert.is_archived ? 'Buka arsip (Tampilkan ke halaman publik)' : 'Arsipkan (Sembunyikan dari halaman publik)'"
                      :class="cert.is_archived ? 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white' : 'bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white'"
                      class="p-2 rounded-lg transition-all cursor-pointer"
                    >
                      <component :is="cert.is_archived ? ArchiveRestore : Archive" class="w-3.5 h-3.5" />
                    </button>

                    <!-- Edit Button -->
                    <button
                      @click="editCert(cert)"
                      title="Edit Data Sertifikat"
                      class="p-2 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all cursor-pointer"
                    >
                      <Pencil class="w-3.5 h-3.5" />
                    </button>

                    <!-- Delete Button -->
                    <button
                      @click="deleteCert(cert.id, cert.image)"
                      title="Hapus Sertifikat"
                      class="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ================= FORM MODE (ADD / EDIT) ================= -->
    <div v-if="mode === 'form'" class="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
      <div class="flex items-start justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
        <div>
          <h3 class="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {{ isEditing ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru' }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {{ isEditing ? 'Perbarui informasi sertifikat dan tentukan status arsip publik.' : 'Lengkapi formulir di bawah untuk menambahkan sertifikat ke database.' }}
          </p>
        </div>
        <button
          @click="cancelForm"
          class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer"
          title="Batal dan kembali ke daftar"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Title -->
        <div>
          <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Judul Sertifikat *</label>
          <input
            v-model="certForm.title"
            type="text"
            required
            placeholder="Contoh: Belajar Pemrograman Web Pemula"
            class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm outline-none text-slate-800 dark:text-white border border-slate-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/30 transition-all"
          />
        </div>

        <!-- Issuer & Date -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Penyelenggara / Issuer *</label>
            <input
              v-model="certForm.issuer"
              type="text"
              required
              placeholder="Contoh: Dicoding Indonesia"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm outline-none text-slate-800 dark:text-white border border-slate-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Tanggal Terbit *</label>
            <input
              v-model="certForm.date"
              type="text"
              required
              placeholder="Contoh: Maret 2026"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm outline-none text-slate-800 dark:text-white border border-slate-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>
        </div>

        <!-- Verification Link -->
        <div>
          <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Link Verifikasi (URL Sertifikat Asli)</label>
          <input
            v-model="certForm.link"
            type="url"
            placeholder="https://www.dicoding.com/certificates/..."
            class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm outline-none text-slate-800 dark:text-white border border-slate-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/30 transition-all"
          />
        </div>

        <!-- ARCHIVE TOGGLE CARD -->
        <div
          @click="certForm.is_archived = !certForm.is_archived"
          class="p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between"
          :class="certForm.is_archived
            ? 'bg-amber-500/10 border-amber-500/30'
            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'"
        >
          <div class="flex items-center gap-3.5">
            <div
              class="p-2.5 rounded-xl transition-colors"
              :class="certForm.is_archived ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'"
            >
              <Archive class="w-4 h-4" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">
                  Arsipkan Sertifikat
                </span>
                <span
                  class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider"
                  :class="certForm.is_archived ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'"
                >
                  {{ certForm.is_archived ? 'Diarsipkan (Sembunyi)' : 'Publik (Ditampilkan)' }}
                </span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Jika diarsipkan, sertifikat ini tidak akan ditampilkan di halaman portfolio publik.
              </p>
            </div>
          </div>

          <div class="relative flex items-center pr-1">
            <input
              type="checkbox"
              v-model="certForm.is_archived"
              @click.stop
              class="w-5 h-5 rounded-md text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-600"
            />
          </div>
        </div>

        <!-- IMAGE / THUMBNAIL UPLOAD & PREVIEW -->
        <div>
          <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
            Gambar / Thumbnail (.jpg, .png, .webp, .pdf)
          </label>

          <!-- Current Image Preview (if editing and existing image exists) -->
          <div
            v-if="!filePreview && certForm.image"
            class="mb-3 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                <div v-if="isPdf(certForm.image)" class="flex flex-col items-center">
                  <FileText class="w-5 h-5 text-blue-500" />
                  <span class="text-[8px] font-bold text-slate-400">PDF</span>
                </div>
                <img
                  v-else
                  :src="getImageUrl(certForm.image)"
                  class="w-full h-full object-cover"
                  alt="Current"
                  @error="(e) => e.target.src = 'https://via.placeholder.com/100x100?text=Cert'"
                />
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800 dark:text-white">File saat ini terpasang</p>
                <p class="text-[10px] text-slate-400 truncate max-w-xs">{{ certForm.image }}</p>
              </div>
            </div>
            <span class="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">Aktif</span>
          </div>

          <!-- New File Preview (if newly chosen) -->
          <div
            v-if="filePreview"
            class="mb-3 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-2xl flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 overflow-hidden flex items-center justify-center shrink-0">
                <FileText v-if="certForm.imageFile?.type === 'application/pdf'" class="w-6 h-6 text-blue-500" />
                <img v-else :src="filePreview" class="w-full h-full object-cover" alt="Preview" />
              </div>
              <div>
                <p class="text-xs font-bold text-blue-900 dark:text-blue-300">File baru dipilih:</p>
                <p class="text-[10px] text-blue-600 dark:text-blue-400 font-medium truncate max-w-xs">{{ certForm.imageFile?.name }}</p>
              </div>
            </div>
            <button
              type="button"
              @click="removeSelectedFile"
              class="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <X class="w-4 h-4" /> Batal
            </button>
          </div>

          <!-- Upload Dropzone -->
          <div
            class="relative flex items-center justify-center w-full px-4 py-6 bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl cursor-pointer hover:border-blue-500/40 transition-colors"
            @click="$refs.fileInput.click()"
          >
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              accept="image/*,application/pdf"
              class="hidden"
            />
            <div class="text-center">
              <ImagePlus class="w-7 h-7 text-slate-400 mx-auto mb-2" />
              <p class="text-xs font-bold text-slate-600 dark:text-slate-300">
                {{ certForm.imageFile ? 'Ganti pilihan file...' : (isEditing && certForm.image ? 'Klik untuk mengganti gambar/file sertifikat' : 'Klik untuk memilih file thumbnail') }}
              </p>
              <p class="text-[10px] text-slate-400 mt-1">Mendukung format PNG, JPG, WebP, atau PDF</p>
            </div>
          </div>
        </div>

        <!-- Form Action Buttons -->
        <div class="flex items-center gap-3 pt-3">
          <button
            type="submit"
            class="flex-1 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 transition-all"
          >
            <Save class="w-4 h-4" />
            <span>{{ isEditing ? 'Perbarui Sertifikat' : 'Simpan Data' }}</span>
          </button>

          <button
            type="button"
            @click="cancelForm"
            class="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
