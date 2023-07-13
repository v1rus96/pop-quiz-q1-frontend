import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://kmenzqtdnktckzkatrne.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZW56cXRkbmt0Y2t6a2F0cm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwNTE1MDAsImV4cCI6MjAwNDYyNzUwMH0.gGCrgLRuOrESxXTXYoW2tA7egdj7WUwyKRtaR7VUM-k";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase }

