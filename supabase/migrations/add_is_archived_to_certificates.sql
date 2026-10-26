-- ==============================================================================
-- Migration: Tambahkan Kolom is_archived ke Tabel certificates
-- ==============================================================================
-- Jalankan skrip ini pada Supabase SQL Editor:
-- 1. Buka Supabase Dashboard > Pilih Project Anda
-- 2. Klik menu 'SQL Editor' di sidebar kiri
-- 3. Paste kode di bawah ini lalu klik tombol 'Run'
-- ==============================================================================

-- 1. Tambahkan kolom is_archived dengan tipe boolean dan default false
ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT FALSE;

-- 2. Berikan nilai default FALSE untuk data sertifikat yang sudah ada sebelumnya
UPDATE certificates 
SET is_archived = FALSE 
WHERE is_archived IS NULL;

-- 3. Buat index opsional untuk mempercepat query filtering
CREATE INDEX IF NOT EXISTS idx_certificates_is_archived ON certificates (is_archived);
