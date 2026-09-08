import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MarqueePhoto {
  src: string;
  alt: string;
  /** Portrait photos get a narrower frame so the strip keeps a steady height. */
  portrait?: boolean;
}

interface PhotoMarqueeProps {
  photos: readonly MarqueePhoto[];
  className?: string;
}

function PhotoRow({ photos, decorative = false }: { photos: readonly MarqueePhoto[]; decorative?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6" aria-hidden={decorative || undefined}>
      {photos.map((photo, index) => (
        <li
          key={`${photo.src}-${index}`}
          className={cn(
            "relative h-[16rem] shrink-0 overflow-hidden rounded-[1.5rem] sm:h-[22rem] sm:rounded-[2rem]",
            photo.portrait ? "w-[12rem] sm:w-[16.5rem]" : "w-[22rem] sm:w-[30rem]",
            index % 2 === 1 && "sm:translate-y-6",
          )}
        >
          <Image src={photo.src} alt={decorative ? "" : photo.alt} fill sizes="(min-width: 640px) 480px, 352px" quality={70} className="object-cover" />
        </li>
      ))}
    </ul>
  );
}

/** A slow, full-bleed drift of photographs. The second pass is decorative. */
export function PhotoMarquee({ photos, className }: PhotoMarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden py-6", className)}>
      <div className="marquee-track animate-marquee-slow">
        <PhotoRow photos={photos} />
        <PhotoRow photos={photos} decorative />
      </div>
    </div>
  );
}
