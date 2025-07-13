
'use client';

import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bell, PanelLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PrimaryNav } from '@/components/primary-nav';
import { SecondaryNav, type NavItem } from '@/components/secondary-nav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  const getNavItemFromPath = (path: string): NavItem => {
    const segment = path.split('/')[1];
    const navItems: NavItem[] = ['dashboard', 'apps', 'team', 'billing', 'support', 'settings'];
    return navItems.find(item => item === segment) || 'dashboard';
  };

  const [activePrimaryNav, setActivePrimaryNav] = useState<NavItem>(getNavItemFromPath(pathname));
  const [isPrimaryNavHovered, setIsPrimaryNavHovered] = useState(false);
  const [isSecondaryNavOpen, setIsSecondaryNavOpen] = useState(true);

  useEffect(() => {
    setActivePrimaryNav(getNavItemFromPath(pathname));
    setIsSecondaryNavOpen(true);
  }, [pathname]);

  const handlePrimaryNavClick = (item: NavItem) => {
    setActivePrimaryNav(item);
    setIsSecondaryNavOpen(true);
    // When an item is clicked while hovered, force the hover state to false
    // This will collapse the primary nav and show the secondary nav immediately
    if (isPrimaryNavHovered) {
        setIsPrimaryNavHovered(false);
    }
  }
  
  const handleSecondaryNavClick = () => {
    // The secondary nav should remain open on link clicks
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0 sm:max-w-xs">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Logo expanded={true} />
                </Link>
              </div>
              <div className='flex-1 overflow-y-auto'>
                <SecondaryNav activeItem={'all'} isMobile={true} />
              </div>
          </SheetContent>
        </Sheet>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
         <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
          </Button>
        <div className="hidden md:block">
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex">
          <PrimaryNav 
            activeItem={activePrimaryNav} 
            onItemClick={handlePrimaryNavClick}
            isHovered={isPrimaryNavHovered}
            setIsHovered={setIsPrimaryNavHovered}
          />
          <SecondaryNav 
            activeItem={activePrimaryNav}
            isOpen={isSecondaryNavOpen && !isPrimaryNavHovered}
            onLinkClick={handleSecondaryNavClick}
          />
        </div>
        <main className={cn(
          "flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40 transition-all duration-300 ease-in-out overflow-y-auto",
          // When hovered, secondary nav is closed, main content should not have extra margin
          isPrimaryNavHovered ? 'md:ml-[224px]' : 'md:ml-[72px]',
          // When secondary nav is open, add margin
          isSecondaryNavOpen && !isPrimaryNavHovered ? 'md:ml-[280px]' : 'md:ml-[72px]'
          )}>
          {children}
        </main>
      </div>
    </div>
  );
}
