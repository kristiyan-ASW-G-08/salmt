import React, { FC, useRef, useState } from 'react';

import { format, isValid, set } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { hasOverlappingTimeSlots } from '@/utils/schedualing';
import useTimeSlotStore from '@/stores';
import Button from '../Button';
import { useSupabase } from '@/supabase/SupabaseProvider';
import { useRouter } from 'next/navigation';
interface CalendarProps {
  schedule: any;
  service: any;
  salon: any;
  employee: any;
  openingTimes: {
    [key: string]: string;
  };
}
const Calendar: FC<CalendarProps> = ({
  schedule,
  openingTimes,
  service,
  employee,
  salon,
}) => {
  const { setSchedule } = useTimeSlotStore();
  const { session } = useSupabase();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weekDay, setWeekDay] = useState<any>('');
  const [isTimeValid, setIsTimeValid] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState('' as string);
  const [isOverlapping, setIsOverlapping] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const weekday = format(date, 'EEEE').toLowerCase();
    setWeekDay(openingTimes[weekday]);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(e.target.validity.valid);
    setIsTimeValid(e.target.validity.valid);
    setAppointmentTime(value);
  };

  console.log(schedule);
  let footer = (
    <p className="py-sm text-bold text-light-typography-primary">
      Please pick a day.
    </p>
  );
  if (selectedDate) {
    footer = (
      <p className="py-sm text-bold  text-light-typography-primary ">
        You picked {format(selectedDate, 'PP')}
      </p>
    );
  }
  if (selectedDate) {
    console.log(format(selectedDate, 'EEEE').toLowerCase());
  }
  return (
    <div className="">
      <div className="grid place-content-center p-sm">
        <DayPicker
          className="w-[80%]"
          mode="single"
          selected={selectedDate as Date}
          //@ts-ignore
          onSelect={handleDateSelect}
          footer={footer}
        />
      </div>

      <div className="grid gap-sm px-sm">
        {selectedDate && (
          <input
            className="w-full dark:text-dark-typography-primary text-light-typography-primary dark:placeholder-dark-typography-contrast placeholder-light-typography-contrast  p-2 py-3 bg-transparent font-bold placeholder:font-bold"
            type="time"
            min={weekDay?.opening_time}
            max={weekDay?.closing_time}
            //@ts-ignore
            onChange={handleTimeChange}
            required
          ></input>
        )}

        {isTimeValid && selectedDate ? (
          <Button
            variant="primary"
            onClick={() => {
              if (
                session === null ||
                session?.user === null ||
                session?.user?.id === null
              )
                return router.push('/auth');

              const newAppointment = {
                duration: service.duration,
                start_time: appointmentTime,
                client_id: session.user?.id,
                service,
              };
              if (selectedDate === null) return;
              if (schedule[selectedDate.toString()]) {
                setIsOverlapping(
                  hasOverlappingTimeSlots(
                    newAppointment,
                    schedule[selectedDate.toString()],
                  ),
                );
              }

              if (isOverlapping) return;

              const oldSchedule = schedule[selectedDate.toString()] || [];
              const newSchedule = {
                ...schedule,
                [selectedDate.toString()]: [...oldSchedule, newAppointment],
              };

              setSchedule({
                schedule: newSchedule,
                employee,
                salon,
                selectedDate: selectedDate.toString(),
                newTimeSlot: newAppointment,
              });

              router.push('/confirmation');
            }}
          >
            Appoint Service
          </Button>
        ) : (
          <p className="text-utility-error   border border-utility-error p-sm font-bold text-center">
            Please select time between {weekDay?.opening_time} and{' '}
            {weekDay?.closing_time}
          </p>
        )}
        {isOverlapping && (
          <p className="text-utility-error   border border-utility-error p-sm font-bold text-center">
            There is an overlapping appointment.
          </p>
        )}
      </div>
    </div>
  );
};
export default Calendar;
