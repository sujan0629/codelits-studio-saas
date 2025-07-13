
'use client';

import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bell, PanelLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { PrimaryNav } from '@/components/primary-nav';
import { SecondaryNav, type NavItem } from '@/components/secondary-nav';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activePrimaryNav, setActivePrimaryNav] = useState<NavItem>('dashboard');
  const [isPrimaryNavExpanded, setIsPrimaryNavExpanded] = useState(false);
  
  const primaryNavRef = useRef<HTMLDivElement>(null);
  const secondaryNavRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const currentPath = pathname.split('/')[1] || 'dashboard';
    if (SecondaryNav.navLinks[currentPath as NavItem]) {
        setActivePrimaryNav(currentPath as NavItem);
    }
  }, [pathname]);

  useEffect(() => {
    const primaryNavWidthExpanded = 240;
    const primaryNavWidthCollapsed = 56;
    const secondaryNavWidth = 280;

    gsap.to(primaryNavRef.current, { 
      width: isPrimaryNavExpanded ? primaryNavWidthExpanded : primaryNavWidthCollapsed, 
      duration: 0.3, 
      ease: 'power2.inOut' 
    });

    gsap.to(secondaryNavRef.current, { 
      left: isPrimaryNavExpanded ? primaryNavWidthExpanded : primaryNavWidthCollapsed,
      duration: 0.3, 
      ease: 'power2.inOut' 
    });

    gsap.to(mainContentRef.current, { 
      marginLeft: isPrimaryNavExpanded ? (primaryNavWidthExpanded + secondaryNavWidth) : (primaryNavWidthCollapsed + secondaryNavWidth),
      duration: 0.3, 
      ease: 'power2.inOut' 
    });

  }, [isPrimaryNavExpanded]);


  return (
    <div className="min-h-screen w-full bg-background relative overflow-x-hidden">
      <div 
        className="hidden md:flex fixed top-0 left-0 h-full z-20"
        onMouseEnter={() => setIsPrimaryNavExpanded(true)} 
        onMouseLeave={() => setIsPrimaryNavExpanded(false)}
      >
        <div ref={primaryNavRef} className="overflow-hidden">
            <PrimaryNav 
                activeItem={activePrimaryNav} 
                setActiveItem={setActivePrimaryNav}
                isExpanded={isPrimaryNavExpanded} 
            />
        </div>
        <div ref={secondaryNavRef} className="fixed top-0 h-full w-[280px]">
            <SecondaryNav activeItem={activePrimaryNav} />
        </div>
      </div>
      
      <div ref={mainContentRef} className="flex flex-col md:ml-[336px]">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
               <div className="flex h-full max-h-screen flex-col">
                  <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                      <Logo expanded={true} />
                    </Link>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <SecondaryNav activeItem={'all'} isMobile={true} />
                  </div>
                   <div className="mt-auto p-4 border-t">
                    <UserNav />
                  </div>
                </div>
            </SheetContent>
          </Sheet>
           <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
          </Button>
           <UserNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
