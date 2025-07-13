
import { cn } from "@/lib/utils";
import { Mountain } from "lucide-react";

interface LogoProps {
    expanded?: boolean;
}

export function Logo({ expanded = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2 font-semibold text-lg">
      <Mountain className="h-6 w-6 text-primary shrink-0" />
      <span className={cn(
        "transition-opacity duration-200",
        expanded ? "opacity-100" : "opacity-0"
      )}>Codelits Hub</span>
    </div>
  );
}
