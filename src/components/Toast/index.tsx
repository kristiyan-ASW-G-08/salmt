import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { create } from 'zustand';
import Button from '../Button';
export const useToastStore = create<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>((set, get) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
const AppointmentToast = () => {
  const { open, setOpen } = useToastStore();
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title>
          <Button variant="success" size="sm">
            Your Appointment has Been Scheduled
          </Button>
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default AppointmentToast;
