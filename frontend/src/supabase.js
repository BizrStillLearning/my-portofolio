import { createClient } from '@supabase/supabase-js'

// Ambil URL dari dashboard (yang ada tombol Copy di gambar kamu)
const supabaseUrl = 'https://fdsjuiwoiuvvzmvwlwif.supabase.co'

// Ambil anon key dari menu Settings > API tadi
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkc2p1aXdvaXV2dnptdndsd2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5OTIwNTgsImV4cCI6MjA5MzU2ODA1OH0.ffthfFqtHjoyUvzf1uwuRkQUAzPHY4b_LMohlg_e3_M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)