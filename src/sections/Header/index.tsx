'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { Bars3Icon } from '@heroicons/react/24/outline';
import * as Collapsible from '@radix-ui/react-collapsible';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/NavigationMenu';

import { useSupabase } from '@/supabase/SupabaseProvider';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import NavLink from '@/components/NavLink';

const navLinks = [
  {
    href: '/salons?page=1',
    label: 'Salons',
  },
];
const isActive = (pathname: string, href: string) => pathname.startsWith(href);
export const Header = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const {
    supabase: { auth },
    session,
  } = useSupabase();
  const [isOpen, setIsOpen] = useState(false);
  const signOut = async () => {
    const { error } = await auth.signOut();

    if (error) {
      // console.log({ error });
    }
  };

  const themeHandler = (checkedState: boolean) => {
    const currentTheme = checkedState ? 'dark' : 'light';
    setTheme(currentTheme);
  };
  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <header className="fixed z-20 w-screen">
        <div className="grid content-center justify-between w-screen h-full grid-flow-col py-sm px-md lg:px-lg bg-light-background-primary dark:bg-dark-background-primary shadow-lg ">
          <Logo />
          <Collapsible.Trigger
            className="md:hidden h-full grid content-center "
            asChild
          >
            <button>
              <AccessibleIcon.Root label="Icon for closing and opening a mobile navigation menu">
                <Bars3Icon className="h-7 w-7 dark:text-dark-typography-primary text-light-typography-primary" />
              </AccessibleIcon.Root>
            </button>
          </Collapsible.Trigger>

          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="grid grid-flow-col gap-sm">
              {navLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavLink isActive={isActive(pathname, href)} href={href}>
                    {label}
                  </NavLink>
                </NavigationMenuItem>
              ))}

              {session ? (
                <>
                  <NavigationMenuItem>
                    <Button onClick={signOut} size="sm" variant="link">
                      Log Out
                    </Button>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href="/auth">
                      <Button size="sm" variant="link">
                        Sign In
                      </Button>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/auth">
                      <Button variant="primary" size="sm">
                        Sign Up
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Collapsible.Content className="block md:hidden">
          <NavigationMenu>
            <NavigationMenuList className="grid grid-flow-row gap-sm py-sm px-md lg:px-lg bg-light-background-primary dark:bg-dark-background-primary border border-light-background-contrast dark:border-dark-background-contrast">
              {navLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavLink isActive={isActive(pathname, href)} href={href}>
                    {label}
                  </NavLink>
                </NavigationMenuItem>
              ))}

              {session ? (
                <>
                  <NavigationMenuItem>
                    <Button onClick={signOut} size="sm" variant="link">
                      Log Out
                    </Button>
                  </NavigationMenuItem>
                </>
              ) : (
                <div className="grid grid-flow-col">
                  <NavigationMenuItem>
                    <Link href="/auth">
                      <Button size="sm" variant="link">
                        Sign In
                      </Button>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/auth">
                      <Button variant="primary" size="sm">
                        Sign Up
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                </div>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </Collapsible.Content>
      </header>
    </Collapsible.Root>
  );
};

export default Header;
