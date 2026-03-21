## 🗄️ Database Architecture

Dokumentasi skema database untuk mendukung ekosistem aplikasi portofolio, manajemen sekolah (**SantriConnect**), dan tracking riset AI.

### 1. Tabel: `users`
Menyimpan data kredensial administrator dan hak akses sistem.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key | Unique ID menggunakan format UUID. |
| `username` | Varchar(50) | Unique, Not Null | Username untuk login (e.g., bizrrr_ae). |
| `email` | Varchar(100) | Unique, Not Null | Alamat email resmi. |
| `password` | Varchar(255) | Not Null | Hash password (Argon2/BCrypt). |
| `role` | Enum | Not Null | 'admin', 'editor', 'viewer'. |
| `last_login` | Timestamp | Nullable | Jejak waktu aktivitas terakhir. |

### 2. Tabel: `projects`
Data proyek lintas platform (**Android**, **Web**, **Fullstack**, **AI**).

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | Int | Primary Key, Auto Inc | ID Proyek. |
| `title` | Varchar(150) | Not Null | Nama Proyek (e.g., SantriConnect). |
| `category` | Enum | Not Null | 'android', 'fullstack', 'frontend', 'ai'. |
| `tech_stack` | Json | Not Null | Array teknologi (e.g., ["Vue", "Go", "Laravel"]). |
| `description_id` | Text | Not Null | Deskripsi dalam Bahasa Indonesia. |
| `description_en` | Text | Not Null | Deskripsi dalam Bahasa Inggris. |
| `github_url` | Varchar(255) | Nullable | Link repositori GitHub (e.g., adityamaulanazidqy). |
| `demo_url` | Varchar(255) | Nullable | Link live demo/preview. |
| `is_featured` | Boolean | Default False | Status untuk ditampilkan di "Top Project". |

### 3. Tabel: `skills`
Manajemen data keahlian teknologi dan level penguasaan.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | Int | Primary Key | ID Keahlian. |
| `name` | Varchar(50) | Not Null | Nama Tech (e.g., JavaScript, Rust, Kotlin). |
| `category` | Enum | Not Null | 'frontend', 'backend', 'mobile', 'ai'. |
| `proficiency` | Int | Range 0-100 | Level penguasaan dalam persentase. |
| `icon_slug` | Varchar(50) | Not Null | Slug untuk SimpleIcons API. |
| `is_learning` | Boolean | Default False | Status jika teknologi sedang dipelajari (Riset). |

### 4. Tabel: `contact_messages`
Penyimpanan pesan masuk dari form kontak portfolio.

| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | BigInt | Primary Key | ID Pesan. |
| `sender_name` | Varchar(100) | Not Null | Nama pengirim pesan. |
| `sender_email` | Varchar(150) | Not Null | Email pengirim untuk follow-up. |
| `message` | Text | Not Null | Isi pesan diskusi/proyek. |
| `status` | Enum | Default 'unread' | Status: 'unread', 'read', 'replied'. |
| `created_at` | Timestamp | Default NOW() | Waktu pesan diterima. |

---

### 🛠️ Entity Relationship Diagram (Mermaid)

```mermaid
erDiagram
    USERS {
        uuid id PK
        varchar username
        varchar email
        varchar password
        enum role
        timestamp last_login
    }

    PROJECTS {
        int id PK
        varchar title
        enum category
        json tech_stack
        text description_id
        text description_en
        varchar github_url
        varchar demo_url
        boolean is_featured
    }

    SKILLS {
        int id PK
        varchar name
        enum category
        int proficiency
        varchar icon_slug
        boolean is_learning
    }

    CONTACT_MESSAGES {
        bigint id PK
        varchar sender_name
        varchar sender_email
        text message
        enum status
        timestamp created_at
    }

    USERS ||--o{ PROJECTS : "manages"
    PROJECTS }|--|{ SKILLS : "built_with"
    CONTACT_MESSAGES }|--|| USERS : "assigned_to"