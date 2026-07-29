import React, { useEffect, useRef, useState } from "react";
import { HiOutlineCheck, HiOutlineChevronDown } from "react-icons/hi";
import { cn, tw } from "../../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectProps {
  /**
   * The visual style of the select
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the select
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Control the border radius of the select
   * @default "sm"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Enable/disable animations
   * @default true
   */
  animation?: boolean;
  /**
   * Make select take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Preset width of the select wrapper
   * @default "md"
   */
  width?: "sm" | "md" | "lg" | "xl";
  /**
   * Optional left icon - accepts any React element
   */
  startIcon?: React.ReactNode;
  /**
   * Optional label text displayed above the select
   */
  label?: string;
  /**
   * Optional helper/description text displayed below the select
   */
  description?: string;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display below the select
   */
  errorMessage?: string;
  /**
   * Array of options for the select
   */
  options: SelectOption[];
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  /**
   * Selected value
   */
  value?: string;
  /**
   * Default selected value
   */
  defaultValue?: string;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * ID for the select element
   */
  id?: string;
  /**
   * Name attribute for the select
   */
  name?: string;
}

const wrapperBase = tw`relative inline-flex w-full flex-col`;
const fieldBase = tw`rui-field-focus relative inline-flex items-center border bg-background text-foreground transition-colors duration-150`;

const variants = {
  primary: tw`border-input bg-background`,
  secondary: tw`border-input bg-muted`,
};

// IMPORTANT: Heights must match TextInput's size scale exactly.
// xs=h-8 sm=h-9 md=h-10 lg=h-12 xl=h-14
const sizes = {
  xs: { container: tw`h-7`, text: tw`text-xs`, padX: "px-2", padY: "py-1", gap: "gap-1" },
  sm: { container: tw`h-8`, text: tw`text-xs`, padX: "px-2.5", padY: "py-1.5", gap: "gap-1.5" },
  md: { container: tw`h-9`, text: tw`text-sm`, padX: "px-3", padY: "py-1.5", gap: "gap-2" },
  lg: { container: tw`h-10`, text: tw`text-sm`, padX: "px-3.5", padY: "py-2", gap: "gap-2" },
  xl: { container: tw`h-12`, text: tw`text-base`, padX: "px-4", padY: "py-2.5", gap: "gap-2.5" },
} as const;

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

const labelSizes = {
  xs: tw`text-xs`,
  sm: tw`text-sm`,
  md: tw`text-sm`,
  lg: tw`text-base`,
  xl: tw`text-base`,
};

const widths = {
  sm: tw`w-64`,
  md: tw`w-80`,
  lg: tw`w-96`,
  xl: tw`w-[30rem]`,
} as const;

const dropdownBase = tw`absolute top-full left-0 z-50 mt-1.5 max-h-60 w-full overflow-auto border border-border bg-popover shadow-lg`;
const optionBase = tw`flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`;
const optionAnimated = tw`transition-colors duration-150`;
const optionSelected = tw`bg-accent text-accent-foreground`;
const optionDisabled = tw`cursor-not-allowed opacity-50`;
const chevronAnimated = tw`transition-transform duration-200`;

