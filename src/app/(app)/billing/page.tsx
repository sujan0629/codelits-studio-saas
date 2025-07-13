
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const billingHistory = [
  { date: '2023-11-01', description: 'Pro Plan - Monthly', amount: '$99.00', status: 'Paid' },
  { date: '2023-10-01', description: 'Pro Plan - Monthly', amount: '$99.00', status: 'Paid' },
  { date: '2023-09-01', description: 'Pro Plan - Monthly', amount: '$99.00', status: 'Paid' },
];

export default function BillingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  const renderSkeleton = () => (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-96 mt-2" />
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-40" />
              </div>
            </CardContent>
            <Separator />
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
                <Skeleton className="h-10 w-20" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-56 mt-2" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-32 mt-1" />
                      </TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
  
  if (loading) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Subscription & Billing</h1>
        <p className="text-muted-foreground">Manage your subscription plan and view your billing history.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline space-x-2">
                <h2 className="text-2xl font-bold">Pro Plan</h2>
                <p className="text-lg text-muted-foreground">$99 / month</p>
              </div>
              <p className="text-sm text-muted-foreground">Your plan renews on December 1, 2023.</p>
              <div className="flex gap-2">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Visa ending in 1234</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                </div>
                <Button variant="outline">Update</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Payments are securely processed by Stripe.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((item) => (
                    <TableRow key={item.date}>
                      <TableCell>
                        <div className="font-medium">{item.date}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </TableCell>
                      <TableCell className="text-right">{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
