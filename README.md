# 🚀 Kaizer — Portfolio & CMS

**Portofolio profesional berbasis Vue.js 3 dengan integrasi GitHub API dinamis dan Supabase Headless CMS.**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge\&logo=vue.js\&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3ECF8E?style=for-the-badge\&logo=supabase\&logoColor=white)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vitejs.dev/)

**[Lihat Live Demo](https://abidzar-dzakwan.vercel.app/)** · [Laporkan Bug](#) · [Minta Fitur](#)

---

## 🌟 Sorotan Fitur

Proyek ini bukan sekadar portofolio statis, melainkan sebuah **Web Application (SPA)** berskala penuh yang dilengkapi dengan panel admin (*Content Management System*) dan penarikan data secara dinamis.

### 🔄 Live GitHub Synchronization

Menggunakan GitHub REST API untuk menarik, memfilter, dan menampilkan:

* Repositori publik
* Jumlah *stars*
* Statistik bahasa pemrograman berdasarkan jumlah *bytes*
* Timeline pembaruan repositori

Data dapat diperbarui secara otomatis tanpa perlu mengubah konten portfolio secara manual.

### 🔐 Secure Admin Control Hub

Dashboard admin tersembunyi yang dilindungi menggunakan **Supabase Authentication** untuk mengelola konten website secara terpusat.

### 📄 Dynamic CV & Certificate Manager

Memungkinkan admin untuk mengunggah:

* CV dalam format PDF
* Sertifikat
* Dokumen pendukung lainnya

File disimpan menggunakan **Supabase Storage** dan dapat diperbarui secara dinamis pada halaman publik.

### 🌍 Enterprise-Grade i18n

Dukungan multi-bahasa yang scalable menggunakan `vue-i18n`.

Bahasa yang direncanakan/didukung:

* 🇮🇩 Indonesia
* 🇬🇧 English
* 🇯🇵 Japanese
* 🇰🇷 Korean
* 🇨🇳 Chinese
* 🇪🇸 Spanish
* 🇸🇦 Arabic

### 🎨 Modern UI/UX & Motion

Menggunakan desain **glassmorphism** minimalis dengan:

* Responsive design
* Dark / Light Mode
* Smooth transitions
* Motion animation menggunakan `@vueuse/motion`
* Component-driven UI

### 📱 Direct WhatsApp Integration

Sistem kontak tanpa server tambahan yang mengubah formulir kontak klien menjadi pesan WhatsApp yang siap dikirim.

---

## 🏗️ Arsitektur Teknologi

| Kategori                 | Teknologi                    | Deskripsi                                                                  |
| :----------------------- | :--------------------------- | :------------------------------------------------------------------------- |
| **Frontend Framework**   | `Vue 3 (Composition API)`    | Pendekatan reaktif modern untuk pengembangan UI.                           |
| **Build Tool**           | `Vite`                       | *Bundler* cepat dengan dukungan HMR (*Hot Module Replacement*).            |
| **Styling**              | `Tailwind CSS v3`            | *Utility-first CSS framework* untuk desain UI yang konsisten.              |
| **Backend as a Service** | `Supabase`                   | Platform backend terpadu berbasis PostgreSQL, Authentication, dan Storage. |
| **State Management**     | `Pinia`                      | Manajemen *state* terpusat, termasuk pengelolaan tema.                     |
| **Routing**              | `Vue Router`                 | Penanganan routing SPA dan *navigation guards*.                            |
| **Icons & Alerts**       | `Lucide Vue` & `SweetAlert2` | Ikon SVG berbasis komponen dan sistem notifikasi.                          |
| **Internationalization** | `vue-i18n`                   | Sistem multi-bahasa untuk aplikasi.                                        |

---

## 📂 Struktur Direktori Proyek

Proyek menggunakan struktur modular berbasis **Component-Driven Architecture** untuk menjaga skalabilitas dan kemudahan pemeliharaan.

```text
├── src/
│   ├── assets/              # Aset statis (gambar, CSS global, font)
│   ├── components/          # Komponen UI modular
│   │   ├── admin/           # Komponen khusus Admin Dashboard
│   │   └── portfolio/       # Komponen untuk tab Portfolio
│   ├── locales/             # File terjemahan multi-bahasa
│   ├── router/              # Konfigurasi Vue Router & proteksi halaman
│   ├── stores/              # Pinia Stores
│   ├── views/               # Halaman aplikasi
│   ├── App.vue              # Root component
│   ├── main.js              # Entry point aplikasi
│   └── supabase.js          # Inisialisasi Supabase Client
│
├── .env                     # Environment variables (tidak di-commit)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Panduan Instalasi Lokal

Ikuti langkah berikut untuk menjalankan proyek di lingkungan lokal.

### 1. Kebutuhan Sistem

Pastikan perangkat telah memiliki:

* [Node.js](https://nodejs.org/) `v16.x` atau lebih baru
* NPM, Yarn, atau pnpm
* Git

### 2. Clone Repository

```bash
git clone https://github.com/BizrStillLearning/my-portofolio.git
cd my-portofolio
```

### 3. Instalasi Dependensi

Menggunakan NPM:

```bash
npm install
```

Atau menggunakan Yarn:

```bash
yarn install
```

Atau menggunakan pnpm:

```bash
pnpm install
```

### 4. Konfigurasi Environment Variables

Buat file `.env` di root direktori, sejajar dengan `package.json`.

Contoh:

```env
# Supabase Configuration
# Wajib untuk Admin CMS
VITE_SUPABASE_URL=https://[PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]

# GitHub Configuration
# Digunakan untuk Portfolio Synchronization
VITE_GITHUB_TOKEN=[YOUR_GITHUB_PERSONAL_ACCESS_TOKEN]

# Admin Configuration
VITE_ADMIN_EMAIL=your-admin-email@example.com
```

> [!WARNING]
> Jangan pernah melakukan commit terhadap file `.env` atau membagikan secret/API key ke repository publik.
>
> Pastikan `.env` sudah tercantum di dalam `.gitignore`.

### 5. Jalankan Development Server

```bash
npm run dev
```

Aplikasi biasanya dapat diakses melalui:

```text
http://localhost:5173
```

---

## 🚀 Deployment

Proyek ini dapat di-deploy menggunakan **Vercel**.

### 1. Hubungkan Repository

Hubungkan repository GitHub dengan project baru di Vercel.

### 2. Konfigurasi Environment Variables

Masukkan seluruh environment variables yang diperlukan ke:

**Vercel → Project → Settings → Environment Variables**

Contoh variable:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_GITHUB_TOKEN
VITE_ADMIN_EMAIL
```

### 3. Konfigurasi Supabase

Tambahkan URL deployment Vercel ke konfigurasi URL pada Supabase, terutama:

* **Site URL**
* **Redirect URLs**

Contoh:

```text
https://your-project.vercel.app
```

Konfigurasi ini diperlukan agar proses authentication dapat berjalan dengan benar pada environment production.

---

## 🔐 Security Notes

Beberapa konfigurasi perlu diperhatikan ketika project di-deploy ke production.

### Environment Variables

Jangan memasukkan credential sensitif secara langsung ke source code.

Gunakan:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

dan simpan konfigurasi sebenarnya hanya pada environment lokal atau deployment platform.

### GitHub Token

Jika menggunakan GitHub Personal Access Token, pastikan token:

* Memiliki permission seminimal mungkin
* Tidak memiliki scope yang tidak diperlukan
* Tidak pernah di-*hardcode* ke source code
* Tidak pernah di-commit ke repository

> **Catatan:** Variable dengan prefix `VITE_` dapat terekspos ke browser pada aplikasi Vite. Karena itu, **jangan menaruh secret berprivilege tinggi di dalam `VITE_*`**. Untuk kebutuhan yang benar-benar rahasia, gunakan backend/server-side function.

---

## 📡 Integrasi Utama

### GitHub API

Portfolio mengambil informasi repository dari GitHub untuk menampilkan data project secara dinamis.

Data yang dapat digunakan antara lain:

* Repository name
* Description
* Stars
* Languages
* Repository URL
* Last update
* Repository metadata

### Supabase

Supabase digunakan sebagai backend service untuk:

* Authentication
* PostgreSQL Database
* Storage
* Content Management
* Dynamic document management

### WhatsApp

Form kontak dapat dikonversi menjadi URL WhatsApp sehingga pengunjung dapat langsung mengirim pesan tanpa membutuhkan sistem messaging backend.

---

## 🌐 Live Demo

**Portfolio:**

https://abidzar-dzakwan.vercel.app/

**Repository:**

https://github.com/BizrStillLearning/my-portofolio

---

## 👨‍💻 Penulis

### Abidzar Dzakwan Sahudi

**Informatics Undergraduate Student**

* GitHub: [@BizrStillLearning](https://github.com/BizrStillLearning)
* LinkedIn: [Abidzar Dzakwan Sahudi](https://www.linkedin.com/in/abidzar-dzakwan-sahudi-011593388/)
* Instagram: [@bizrrr_ae](https://instagram.com/bizrrr_ae)

---

## 📄 License

Hak Cipta © 2026 **Abidzar Dzakwan**.

All Rights Reserved.

---

<div align="center">

**Dibuat dengan Vue.js. + TailwindCSS**

</div>
