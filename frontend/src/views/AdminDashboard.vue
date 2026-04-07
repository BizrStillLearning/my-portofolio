<script setup>
import { ref } from 'vue';
import { db, auth, storage } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { Trophy, Upload, X, LogOut, CheckCircle, FileText } from 'lucide-vue-next';

const router = useRouter();

const newCert = ref({
  title: '',
  issuer: '',
  date: '',
  link: ''
});

const imageFile = ref(null);
const imagePreview = ref(null);
const isPdf = ref(false);
const isSaving = ref(false);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;

    if (file.type === 'application/pdf') {
      isPdf.value = true;
      imagePreview.value = null;
    } else {
      isPdf.value = false;
      imagePreview.value = URL.createObjectURL(file);
    }
  }
};

const removeImage = () => {
  imageFile.value = null;
  imagePreview.value = null;
  isPdf.value = false;
};

const saveCertificate = async () => {
  if (!newCert.value.title || !imageFile.value) {
    return alert("Judul dan File wajib diisi!");
  }

  isSaving.value = true;
  try {
    const fileName = `${Date.now()}_${imageFile.value.name}`;
    const fileRef = storageRef(storage, `certificates/${fileName}`);

    await uploadBytes(fileRef, imageFile.value);

    const downloadURL = await getDownloadURL(fileRef);

    await addDoc(collection(db, "certificates"), {
      ...newCert.value,
      image: downloadURL,
      fileType: isPdf.value ? 'pdf' : 'image',
      createdAt: new Date()
    });

    alert("Sertifikat Berhasil Diupload!");

    newCert.value = { title: '', issuer: '', date: '', link: '' };
    removeImage();
  } catch (error) {
    console.error("Gagal simpan:", error);
    alert("Error: " + error.message);
  } finally {
    isSaving.value = false;
  }
};

const handleLogout = async () => {
  await signOut(auth);
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-8 transition-colors duration-500">
    <div class="max-w-5xl mx-auto">

      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 class="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Control <span class="text-blue-600">Panel</span>
          </h1>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Manage your certificates & achievements</p>
        </div>
        <button @click="handleLogout" class="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-red-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm">
          <LogOut class="w-4 h-4 transition-transform group-hover:translate-x-1" /> Logout
        </button>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/5 shadow-2xl">
            <h2 class="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
              <div class="p-2 bg-blue-600 rounded-lg"><Trophy class="w-5 h-5 text-white" /></div>
              Add New Certificate
            </h2>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Certificate Title</label>
                  <input v-model="newCert.title" type="text" placeholder="e.g. Fullstack Web Dev" class="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 dark:text-white outline-none transition-all" />
                </div>
                <div>
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Issuer / Organization</label>
                  <input v-model="newCert.issuer" type="text" placeholder="e.g. Google, Dicoding" class="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 dark:text-white outline-none transition-all" />
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Issue Date</label>
                  <input v-model="newCert.date" type="text" placeholder="e.g. March 2026" class="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 dark:text-white outline-none transition-all" />
                </div>
                <div>
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2">Credential Link (URL)</label>
                  <input v-model="newCert.link" type="text" placeholder="https://..." class="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-slate-900 dark:text-white outline-none transition-all" />
                </div>
              </div>
            </div>

            <button @click="saveCertificate" :disabled="isSaving" class="mt-10 w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3">
              <span v-if="!isSaving" class="flex items-center gap-2">Publish Certificate <CheckCircle class="w-4 h-4" /></span>
              <span v-else class="flex items-center gap-2 animate-pulse text-blue-100">Uploading to Cloud...</span>
            </button>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-2xl h-full flex flex-col">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block text-center">Certificate File</label>

            <div v-if="!imageFile" class="relative group flex-1 min-h-[250px]">
              <input type="file"
                     @change="onFileChange"
                     accept="image/*,application/pdf"
                     class="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer" />
              <div class="h-full border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-6 transition-all group-hover:border-blue-600 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-600/5">
                <div class="p-4 bg-slate-100 dark:bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload class="w-8 h-8 text-slate-400 group-hover:text-blue-600" />
                </div>
                <p class="text-xs font-bold text-slate-500 dark:text-slate-400 text-center uppercase tracking-tighter">Drop Image or PDF</p>
                <p class="text-[9px] text-slate-400 mt-2 font-medium">MAX SIZE: 5MB</p>
              </div>
            </div>

            <div v-else class="relative flex-1 min-h-[250px] rounded-[2rem] overflow-hidden group bg-slate-100 dark:bg-white/5 flex items-center justify-center">

              <img v-if="!isPdf" :src="imagePreview" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

              <div v-else class="flex flex-col items-center p-6 text-center">
                <div class="p-5 bg-red-500/10 rounded-2xl mb-4">
                  <FileText class="w-16 h-16 text-red-500" />
                </div>
                <p class="text-xs font-black text-slate-700 dark:text-slate-200 uppercase truncate max-w-[150px]">{{ imageFile.name }}</p>
                <p class="text-[10px] font-bold text-red-500 uppercase mt-1">PDF Document</p>
              </div>

              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <button @click="removeImage" class="p-4 bg-red-500 text-white rounded-full hover:scale-110 transition-transform active:scale-95 shadow-xl">
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>