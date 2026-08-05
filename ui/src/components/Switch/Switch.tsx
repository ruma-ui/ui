import React, { useEffect, useState } from "react";
import { cn, tw } from "../../lib/utils";

export interface SwitchProps {
  /**
   * The visual style of the switch
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the switch
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Control the border radius of the switch
   * @default "full"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Enable/disable animations
   * @default true
   */
  animation?: boolean;
  /**
   * Whether the switch is checked
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Callback when switch state changes
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional label text displayed next to the switch
   */
  label?: string;
  /**
   * Position of the label relative to the switch
   * @default "right"
   */
  labelPosition?: "left" | "right";
  /**
   * Optional helper/description text displayed below the switch
   */
  description?: string;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display below the switch
   */
  errorMessage?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * ID for the switch element
   */
  id?: string;
  /**
   * Name attribute for the switch
   */
  name?: string;
  /**
   * Value attribute for the switch
   */
  value?: string;
}

const wrapperBase = tw`relative inline-flex flex-col`;
const containerBase = tw`inline-flex items-center gap-2`;

// rui-focus-ring: keyboard-only :focus-visible ring
const switchBase = tw`rui-focus-ring relative inline-flex shrink-0 cursor-pointer border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`;

const variants = {
  primary: {
    off: tw`bg-secondary`,
    on: tw`bg-primary`,
  },
  secondary: {
    off: tw`bg-secondary`,
    on: tw`bg-secondary-foreground`,
  },
};

const sizes = {
  sm: { switch: tw`h-4 w-7`, thumb: tw`h-3 w-3`, translate: tw`translate-x-3`, text: tw`text-xs` },
  md: { switch: tw`h-5 w-9`, thumb: tw`h-4 w-4`, translate: tw`translate-x-4`, text: tw`text-sm` },
  lg: {
    switch: tw`h-6 w-11`,
    thumb: tw`h-5 w-5`,
    translate: tw`translate-x-5`,
    text: tw`text-base`,
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

const thumbBase = tw`pointer-events-none absolute top-0 left-0 inline-block transform bg-background shadow-sm transition duration-200 ease-in-out`;

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "full",
      animation = true,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      label,
      labelPosition = "right",
      description,
      error = false,
      errorMessage,
      className = "",
      id,
      name,
      value,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(checked ?? defaultChecked);

    const autoId = React.useId();
    const switchId = id ?? autoId;
    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${switchId}-desc`;

    useEffect(() => {
      if (checked !== undefined) setIsChecked(checked);
    }, [checked]);

    const handleToggle = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (checked === undefined) setIsChecked(newChecked);
      onCheckedChange?.(newChecked);
    };

    const switchClasses = cn(
      switchBase,
      sizes[size].switch,
      roundedOptions[rounded],
      isChecked ? variants[variant].on : variants[variant].off,
      disabled && "cursor-not-allowed opacity-50",
      error && "ring-2 ring-destructive",
      !animation && "transition-none",
      className
    );

    const thumbClasses = cn(
      thumbBase,
      sizes[size].thumb,
      roundedOptions[rounded],
      isChecked ? sizes[size].translate : "translate-x-0",
      !animation && "transition-none"
    );

    const SwitchElement = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-describedby={hasAssistive ? assistiveId : undefined}
        onClick={handleToggle}
        disabled={disabled}
        id={switchId}
        name={name}
        value={value}
        className={switchClasses}
        {...props}
      >
        <span className={thumbClasses} />
      </button>
    );

    const LabelElement = label && (
      <label
        htmlFor={switchId}
        className={cn(
          "text-foreground font-medium",
          sizes[size].text,
          error && "text-destructive",
          disabled ? "text-muted-foreground cursor-not-allowed" : "cursor-pointer"
        )}
      >
        {label}
      </label>
    );

    return (
      <div className={wrapperBase}>
        <div
          className={cn(containerBase, labelPosition === "left" ? "flex-row-reverse" : "flex-row")}
        >
          {labelPosition === "left" && LabelElement}
          {SwitchElement}
          {labelPosition === "right" && LabelElement}
          {label && <div className={labelPosition === "left" ? "mr-3" : "ml-3"} />}
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

Switch.displayName = "Switch";
