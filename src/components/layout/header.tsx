"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { X, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { navigation, openingHours, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/icons";
import { Logo } from "./logo";
import { OpenStatus } from "./open-status";

const allLinks = [...navigation.primary, ...navigation.secondary];
// Desktop bar: links flank a centred logo. Bookings is covered by the gold CTA, and the
// drawer (always available) lists everything including Our Story and Contact.
const leftLinks = navigation.primary.filter((item) => item.href !== "/bookings");
const rightLinks = navigation.secondary.filter((item) => !["/our-story", "/contact"].includes(item.href));

interface NavItemProps {
  item: (typeof allLinks)[number];
  active: boolean;
}

/** Serif nav link: cream, gold on hover; the current page is set in gold italic. */
function NavItem({ item, active }: NavItemProps) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-10 items-center px-3.5 font-display text-[1.125rem] font-medium leading-none tracking-[0.02em] whitespace-nowrap transition-colors duration-300",
        active ? "italic text-gold" : "text-cream hover:text-gold",
      )}
    >
      {item.label}
    </Link>
  );
}

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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scrim: keeps the bar legible over bright hero photography until the frosted bar takes over. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[calc(var(--header-height)+9rem)] bg-gradient-to-b from-ink/95 via-ink/65 via-45% to-transparent transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100",
        )}
      />

      {/* ---- Utility strip: desktop only, folds away once the page scrolls ---- */}
      <div
        className={cn(
          "relative hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-(--ease-out-expo) lg:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
        )}
        aria-hidden={scrolled}
      >
        <div className="container-content flex h-10 items-center justify-between text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-cream/75">
          <a
            href={site.maps.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-cream"
            tabIndex={scrolled ? -1 : undefined}
          >
            <MapPin className="size-3 text-gold" aria-hidden />
            {site.address.full}
          </a>
          <div className="flex items-center gap-5">
            <OpenStatus className="text-[0.6875rem] uppercase tracking-[0.18em]" />
            <span className="h-3 w-px bg-cream/15" aria-hidden />
            <a href={`tel:${site.phone.e164}`} className="inline-flex items-center gap-2 transition-colors hover:text-cream" tabIndex={scrolled ? -1 : undefined}>
              <Phone className="size-3 text-gold" aria-hidden />
              {site.phone.display}
            </a>
            <span className="h-3 w-px bg-cream/15" aria-hidden />
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-cream"
              tabIndex={scrolled ? -1 : undefined}
            >
              <InstagramIcon className="size-3 text-gold" />
              {site.social.instagramHandle}
            </a>
          </div>
        </div>
        <div className="container-content">
          <div className="h-px bg-gradient-to-r from-transparent via-cream/15 to-transparent" aria-hidden />
        </div>
      </div>

      {/* ---- Main bar: full-bleed over the hero, condenses into a floating frosted capsule on scroll ---- */}
      <div className={cn("relative transition-[padding] duration-500 ease-(--ease-out-expo)", scrolled && "px-3 pt-2.5 sm:px-5 sm:pt-3")}>
        <div
          className={cn(
            "relative mx-auto border transition-[max-width,border-color,background-color,border-radius,box-shadow] duration-500 ease-(--ease-out-expo)",
            scrolled
              ? "max-w-[76rem] rounded-full border-gold/20 bg-ink/80 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.85),inset_0_1px_0_rgb(255_205_117/0.14)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink/70"
              : "max-w-none rounded-none border-transparent bg-transparent",
          )}
        >
          <div
            className={cn(
              "container-content grid grid-cols-[auto_1fr] items-center gap-3 transition-[height] duration-500 ease-(--ease-out-expo) lg:grid-cols-[1fr_auto_1fr] lg:gap-6",
              scrolled ? "h-16" : "h-(--header-height)",
            )}
          >
            {/* Left nav (desktop) */}
            <nav aria-label="Primary" className="hidden items-center justify-self-start lg:flex">
              {leftLinks.map((item) => (
                <NavItem key={item.href} item={item} active={isActive(item.href)} />
              ))}
            </nav>

            {/* Logo: leads on mobile, sits centred on desktop */}
            <div className={cn("justify-self-start transition-transform duration-500 ease-(--ease-out-expo) lg:justify-self-center", scrolled && "scale-[0.86]")}>
              <Logo priority />
            </div>

            {/* Right nav + actions */}
            <div className="flex items-center justify-self-end gap-2 sm:gap-3">
              <nav aria-label="Services" className="hidden items-center lg:flex lg:mr-3">
                {rightLinks.map((item) => (
                  <NavItem key={item.href} item={item} active={isActive(item.href)} />
                ))}
              </nav>
              <a
                href={`tel:${site.phone.e164}`}
                className="hidden h-10 items-center gap-2 rounded-full border border-cream/15 px-4 text-[0.75rem] font-semibold tracking-[0.08em] text-cream transition-colors hover:border-gold/60 hover:text-gold md:inline-flex lg:hidden"
              >
                <Phone className="size-3.5 text-gold" aria-hidden />
                {site.phone.display}
              </a>
              <Button href="/bookings" size="sm" className="hidden sm:inline-flex">
                Book a table
              </Button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="site-navigation"
                aria-label="Open navigation"
                className="group inline-flex size-11 flex-col items-center justify-center gap-[5px] rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/60"
              >
                <span className="block h-px w-[18px] bg-current transition-[width,background-color] duration-300 group-hover:bg-gold" aria-hidden />
                <span className="block h-px w-[11px] bg-current transition-[width,background-color] duration-300 group-hover:w-[18px] group-hover:bg-gold" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Navigation drawer ---- */}
      <dialog
        ref={dialogRef}
        id="site-navigation"
        aria-label="Site navigation"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-cream backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:animate-fade-in"
      >
        <div className="relative ml-auto flex h-full w-full max-w-md flex-col overflow-hidden bg-ink shadow-2xl ring-1 ring-gold/15 animate-slide-in-right">
          <div
            className="pointer-events-none absolute inset-0 bg-[url('/brand/arabesque-tile.png')] bg-[length:148px_148px] opacity-[0.05]"
            aria-hidden
          />
          <div className="pointer-events-none absolute -top-32 -right-32 size-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />

          <div className="relative flex h-(--header-height) items-center justify-between px-6 sm:px-8">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="inline-flex size-11 items-center justify-center rounded-full border border-cream/12 text-cream transition-colors hover:border-gold/60 hover:text-gold"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Site" className="relative flex-1 overflow-y-auto px-6 pt-6 pb-10 sm:px-8">
            <ol className="space-y-1">
              {allLinks.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} style={{ animationDelay: `${80 + index * 45}ms` }} className="animate-fade-up">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-baseline gap-4 py-3 font-display text-[2rem] leading-none transition-colors",
                        active ? "text-gold" : "text-cream hover:text-gold",
                      )}
                    >
                      <span className="w-6 font-sans text-[0.625rem] font-semibold tracking-[0.2em] text-gold/60 transition-colors group-hover:text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 grid gap-3 animate-fade-up [animation-delay:480ms]">
              <Button href="/bookings" className="w-full">
                Book a table
              </Button>
              <Button href="/takeaway" variant="secondary" className="w-full">
                Order takeaway
              </Button>
            </div>

            <div className="mt-10 grid gap-6 border-t border-cream/10 pt-8 text-sm text-sand animate-fade-up [animation-delay:560ms] sm:grid-cols-2">
              <div className="space-y-3">
                <p className="eyebrow text-[0.625rem]">Visit</p>
                <address className="not-italic leading-relaxed">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.postalCode}
                </address>
                <p>
                  <a href={`tel:${site.phone.e164}`} className="transition-colors hover:text-gold">
                    {site.phone.display}
                  </a>
                </p>
              </div>
              <div className="space-y-3">
                <p className="eyebrow text-[0.625rem]">Hours</p>
                <ul className="space-y-1 leading-relaxed">
                  {openingHours.map((period) => (
                    <li key={period.label}>{period.label}</li>
                  ))}
                </ul>
                <OpenStatus className="text-xs" />
              </div>
            </div>

            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-gold animate-fade-up [animation-delay:620ms]"
            >
              <InstagramIcon className="size-4" />
              {site.social.instagramHandle}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
