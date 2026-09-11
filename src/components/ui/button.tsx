import Link from "next/link";
import type { Route } from "next";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans text-[0.9375rem] font-semibold tracking-normal normal-case transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-(--ease-out-expo) disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-cream text-ink border border-gold-deep/50 shadow-glow hover:bg-cream-deep hover:border-gold-deep active:translate-y-px",
  secondary: "border border-gold/70 text-gold hover:border-cream hover:bg-cream hover:text-ink active:translate-y-px",
  ghost: "text-cream/85 hover:text-gold underline-offset-[6px] hover:underline px-0",
  dark: "bg-ink text-cream hover:bg-stone active:translate-y-px",
  light: "border border-ink/25 text-ink hover:bg-ink hover:text-cream active:translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-7",
  lg: "h-14 px-9 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type AnchorProps = CommonProps & Omit<ComponentProps<"a">, "href" | "className" | "children"> & { href: string };
type NativeButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeButtonProps;

const isExternal = (href: string) => /^(https?:)?\/\//.test(href);
const isProtocol = (href: string) => /^(tel|mailto|sms):/.test(href);

/**
 * One button component for every call to action.
 * - Internal paths render a prefetching <Link>.
 * - External URLs open in a new tab with safe rel attributes.
 * - tel:/mailto: links render a plain anchor.
 * - Without `href` it renders a native <button>.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof props.href === "string") {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    if (isProtocol(href)) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href as Route} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button {...rest} className={classes} type={rest.type ?? "button"}>
      {children}
    </button>
  );
}
