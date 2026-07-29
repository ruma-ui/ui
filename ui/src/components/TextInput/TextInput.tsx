import React from "react";
import { cn, tw } from "../../lib/utils";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * The visual style of the input
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the input
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Control the border radius of the input
   * @default "sm"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Make input take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Optional left icon - accepts any React element
   */
  startIcon?: React.ReactNode;
  /**
   * Optional right icon - accepts any React element
   */
  endIcon?: React.ReactNode;
  /**
   * Optional label text displayed above the input
   */
  label?: string;
  /**
   * Optional helper/description text displayed below the input
   */
  description?: string;
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
   * Preset width of the input wrapper
   * @default "md"
   */
  width?: "sm" | "md" | "lg" | "xl";
}

const wrapperBase = tw`relative inline-flex w-full flex-col`;

// rui-field-focus: handles border-color transition on focus (no ring, clean)
const fieldBase = tw`rui-field-focus relative inline-flex items-center border bg-background text-foreground transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50`;

const variants = {
  primary: tw`border-input bg-background`,
  secondary: tw`border-input bg-muted`,
};

const sizes = {
  xs: { container: tw`h-7`, input: tw`text-xs`, padX: "px-2", gap: "gap-1" },
  sm: { container: tw`h-8`, input: tw`text-xs`, padX: "px-2.5", gap: "gap-1.5" },
  md: { container: tw`h-9`, input: tw`text-sm`, padX: "px-3", gap: "gap-2" },
  lg: { container: tw`h-10`, input: tw`text-sm`, padX: "px-3.5", gap: "gap-2" },
  xl: { container: tw`h-12`, input: tw`text-base`, padX: "px-4", gap: "gap-2.5" },
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

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "sm",
      fullWidth = false,
      width = "md",
      startIcon,
      endIcon,
      label,
      description,
      error = false,
      errorMessage,
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const autoId = React.useId();
    const inputId = id ?? autoId;

    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${inputId}-desc`;

    return (
      <div className={cn(wrapperBase, fullWidth ? "w-full" : (widths[width] ?? "w-auto"))}>
        {label && (
          <label
            htmlFor={inputId}
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
            className
          )}
        >
          {startIcon && (
            <span className="text-muted-foreground flex shrink-0 items-center">{startIcon}</span>
          )}
          <input
            ref={inputRef}
            id={inputId}
            className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent outline-none placeholder:font-light"
            aria-invalid={error || undefined}
            aria-describedby={hasAssistive ? assistiveId : undefined}
            disabled={disabled}
            {...props}
          />
          {endIcon && (
            <span className="text-muted-foreground flex shrink-0 items-center">{endIcon}</span>
          )}
        </div>
        {hasAssistive && (
          <div id={assistiveId} className="mt-1 min-h-[1rem]">
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

TextInput.displayName = "TextInput";
