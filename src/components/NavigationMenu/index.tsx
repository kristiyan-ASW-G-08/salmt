'use client';

import React, { FC, ReactNode, forwardRef } from 'react';

import Image from 'next/image';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
interface NavigationMenuItemProps {
  children: ReactNode;
}

export const NavigationMenuList = NavigationMenuPrimitive.List;
export const NavigationMenuItem: FC<NavigationMenuItemProps> = ({
  children,
}) => (
  <NavigationMenuPrimitive.Item >
    <NavigationMenuPrimitive.Link asChild>
      {children}
    </NavigationMenuPrimitive.Link>
  </NavigationMenuPrimitive.Item>
);

interface NavigationMenuProps
  extends NavigationMenuPrimitive.NavigationMenuProps {
  children: ReactNode;
}

export const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ children, ...props }, forwardedRef) => (
    <NavigationMenuPrimitive.Root {...props} ref={forwardedRef}>
      {children}
    </NavigationMenuPrimitive.Root>
  ),
);
NavigationMenu.displayName = 'NavigationMenu';
