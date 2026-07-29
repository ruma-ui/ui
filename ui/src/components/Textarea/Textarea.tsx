import React from "react";
import { cn, tw } from "../../lib/utils";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /**
   * The visual style of the textarea
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the textarea
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Control the border radius of the textarea
   * @default "sm"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Make textarea take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Optional label text displayed above the textarea
   */
  label?: string;
  /**
   * Optional helper/description text displayed below the textarea
   */
  description?: string;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display below the textarea
   */
  errorMessage?: string;
  /**
   * Preset width of the textarea wrapper
   * @default "md"
   */
  width?: "sm" | "md" | "lg" | "xl";
  /**
   * Number of visible text lines
   * @default 3
   */
  rows?: number;
  /**
   * Control textarea resize behavior
   * @default "vertical"
   */
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const wrapperBase = tw`relative inline-flex w-full flex-col`;
const fieldBase = tw`rui-field-focus relative inline-flex border bg-background text-foreground transition-colors duration-150`;

const variants = {
  primary: tw`border-input bg-background`,
  secondary: tw`border-input bg-muted`,
};

const sizes = {
  xs: { container: tw`min-h-7`, textarea: tw`px-2 py-1 text-xs` },
  sm: { container: tw`min-h-8`, textarea: tw`px-2.5 py-1.5 text-xs` },
  md: { container: tw`min-h-9`, textarea: tw`px-3 py-1.5 text-sm` },
  lg: { container: tw`min-h-10`, textarea: tw`px-3.5 py-2 text-sm` },
  xl: { container: tw`min-h-12`, textarea: tw`px-4 py-2.5 text-base` },
} as const;

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

const resizeOptions = {
  none: tw`resize-none`,
  vertical: tw`resize-y`,
  horizontal: tw`resize-x`,
  both: tw`resize`,
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

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "sm",
      fullWidth = false,
      width = "md",
      label,
      description,
      error = false,
      errorMessage,
      rows = 3,
      resize = "vertical",
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);
    const autoId = React.useId();
    const textareaId = id ?? autoId;

    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${textareaId}-desc`;

    return (
      <div className={cn(wrapperBase, fullWidth ? "w-full" : (widths[width] ?? "w-auto"))}>
        {label && (
          <label
            htmlFor={textareaId}
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
            error && "rui-field-error border-destructive",
            fullWidth && "w-full",
            className
          )}
        >
          <textarea
            ref={textareaRef}
            id={textareaId}
            rows={rows}
            className={cn(
              "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent outline-none placeholder:font-light",
              sizes[size].textarea,
              resizeOptions[resize]
            )}
            aria-invalid={error || undefined}
            aria-describedby={hasAssistive ? assistiveId : undefined}
            disabled={disabled}
            {...props}
          />
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

Textarea.displayName = "Textarea";
