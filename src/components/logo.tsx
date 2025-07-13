import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  expanded?: boolean;
}

export function Logo({ expanded = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2 font-semibold text-lg leading-none">
<Image
  src="/images/logo.png"
  alt="Logo"
  height={32}
  width={32}
  className="block m-0 p-0 object-contain"
/>

      <span
        className={cn(
          "transition-opacity duration-200",
          expanded ? "opacity-100" : "opacity-0"
        )}
      >
        saaS
      </span>
    </div>
  );
}
