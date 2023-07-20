import Button from '@/components/Button';
import ImageMosaic from '@/components/ImageMosaic';

const Hero = () => (
  <section className="grid md:grid-cols-2  min-h-[95vh] w-screen px-md lg:px-lg gap-sm  content-center">
    <div className="grid gap-sm place-content-center">
      <span className="font-bold font-sans text-center md:text-left text-md md:text-lg dark:text-dark-primary text-light-primary">
        AI-Assisted Resume Builder
      </span>
      <h1 className="font-black font-sans  lg:text-4xl text-4xl md:text-left dark:text-dark-typography-primary text-light-typography-primary text-center">
        Simple Online Resume and Cover Letter Builder
      </h1>
      <h2 className="font-black font-sans text-md md:text-lg md:text-left  dark:text-dark-typography-contrast text-light-typography-contrast text-center">
        Effortlessly create your perfect resume with an AI-generated cover
        letter to match in minutes.
      </h2>
      <div className="grid grid-flow-col place-content-center justify-center md:justify-start gap-3 mt-5">
        <Button size="sm">Get Started</Button>
        <Button size="sm" variant="outlined">
          Browse Saloons
        </Button>
      </div>
    </div>

    <ImageMosaic />
  </section>
);

export default Hero;
