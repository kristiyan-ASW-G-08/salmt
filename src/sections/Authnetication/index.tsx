'use client';
// import { useEffect, useState } from 'react';
// import { Metadata } from 'next';
// import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { useSupabase } from '@/supabase/SupabaseProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const colors = {
  brand: '#14b8a6',
  brandAccent: '#0d9488',
  brandButtonText: '#fafafa',
};
const Authentication = () => {
  const { theme, setTheme } = useTheme();
  const { supabase, session } = useSupabase();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.back();
    }
  });
  console.log(router);
  return (
    <section className="h-screen w-screen place-content-center  p-md lg:px-lg pt-lg grid grid-cols-2'">
      <div className="grid justify-start">
        <div className="w-[90vw] md:w-96 border-light-background-contrast shadow-md rounded-md p-sm">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              extend: true,
              variables: {
                default: {
                  colors,
                },
              },
            }}
            redirectTo="/auth"
            providers={[]}
            theme={theme}
          />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Authentication;
