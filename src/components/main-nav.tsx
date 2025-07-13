
'use client';

import {
  LayoutDashboard,
  AppWindow,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  Badge,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const navItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/apps',
    icon: AppWindow,
    label: 'Apps',
  },
  {
    href: '/team',
    icon: Users,
    label: 'Team',
  },
  {
    href: '/billing',
    icon: CreditCard,
    label: 'Billing',
  },
   {
    href: '/support',
    icon: MessageSquare,
    label: 'Support',
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Settings',
  },
];

export function MainNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  const renderLink = (item: (typeof navItems)[0]) => {
    const isActive = pathname.startsWith(`/dashboard${item.href}`) || (pathname === '/dashboard' && item.href === '/dashboard');
    return (
      <Link
        key={item.href}
        href={`/dashboard${item.href === '/dashboard' ? '' : item.href}`}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
          isActive && 'bg-muted text-primary'
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.label}
      </Link>
    );
  }

  if (isMobile) {
    return (
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold mb-4"
        >
          <Logo />
        </Link>
        {navItems.map(renderLink)}
      </nav>
    );
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(renderLink)}
    </nav>
  );
}
