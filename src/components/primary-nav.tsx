'use client';

import {
  AppWindow,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { Logo } from './logo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import type { NavItem } from './secondary-nav';
import Link from 'next/link';

const primaryNavItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { id: 'apps', icon: AppWindow, label: 'Apps', href: '/apps' },
  { id: 'team', icon: Users, label: 'Team', href: '/team' },
  { id: 'billing', icon: CreditCard, label: 'Billing', href: '/billing' },
  { id: 'support', icon: MessageSquare, label: 'Support', href: '/support' },
  { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' },
] as const;

interface PrimaryNavProps {
  activeItem: NavItem;
  setActiveItem: (item: NavItem) => void;
}

export function PrimaryNav({ activeItem, setActiveItem }: PrimaryNavProps) {
  
  const handleItemClick = (e: React.MouseEvent, id: NavItem) => {
    e.preventDefault();
    setActiveItem(id);
  }

  return (
    <div className="hidden md:flex flex-col items-center gap-4 border-r bg-background p-2">
      <div className="flex h-[52px] items-center justify-center">
         <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo />
        </Link>
      </div>
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-col items-center gap-2">
          {primaryNavItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item.id)}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground',
                    activeItem === item.id && 'bg-accent text-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </div>
  );
}
