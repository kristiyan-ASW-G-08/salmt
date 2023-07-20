'use client';
import Section from '@/components/Section';
import { useSupabase } from '@/supabase/SupabaseProvider';
import { Salon } from '@/types/Salon';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { ImageGridItem } from '@/components/ImageMosaic';
import { useRouter } from 'next/navigation';
import {
  TwitterLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import { Employee } from '@/types/Employee';
import Card from '@/components/Card';
import dynamic from 'next/dynamic';
import { Dialog, DialogPortal } from '@/components/Dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Collapsible from '@radix-ui/react-collapsible';
import Calendar from '@/components/Calendar';
import * as Accordion from '@radix-ui/react-accordion';
import EmployeeDialogCard from '@/components/EmployeeDialogCard';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
interface SalonContainerProps {
  salon: Salon;
  slug: string;
  employees: Employee[];
}
const SalonContainer: FC<SalonContainerProps> = ({
  salon,
  slug,
  employees,
}) => {
  console.log(salon, employees);

  const router = useRouter();
  const { session } = useSupabase();
  const getEmployeesThatCanDoService = (service: string) =>
    Object.entries(employees as any).filter(([key, value]: [string, any]) => {
      return value.services.includes(service);
    });
  return (
    <>
      <section className="grid w-screen gap-md  bg-light-background-primary dark:bg-dark-background-primary p-md lg:px-lg mt-[10vh]">
        <div className="grid gap-2">
          {' '}
          <div className="grid grid-flow-col gap-sm w-full justify-self-stretch">
            <h1 className="font-bold font-sans text-2xl md:text-3xl dark:text-dark-typography-primary text-light-typography-primary text-start">
              {salon.name}
            </h1>
            <div className="grid grid-flow-col gap-sm justify-self-end">
              <a className="block no-underline">
                <TwitterLogoIcon className="h-6 w-6 text-light-typography-contrast" />
              </a>
              <a className="block no-underline">
                <InstagramLogoIcon className="h-6 w-6 text-light-typography-contrast" />
              </a>
              <a className="block no-underline">
                <LinkedInLogoIcon className="h-6 w-6 text-light-typography-contrast" />
              </a>
            </div>
          </div>
          <h2 className="font-semibold text-md dark:text-dark-typography-contrast text-light-typography-contrast text-left">
            {/* @ts-ignore */}
            {`${salon?.address?.street as string}, ${salon?.address?.city}, ${
              //@ts-ignore
              salon?.address?.countryCode
            }`}
          </h2>
        </div>

        <div className="block lg:hidden relative rounded-md h-96">
          <Image
            src={salon?.thumbnail as string}
            alt={'Salon Image'}
            fill
            className="rounded-md"
          />
        </div>
        <div className=" h-[60vh] w-full gap-md hidden lg:grid three-image-mosaic">
          {(salon.gallery as string[]).map((src, index) => (
            <ImageGridItem
              key={src}
              src={src}
              alt=""
              gridArea={`image${index}`}
            />
          ))}
        </div>
      </section>
      <section className="grid w-screen gap-md  bg-light-background-primary dark:bg-dark-background-primary p-md lg:px-lg ">
        <div className="grid gap-2">
          {' '}
          <div className="grid grid-flow-col gap-sm w-full justify-self-stretch">
            <h1 className="font-bold font-sans text-2xl md:text-3xl dark:text-dark-typography-primary text-light-typography-primary text-start">
              Services
            </h1>
          </div>
        </div>
        <Dialog>
          <div
            className="grid gap-md "
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr)',
            }}
          >
            {Object.entries(salon?.services as any).map(
              ([key, value]: [string, any], index) => (
                <div key={`${key}-${index}`} className="grid">
                  <DialogPortal
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete your account and remove your
          data from our servers."
                  >
                    <div className="grid gap-md grid-flow-row  w-screen px-sm md:px-0 h-[90vh] md:w-fit md:h-fit place-content-center ">
                      <div className="grid gap-1">
                        <h1 className="text-light-typography-primary font-bold text-2xl">
                          {key}
                        </h1>

                        <p className="text-light-typography-contrast font-semibold text-md">
                          {value?.description as string}
                        </p>
                        <div className="text-light-typography-contrast font-semibold text-md grid gap-sm grid-flow-col">
                          <p>Price: ${value?.price as string}</p>
                          <p>Duration: ~{value?.duration as string} min</p>
                        </div>
                      </div>
                      <div className="grid grid-flow-row gap-sm">
                        <h2 className="text-light-typography-primary font-bold text-lg">
                          Select Staff Member
                        </h2>
                        <ScrollArea.Root className="ScrollAreaRoot h-[70vh] md:h-[40vh]">
                          <ScrollArea.Viewport className="w-full h-full">
                            <Accordion.Root
                              type="single"
                              collapsible
                              disabled={!session}
                            >
                              <div className="grid grid-cols-1 gap-md py-md  pr-sm md:pr-md  ">
                                {employees.map(employee => {
                                  const {
                                    first_name,
                                    last_name,
                                    position,
                                    id,
                                    thumbnail,
                                    schedule,
                                  } = employee;
                                  return (
                                    <a
                                      key={`${id}-${first_name}-${last_name}-${position}`}
                                      onClick={e => {
                                        e.preventDefault();
                                        if (session) return;
                                        router.push('/auth');
                                      }}
                                    >
                                      <EmployeeDialogCard
                                        thumbnail={thumbnail as string}
                                        title={
                                          `${first_name} ${last_name}` as string
                                        }
                                        subtitle={position as string}
                                        value={`${id}-${first_name}-${last_name}-${position}`}
                                      >
                                        <Calendar
                                          employee={employee}
                                          salon={salon}
                                          service={value as any}
                                          schedule={schedule}
                                          openingTimes={
                                            salon?.opening_times as any
                                          }
                                        />
                                      </EmployeeDialogCard>
                                    </a>
                                  );
                                })}
                              </div>
                            </Accordion.Root>
                          </ScrollArea.Viewport>
                          <ScrollArea.Scrollbar
                            className="ScrollAreaScrollbar flex bg-light-background-contrast p-[2px] touch-none	select-none	"
                            orientation="vertical"
                          >
                            <ScrollArea.Thumb className="flex-1 bg-light-primary relative rounded-md" />
                          </ScrollArea.Scrollbar>
                          <ScrollArea.Scrollbar
                            className="ScrollAreaScrollbar"
                            orientation="horizontal"
                          >
                            <ScrollArea.Thumb className="ScrollAreaThumb" />
                          </ScrollArea.Scrollbar>
                          <ScrollArea.Corner className="ScrollAreaCorner" />
                        </ScrollArea.Root>
                      </div>
                    </div>
                  </DialogPortal>
                  <DialogTrigger key={key} onClick={() => {}}>
                    <ServiceCard
                      name={key}
                      //@ts-ignore
                      price={value?.price as string}
                      //@ts-ignore
                      duration={value?.duration as string}
                      //@ts-ignore
                      description={value?.description as string}
                    />
                  </DialogTrigger>
                </div>
              ),
            )}
          </div>
        </Dialog>
      </section>
      <section className="grid w-screen gap-md  bg-light-background-primary dark:bg-dark-background-primary p-md  lg:px-lg">
        <div className="grid gap-2">
          {' '}
          <h1 className="font-bold font-sans text-2xl md:text-3xl dark:text-dark-typography-primary text-light-typography-primary text-start">
            Team
          </h1>
          <h2 className="font-semibold text-md dark:text-dark-typography-contrast text-light-typography-contrast text-left">
            {salon.team_description}
          </h2>
        </div>
        <div
          className="grid gap-md "
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr)',
          }}
        >
          {employees.map(
            ({ first_name, last_name, position, id, thumbnail }) => (
              <Card
                key={`${id}-${first_name}-${last_name}-${position}`}
                title={`${first_name} ${last_name}` as string}
                subtitle={position as string}
                thumbnail={thumbnail as string}
              />
            ),
          )}
        </div>
      </section>
      <section className="grid w-screen gap-md  bg-light-background-primary dark:bg-dark-background-primary p-md lg:px-lg">
        <div className="grid gap-2">
          {' '}
          <h1 className="font-bold font-sans text-2xl md:text-3xl dark:text-dark-typography-primary text-light-typography-primary text-start">
            {salon.name}
          </h1>
          <h2 className="font-semibold text-md dark:text-dark-typography-contrast text-light-typography-contrast text-left">
            {salon.description}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="grid gap-sm grid-flow-row">
            <h1 className="text-xl text-light-typography-primary font-bold">
              Opening Times
            </h1>
            <div className="grid grid-cols-2 justify-self-start">
              <ul className="grid grid-flow-row gap-sm">
                {Object.keys(salon?.opening_times as any).map(key => (
                  <li
                    key={key}
                    className="text-md text-light-typography-contrast font-medium grid gap-base grid-flow-col justify-start"
                  >
                    <span> {key}</span>
                  </li>
                ))}
              </ul>
              <ul className=" grid grid-flow-row gap-sm">
                {Object.values(salon?.opening_times as any).map(
                  //@ts-ignore
                  ({ opening_time, closing_time }, index) => (
                    <li
                      key={`${opening_time}-${closing_time}-${index}`}
                      className="text-md text-light-typography-contrast font-medium grid gap-base grid-flow-col justify-start"
                    >
                      <span>
                        {opening_time as string} AM - {opening_time as string}{' '}
                        PM
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="grid gap-sm grid-flow-row content-start">
            <h1 className="text-xl text-light-typography-primary font-bold">
              Contact Information
            </h1>
            <ul className=" grid grid-flow-row gap-sm">
              <li className="text-md text-light-typography-contrast font-medium grid gap-base grid-flow-col justify-start   content-center gap-sm">
                <PhoneIcon className=" h-4 w-4 text-light-typography-contras self-center block" />{' '}
                <span className="block">+123456789</span>
              </li>
              <li className="text-md text-light-typography-contrast font-medium grid gap-base grid-flow-col justify-start  content-center gap-sm">
                <EnvelopeIcon className=" h-4 w-4 text-light-typography-contras  self-center block" />{' '}
                <span className="block">
                  {salon?.name?.toLowerCase()}@salon.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default SalonContainer;
