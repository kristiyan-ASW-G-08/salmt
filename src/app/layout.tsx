'server only';

import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Roboto_Mono, Monoton, Inter } from 'next/font/google';

import { createServerClient } from '@/supabase/supabase-server';
import SupabaseProvider from '@/supabase/SupabaseProvider';
import SupabaseListener from '@/supabase/SupabaseListener';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';

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

export const metadata: Metadata = {
  title: 'Harirsaloonh',
  description: '',
  keywords: [],
  applicationName: 'Hairdresser',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={` ${roboto_mono.variable} ${monoton.variable} ${inter.variable} overflow-x-hidden max-w-screen`}
    >
      <body className=" dark:bg-dark-background-primary bg-light-background-primary font-sans overflow-x-hidden max-w-screen">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Header />
          {children}
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
