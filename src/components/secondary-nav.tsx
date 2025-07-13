
'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';

const mainNavLinks = {
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

const allLinks = Object.values(mainNavLinks).flatMap(section => section.links.map(link => ({...link, title: section.title })));

const navLinks = {
  ...mainNavLinks,
  all: {
    title: 'Menu',
    links: allLinks,
  }
};


export type NavItem = keyof typeof navLinks;

interface SecondaryNavProps {
  activeItem: NavItem;
  isMobile?: boolean;
}

function SecondaryNavComponent({ activeItem, isMobile = false }: SecondaryNavProps) {
  const pathname = usePathname();
  
  const renderNavSection = (itemKey: keyof typeof mainNavLinks) => {
    const item = mainNavLinks[itemKey];
    const sectionTitle = isMobile ? item.title : undefined;

    return (
      <div key={item.title}>
        {sectionTitle && <h2 className="my-4 px-4 text-lg font-semibold tracking-tight">{sectionTitle}</h2>}
        <div className="space-y-1">
          {item.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive ? 'bg-muted text-primary font-semibold' : 'hover:bg-muted/50 font-medium',
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

  const renderMobileNav = () => {
    const groupedLinks: { [key: string]: typeof allLinks } = {};
    allLinks.forEach(link => {
      if (!groupedLinks[link.title]) {
        groupedLinks[link.title] = [];
      }
      groupedLinks[link.title].push(link);
    });

    return (
      <nav className="grid items-start p-4 text-sm font-medium">
        {Object.entries(groupedLinks).map(([title, links]) => (
          <div key={title}>
            <h2 className="my-4 px-4 text-lg font-semibold tracking-tight">{title}</h2>
            <div className="space-y-1">
              {links.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      isActive ? 'bg-muted text-primary font-semibold' : 'hover:bg-muted/50 font-medium'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    );
  };
  
  if (isMobile) {
     return renderMobileNav();
  }

  const navData = mainNavLinks[activeItem as keyof typeof mainNavLinks];
  if (!navData) {
    return (
       <div className="hidden md:flex h-full max-h-screen flex-col gap-2 border-r bg-card w-[280px]">
         <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
             <h2 className="text-lg font-semibold">Welcome</h2>
         </div>
         <div className="flex-1 p-4">
            <p className="text-muted-foreground">Select a category to get started.</p>
         </div>
       </div>
    );
  }

  return (
    <div className="hidden md:flex h-full max-h-screen flex-col gap-2 border-r bg-card pl-6">
      <div className="flex h-14 items-center border-b pl-2 pr-4 lg:h-[60px]">
        <h2 className="text-lg font-semibold text-foreground">{navData.title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto pt-2">
        <nav className="grid items-start pl-0 pr-2 text-sm font-medium">
          {renderNavSection(activeItem as keyof typeof mainNavLinks)}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <UserNav />
      </div>
    </div>
  );
  
}

export const SecondaryNav = Object.assign(SecondaryNavComponent, { navLinks });
