'use client';

import {
  AppWindow,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import type { NavItem } from './secondary-nav';

const primaryNavItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href:'/dashboard' },
  { id: 'apps', icon: AppWindow, label: 'Apps', href: '/apps' },
  { id: 'team', icon: Users, label: 'Team', href: '/team' },
  { id: 'billing', icon: CreditCard, label: 'Billing', href: '/billing' },
  { id: 'support', icon: MessageSquare, label: 'Support', href: '/support' },
  { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' },
] as const;

interface PrimaryNavProps {
  activeItem: NavItem;
  onItemClick: (item: NavItem) => void;
  isHovered: boolean;
  setIsHovered: (val: boolean) => void;
}


export function PrimaryNav({ activeItem, onItemClick, isHovered, setIsHovered }: PrimaryNavProps) {
  return (
    <aside
      className={cn(
        "hidden md:fixed md:left-0 md:top-0 md:flex h-full z-20 transition-all duration-300 ease-in-out",
        isHovered ? 'w-56' : 'w-[62px]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center gap-4 border-r bg-background p-2 w-full">
        <Link href="/dashboard" className="flex h-[52px] items-center justify-center self-start px-2">
          <Logo expanded={isHovered} />
        </Link>
        <nav className="flex flex-col items-center gap-2 w-full">
          {primaryNavItems.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                onItemClick(item.id);
                setIsHovered(false); // Shrink nav on click
              }}
              className={cn(
                'flex items-center gap-3 w-full justify-start rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground',
                activeItem === item.id && 'bg-accent text-accent-foreground',
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span
                className={cn(
                  "transition-opacity duration-200",
                  isHovered ? 'opacity-100' : 'opacity-0'
                )}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
