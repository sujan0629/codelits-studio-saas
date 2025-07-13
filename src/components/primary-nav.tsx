
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
import { cn } from '@/lib/utils';
import type { NavItem } from './secondary-nav';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Link from 'next/link';


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
  setIsHovered: (isHovered: boolean) => void;
}

export function PrimaryNav({ activeItem, onItemClick, isHovered, setIsHovered }: PrimaryNavProps) {
  return (
    <aside 
      className={cn(
        "hidden md:fixed md:left-0 md:top-14 md:flex h-[calc(100vh-56px)] z-20 transition-all duration-300 ease-in-out",
        isHovered ? 'w-56' : 'w-[72px]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center gap-4 border-r bg-background p-2 w-full">
        <TooltipProvider delayDuration={0}>
          <nav className="flex flex-col items-start gap-2 w-full">
              {primaryNavItems.map((item) => (
                  <Tooltip key={item.id}>
                      <TooltipTrigger asChild>
                          <Link
                              href={item.href}
                              onClick={(e) => {
                                  e.preventDefault();
                                  onItemClick(item.id)
                              }}
                              className={cn(
                                'flex items-center gap-3 w-full justify-start rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground',
                                activeItem === item.id && 'bg-accent text-accent-foreground',
                              )}
                            >
                              <item.icon className="h-5 w-5 shrink-0" />
                              <span className={cn(
                                  "transition-opacity duration-200",
                                  isHovered ? 'opacity-100' : 'opacity-0'
                              )}>
                                  {item.label}
                              </span>
                          </Link>
                      </TooltipTrigger>
                      {!isHovered && (
                          <TooltipContent side="right">
                              {item.label}
                          </TooltipContent>
                      )}
                  </Tooltip>
              ))}
          </nav>
        </TooltipProvider>
      </div>
    </aside>
  );
}
