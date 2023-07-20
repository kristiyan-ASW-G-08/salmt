export interface TimeSlot {
  client_id: string;
  service: any;
  start_time: string;
  duration: number;
}


export const doTimeSlotsOverlap = (
  existingSlot: TimeSlot,
  newSlot: TimeSlot,
): boolean => {
  const existingStart = new Date(`1970-01-01T${existingSlot.start_time}:00`);
  const existingEnd = new Date(
    existingStart.getTime() + existingSlot.duration * 60000,
  );

  const newStart = new Date(`1970-01-01T${newSlot.start_time}:00`);
  const newEnd = new Date(newStart.getTime() + newSlot.duration * 60000);

  return (
    (existingStart <= newStart && newStart < existingEnd) ||
    (newStart <= existingStart && existingStart < newEnd)
  );
};
export const hasOverlappingTimeSlots = (
  newSlot: TimeSlot,
  timeSlots: TimeSlot[],
): boolean =>
  timeSlots.some(existingSlot => doTimeSlotsOverlap(existingSlot, newSlot));

