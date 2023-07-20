'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import Link from 'next/link';

import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/supabase/SupabaseProvider';
import queryClient from '@/utils/queryClient';
import SalonCard from '@/components/SalonCard';
const Container: FC = () => {
  const params = useSearchParams();
  const page = parseInt(params.get('page') as string) || 1;
  console.log(page);

  const { supabase } = useSupabase();
  const PAGE_SIZE = 12;

  const start = (page - 1) * PAGE_SIZE;
  const end = page * PAGE_SIZE - 1;
  console.log(start, end);
  const { data, error, isLoading } = useQuery({
    queryKey: [`salons-${page}`],
    queryFn: async () =>
      await supabase
        .from('salons')
        .select('*', { count: 'exact' })
        .range(start, end),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>Error</div>;
  }
  console.log(data);
  console.log(end <= (data?.count as number), end, data?.count);
  return <>sadasda</>;
};

const ArticleSection = () => (
  <QueryClientProvider client={queryClient}>
    <Container />
  </QueryClientProvider>
);
export default ArticleSection;
