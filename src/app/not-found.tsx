'use client';

import router from 'next/navigation';
import Button from '@/components/Button';
import Link from 'next/link';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import { createServerClient } from '@/supabase/supabase-server';
import SupabaseProvider from '@/supabase/SupabaseProvider';
import SupabaseListener from '@/supabase/SupabaseListener';
('server only');

import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Roboto_Mono, Monoton, Inter } from 'next/font/google';
// someaaaa;
const inter = Inter({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const monoton = Monoton({
  weight: '400',
  variable: '--font-monoton',
  subsets: ['latin'],
  display: 'swap',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default  function NotFound() {
  return (

      
        <main className="h-[90vh] w-screen grid place-content-center">
          <section className="grid gap-sm place-content-center">
            <h1 className="font-black font-sans  lg:text-4xl text-4xl md:text-left dark:text-dark-typography-primary text-light-typography-primary text-center">
              Not Found
            </h1>
            <h2 className="font-black font-sans text-md md:text-lg md:text-left  dark:text-dark-typography-contrast text-light-typography-contrast text-center">
              Could not find requested resource
            </h2>

            <div className="grid grid-flow-col place-content-center justify-center md:justify-start gap-3 mt-5">
              <Button variant="primary" size="sm">
                Go Back
              </Button>
              <Link href="/">
                <Button size="sm">Home</Button>
              </Link>
            </div>
          </section>
        </main>



  );
}
