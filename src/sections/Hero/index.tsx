import Button from '@/components/Button';
import ImageMosaic from '@/components/ImageMosaic';
import Link from 'next/link';

const Hero = () => (
  <section className="grid md:grid-cols-2  min-h-[95vh] w-screen px-md lg:px-lg gap-sm  content-center">
    <div className="grid gap-sm place-content-center">
      <span className="font-bold font-sans text-center md:text-left text-md md:text-lg dark:text-dark-primary text-light-primary">
        AcmeHair
      </span>
      <h1 className="font-black font-sans  lg:text-4xl text-4xl md:text-left dark:text-dark-typography-primary text-light-typography-primary text-center">
        Unleash the Potential of Your Salon
      </h1>
      <h2 className="font-black font-sans text-md md:text-lg md:text-left  dark:text-dark-typography-contrast text-light-typography-contrast text-center">
        Your ultimate solution for salon success! Streamline your hairdresser
        management with our user-friendly application, designed to elevate your
        salon to new heights.
      </h2>
      <div className="grid grid-flow-col place-content-center justify-center md:justify-start gap-3 mt-5">
        <Link href="/saloons">
          <Button size="sm" variant="outlined">
            Browse Saloons
          </Button>
        </Link>
      </div>
    </div>

    <ImageMosaic />
  </section>
);

export default Hero;
