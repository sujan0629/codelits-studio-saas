
import { Mountain } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-semibold text-lg">
      <Mountain className="h-6 w-6 text-primary" />
      <span>Codelits Hub</span>
    </div>
  );
}
