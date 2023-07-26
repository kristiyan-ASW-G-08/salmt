'server only';

import SalonSection from '@/sections/SalonSection';
import { createServerClient } from '@/supabase/supabase-server';

import { Salon } from '@/types/Salon';
import { Comment } from '@/types/Comment';
import { Metadata, ResolvingMetadata } from 'next';
import SalonContainer from './SalonContainer';
import { Employee } from '@/types/Employee';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Button from '@/components/Button';
import Link from 'next/link';

const SalonPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const supabase = createServerClient();
  const salon = await supabase.from('salons').select().eq('id', slug).single();
  const employees = await supabase
    .from('employees')
    .select()
    .eq('salon_id', salon?.data?.id);
  const reviews = await supabase
    .from('comments')
    .select()
    .eq('salon_id', salon?.data?.id);
  console.log(reviews, 'Reviews');
  return (
    <>
      {salon.error ? (
        <div className="h-[90vh] w-screen grid place-content-center">
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
        </div>
      ) : (
        <SalonContainer
          salon={salon?.data as Salon}
          slug={slug}
          employees={employees?.data as Employee[]}
          reviews={reviews?.data as any[]}
        />
      )}
    </>
  );
};

export default SalonPage;
