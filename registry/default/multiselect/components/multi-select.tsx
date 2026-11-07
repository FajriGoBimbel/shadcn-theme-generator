"use client";

import * as React from "react";
import { Check, ChevronDown, X, Search, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface MultiSelectOption {
  /** Unique value stored in selection */
  value: string;
  /** Text shown to the user */
  label: string;
  /** Optional group heading this option belongs to */
  group?: string;
  /** Optional leading icon */
  icon?: React.ComponentType<{ className?: string }>;
  /** Disable this individual option */
  disabled?: boolean;
}

export interface MultiSelectProps {
  /** Available options */
  options: MultiSelectOption[];
  /** Controlled selected values */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Called whenever selection changes */
  onChange?: (value: string[]) => void;
  /** Placeholder when nothing is selected */
  placeholder?: string;
  /** Placeholder for the search box */
  searchPlaceholder?: string;
  /** Message shown when no option matches the search */
  emptyText?: string;
  /** Maximum number of chips to show before collapsing into "+N more" */
  maxDisplay?: number;
  /** Hard limit on how many items can be selected */
  maxSelected?: number;
  /** Disable the whole control */
  disabled?: boolean;
  /** Enable the search input (default: true) */
  searchable?: boolean;
  /** Show a "Select all / Clear" toolbar (default: true) */
  showToolbar?: boolean;
  /** Extra class for the trigger */
  className?: string;
}

/**
 * MultiSelect — an accessible, searchable multi-select built on shadcn/ui
 * conventions. Self-contained: only depends on the Badge primitive,
 * lucide-react icons, and the `cn` helper. No extra runtime deps.
 */
export function MultiSelect({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  maxDisplay = 3,
  maxSelected,
  disabled = false,
  searchable = true,
  showToolbar = true,
  className,
}: MultiSelectProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const selected = isControlled ? controlledValue! : internalValue;

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const setSelected = React.useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  // Close on outside click.
  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Focus the search box when opening.
  React.useEffect(() => {
    if (open && searchable) {
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open, searchable]);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  // Group the filtered options (preserving order of first appearance).
  const groups = React.useMemo(() => {
    const map = new Map<string, MultiSelectOption[]>();
    for (const opt of filtered) {
      const key = opt.group ?? "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(opt);
    }
    return Array.from(map.entries());
  }, [filtered]);

  // A flat list matching visual order — used for keyboard navigation.
  const flatOptions = React.useMemo(
    () => groups.flatMap(([, opts]) => opts),
    [groups]
  );

  React.useEffect(() => {
    setActiveIndex(0);
  }, [search, open]);

  const atLimit = maxSelected !== undefined && selected.length >= maxSelected;

  const toggle = React.useCallback(
    (val: string) => {
      const has = selected.includes(val);
      if (has) {
        setSelected(selected.filter((v) => v !== val));
      } else {
        if (atLimit) return;
        setSelected([...selected, val]);
      }
    },
    [selected, setSelected, atLimit]
  );

  const clearAll = React.useCallback(() => setSelected([]), [setSelected]);

  const selectAll = React.useCallback(() => {
    const selectable = options.filter((o) => !o.disabled).map((o) => o.value);
    const limited =
      maxSelected !== undefined ? selectable.slice(0, maxSelected) : selectable;
    setSelected(limited);
  }, [options, maxSelected, setSelected]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = flatOptions[activeIndex];
      if (opt && !opt.disabled) toggle(opt.value);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Backspace" && !search && selected.length > 0) {
      // Quick-remove last chip.
      setSelected(selected.slice(0, -1));
    }
  };

  const selectedOptions = selected
    .map((v) => options.find((o) => o.value === v))
    .filter((o): o is MultiSelectOption => Boolean(o));

  const visibleChips = selectedOptions.slice(0, maxDisplay);
  const overflowCount = selectedOptions.length - visibleChips.length;

  const allSelected =
    options.filter((o) => !o.disabled).length > 0 &&
    options.filter((o) => !o.disabled).every((o) => selected.includes(o.value));

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          "flex min-h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors",
          "hover:bg-accent/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          disabled && "cursor-not-allowed opacity-50",
          open && "ring-1 ring-ring"
        )}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1 overflow-hidden">
          {selectedOptions.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <>
              {visibleChips.map((opt) => (
                <Badge
                  key={opt.value}
                  variant="secondary"
                  className="group/chip animate-fade-in-up gap-1 pr-1 pl-2"
                >
                  {opt.icon && <opt.icon className="h-3 w-3" />}
                  <span className="max-w-[120px] truncate">{opt.label}</span>
                  <span
                    role="button"
                    tabIndex={-1}
                    aria-label={`Remove ${opt.label}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(opt.value);
                    }}
                    className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-sm text-muted-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </span>
                </Badge>
              ))}
              {overflowCount > 0 && (
                <Badge variant="outline" className="font-normal">
                  +{overflowCount} more
                </Badge>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          {selectedOptions.length > 0 && !disabled && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Clear all"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="flex h-5 w-5 items-center justify-center rounded-sm text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <XCircle className="h-4 w-4" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1.5 w-full origin-top overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "animate-fade-in-up"
          )}
          onKeyDown={handleKeyDown}
        >
          {searchable && (
            <div className="flex items-center gap-2 border-b px-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-muted-foreground/60 hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

          {showToolbar && (
            <div className="flex items-center justify-between border-b px-3 py-1.5 text-xs">
              <span className="text-muted-foreground">
                {selected.length} selected
                {maxSelected !== undefined && ` / ${maxSelected}`}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  disabled={allSelected || maxSelected !== undefined}
                  className="font-medium text-primary transition-opacity hover:opacity-80 disabled:opacity-40"
                >
                  Select all
                </button>
                <span className="text-border">|</span>
                <button
                  type="button"
                  onClick={clearAll}
                  disabled={selected.length === 0}
                  className="font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          <div className="max-h-64 overflow-y-auto overflow-x-hidden p-1">
            {flatOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : (
              groups.map(([groupName, opts]) => (
                <div key={groupName || "__ungrouped"}>
                  {groupName && (
                    <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {groupName}
                    </div>
                  )}
                  {opts.map((opt) => {
                    const isSelected = selected.includes(opt.value);
                    const flatIndex = flatOptions.indexOf(opt);
                    const isActive = flatIndex === activeIndex;
                    const isDisabled =
                      opt.disabled || (!isSelected && atLimit);
                    return (
                      <div
                        key={opt.value}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setActiveIndex(flatIndex)}
                        onClick={() => !isDisabled && toggle(opt.value)}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
                          isActive && "bg-accent text-accent-foreground",
                          isDisabled && "cursor-not-allowed opacity-40"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-all duration-150",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/40"
                          )}
                        >
                          <Check
                            className={cn(
                              "h-3 w-3 transition-transform duration-150",
                              isSelected ? "scale-100" : "scale-0"
                            )}
                          />
                        </div>
                        {opt.icon && (
                          <opt.icon className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="flex-1 truncate">{opt.label}</span>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
