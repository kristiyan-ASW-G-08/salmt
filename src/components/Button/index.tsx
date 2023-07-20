import { forwardRef, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variant =
  | 'primary'
  | 'contrast'
  | 'dark'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'outlined'
  | 'transparent'
  | 'link'
  | 'active';

type Size = 'sm' | 'md' | 'lg' | 'no-padding';
type Radius = 'rounded' | 'none';
type Media = 'sm' | 'none';

export const link = clsx(
  'transition-hover duration-200 ease-in-out',
  'px-0',
  'dark:text-dark-typography-primary hover:dark:text-dark-typography-contrast',
  ' text-light-typography-primary hover:text-light-typography-contrast',
);
export const active = clsx(
  'transition-hover duration-200 ease-in-out	',
  'dark:text-dark-primary',
  ' text-light-primary ',
);
export const SIZE_MAP: Record<Size, string> = {
  'no-padding': 'p-0 text-md',
  sm: 'px-4  py-2 text-md',
  md: 'px-6  py-2 text-lg',
  lg: 'px-8  py-2 text-xl',
};

export const primary = clsx(
  'dark:bg-dark-primary dark:text-dark-background-primary   dark:hover:bg-dark-primary dark:hover:bg-opacity-70  ',
  'bg-light-primary text-light-background-primary hover:bg-light-primary hover:bg-opacity-80 ',
);

export const transparent = clsx(
  ' text-light-typography-primary hover:text-light-typography-contrast ',
);
const sharedUtilityStyles = 'border';
const VARIANT_MAP: Record<Variant, string> = {
  link,
  active,
  primary,
  contrast: clsx(
    'dark:bg-dark-background-contrast dark:hover:bg-opacity-20 ',
    'bg-light-background-contrast hover:bg-opacity-80 ',
  ),

  transparent,
  dark: 'bg-brand-dark text-brand-light hover:bg-brand-light hover:text-brand-dark',
  outlined: clsx(
    'border',
    'dark:border-dark-primary dark:text-dark-primary dark:hover:bg-dark-typography-primary dark:hover:bg-opacity-[20%] ',
    'border-light-primary text-light-primary hover:bg-light-typography-primary hover:bg-opacity-[5%] ',
  ),
  error: clsx(
    'text-utility-error   border border-utility-error ',
    ' dark:hover:bg-dark-typography-primary dark:hover:bg-opacity-[20%] ',
    ' hover:bg-light-typography-primary hover:bg-opacity-[5%] ',
  ),
  info: 'bg-brand-info text-brand-light hover:bg-brand-light hover:text-brand-info',
  success: clsx(
    'text-utility-success   border border-utility-success ',
    ' dark:hover:bg-dark-typography-primary dark:hover:bg-opacity-[20%] ',
    ' hover:bg-light-typography-primary hover:bg-opacity-[5%] ',
  ),
  warning:
    'bg-brand-warning text-brand-light hover:bg-brand-light hover:text-brand-warning',
};

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: Size;
  variant?: Variant;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      type = 'button',
      className,
      children,
      ...rest
    },
    ref,
  ) => (
    <button
      type={type}
      ref={ref}
      className={clsx(
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        'font-bold',
        'rounded-md',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  ),
);

export default Button;

Button.displayName = 'Button';
