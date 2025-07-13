
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
    links: [{ href: '/apps', label: 'Manage Apps' }],
  },
  team: {
    title: 'Team',
    links: [{ href: '/team', label: 'Manage Team' }],
  },
  billing: {
    title: 'Billing',
    links: [
      { href: '/billing', label: 'Subscription' },
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
  isOpen?: boolean;
  onLinkClick?: () => void;
}

export function SecondaryNav({ activeItem, isMobile = false, isOpen = true, onLinkClick }: SecondaryNavProps) {
  const pathname = usePathname();

  const renderNavSection = (itemKey: keyof typeof navLinks) => {
    const item = navLinks[itemKey];
    return (
      <div key={item.title}>
        {isMobile && <h2 className="my-4 px-4 text-lg font-semibold tracking-tight">{item.title}</h2>}
        <div className="space-y-1">
          {item.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive && 'bg-muted text-primary',
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
  
  if (isMobile) {
     return (
        <nav className="grid items-start p-4 text-sm font-medium">
             {Object.keys(navLinks).map((key) => renderNavSection(key as keyof typeof navLinks))}
        </nav>
     )
  }
  
  const navData = navLinks[activeItem as keyof typeof navLinks];
  
  if (!navData) {
    return null;
  }

  return (
    <aside 
      className={cn(
        "hidden md:fixed md:left-[72px] md:top-0 md:flex h-full flex-col gap-2 border-r bg-background w-[220px] z-10 transition-transform duration-300 ease-in-out",
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
        <div className="flex h-[60px] items-center border-b px-4">
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
    </aside>
  );
}
