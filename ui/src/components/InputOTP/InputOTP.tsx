import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn, tw } from "../../lib/utils";

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The visual style of the OTP input
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the OTP input
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Control the border radius of the input
   * @default "sm"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Number of OTP digits/characters
   * @default 6
   */
  length?: number;
  /**
   * The current value of the OTP input
   */
  value?: string;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when OTP value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback when OTP is completed (all digits filled)
   */
  onComplete?: (value: string) => void;
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display below the input
   */
  errorMessage?: string;
  /**
   * Optional label text displayed above the input
   */
  label?: string;
  /**
   * Optional helper/description text displayed below the input
   */
  description?: string;
  /**
   * Type of input (text for alphanumeric, number for numeric only)
   * @default "number"
   */
  type?: "text" | "number";
  /**
   * Whether to mask the input (like password)
   * @default false
   */
  mask?: boolean;
  /**
   * Auto focus the first input on mount
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Placeholder character for empty slots
   * @default ""
   */
  placeholder?: string;
  /**
   * Gap between input slots
   * @default "sm"
   */
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Allow paste functionality
   * @default true
   */
  allowPaste?: boolean;
  /**
   * Make input take full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

// Design primitives matching TextInput component
const wrapperBase = tw`relative inline-flex w-full flex-col`;
const containerBase = tw`inline-flex items-center justify-center`;
const slotBase = tw`relative inline-flex items-center justify-center border bg-white text-center font-mono transition-all duration-200 focus-within:ring-3 disabled:cursor-not-allowed disabled:opacity-50`;

const variants = {
  primary: tw`border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-200`,
  secondary: tw`border-gray-300 bg-gray-50 focus-within:border-gray-500 focus-within:ring-gray-200`,
};

const sizes = {
  xs: {
    slot: tw`h-8 w-8 text-xs`,
    input: tw`text-xs`,
    gap: "gap-1",
  },
  sm: {
    slot: tw`h-9 w-9 text-sm`,
    input: tw`text-sm`,
    gap: "gap-1.5",
  },
  md: {
    slot: tw`h-10 w-10 text-base`,
    input: tw`text-base`,
    gap: "gap-2",
  },
  lg: {
    slot: tw`h-12 w-12 text-lg`,
    input: tw`text-lg`,
    gap: "gap-2.5",
  },
  xl: {
    slot: tw`h-14 w-14 text-xl`,
    input: tw`text-xl`,
    gap: "gap-3",
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

const gapOptions = {
  xs: tw`gap-1`,
  sm: tw`gap-2`,
  md: tw`gap-3`,
  lg: tw`gap-4`,
  xl: tw`gap-5`,
};

const labelSizes = {
  xs: tw`text-xs`,
  sm: tw`text-sm`,
  md: tw`text-sm`,
  lg: tw`text-base`,
  xl: tw`text-base`,
};

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "sm",
      length = 6,
      value,
      defaultValue,
      onChange,
      onComplete,
      disabled = false,
      error = false,
      errorMessage,
      label,
      description,
      type = "number",
      mask = false,
      autoFocus = false,
      placeholder = "",
      gap = "sm",
      allowPaste = true,
      fullWidth = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const autoId = React.useId();
    const inputId = id ?? autoId;

    const currentValue = value !== undefined ? value : internalValue;
    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${inputId}-desc`;

    // Initialize input refs array
    useEffect(() => {
      inputRefs.current = Array(length).fill(null);
    }, [length]);

    // Auto focus first input
    useEffect(() => {
      if (autoFocus && inputRefs.current[0] && !disabled) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus, disabled]);

    // Update internal value when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const updateValue = useCallback(
      (newValue: string) => {
        const sanitizedValue =
          type === "number"
            ? newValue.replace(/[^0-9]/g, "")
            : newValue.replace(/[^a-zA-Z0-9]/g, "");

        const truncatedValue = sanitizedValue.slice(0, length);

        if (value === undefined) {
          setInternalValue(truncatedValue);
        }

        onChange?.(truncatedValue);

        if (truncatedValue.length === length) {
          onComplete?.(truncatedValue);
        }
      },
      [value, onChange, onComplete, length, type]
    );

    const focusSlot = useCallback(
      (index: number) => {
        const targetIndex = Math.max(0, Math.min(index, length - 1));
        setActiveIndex(targetIndex);
        inputRefs.current[targetIndex]?.focus();
      },
      [length]
    );

    const handleInputChange = useCallback(
      (index: number, inputValue: string) => {
        const newValue = currentValue.split("");

        if (inputValue === "") {
          // Handle backspace/delete
          newValue[index] = "";
        } else {
          // Handle new character input
          const char =
            type === "number"
              ? inputValue.replace(/[^0-9]/g, "").slice(-1)
              : inputValue.replace(/[^a-zA-Z0-9]/g, "").slice(-1);

          if (char) {
            newValue[index] = char;
            // Move to next slot if character was entered and not at the end
            if (index < length - 1) {
              setTimeout(() => focusSlot(index + 1), 0);
            }
          }
        }

        // Fill empty slots between start and current position
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[i] === undefined) {
            newValue[i] = "";
          }
        }

        updateValue(newValue.join(""));
      },
      [currentValue, focusSlot, length, type, updateValue]
    );

    const handleKeyDown = useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        switch (e.key) {
          case "Backspace":
            e.preventDefault();
            if (currentValue[index]) {
              // Clear current slot
              handleInputChange(index, "");
            } else if (index > 0) {
              // Move to previous slot and clear it
              focusSlot(index - 1);
              setTimeout(() => handleInputChange(index - 1, ""), 0);
            }
            break;

          case "Delete":
            e.preventDefault();
            handleInputChange(index, "");
            break;

          case "ArrowLeft":
            e.preventDefault();
            focusSlot(index - 1);
            break;

          case "ArrowRight":
            e.preventDefault();
            focusSlot(index + 1);
            break;

          case "Home":
            e.preventDefault();
            focusSlot(0);
            break;

          case "End":
            e.preventDefault();
            focusSlot(length - 1);
            break;

          default:
            // Allow only valid characters based on type
            if (type === "number" && !/[0-9]/.test(e.key)) {
              e.preventDefault();
            } else if (type === "text" && !/[a-zA-Z0-9]/.test(e.key)) {
              e.preventDefault();
            }
            break;
        }
      },
      [currentValue, disabled, focusSlot, handleInputChange, length, type]
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        if (!allowPaste || disabled) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        const sanitizedData =
          type === "number"
            ? pasteData.replace(/[^0-9]/g, "")
            : pasteData.replace(/[^a-zA-Z0-9]/g, "");

        updateValue(sanitizedData);

        // Focus the appropriate slot after paste
        const nextIndex = Math.min(sanitizedData.length, length - 1);
        setTimeout(() => focusSlot(nextIndex), 0);
      },
      [allowPaste, disabled, focusSlot, length, type, updateValue]
    );

    const handleFocus = useCallback((index: number) => {
      setActiveIndex(index);
    }, []);

    const handleClick = useCallback(
      (index: number) => {
        focusSlot(index);
      },
      [focusSlot]
    );

    return (
      <div ref={containerRef} className={cn(wrapperBase, fullWidth && "w-full")} {...props}>
        {label && (
          <label
            htmlFor={`${inputId}-0`}
            className={cn(
              "mb-1 font-medium text-gray-900",
              labelSizes[size],
              error && "text-red-700"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            containerBase,
            gapOptions[gap],
            fullWidth && "w-full justify-between",
            className
          )}
          role="group"
          aria-label={label || "OTP input"}
          aria-describedby={hasAssistive ? assistiveId : undefined}
        >
          {Array.from({ length }, (_, index) => {
            const isActive = activeIndex === index;
            const hasValue = Boolean(currentValue[index]);
            const displayValue = mask && hasValue ? "•" : currentValue[index] || "";

            return (
              <div
                key={index}
                className={cn(
                  slotBase,
                  variants[variant],
                  sizes[size].slot,
                  roundedOptions[rounded],
                  error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-200",
                  isActive && !disabled && "ring-3",
                  isActive &&
                    !disabled &&
                    !error &&
                    variants[variant].includes("blue") &&
                    "ring-blue-200",
                  isActive &&
                    !disabled &&
                    !error &&
                    variants[variant].includes("gray") &&
                    "ring-gray-200",
                  fullWidth && "flex-1"
                )}
                onClick={() => handleClick(index)}
              >
                <input
                  ref={el => {
                    inputRefs.current[index] = el;
                  }}
                  id={`${inputId}-${index}`}
                  type={mask ? "password" : "text"}
                  inputMode={type === "number" ? "numeric" : "text"}
                  pattern={type === "number" ? "[0-9]*" : "[a-zA-Z0-9]*"}
                  maxLength={1}
                  value={displayValue}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-label={`Digit ${index + 1} of ${length}`}
                  aria-invalid={error || undefined}
                  className={cn(
                    "h-full w-full bg-transparent text-center outline-none placeholder:text-gray-400",
                    sizes[size].input,
                    disabled && "cursor-not-allowed"
                  )}
                  onChange={e => handleInputChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onFocus={() => handleFocus(index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                />
              </div>
            );
          })}
        </div>

        {hasAssistive && (
          <div id={assistiveId} className="mt-1 min-h-[1rem]">
            {error && errorMessage ? (
              <span className="text-sm text-red-600">{errorMessage}</span>
            ) : description ? (
              <span className="text-sm text-gray-600">{description}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

InputOTP.displayName = "InputOTP";
