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
import { useRouter } from 'next/navigation';
import { TopLoader } from '@/components/top-loader';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activePrimaryNav, setActivePrimaryNav] = useState<NavItem>('dashboard');
  const [isPrimaryNavHovered, setIsPrimaryNavHovered] = useState(false);

  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  const primaryNavRef = useRef<HTMLDivElement>(null);
  const secondaryNavRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Update active nav based on URL path
  useEffect(() => {
        setIsNavigating(false);

    const currentPath = pathname.split('/')[1] || 'dashboard';
    if (SecondaryNav.navLinks[currentPath as NavItem]) {
      setActivePrimaryNav(currentPath as NavItem);
    }
  }, [pathname]);

  // On mount, set initial margin-left of main content (collapsed nav + secondary nav)
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.style.marginLeft = '336px'; // 56 + 280 px
    }
  }, []);

  // Animate widths and margins on hover state change
  useEffect(() => {
    const primaryNavWidthExpanded = 240;
    const primaryNavWidthCollapsed = 56;
    const secondaryNavWidth = 280;

    const primaryNavWidth = isPrimaryNavHovered ? primaryNavWidthExpanded : primaryNavWidthCollapsed;

    gsap.to(primaryNavRef.current, {
      width: primaryNavWidth,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    gsap.to(mainContentRef.current, {
      marginLeft: primaryNavWidth + secondaryNavWidth,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  }, [isPrimaryNavHovered]);
  const getFirstSecondaryLink = (item: NavItem) => {
    const links = SecondaryNav.navLinks[item]?.links;
    return links && links.length > 0 ? links[0].href : '/';
  };

  // This is your primary nav click handler passed down to PrimaryNav component
const handlePrimaryNavClick = (item: NavItem) => {
  setActivePrimaryNav(item);
  setIsPrimaryNavHovered(false); // shrink primary nav on click

  setIsNavigating(true); // <-- trigger TopLoader

  const firstLink = getFirstSecondaryLink(item);
  router.push(firstLink);
};


  return (
    <div className="min-h-screen w-full bg-background relative overflow-x-hidden">
      {/* Primary Nav wrapper */}
      <div
        ref={primaryNavRef}
        className="hidden md:flex fixed top-0 left-0 h-full z-20"
        style={{ width: 56 }} // start collapsed width inline for initial render
      >
        <PrimaryNav
          activeItem={activePrimaryNav}
          onItemClick={handlePrimaryNavClick}
          isHovered={isPrimaryNavHovered}
          setIsHovered={setIsPrimaryNavHovered}
        />
      </div>

      {/* Secondary Nav wrapper */}
      <div
        ref={secondaryNavRef}
        className="fixed top-0 left-[56px] h-full w-[280px] z-10"
      >
        <SecondaryNav activeItem={activePrimaryNav} />
      </div>

      {/* Main content */}
      <div ref={mainContentRef} className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
                   <TopLoader isNavigating={isNavigating} />
 <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
