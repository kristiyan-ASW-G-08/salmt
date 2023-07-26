import { Database } from '@/types/supabase';

export type Comment = Database['public']['Tables']['comments']['Row'];
