import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lkvhsmvveypitblihsyc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdmhzbXZ2ZXlwaXRibGloc3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzkyMDksImV4cCI6MjA3NjExNTIwOX0.z-9T1mgXr2oqNyIIk1VFZpTLy96Xz8cd6otwqVO0CWs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

