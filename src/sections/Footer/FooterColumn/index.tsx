import { FC } from 'react';
import Link from 'next/link';
import { FooterColumnProps } from '..';

const FooterColumn: FC<FooterColumnProps> = ({ title, navigation }) => {
  return (
    <div className="grid  gap-sm content-start ">
      <p className="text-md md:text-lg font-bold dark:text-dark-typography-primary text-light-typography-primary">
        {title}
      </p>
      <ul className="grid  gap-sm ">
        {navigation.map(({ label, href }) => (
          <li
            key={href}
            className="text-sm md:text-md font-semibold dark:text-dark-typography-contrast hover:dark:text-dark-typography-primary  text-light-typography-contrast hover:text-light-typography-primary "
          >
            <Link href={href} className="">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FooterColumn;
