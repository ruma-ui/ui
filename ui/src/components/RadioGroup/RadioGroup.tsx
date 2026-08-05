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

const wrapperBase = tw`relative flex flex-col`;
const groupBase = tw`flex`;

// Radio button visual box — no Tailwind ring utilities; peer-focus-visible box-shadow
const radioBase = tw`relative inline-flex items-center justify-center border transition-all duration-150 outline-none`;

const variants = {
  primary: {
    unchecked: tw`border-input bg-background hover:border-primary`,
    checked: tw`border-primary bg-primary`,
  },
  secondary: {
    unchecked: tw`border-input bg-background hover:border-secondary-foreground`,
    checked: tw`border-secondary-foreground bg-secondary-foreground`,
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

const animateDotIn = tw`animate-in fade-in-0 zoom-in-95 duration-150 ease-out`;

// Keyboard-only focus ring for radio buttons (via peer-focus-visible)
const focusRingClass =
  "peer-focus-visible:shadow-[0_0_0_var(--ring-offset)_hsl(var(--background)),0_0_0_calc(var(--ring-offset)+var(--ring-width))_var(--ring-color)]";

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

    useEffect(() => {
      if (value !== undefined) setSelectedValue(value);
    }, [value]);

    const handleOptionChange = (optionValue: string) => {
      if (disabled) return;
      const option = options.find(opt => opt.value === optionValue);
      if (option?.disabled) return;
      if (value === undefined) setSelectedValue(optionValue);
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
          <div key={option.value} className="relative flex items-start">
            <div className="flex items-center">
              <input
                type="radio"
                id={radioId}
                name={groupName}
                value={option.value}
                checked={isSelected}
                onChange={() => handleOptionChange(option.value)}
                disabled={isDisabled}
                className="peer sr-only"
              />
              <label
                htmlFor={radioId}
                className={cn(
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
                    isSelected ? variants[variant].checked : variants[variant].unchecked,
                    isDisabled && "cursor-not-allowed opacity-50",
                    error && !isSelected && "border-destructive",
                    focusRingClass
                  )}
                >
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={cn(
                          "bg-primary-foreground rounded-full",
                          sizes[size].dot,
                          animation && animateDotIn
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <span
                        className={cn(
                          "text-muted-foreground flex items-center",
                          isDisabled && "opacity-50"
                        )}
                      >
                        {option.icon}
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-foreground leading-tight font-medium",
                        sizes[size].text,
                        isDisabled && "text-muted-foreground",
                        error && "text-destructive"
                      )}
                    >
                      {option.label}
                    </span>
                  </div>

                  {option.description && (
                    <span
                      className={cn(
                        "text-muted-foreground mt-1 leading-snug",
                        sizes[size].text,
                        isDisabled && "opacity-70"
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
          <fieldset className="w-full">
            <legend
              className={cn(
                "text-foreground mb-3 font-medium",
                sizes[size].text,
                error && "text-destructive"
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </legend>

            <div
              className={groupClasses}
              role="radiogroup"
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
            role="radiogroup"
            aria-describedby={hasAssistive ? assistiveId : undefined}
            aria-required={required}
            aria-invalid={error}
          >
            {renderOptions()}
          </div>
        )}

        {hasAssistive && (
          <div id={assistiveId} className="mt-1 min-h-4 px-1">
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

RadioGroup.displayName = "RadioGroup";
