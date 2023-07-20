'server only';

import SalonSection from '@/sections/SalonSection';
import { createServerClient } from '@/supabase/supabase-server';

import { Salon } from '@/types/Salon';

import { Metadata, ResolvingMetadata } from 'next';
import SalonContainer from './SalonContainer';
import { Employee } from '@/types/Employee';
import Script from 'next/script';

type Props = {
  params: { slug: string };
};

export const generateMetadata = async (
  { params }: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> => {
  // read route params
  const id = params.slug;
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('salons')
    .select()
    .eq('id', id)
    .single();
  const { name, description } = data as Salon;
  return {
    title: name,
    description,
  };
};

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

  return (
    <>
      {' '}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        rel="stylesheet"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      />{' '}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      />
      <SalonContainer
        salon={salon?.data as Salon}
        slug={slug}
        employees={employees?.data as Employee[]}
      />
    </>
  );
};

export default SalonPage;
