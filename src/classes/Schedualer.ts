export interface TimeSlot {
  client_id: string;
  service: any;
  start_time: string;
  duration: number;
}

interface TimeSlotsByDate {
  [date: string]: TimeSlot[];
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

// class HairdresserSchedule {
//   private timeSlots: TimeSlotsByDate = {};

//   constructor() {}

//   private timeSlotsOverlap(existingSlot: TimeSlot, newSlot: TimeSlot): boolean {
//     const existingStart = new Date(`1970-01-01T${existingSlot.start_time}:00`);
//     const existingEnd = new Date(
//       existingStart.getTime() + existingSlot.duration * 60000,
//     );

//     const newStart = new Date(`1970-01-01T${newSlot.start_time}:00`);
//     const newEnd = new Date(newStart.getTime() + newSlot.duration * 60000);

//     return (
//       (existingStart <= newStart && newStart < existingEnd) ||
//       (newStart <= existingStart && existingStart < newEnd)
//     );
//   }

//   private hasOverlappingTimeSlots(date: string, newSlot: TimeSlot): boolean {
//     const slots = this.timeSlots[date];
//     if (!slots) {
//       return false;
//     }
//     return slots.some(existingSlot =>
//       this.timeSlotsOverlap(existingSlot, newSlot),
//     );
//   }

//   addTimeSlot(date: string, timeSlot: TimeSlot): boolean {
//     if (this.hasOverlappingTimeSlots(date, timeSlot)) {
//       return false; // Overlapping time slots, cannot add
//     }

//     if (!this.timeSlots[date]) {
//       this.timeSlots[date] = [];
//     }
//     this.timeSlots[date].push(timeSlot);
//     return true; // Time slot added successfully
//   }

//   getTimeSlots(date: string): TimeSlot[] {
//     return this.timeSlots[date] || [];
//   }

//   getTimeSlotsByDate(): TimeSlotsByDate {
//     return this.timeSlots;
//   }

//   removeTimeSlot(date: string, timeSlotIndex: number): void {
//     if (this.timeSlots[date]) {
//       this.timeSlots[date].splice(timeSlotIndex, 1);
//     }
//   }

//   clearTimeSlots(): void {
//     this.timeSlots = {};
//   }
// }

// // Example usage:
// const hairdresserSchedule = new HairdresserSchedule();

// // Add time slots
// const addedSlot1 = hairdresserSchedule.addTimeSlot('2023-07-20', {
//   client_id: 'client1',
//   service: 'Haircut',
//   start_time: '09:00',
//   duration: 60,
// });

// const addedSlot2 = hairdresserSchedule.addTimeSlot('2023-07-20', {
//   client_id: 'client2',
//   service: 'Hair Color',
//   start_time: '11:00',
//   duration: 120,
// });

// const addedSlot3 = hairdresserSchedule.addTimeSlot('2023-07-21', {
//   client_id: 'client3',
//   service: 'Hair Styling',
//   start_time: '14:00',
//   duration: 90,
// });

// // Get time slots for a specific date
// const timeSlotsForDate = hairdresserSchedule.getTimeSlots('2023-07-20');
// console.log(timeSlotsForDate);

// // Get all time slots
// const allTimeSlots = hairdresserSchedule.getTimeSlotsByDate();
// console.log(allTimeSlots);

// // Remove a time slot
// hairdresserSchedule.removeTimeSlot('2023-07-20', 0);

// // Clear all time slots
// hairdresserSchedule.clearTimeSlots();
