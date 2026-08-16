<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase';
import Swal from 'sweetalert2';
import { Pencil, Trash2, Save, Loader2, ImagePlus, Plus, List } from 'lucide-vue-next';

const isLoading = ref(false);
const certificates = ref([]);
const mode = ref('list');

const certForm = ref({ id: null, title: '', issuer: '', date: '', link: '', image: '', imageFile: null });
const isEditing = ref(false);

const fetchData = async () => {
  isLoading.value = true;
  const { data } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
  certificates.value = data || [];
  isLoading.value = false;
};

onMounted(fetchData);

const handleFileChange = (e) => certForm.value.imageFile = e.target.files[0];

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

    const payload = { ...certForm.value };
    delete payload.imageFile;
    delete payload.id;
    payload.image = imagePath;

    if (isEditing.value) {
      const { error } = await supabase.from('certificates').update(payload).eq('id', certForm.value.id);
      if (error) throw error;
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Diperbarui!', timer: 1500, showConfirmButton: false });
    } else {
      const { error } = await supabase.from('certificates').insert([payload]);
      if (error) throw error;
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Ditambahkan!', timer: 1500, showConfirmButton: false });
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

const editCert = (cert) => {
  isEditing.value = true;
  certForm.value = { ...cert, imageFile: null };
  mode.value = 'form';
};

const deleteCert = async (id, imagePath) => {
  const res = await Swal.fire({ title: 'Hapus?', text: "Data tidak bisa dikembalikan!", icon: 'warning', showCancelButton: true });
  if (res.isConfirmed) {
    isLoading.value = true;
    if (imagePath && !imagePath.startsWith('http')) {
      await supabase.storage.from('certificates').remove([imagePath]);
    }
    await supabase.from('certificates').delete().eq('id', id);
    fetchData();
  }
};

const resetForm = () => {
  certForm.value = { id: null, title: '', issuer: '', date: '', link: '', image: '', imageFile: null };
  isEditing.value = false;
};
</script>

<template>
  <div class="space-y-6 relative">
    <div v-if="isLoading" class="absolute inset-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <Loader2 class="w-10 h-10 text-blue-600 animate-spin mb-4" />
    </div>

    <div class="flex gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
      <button @click="mode = 'list'" :class="mode === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'" class="flex items-center gap-2 pb-2 text-xs font-black uppercase tracking-widest transition-all">
        <List class="w-4 h-4" /> Daftar Sertifikat
      </button>
      <button @click="mode = 'form'; resetForm()" :class="mode === 'form' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'" class="flex items-center gap-2 pb-2 text-xs font-black uppercase tracking-widest transition-all">
        <Plus class="w-4 h-4" /> Tambah Baru
      </button>
    </div>

    <div v-if="mode === 'list'" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead>
        <tr class="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
          <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Judul</th>
          <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Issuer</th>
          <th class="p-4 text-[10px] font-black uppercase tracking-wider text-slate-400 text-right">Aksi</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-white/5">
        <tr v-for="cert in certificates" :key="cert.id" class="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
          <td class="p-4 text-xs font-bold text-slate-900 dark:text-white">{{ cert.title }}</td>
          <td class="p-4 text-xs text-slate-500">{{ cert.issuer }}</td>
          <td class="p-4 text-right space-x-2">
            <button @click="editCert(cert)" class="p-2 bg-blue-600/10 text-blue-600 rounded-lg"><Pencil class="w-3.5 h-3.5" /></button>
            <button @click="deleteCert(cert.id, cert.image)" class="p-2 bg-red-500/10 text-red-500 rounded-lg"><Trash2 class="w-3.5 h-3.5" /></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="mode === 'form'" class="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Judul Sertifikat</label>
          <input v-model="certForm.title" type="text" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm outline-none text-slate-800 dark:text-white border border-slate-200 dark:border-white/5" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Issuer</label>
            <input v-model="certForm.issuer" type="text" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm outline-none text-slate-800 dark:text-white border border-slate-200 dark:border-white/5" />
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Tanggal Terbit</label>
            <input v-model="certForm.date" type="text" required class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm outline-none text-slate-800 dark:text-white border border-slate-200 dark:border-white/5" />
          </div>
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Link Verifikasi (PDF Asli)</label>
          <input v-model="certForm.link" type="url" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm outline-none text-slate-800 dark:text-white border border-slate-200 dark:border-white/5" />
        </div>

        <div>
          <label class="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Gambar / Thumbnail (.jpg, .png, .pdf)</label>
          <div class="relative flex items-center justify-center w-full px-4 py-6 bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl cursor-pointer" @click="$refs.fileInput.click()">
            <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*,application/pdf" class="hidden" />
            <div class="text-center">
              <ImagePlus class="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p class="text-xs font-bold text-slate-600 dark:text-slate-300">
                {{ certForm.imageFile ? certForm.imageFile.name : 'Klik untuk memilih file' }}
              </p>
            </div>
          </div>
        </div>

        <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest w-full mt-4 flex justify-center gap-2">
          <Save class="w-4 h-4" /> Simpan Data
        </button>
      </form>
    </div>
  </div>
</template>