import { FC } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogTitle = DialogPrimitive.Title;

export const DialogDescription = DialogPrimitive.Description;

export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = DialogPrimitive.Overlay;

export const DialogContent = DialogPrimitive.Content;

export const DialogPortalPrimitive = DialogPrimitive.Portal;

interface DialogProps extends DialogPrimitive.DialogPortalProps {
  title: string;
  description: string;
}

export const DialogPortal: FC<DialogProps> = ({
  title,
  description,
  className,
  children,
  ...props
}) => (
  <DialogPrimitive.Portal {...props}>
    <DialogOverlay className="fixed  bg-dark-background-contrast  bg-opacity-20  inset-0 z-50" />

    <DialogContent className="grid grid-flow-row content-start gap-sm  dark:bg-dark-background-primary bg-light-background-primary w-fit h-fit p-md z-50 fixed left-1/2 top-2/4 -translate-x-2/4 -translate-y-2/4">
      <VisuallyHidden.Root>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </VisuallyHidden.Root>
      <header className="grid grid-flow-col content-center justify-end w-full justify-self-end sticky px-sm">
        <DialogClose>
          <XMarkIcon className="dark:text-dark-typography-primary text-light-typography-primary h-5 w-5" />
        </DialogClose>
      </header>

      {children}
    </DialogContent>
  </DialogPrimitive.Portal>
);

export const DialogPortalScrollable: FC<DialogProps> = ({
  title,
  description,
  className,
  children,
  ...props
}) => (
  <DialogPrimitive.Portal {...props}>
    <DialogOverlay className="fixed  dark:bg-dark-background-primary bg-light-background-primary    z-50  grid place-items-center overflow-y-auto inset-0 p-md">
      <DialogContent className="w-full ">
        <header className="grid grid-flow-col content-center  w-full justify-between">
          <DialogTitle>
            <h1 className="text-xl">{title}</h1>
          </DialogTitle>
          <DialogClose className="p-2 hover:dark:bg-dark-background-contrast hover:bg-light-background-contrast rounded-full">
            <XMarkIcon className="dark:text-dark-typography-primary text-light-typography-primary h-5 w-5" />
          </DialogClose>
        </header>

        {children}
      </DialogContent>
    </DialogOverlay>
  </DialogPrimitive.Portal>
);

DialogPortal.displayName = DialogPortal.displayName;
