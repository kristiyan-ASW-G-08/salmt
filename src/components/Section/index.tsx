import { FC, ReactNode } from 'react';

interface SectionProps {
  heading: string;
  subheading: string;
  children: ReactNode;
}
const Section: FC<SectionProps> = ({ heading, subheading, children }) => (
  <section className="grid w-screen gap-md min-h-screen bg-light-background-primary dark:bg-dark-background-primary p-md lg:px-lg ">
    <div className="grid   w-full gap-sm ">
      <h1 className="font-bold font-sans text-2xl md:text-3xl dark:text-dark-typography-primary text-light-typography-primary text-start">
        {heading}
      </h1>
      <h2 className="font-semibold text-md md:text-xl dark:text-dark-typography-contrast text-light-typography-contrast text-center md:px-48">
        {subheading}
      </h2>
    </div>
    {children}
  </section>
);

export default Section;
