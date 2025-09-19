import React, { useState, useRef, useEffect } from "react";
import { cn } from "@ruma-ui/utils";
import { tw } from "@ruma-ui/utils";

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
  size?: "sm" | "md" | "lg";
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

// Match Input's design primitives for consistency
const wrapperBase = tw`relative inline-flex w-full flex-col`;
const fieldBase = tw`relative inline-flex items-center border bg-white text-gray-900 transition-all duration-200 focus-within:ring-3`;

const variants = {
  primary: tw`border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-200`,
  secondary: tw`border-gray-300 bg-gray-50 focus-within:border-gray-500 focus-within:ring-gray-200`,
};

const sizes = {
  sm: {
    container: tw`h-8`,
    text: tw`text-xs`,
    padX: "px-2",
    padY: "py-1.5",
    gap: "gap-1.5",
  },
  md: {
    container: tw`h-9`,
    text: tw`text-sm`,
    padX: "px-3.5",
    padY: "py-2",
    gap: "gap-2",
  },
  lg: {
    container: tw`h-10`,
    text: tw`text-base`,
    padX: "px-4",
    padY: "py-2.5",
    gap: "gap-2.5",
  },
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
  sm: tw`text-xs`,
  md: tw`text-sm`,
  lg: tw`text-base`,
};

const widths = {
  sm: tw`w-64`,
  md: tw`w-80`,
  lg: tw`w-96`,
  xl: tw`w-[30rem]`,
} as const;

const errorStyles = tw`border-red-500 focus-within:border-red-500 focus-within:ring-red-200`;

const dropdownBase = tw`absolute top-full left-0 z-50 mt-2 max-h-60 w-full overflow-auto border border-gray-200 bg-white shadow-lg`;

const optionBase = tw`flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50`;

const optionAnimated = tw`transition-colors duration-150`;

const optionSelected = tw`bg-blue-50 text-blue-700`;
const optionDisabled = tw`cursor-not-allowed bg-gray-100 opacity-50`;

const chevronAnimated = tw`transition-transform duration-200`;

const labelBase = tw`mb-1 font-medium text-gray-900`;

// Assistive text matches Input's layout
const assistiveContainer = tw`mt-1 min-h-[1rem] px-1`;
const descriptionText = tw`text-sm text-gray-600`;
const errorText = tw`text-sm text-red-600`;

// Chevron down icon component
const ChevronDownIcon = ({ isOpen, animated }: { isOpen: boolean; animated: boolean }) => (
  <svg
    className={cn("h-4 w-4 text-gray-400", animated && chevronAnimated, isOpen && "rotate-180")}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
  </svg>
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

    // Update selected value when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    // Close dropdown when clicking outside
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

    // Handle keyboard navigation and hidden search
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      // Hidden search (type-to-select, cycles through matches)
      if (event.key.length === 1 && event.key.match(/^[^\s]$/)) {
        const char = event.key.toLowerCase();
        let newBuffer = searchBuffer + char;
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => setSearchBuffer(""), 500);

        // Find all matching options
        const matches = options
          .map((opt, idx) => ({ idx, opt }))
          .filter(({ opt }) => !opt.disabled && opt.label.toLowerCase().startsWith(newBuffer));

        // If no matches, try just the last char
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
          // Cycle through matches if same buffer is typed repeatedly
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

    // Scroll to option helper
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

    // Container matches Input field wrapper
    const containerClasses = cn(
      fieldBase,
      variants[variant],
      sizes[size].container,
      roundedOptions[rounded],
      sizes[size].padX,
      sizes[size].gap,
      error && errorStyles,
      fullWidth && "w-full",
      disabled && "cursor-not-allowed opacity-50",
      className
    );

    // Cap dropdown rounding at xl even if control is rounded-full
    const dropdownRadius = rounded === "full" ? tw`rounded-xl` : roundedOptions[rounded];

    return (
      <div className={cn(wrapperBase, fullWidth ? "w-full" : (widths[width] ?? "w-auto"))}>
        {/* Hidden input for form submission */}
        <input type='hidden' name={name} value={selectedValue} />

        {label && (
          <label
            htmlFor={selectId}
            className={cn(labelBase, labelSizes[size], error && "text-red-700")}
          >
            {label}
          </label>
        )}

        <div className={containerClasses}>
          {/* Show selected option's icon if selected, else startIcon if provided */}
          {(selectedOption?.icon || startIcon) && (
            <span className='flex shrink-0 items-center text-gray-500'>
              {selectedOption?.icon ? selectedOption.icon : startIcon}
            </span>
          )}
          <button
            ref={ref || triggerRef}
            type='button'
            className={cn(
              "min-w-0 flex-1 truncate bg-transparent text-left outline-none",
              sizes[size].text
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup='listbox'
            aria-controls={listboxId}
            aria-describedby={hasAssistive ? assistiveId : undefined}
            id={selectId}
            {...props}
          >
            {selectedOption ? (
              <span className='truncate text-gray-900'>{selectedOption.label}</span>
            ) : (
              <span className='truncate text-gray-400'>{placeholder}</span>
            )}
          </button>
          <span className='flex shrink-0 items-center text-gray-400'>
            <ChevronDownIcon isOpen={isOpen} animated={animation} />
          </span>
          {/* Dropdown is now rendered inside the main container, right after the button */}
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
              role='listbox'
            >
              {options.map((option, index) => {
                const isSelected = selectedValue === option.value;
                return (
                  <button
                    key={option.value}
                    type='button'
                    className={cn(
                      optionBase,
                      animation && optionAnimated,
                      isSelected && optionSelected,
                      option.disabled && optionDisabled,
                      index === focusedIndex && "bg-gray-50",
                      sizes[size].text,
                      sizes[size].padY
                    )}
                    onClick={() => handleOptionSelect(option.value)}
                    disabled={option.disabled}
                    role='option'
                    aria-selected={isSelected}
                  >
                    {/* Option icon, if provided */}
                    {option.icon && (
                      <span className='mr-2 flex items-center text-gray-500'>{option.icon}</span>
                    )}
                    <span className='flex-1 truncate'>{option.label}</span>
                    {/* Check icon shown for selected option */}
                    <svg
                      className={cn(
                        "h-5 w-5 shrink-0 text-blue-600",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden={!isSelected}
                      focusable='false'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {hasAssistive && (
          <div id={assistiveId} className={assistiveContainer}>
            {error && errorMessage ? (
              <span className={errorText}>{errorMessage}</span>
            ) : description ? (
              <span className={descriptionText}>{description}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
