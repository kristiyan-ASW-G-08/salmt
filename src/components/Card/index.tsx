import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Salon } from '@/types/Salon';

interface CardProps {
  thumbnail: string;
  title: string;
  subtitle: string;
}
const Card: FC<CardProps> = ({ thumbnail, title, subtitle }) => (
  <article className="grid border-2 dark:border-dark-background-contrast border-light-background-contrast shadow-md rounded-md  hover:scale-105 transition duration-150 ease-in-out">
    <div className="relative w-full h-48 ">
      <Image src={thumbnail} alt={''} fill />
    </div>
    <div className="grid gap-1 p-sm">
      <h1 className="font-sans text-lg font-semibold text-light-typography-primary">
        {title}
      </h1>

      <h2 className=" text-light-typography-contrast text-sm">{subtitle}</h2>
    </div>
  </article>
);

export default Card;