const ChevronDownIcon = ({ isOpen, animated }: { isOpen: boolean; animated: boolean }) => (
  <HiOutlineChevronDown
    className={cn(
      "text-muted-foreground h-4 w-4",
      animated && chevronAnimated,
      isOpen && "rotate-180"
    )}
  />
);

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      fullWidth = false,
      width = "md",
      rounded = "sm",
      animation = true,
      error = false,
      disabled = false,
      startIcon,
      label,
      description,
      errorMessage,
      options,
      placeholder = "Select...",
      value,
      defaultValue,
      onValueChange,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || "");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [searchBuffer, setSearchBuffer] = useState("");
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const lastSearchedIndex = useRef<number>(-1);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const autoId = React.useId();
    const selectId = id ?? autoId;
    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${selectId}-desc`;
    const listboxId = `${selectId}-listbox`;

    useEffect(() => {
      if (value !== undefined) setSelectedValue(value);
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      if (event.key.length === 1 && event.key.match(/^[^\s]$/)) {
        const char = event.key.toLowerCase();
        let newBuffer = searchBuffer + char;
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => setSearchBuffer(""), 500);

        const matches = options
          .map((opt, idx) => ({ idx, opt }))
          .filter(({ opt }) => !opt.disabled && opt.label.toLowerCase().startsWith(newBuffer));

        if (matches.length === 0 && newBuffer.length > 1) {
          newBuffer = char;
          setSearchBuffer(newBuffer);
          const fallbackMatches = options
            .map((opt, idx) => ({ idx, opt }))
            .filter(({ opt }) => !opt.disabled && opt.label.toLowerCase().startsWith(newBuffer));
          if (fallbackMatches.length > 0) {
            lastSearchedIndex.current = fallbackMatches[0].idx;
            setFocusedIndex(fallbackMatches[0].idx);
            scrollToOption(fallbackMatches[0].idx);
          }
          return;
        }

        setSearchBuffer(newBuffer);
        if (matches.length > 0) {
          let nextIdx = matches[0].idx;
          if (
            matches.length > 1 &&
            lastSearchedIndex.current !== -1 &&
            matches.some(({ idx }) => idx === lastSearchedIndex.current)
          ) {
            const currentIdx = matches.findIndex(({ idx }) => idx === lastSearchedIndex.current);
            nextIdx = matches[(currentIdx + 1) % matches.length].idx;
          }
          lastSearchedIndex.current = nextIdx;
          setFocusedIndex(nextIdx);
          scrollToOption(nextIdx);
        }
        return;
      }

      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(
              selectedValue ? options.findIndex(opt => opt.value === selectedValue) : 0
            );
            setSearchBuffer("");
            lastSearchedIndex.current = -1;
          } else if (focusedIndex >= 0) {
            handleOptionSelect(options[focusedIndex].value);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          setSearchBuffer("");
          lastSearchedIndex.current = -1;
          triggerRef.current?.focus();
          break;
        case "ArrowDown": {
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
            setSearchBuffer("");
            lastSearchedIndex.current = -1;
          } else {
            const nextIndex = Math.min(focusedIndex + 1, options.length - 1);
            setFocusedIndex(nextIndex);
            scrollToOption(nextIndex);
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (isOpen) {
            const prevIndex = Math.max(focusedIndex - 1, 0);
            setFocusedIndex(prevIndex);
            scrollToOption(prevIndex);
          }
          break;
        }
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          setSearchBuffer("");
          lastSearchedIndex.current = -1;
          break;
      }
    };

    const scrollToOption = (idx: number) => {
      if (!isOpen) return;
      const dropdown = dropdownRef.current;
      if (dropdown) {
        const optionEl = dropdown.querySelectorAll('button[role="option"]')[idx] as HTMLElement;
        optionEl?.scrollIntoView({ block: "nearest" });
      }
    };

    const handleOptionSelect = (optionValue: string) => {
      const option = options.find(opt => opt.value === optionValue);
      if (option?.disabled) return;
      setSelectedValue(optionValue);
      setIsOpen(false);
      setFocusedIndex(-1);
      onValueChange?.(optionValue);
      triggerRef.current?.focus();
    };

    const selectedOption = options.find(opt => opt.value === selectedValue);
    const dropdownRadius = rounded === "full" ? tw`rounded-xl` : roundedOptions[rounded];

    return (
      <div className={cn(wrapperBase, fullWidth ? "w-full" : (widths[width] ?? "w-auto"))}>
        <input type="hidden" name={name} value={selectedValue} />

        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "text-foreground mb-1 font-medium",
              labelSizes[size],
              error && "text-destructive"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            fieldBase,
            variants[variant],
            sizes[size].container,
            roundedOptions[rounded],
            sizes[size].padX,
            sizes[size].gap,
            error && "rui-field-error border-destructive",
            fullWidth && "w-full",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          {(selectedOption?.icon || startIcon) && (
            <span className="text-muted-foreground flex shrink-0 items-center">
              {selectedOption?.icon ? selectedOption.icon : startIcon}
            </span>
          )}
          <button
            ref={ref || triggerRef}
            type="button"
            className={cn(
              "min-w-0 flex-1 truncate bg-transparent text-left outline-none",
              sizes[size].text
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-describedby={hasAssistive ? assistiveId : undefined}
            id={selectId}
            {...props}
          >
            {selectedOption ? (
              <span className="text-foreground truncate">{selectedOption.label}</span>
            ) : (
              <span className="text-muted-foreground truncate">{placeholder}</span>
            )}
          </button>
          <span className="flex shrink-0 items-center">
            <ChevronDownIcon isOpen={isOpen} animated={animation} />
          </span>

          {isOpen && (
            <div
              ref={dropdownRef}
              id={listboxId}
              className={cn(
                dropdownBase,
                dropdownRadius,
                animation &&
                  "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150 ease-out"
              )}
              role="listbox"
            >
              {options.map((option, index) => {
                const isSelected = selectedValue === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      optionBase,
                      animation && optionAnimated,
                      isSelected && optionSelected,
                      option.disabled && optionDisabled,
                      index === focusedIndex && "bg-accent text-accent-foreground",
                      sizes[size].text,
                      sizes[size].padY
                    )}
                    onClick={() => handleOptionSelect(option.value)}
                    disabled={option.disabled}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.icon && (
                      <span className="text-muted-foreground mr-2 flex items-center">
                        {option.icon}
                      </span>
                    )}
                    <span className="flex-1 truncate">{option.label}</span>
                    <HiOutlineCheck
                      className={cn(
                        "text-primary h-5 w-5 shrink-0",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                      aria-hidden={!isSelected}
                      focusable="false"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {hasAssistive && (
          <div id={assistiveId} className="mt-1 min-h-[1rem] px-1">
            {error && errorMessage ? (
              <span className="text-destructive text-sm">{errorMessage}</span>
            ) : description ? (
              <span className="text-muted-foreground text-sm">{description}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
