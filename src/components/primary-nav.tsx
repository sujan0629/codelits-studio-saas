
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
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

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
  isExpanded: boolean;
}

export function PrimaryNav({ activeItem, setActiveItem, isExpanded }: PrimaryNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    const currentPath = pathname.split('/')[1] || 'dashboard';
    if (primaryNavItems.some(item => item.id === currentPath)) {
      setActiveItem(currentPath as NavItem);
    }
  }, [pathname, setActiveItem]);

  return (
    <aside className="h-full flex flex-col items-start gap-4 border-r bg-background p-2">
      <div className={cn("flex h-[52px] items-center justify-center shrink-0", isExpanded ? "px-4" : "px-2")}>
         <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo expanded={isExpanded} />
        </Link>
      </div>
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-col items-start gap-2 w-full">
          {primaryNavItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior to handle with state
                    setActiveItem(item.id);
                  }}
                  className={cn(
                    'flex h-9 items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground w-full px-3 gap-3',
                    activeItem === item.id && 'bg-accent text-accent-foreground',
                    !isExpanded && 'w-9 justify-center'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className={cn(
                      "whitespace-nowrap transition-opacity duration-200",
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
