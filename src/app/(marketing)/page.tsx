
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <section className="container grid lg:grid-cols-2 gap-10 items-center py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-start space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
            The Central Hub for Your Digital Applications
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Codelits Hub provides a seamless experience for managing your apps, subscriptions, and support all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Dashboard Preview"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              data-ai-hint="dashboard computer screen"
            />
        </div>
      </section>

      <section id="features" className="container py-12 md:py-24 lg:py-32 bg-secondary dark:bg-card rounded-lg">
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex items-center justify-center">
                <Image 
                src="https://placehold.co/600x400.png"
                alt="Feature Image"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="app management interface"
                />
            </div>
            <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Key Features</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Everything you need to manage your applications efficiently and effectively.
                    </p>
                </div>
                <ul className="grid gap-4">
                    <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                            <h3 className="font-semibold">Client Dashboard</h3>
                            <p className="text-sm text-muted-foreground">Overview of apps, statistics, and quick access.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                            <h3 className="font-semibold">App Management</h3>
                            <p className="text-sm text-muted-foreground">Install, configure, and update your apps with ease.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                            <h3 className="font-semibold">Subscription & User Management</h3>
                            <p className="text-sm text-muted-foreground">Manage plans, billing, and team roles seamlessly.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      <section id="pricing" className="container py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for your business. No hidden fees.
            </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Starter</CardTitle>
                    <CardDescription>For individuals and small teams starting out.</CardDescription>
                    <p className="pt-4"><span className="text-4xl font-bold">$29</span>/month</p>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 5 Apps</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Basic Analytics</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Email Support</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" asChild><Link href="/signup">Choose Plan</Link></Button>
                </CardFooter>
            </Card>
            <Card className="border-primary shadow-lg">
                <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For growing businesses that need more power.</CardDescription>
                    <p className="pt-4"><span className="text-4xl font-bold">$99</span>/month</p>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 25 Apps</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Advanced Analytics</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Priority Support</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> User Roles</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" asChild><Link href="/signup">Choose Plan</Link></Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>For large organizations with custom needs.</CardDescription>
                    <p className="pt-4"><span className="text-4xl font-bold">Contact Us</span></p>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Apps</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Dedicated Infrastructure</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 24/7 Phone Support</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant="outline" asChild><Link href="#">Contact Sales</Link></Button>
                </CardFooter>
            </Card>
        </div>
      </section>
    </div>
  );
}
