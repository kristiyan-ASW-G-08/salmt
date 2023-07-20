import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Salon } from '@/types/Salon';
import Card from '../Card';

const SalonCard: FC<Salon> = ({
  id,
  thumbnail,
  name,
  description,
  address,
}) => (
  <Link href={`/salons/${id}`}>
    <Card
      thumbnail={thumbnail as string}
      title={name as string}
      subtitle={Object.values(address as any)
        .map(value => value)
        .join(', ')}
    />
  </Link>
);

export default SalonCard;
