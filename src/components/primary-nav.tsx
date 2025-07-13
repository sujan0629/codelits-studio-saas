
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
import { useState } from 'react';
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
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMouseEnter = () => setIsExpanded(true);
    const handleMouseLeave = () => setIsExpanded(false);

    const handleItemClick = (e: React.MouseEvent, id: NavItem) => {
        // We prevent the default link behavior because the secondary nav will handle the routing
        e.preventDefault();
        setActiveItem(id);
    }

  return (
    <aside 
        className="hidden md:flex flex-col items-center gap-4 border-r bg-background p-2 transition-all duration-300 ease-in-out"
        style={{ width: isExpanded ? '280px' : '56px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-[52px] items-center justify-center">
         <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo expanded={isExpanded} />
        </Link>
      </div>
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-col items-center gap-2 w-full">
          {primaryNavItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item.id)}
                  className={cn(
                    'flex h-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground w-full',
                    activeItem === item.id && 'bg-accent text-accent-foreground',
                     isExpanded ? 'justify-start px-3 gap-3' : 'justify-center w-9'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className={cn(
                      "transition-opacity duration-200",
                      isExpanded ? "opacity-100" : "opacity-0 sr-only"
                  )}>{item.label}</span>
                </Link>
              </TooltipTrigger>
              {!isExpanded && (
                 <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
