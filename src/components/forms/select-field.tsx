"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  hint?: string;
}

interface SelectFieldProps {
  id: string;
  name: string;
  options: readonly SelectOption[];
  placeholder?: string;
  /** Controlled value. Omit to let the component manage its own state. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  describedBy?: string;
  invalid?: boolean;
  required?: boolean;
  className?: string;
}

/**
 * A styled replacement for <select>. Renders a combobox button plus an inline
 * listbox (same approach as DatePicker, so nothing is clipped by the hero's
 * overflow). Keyboard: arrows move, Enter/Space pick, Escape closes, letters
 * jump to matching options. A hidden input carries the value for FormData.
 */
export function SelectField({
  id,
  name,
  options,
  placeholder = "Choose…",
  value: controlled,
  defaultValue = "",
  onChange,
  describedBy,
  invalid = false,
  required = false,
  className,
}: SelectFieldProps) {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef<{ text: string; at: number }>({ text: "", at: 0 });
  const listId = useId();

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const commit = (next: string) => {
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  const openList = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const pick = (index: number) => {
    const option = options[index];
    if (!option) return;
    commit(option.value);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  // Keep the active option visible when navigating with the keyboard.
  useEffect(() => {
    if (!open || active < 0) return;
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.min(last, i + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActive(last);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open && active >= 0) pick(active);
        else openList();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default: {
        if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;
        const now = Date.now();
        const text = (now - typeahead.current.at < 600 ? typeahead.current.text : "") + event.key.toLowerCase();
        typeahead.current = { text, at: now };
        const match = options.findIndex((o) => o.label.toLowerCase().startsWith(text));
        if (match >= 0) {
          if (open) setActive(match);
          else commit(options[match].value);
        }
      }
    }
  };

  return (
    <div ref={rootRef} className={cn("relative [color-scheme:light]", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        role="combobox"
        data-name={name}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-required={required || undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border bg-white/70 px-4 py-3 text-left text-base transition-[border-color,box-shadow]",
          "focus:border-gold-deep focus:outline-none focus:ring-4 focus:ring-gold/25",
          invalid ? "border-danger" : "border-ink/15",
          selected ? "text-ink" : "text-ink/40",
        )}
      >
        <span className="min-w-0 truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown className={cn("size-4 shrink-0 text-gold-dark transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="mt-2 max-h-72 overflow-y-auto rounded-2xl border border-ink/10 bg-white p-1.5 text-ink shadow-card"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === active;
            return (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setActive(index)}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => pick(index)}
                className={cn(
                  "flex cursor-pointer items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isActive && "bg-gold/15",
                  isSelected && "font-medium",
                )}
              >
                <span className="min-w-0">
                  <span className="block leading-snug">{option.label}</span>
                  {option.hint ? <span className="mt-0.5 block text-xs leading-relaxed text-ink/55">{option.hint}</span> : null}
                </span>
                <Check className={cn("mt-0.5 size-4 shrink-0 text-gold-dark", isSelected ? "opacity-100" : "opacity-0")} strokeWidth={2.5} aria-hidden />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
