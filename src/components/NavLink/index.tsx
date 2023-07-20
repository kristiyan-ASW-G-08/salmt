import { ReactNode, forwardRef } from 'react';

import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';
import { link, active } from '@/components/Button';
type Variant = 'link' | 'active';

type Size = 'sm' | 'md' | 'lg';

export const SIZE_MAP: Record<Size, string> = {
  sm: 'text-md',
  md: 'text-lg',
  lg: 'text-xl',
};

const VARIANT_MAP: Record<Variant, string> = {
  link,
  active,
};
type NavLinkProps = LinkProps & {
  isActive: boolean;
  children: ReactNode;
  size?: Size;
  variant?: Variant;
  className?: string;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ isActive, size = 'sm', children, className, ...rest }, ref) => (
    <Link
      {...rest}
      ref={ref}
      className={clsx(
        {
          [`${VARIANT_MAP['active']}`]: isActive,
          [`${VARIANT_MAP['link']}`]: !isActive,
        },
        SIZE_MAP[size],
        'py-2',
        'block',
        'font-bold',
        className,
      )}
    >
      {children}
    </Link>
  ),
);

NavLink.displayName = 'NavLink';

export default NavLink;
