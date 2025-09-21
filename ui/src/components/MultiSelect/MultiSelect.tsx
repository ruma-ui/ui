import React, { useEffect, useRef, useState } from "react";
import { HiOutlineCheck, HiOutlineChevronDown } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { cn, tw } from "../../lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface MultiSelectProps {
  /**
   * The visual style of the multi-select
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the multi-select
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Control the border radius of the multi-select
   * @default "sm"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Enable/disable animations
   * @default true
   */
  animation?: boolean;
  /**
   * Make multi-select take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Preset width of the multi-select wrapper
   * @default "md"
   */
  width?: "sm" | "md" | "lg" | "xl";
  /**
   * Optional left icon - accepts any React element
   */
  startIcon?: React.ReactNode;
  /**
   * Optional label text displayed above the multi-select
   */
  label?: string;
  /**
   * Optional helper/description text displayed below the multi-select
   */
  description?: string;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display below the multi-select
   */
  errorMessage?: string;
  /**
   * Array of options for the multi-select
   */
  options: MultiSelectOption[];
  /**
   * Placeholder text when no options are selected
   */
  placeholder?: string;
  /**
   * Selected values
   */
  value?: string[];
  /**
   * Default selected values
   */
  defaultValue?: string[];
  /**
   * Callback when values change
   */
  onValueChange?: (values: string[]) => void;
  /**
   * Whether the multi-select is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Maximum number of selections allowed
   */
  maxSelections?: number;
  /**
   * Show selected count in trigger
   * @default true
   */
  showSelectedCount?: boolean;
  /**
   * Custom selected count text formatter
   */
  selectedCountText?: (count: number, total: number) => string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * ID for the multi-select element
   */
  id?: string;
  /**
   * Name attribute for the multi-select
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
    container: tw`min-h-8`,
    text: tw`text-xs`,
    padX: "px-2",
    padY: "py-1.5",
    gap: "gap-1.5",
  },
  md: {
    container: tw`min-h-9`,
    text: tw`text-sm`,
    padX: "px-3.5",
    padY: "py-2",
    gap: "gap-2",
  },
  lg: {
    container: tw`min-h-10`,
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

const optionSelected = tw`text-blue-700`;
const optionDisabled = tw`cursor-not-allowed bg-gray-100 opacity-50`;

const chevronAnimated = tw`transition-transform duration-200`;

const labelBase = tw`mb-1 font-medium text-gray-900`;

// Assistive text matches Input's layout
const assistiveContainer = tw`mt-1 min-h-[1rem] px-1`;
const descriptionText = tw`text-sm text-gray-600`;
const errorText = tw`text-sm text-red-600`;

// Selected item styles
const selectedItemBase = tw`inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800`;
const selectedItemRemove = tw`ml-1 flex h-3 w-3 cursor-pointer items-center justify-center rounded-full hover:bg-blue-200 focus:bg-blue-200 focus:outline-none`;

// Chevron down icon component
const ChevronDownIcon = ({ isOpen, animated }: { isOpen: boolean; animated: boolean }) => (
  <HiOutlineChevronDown
    className={cn("h-4 w-4 text-gray-400", animated && chevronAnimated, isOpen && "rotate-180")}
  />
);

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
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
      placeholder = "Select options...",
      value,
      defaultValue = [],
      onValueChange,
      maxSelections,
      showSelectedCount = true,
      selectedCountText,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(value || defaultValue || []);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [searchBuffer, setSearchBuffer] = useState("");
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const lastSearchedIndex = useRef<number>(-1);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Forward ref to the trigger button
    React.useImperativeHandle(ref, () => triggerRef.current!);

    const autoId = React.useId();
    const selectId = id ?? autoId;
    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${selectId}-desc`;
    const listboxId = `${selectId}-listbox`;

    // Update selected values when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValues(value);
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
            setFocusedIndex(0);
            setSearchBuffer("");
            lastSearchedIndex.current = -1;
          } else if (focusedIndex >= 0) {
            handleOptionToggle(options[focusedIndex].value);
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

    const handleOptionToggle = (optionValue: string) => {
      const option = options.find(opt => opt.value === optionValue);
      if (option?.disabled) return;

      const isSelected = selectedValues.includes(optionValue);
      let newValues: string[];

      if (isSelected) {
        // Remove the value
        newValues = selectedValues.filter(v => v !== optionValue);
      } else {
        // Add the value, respecting maxSelections
        if (maxSelections && selectedValues.length >= maxSelections) {
          return; // Don't add if at max
        }
        newValues = [...selectedValues, optionValue];
      }

      if (value === undefined) {
        setSelectedValues(newValues);
      }
      onValueChange?.(newValues);
    };

    const handleRemoveSelected = (valueToRemove: string, event: React.MouseEvent) => {
      event.stopPropagation();
      const newValues = selectedValues.filter(v => v !== valueToRemove);
      if (value === undefined) {
        setSelectedValues(newValues);
      }
      onValueChange?.(newValues);
    };

    const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));

    // Default selected count text
    const defaultSelectedCountText = (count: number, total: number) =>
      count === total ? `${count} selected` : `${count} of ${total} selected`;

    const displayText =
      selectedOptions.length > 0
        ? showSelectedCount
          ? (selectedCountText || defaultSelectedCountText)(selectedOptions.length, options.length)
          : selectedOptions.map(opt => opt.label).join(", ")
        : placeholder;

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
        {/* Hidden inputs for form submission */}
        {selectedValues.map(val => (
          <input key={val} type="hidden" name={name} value={val} />
        ))}

        {label && (
          <label
            htmlFor={selectId}
            className={cn(labelBase, labelSizes[size], error && "text-red-700")}
          >
            {label}
          </label>
        )}

        <div
          className={containerClasses}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {/* Show selected options' icons if any selected, else startIcon if provided */}
          {((selectedOptions.length > 0 && selectedOptions[0]?.icon) || startIcon) && (
            <span className="flex shrink-0 items-center text-gray-500">
              {selectedOptions[0]?.icon ? selectedOptions[0].icon : startIcon}
            </span>
          )}

          <div className="scrollbar-hide flex min-w-0 flex-1 items-center gap-1 overflow-auto">
            {selectedOptions.length > 0 && !showSelectedCount ? (
              selectedOptions.map(option => (
                <span key={option.value} className={cn(selectedItemBase)}>
                  {option.icon && <span className="mr-1 flex items-center">{option.icon}</span>}
                  <span className="truncate">{option.label}</span>
                  <button
                    type="button"
                    className={cn(selectedItemRemove)}
                    onClick={e => handleRemoveSelected(option.value, e)}
                    disabled={disabled}
                    aria-label={`Remove ${option.label}`}
                  >
                    <IoClose className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span
                className={cn(
                  "truncate text-gray-900 select-none",
                  selectedOptions.length === 0 && "text-gray-400"
                )}
              >
                {displayText}
              </span>
            )}
          </div>

          <button
            ref={triggerRef}
            type="button"
            className={cn(
              "flex shrink-0 cursor-pointer items-center justify-center rounded p-1 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={e => {
              e.stopPropagation();
              if (!disabled) {
                setIsOpen(!isOpen);
              }
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-describedby={hasAssistive ? assistiveId : undefined}
            id={selectId}
            {...props}
          >
            <ChevronDownIcon isOpen={isOpen} animated={animation} />
          </button>

          {/* Dropdown is rendered inside the main container */}
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
              aria-multiselectable="true"
              onClick={e => e.stopPropagation()}
            >
              {options.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                const isAtMax = maxSelections ? selectedValues.length >= maxSelections : false;
                const isDisabled = option.disabled || (!isSelected && isAtMax);

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      optionBase,
                      animation && optionAnimated,
                      isSelected && optionSelected,
                      isDisabled && optionDisabled,
                      index === focusedIndex && "bg-gray-50",
                      sizes[size].text,
                      sizes[size].padY
                    )}
                    onClick={() => handleOptionToggle(option.value)}
                    disabled={isDisabled}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {/* Checkbox indicator */}
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {isSelected ? (
                        <HiOutlineCheck className="h-5 w-5 text-blue-600" />
                      ) : (
                        <div className="h-4 w-4 rounded border-2 border-gray-300" />
                      )}
                    </div>

                    {/* Option icon, if provided */}
                    {option.icon && (
                      <span className="mr-2 flex items-center text-gray-500">{option.icon}</span>
                    )}

                    <span className="flex-1 truncate select-none">{option.label}</span>

                    {/* Max selections indicator */}
                    {isAtMax && !isSelected && (
                      <span className="text-xs text-gray-400">Max reached</span>
                    )}
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

MultiSelect.displayName = "MultiSelect";
