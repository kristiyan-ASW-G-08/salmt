'use client';

import Section from '@/components/Section';

import SalonContainer from '@/components/SalonContainer';
import Button from '@/components/Button';
import Link from 'next/link';
import { useSupabase } from '@/supabase/SupabaseProvider';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import queryClient from '@/utils/queryClient';
import SalonCard from '@/components/SalonCard';

const SalonsContainer = () => {
  const { supabase } = useSupabase();
  const { data, error, isLoading } = useQuery({
    queryKey: [`salons`],
    queryFn: async () => await supabase.from('salons').select('*').limit(8),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>Error</div>;
  }
  return (
    <div
      className="grid gap-md "
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr)',
      }}
    >
      {data?.data?.map(article => (
        <SalonCard key={article.id} {...article} />
      ))}
    </div>
  );
};
const SalonSection = () => {
  return (
    <Section heading="Recommended" subheading={``}>
      <div className="grid gap-md">
        <QueryClientProvider client={queryClient}>
          <SalonsContainer />
        </QueryClientProvider>
        <Button
          variant="transparent"
          size="no-padding"
          className="justify-self-end "
        >
          <Link href={'salons?page=1'}> Browse All</Link>
        </Button>
      </div>
    </Section>
  );
};

export default SalonSection;
