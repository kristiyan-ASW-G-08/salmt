'use client';

import { createContext, useContext, useState } from 'react';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createBrowserClient } from '@/supabase/supabase-browser';
import { Database } from '@/types/supabase';
import MaybeSession from '@/types/MaybeSession';

export type TypedSupabaseClient = SupabaseClient<Database>;

type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
};

// @ts-ignore
const Context = createContext<SupabaseContext>();

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: MaybeSession;
}) {
  const [supabase] = useState(() => createBrowserClient());

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => useContext(Context);
