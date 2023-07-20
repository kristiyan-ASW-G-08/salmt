import { create } from 'zustand';
import { TimeSlot } from '@/classes/Schedualer';
const useTimeSlotStore = create<{
  schedule: TimeSlot[];
  newTimeSlot: TimeSlot | null;
  selectedDate: string;
  employee: any;
  salon: any;
  reset: () => void;
  setSchedule: ({ schedule, employee, salon, newTimeSlot }: any) => void;
}>(set => ({
  schedule: [],
  newTimeSlot: null,
  salon: null,
  selectedDate: '',
  employee: null,
  setSchedule: ({ schedule, employee, salon, newTimeSlot, selectedDate }) =>
    set({ schedule, salon, employee, newTimeSlot, selectedDate }),
  reset: () => set({ schedule: [], employee: null, salon: null }),
}));

export default useTimeSlotStore;
