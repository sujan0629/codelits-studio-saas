
'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  LayoutDashboard,
  AppWindow,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const navItems = [
  {
    title: 'Dashboards',
    items: [{ href: '/dashboard', icon: LayoutDashboard, label: 'Overview' }],
  },
  {
    title: 'Management',
    items: [
      { href: '/dashboard/apps', icon: AppWindow, label: 'Apps' },
      { href: '/dashboard/team', icon: Users, label: 'Team' },
      { href: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
    ],
  },
  {
    title: 'Support & Settings',
    items: [
      { href: '/dashboard/support', icon: MessageSquare, label: 'Support' },
      { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export function MainNav() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Accordion
      type="multiple"
      defaultValue={['Dashboards', 'Management', 'Support & Settings']}
      className="w-full"
    >
      {navItems.map((group) => (
        <AccordionItem value={group.title} key={group.title} className="border-b-0">
          <AccordionTrigger
            className={cn(
              'px-2 py-1 text-sm font-medium text-muted-foreground hover:no-underline hover:text-foreground',
              isCollapsed && 'justify-center px-0'
            )}
          >
            <span className={cn(isCollapsed && 'hidden')}>{group.title}</span>
            <ChevronRight className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isCollapsed && 'hidden')} />
          </AccordionTrigger>
          <AccordionContent className="pb-1">
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
