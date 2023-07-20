import { Children, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Salon } from '@/types/Salon';
import * as Accordion from '@radix-ui/react-accordion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
interface CardProps {
  thumbnail: string;
  title: string;
  subtitle: string;
  value: string;
  children?: React.ReactNode;
}
const EmployeeDialogCard: FC<CardProps> = ({
  thumbnail,
  title,
  subtitle,
  value,
  children,
}) => (
  <Accordion.Item
    className=" border-2 dark:border-dark-background-contrast  w-full p-sm place-self-center "
    value={value}
    // value={`${id}-${first_name}-${last_name}-${position}`}
  >
    <Accordion.Trigger className="grid grid-flow-col w-full  justify-between group">
      <div className="grid grid-flow-col place-items-center gap-sm ">
        <div className="relative w-16 h-16 ">
          <Image src={thumbnail} alt={''} fill className="rounded-md" />
        </div>
        <div>
          <h1 className="font-sans text-lg font-semibold text-light-typography-primary">
            {title}
          </h1>
          <h2 className=" text-light-typography-contrast text-sm text-start">
            {subtitle}
          </h2>
        </div>
      </div>
      <div className="grid place-content-center place-items-center h-full justify-self-end ">
        <PlusIcon className=" w-6 h-6 group-data-[state=open]:hidden group-data-[state=closed]:block    place-self-center" />
        <MinusIcon className=" w-6 h-6 group-data-[state=closed]:hidden  group-data-[state=open]:block    place-self-center " />
      </div>
    </Accordion.Trigger>
    <Accordion.Content>
      <div className="grid place-content-center py-sm"> {children}</div>
    </Accordion.Content>
  </Accordion.Item>
);

export default EmployeeDialogCard;
