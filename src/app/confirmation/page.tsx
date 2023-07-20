'use client';

import Section from '@/components/Section';
import useTimeSlotStore from '@/stores';
import Card from '@/components/Card';
import Image from 'next/image';
import Button from '@/components/Button';
import { useSupabase } from '@/supabase/SupabaseProvider';
import { useRouter } from 'next/navigation';
export const getHumanReadableDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });

  return `${month} ${date.getFullYear()}`;
};
const ConfirmationPage = () => {
  const { schedule, salon, employee, newTimeSlot, selectedDate, reset } =
    useTimeSlotStore();
  console.log(schedule, salon, employee);
  const router = useRouter();
  const { supabase, session } = useSupabase();
  return (
    <div className="grid  h-screen w-screen mt-[10vh]">
      <section className="grid w-screen gap-sm  bg-light-background-primary dark:bg-dark-background-primary p-md lg:px-lg h-[30vh] bg-red-500] ">
        <div className="grid   w-full gap-sm ">
          <h1 className="font-bold font-sans text-2xl md:text-3xl dark:text-dark-typography-primary text-light-typography-primary text-center md:text-start">
            {newTimeSlot
              ? 'Confirm your appointment'
              : 'There are no appointments  to confirm'}
          </h1>
          {newTimeSlot && (
            <h2 className="font-semibold text-md md:text-xl dark:text-dark-typography-contrast text-light-typography-contrast text-center md:text-left  ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              eligendi pariatur dolor eum deserunt, ad porro asperiores
              perferendis distinctio minima!
            </h2>
          )}
        </div>
        {newTimeSlot ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_8fr] p-md border-2 dark:border-dark-background-contrast border-light-background-contrast shadow-md rounded-md gap-md">
              <div className="relative w-full h-56 md:w-36 md:h-36 ">
                <Image
                  src={employee.thumbnail}
                  alt={''}
                  fill
                  className="rounded-md"
                />
              </div>

              <div className="grid gap-1 ">
                <h1 className="font-sans text-lg font-semibold text-light-typography-primary">
                  {newTimeSlot?.service.name}
                </h1>
                <p className="font-sans text-lg font-semibold text-light-typography-primary">
                  Price - ${newTimeSlot?.service.price}
                </p>

                <p className=" text-light-typography-contrast text-md">
                  {newTimeSlot?.service.description}
                </p>
                <p className=" text-light-typography-contrast text-md">
                  Scheduled for {newTimeSlot?.start_time}{' '}
                  {getHumanReadableDate(selectedDate)}
                </p>
                <p className=" text-light-typography-contrast text-md">
                  Duration : ~{newTimeSlot?.duration}minutes
                </p>
              </div>
            </div>
            <div className="grid grid-flow-col gap-sm justify-self-stretch md:justify-self-start">
              <Button
                variant="primary"
                size="md"
                className=""
                onClick={async () => {
                  const { error } = await supabase
                    .from('employees')
                    //@ts-ignore
                    .update({ schedule: schedule })
                    .match({ id: employee.id });
                  if (error) {
                    console.log(error);
                  } else {
                    router.replace('/');
                  }
                }}
              >
                Confirm
              </Button>
              <Button
                variant="error"
                size="md"
                className=""
                onClick={() => {
                  reset();
                  router.back();
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="grid grid-flow-col gap-sm justify-self-stretch md:justify-self-start items-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                router.back();
              }}
            >
              Go Back
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ConfirmationPage;
