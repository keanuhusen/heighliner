import { createClient } from '@supabase/storage-js';

export const storage = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);
