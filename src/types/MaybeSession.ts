import type { Session } from '@supabase/auth-helpers-nextjs';

type MaybeSession = Session | null;
export default MaybeSession;
