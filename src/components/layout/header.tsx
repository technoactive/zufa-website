"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X, Phone } from "lucide-react";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation (adjust state during render, per React guidance).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Native <dialog> gives us focus trapping, Esc handling and inertness for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const allLinks = [...navigation.primary, ...navigation.secondary];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled ? "bg-ink/85 shadow-[0_1px_0_0_rgb(255_205_117/0.15)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container-content flex h-(--header-height) items-center justify-between gap-6">
        <Logo priority />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navigation.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-cream/85 transition-colors hover:text-gold",
                "after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100",
                isActive(item.href) && "text-gold after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone.e164}`}
            className="hidden items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold md:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            <span>{site.phone.display}</span>
          </a>
          <Button href="/bookings" size="sm" className="hidden sm:inline-flex">
            Book a table
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label="Open menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold hover:text-gold"
          >
            <MenuIcon className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label="Site navigation"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-cream backdrop:bg-ink/70 backdrop:backdrop-blur-sm open:animate-fade-in"
      >
        <div className="ml-auto flex h-full w-full max-w-md flex-col bg-ink shadow-2xl ring-1 ring-gold/15">
          <div className="flex h-(--header-height) items-center justify-between px-5 sm:px-8">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-8 pt-4 sm:px-8">
            <ul className="space-y-1">
              {allLinks.map((item, index) => (
                <li key={item.href} style={{ animationDelay: `${index * 40}ms` }} className="animate-fade-up">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-cream/10 py-4 font-display text-3xl text-cream transition-colors hover:text-gold",
                      isActive(item.href) && "text-gold",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              <Button href="/bookings" className="w-full">
                Book a table
              </Button>
              <Button href="/takeaway" variant="secondary" className="w-full">
                Order takeaway
              </Button>
            </div>

            <address className="mt-10 space-y-2 text-sm not-italic text-sand">
              <p>{site.address.full}</p>
              <p>
                <a href={`tel:${site.phone.e164}`} className="hover:text-gold">
                  {site.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </p>
            </address>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
