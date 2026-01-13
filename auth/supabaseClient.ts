// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ydqaecuvaxdtarnhzmgc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_hOneJVik9XXX0z5Tp6s5EA_hwswU3NP';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
