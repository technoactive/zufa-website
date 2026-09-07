import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label="Zufa — home">
      <Image
        src="/brand/zufa-logo-white.png"
        alt="Zufa"
        width={1035}
        height={500}
        priority={priority}
        sizes="140px"
        className="h-12 w-auto sm:h-14"
      />
    </Link>
  );
}
