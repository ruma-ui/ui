import React, { useEffect, useState } from "react";
import { cn, tw } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface RadioGroupProps {
  /**
   * The visual style of the radio group
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the radio buttons
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Control the border radius of the radio buttons
   * @default "full"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Enable/disable animations
   * @default true
   */
  animation?: boolean;
  /**
   * Layout direction of radio options
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Array of radio options
   */
  options: RadioOption[];
  /**
   * Selected value
   */
  value?: string;
  /**
   * Default selected value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Whether the entire radio group is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional label for the radio group
   */
  label?: string;
  /**
   * Optional helper/description text displayed below the radio group
   */
  description?: string;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display below the radio group
   */
  errorMessage?: string;
  /**
   * Whether the radio group is required
   * @default false
   */
  required?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Name attribute for all radio buttons (auto-generated if not provided)
   */
  name?: string;
}

// Design primitives matching Select component
const wrapperBase = tw`relative flex flex-col`;
const groupBase = tw`flex`;
const radioWrapperBase = tw`relative flex items-start`;
// Use peer-* utilities for focus styles since input is visually hidden
const radioBase = tw`h-4 w-4 shrink-0 border border-gray-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2`;
const radioInner = tw`absolute inset-0 flex items-center justify-center`;
const radioDot = tw`h-1.5 w-1.5 rounded-full bg-white`;

const variants = {
  primary: {
    radio: tw`border-gray-300 text-blue-600 peer-focus-visible:ring-blue-500`,
    checked: tw`border-blue-600 bg-blue-600`,
    hover: tw`hover:border-blue-500`,
  },
  secondary: {
    radio: tw`border-gray-300 text-gray-600 peer-focus-visible:ring-gray-400`,
    checked: tw`border-gray-600 bg-gray-600`,
    hover: tw`hover:border-gray-500`,
  },
};

const sizes = {
  sm: {
    radio: tw`h-3 w-3`,
    dot: tw`h-1 w-1`,
    gap: tw`gap-2`,
    text: tw`text-xs`,
    spacing: tw`space-y-2`,
  },
  md: {
    radio: tw`h-4 w-4`,
    dot: tw`h-1.5 w-1.5`,
    gap: tw`gap-3`,
    text: tw`text-sm`,
    spacing: tw`space-y-3`,
  },
  lg: {
    radio: tw`h-5 w-5`,
    dot: tw`h-2 w-2`,
    gap: tw`gap-4`,
    text: tw`text-base`,
    spacing: tw`space-y-4`,
  },
};

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

const labelBase = tw`font-medium text-gray-900`;
const labelSizes = {
  sm: tw`text-xs`,
  md: tw`text-sm`,
  lg: tw`text-base`,
};

const optionLabelBase = tw`font-medium text-gray-900`;
const descriptionBase = tw`text-gray-600`;
const assistiveContainer = tw`mt-1 min-h-[1rem] px-1`;
const groupDescriptionText = tw`text-sm text-gray-600`;
const errorText = tw`text-sm text-red-600`;

const disabledStyles = tw`cursor-not-allowed opacity-50`;
const errorStyles = tw`border-red-500 peer-focus-visible:ring-red-500`;
const animatedStyles = tw`transition-all duration-200`;
// Tailwindcss-animate helpers
const animateDotIn = tw`animate-in fade-in-0 zoom-in-95 duration-150 ease-out`;

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "full",
      animation = true,
      orientation = "vertical",
      options,
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      label,
      description,
      error = false,
      errorMessage,
      required = false,
      className = "",
      name,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(value ?? defaultValue ?? "");

    const autoId = React.useId();
    const groupName = name ?? `radio-group-${autoId}`;
    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${autoId}-desc`;

    // Update internal state when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleOptionChange = (optionValue: string) => {
      if (disabled) return;

      const option = options.find(opt => opt.value === optionValue);
      if (option?.disabled) return;

      // Only update internal state if not controlled
      if (value === undefined) {
        setSelectedValue(optionValue);
      }

      onValueChange?.(optionValue);
    };

    const groupClasses = cn(
      groupBase,
      orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
      orientation === "vertical" ? sizes[size].spacing : sizes[size].gap
    );

    const renderOptions = () =>
      options.map(option => {
        const isSelected = selectedValue === option.value;
        const isDisabled = disabled || option.disabled;
        const radioId = `${groupName}-${option.value}`;

        return (
          <div key={option.value} className={radioWrapperBase}>
            <div className='flex items-center'>
              <input
                type='radio'
                id={radioId}
                name={groupName}
                value={option.value}
                checked={isSelected}
                onChange={() => handleOptionChange(option.value)}
                disabled={isDisabled}
                className='peer sr-only'
              />
              <label
                htmlFor={radioId}
                className={cn(
                  // Center the radio with the text block
                  "flex cursor-pointer items-center",
                  sizes[size].gap,
                  isDisabled && "cursor-not-allowed"
                )}
              >
                <div
                  className={cn(
                    radioBase,
                    sizes[size].radio,
                    roundedOptions[rounded],
                    variants[variant].radio,
                    !isDisabled && variants[variant].hover,
                    isSelected && variants[variant].checked,
                    isDisabled && disabledStyles,
                    error && errorStyles,
                    animation && animatedStyles,
                    // Ensure correct positioning and no shrink
                    "relative inline-flex items-center justify-center"
                  )}
                >
                  {isSelected && (
                    <div className={radioInner}>
                      <div className={cn(radioDot, sizes[size].dot, animation && animateDotIn)} />
                    </div>
                  )}
                </div>

                <div className='flex flex-col'>
                  <div className='flex items-center gap-2'>
                    {option.icon && (
                      <span
                        className={cn(
                          "flex items-center text-gray-500",
                          isDisabled && "opacity-50"
                        )}
                      >
                        {option.icon}
                      </span>
                    )}
                    <span
                      className={cn(
                        optionLabelBase,
                        sizes[size].text,
                        "leading-tight",
                        isDisabled && "text-gray-400",
                        error && "text-red-700"
                      )}
                    >
                      {option.label}
                    </span>
                  </div>

                  {option.description && (
                    <span
                      className={cn(
                        descriptionBase,
                        sizes[size].text,
                        "mt-1 leading-snug",
                        isDisabled && "text-gray-400"
                      )}
                    >
                      {option.description}
                    </span>
                  )}
                </div>
              </label>
            </div>
          </div>
        );
      });

    return (
      <div ref={ref} className={cn(wrapperBase, className)} {...props}>
        {label && (
          <fieldset className='w-full'>
            <legend className={cn(labelBase, labelSizes[size], error && "text-red-700", "mb-3")}>
              {label}
              {required && <span className='ml-1 text-red-500'>*</span>}
            </legend>

            <div
              className={groupClasses}
              role='radiogroup'
              aria-describedby={hasAssistive ? assistiveId : undefined}
              aria-required={required}
              aria-invalid={error}
            >
              {renderOptions()}
            </div>
          </fieldset>
        )}

        {!label && (
          <div
            className={groupClasses}
            role='radiogroup'
            aria-describedby={hasAssistive ? assistiveId : undefined}
            aria-required={required}
            aria-invalid={error}
          >
            {renderOptions()}
          </div>
        )}

        {hasAssistive && (
          <div id={assistiveId} className={assistiveContainer}>
            {error && errorMessage ? (
              <span className={errorText}>{errorMessage}</span>
            ) : description ? (
              <span className={groupDescriptionText}>{description}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
