import { createClient } from '@supabase/supabase-js'

const VITE_SUPABASE_URL='consthttps://pssdmcfjxsfhxoaadtvx.supabase.co'
const VITE_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzc2RtY2ZqeHNmaHhvYWFkdHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NDA5MjYsImV4cCI6MjAxNjMxNjkyNn0.Gdyl5mzRnvhm064wk5Gzo-bvsd1eC0O1Q-ilULCXsKI'

export const supabase = createClient(
  /*
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  */
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: true,
    },
  },
);
