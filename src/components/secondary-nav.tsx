
'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';

const navLinks = {
  dashboard: {
    title: 'Dashboard',
    links: [{ href: '/dashboard', label: 'Overview' }],
  },
  apps: {
    title: 'Applications',
    links: [
        { href: '/apps', label: 'Manage Apps' },
    ],
  },
  team: {
    title: 'Team',
    links: [{ href: '/team', label: 'Users & Roles' }],
  },
  billing: {
    title: 'Billing',
    links: [
      { href: '/billing', label: 'Subscription & Plan' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { href: '/support', label: 'My Tickets' },
    ],
  },
  settings: {
    title: 'Settings',
    links: [
      { href: '/settings', label: 'Company Profile' },
    ],
  },
};

export type NavItem = keyof typeof navLinks | 'all';

interface SecondaryNavProps {
  activeItem: NavItem;
  isMobile?: boolean;
}

function SecondaryNavComponent({ activeItem, isMobile = false }: SecondaryNavProps) {
  const pathname = usePathname();

  const renderNavSection = (itemKey: keyof typeof navLinks) => {
    const item = navLinks[itemKey];
    return (
      <div key={item.title}>
        {!isMobile && <div className="h-4" />}
        {isMobile && <h2 className="my-4 px-4 text-lg font-semibold tracking-tight">{item.title}</h2>}
        <div className="space-y-1">
          {item.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive ? 'bg-muted text-primary' : 'hover:bg-muted/50',
                  'font-medium'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };
  
  const navData = navLinks[activeItem as keyof typeof navLinks];
  
  if (isMobile) {
     return (
        <nav className="grid items-start p-4 text-sm font-medium">
             {Object.keys(navLinks).map((key) => renderNavSection(key as keyof typeof navLinks))}
        </nav>
     )
  }

  if (!navData) {
    return null;
  }

  return (
    <div className="hidden md:flex h-full max-h-screen flex-col gap-2 border-r bg-card w-[280px]">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <h2 className="text-lg font-semibold">{navData.title}</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start p-4 text-sm font-medium">
                {renderNavSection(activeItem as keyof typeof navLinks)}
            </nav>
        </div>
        <div className="mt-auto p-4 border-t">
            <UserNav />
        </div>
    </div>
  );
}

export const SecondaryNav = Object.assign(SecondaryNavComponent, { navLinks });
