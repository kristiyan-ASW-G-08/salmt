import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
interface ServiceCardProps {
  name: string;
  price: string;
  duration: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({
  name,
  price,
  duration,
  description,
}) => {
  return (
    <article className="grid grid-flow-col justify-between p-sm rounded-md shadow-md border border-light-background-contrast hover:scale-105 transition duration-150 ease-in-out hover:border-light-primary">
      <h1>{name}</h1>
      <PlusIcon className="h-6 w-6" />
    </article>
  );
};

export default ServiceCard;
