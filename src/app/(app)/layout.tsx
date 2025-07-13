'use client';

import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bell, PanelLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PrimaryNav } from '@/components/primary-nav';
import { SecondaryNav, type NavItem } from '@/components/secondary-nav';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activePrimaryNav, setActivePrimaryNav] = useState<NavItem>('dashboard');

  return (
    <div className="grid min-h-screen w-full grid-cols-[auto_1fr]">
      <div className="flex">
        <PrimaryNav activeItem={activePrimaryNav} setActiveItem={setActivePrimaryNav} />
        <SecondaryNav activeItem={activePrimaryNav} />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
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
