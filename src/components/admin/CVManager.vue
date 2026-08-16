<script setup>
import { ref } from 'vue';
import { supabase } from '../../supabase';
import Swal from 'sweetalert2';
import { FileUp, Save, Loader2, FileText } from 'lucide-vue-next';

const isLoading = ref(false);
const cvFile = ref(null);

const handleFileChange = (e) => {
  cvFile.value = e.target.files[0];
};

const handleUploadCV = async () => {
  if (!cvFile.value) {
    Swal.fire('Perhatian', 'Pilih file PDF terlebih dahulu', 'warning');
    return;
  }

  try {
    isLoading.value = true;

    const { error } = await supabase.storage
        .from('documents')
        .upload('cv-abidzar.pdf', cvFile.value, {
          cacheControl: '3600',
          upsert: true
        });

    if (error) throw error;

    Swal.fire({
      icon: 'success',
      title: 'CV Berhasil Diperbarui!',
      text: 'File CV terbaru sudah aktif di halaman utama portofolio.',
    });

    cvFile.value = null;
  } catch (err) {
    Swal.fire('Gagal Mengunggah', err.message, 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm relative overflow-hidden">

    <div v-if="isLoading" class="absolute inset-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <Loader2 class="w-10 h-10 text-blue-600 animate-spin mb-4" />
      <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Mengunggah CV...</p>
    </div>

    <h2 class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
      Manage CV / Resume
    </h2>
    <p class="text-xs text-slate-500 mb-8 font-medium">Upload file PDF CV terbaru Anda. File ini akan otomatis ditautkan ke tombol "Unduh CV" di halaman Hero portofolio.</p>

    <form @submit.prevent="handleUploadCV" class="space-y-6">

      <div>
        <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">File Dokumen (.PDF)</label>
        <div
            class="relative flex flex-col items-center justify-center w-full px-4 py-10 bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl cursor-pointer hover:border-blue-500/50 transition-colors group"
            @click="$refs.cvInput.click()"
        >
          <input type="file" ref="cvInput" @change="handleFileChange" accept="application/pdf" class="hidden" />

          <FileText class="w-10 h-10 text-slate-400 mb-3 group-hover:text-blue-500 transition-colors" />
          <p class="text-sm font-bold text-slate-700 dark:text-slate-200 text-center">
            {{ cvFile ? cvFile.name : 'Klik di sini untuk memilih file PDF' }}
          </p>
          <p v-if="!cvFile" class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Maksimal 5MB</p>
        </div>
      </div>

      <button
          type="submit"
          :disabled="!cvFile"
          class="w-full px-6 py-4 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <FileUp class="w-4 h-4" /> Publikasikan CV Terbaru
      </button>

    </form>
  </div>
</template>