
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight">Page Not Found</h2>
      <p className="mt-2 text-lg text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-6 flex gap-4">
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/support">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
