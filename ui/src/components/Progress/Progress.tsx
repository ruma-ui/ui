import React from "react";
import { cn, tw } from "../../lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The current progress value (0-100)
   * @default 0
   */
  value?: number;
  /**
   * The maximum value for progress calculation
   * @default 100
   */
  max?: number;
  /**
   * The visual style of the progress bar
   * @default "bar"
   */
  variant?: "bar" | "circular";
  /**
   * The size of the progress bar
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * The visual style variant
   * @default "filled"
   */
  appearance?: "filled" | "outline" | "soft";
  /**
   * Control the border radius of the progress bar
   * @default "full"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Whether to show the progress percentage text
   * @default false
   */
  showValue?: boolean;
  /**
   * Custom label text to display instead of percentage
   */
  label?: string;
  /**
   * Whether the progress bar is animated
   * @default false
   */
  animated?: boolean;
  /**
   * Whether the progress bar is striped
   * @default false
   */
  striped?: boolean;
  /**
   * Whether to show indeterminate state (animated loading)
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Custom class name for the progress bar track
   */
  trackClassName?: string;
  /**
   * Custom class name for the progress bar fill
   */
  fillClassName?: string;
}

// Base styles
const progressBase = tw`relative w-full overflow-hidden`;

// Track styles
const trackBase = tw`w-full bg-muted`;

// Variants - filled style
const variantsFilled = {
  bar: tw`bg-primary`,
  circular: tw`text-primary`,
};

// Variants - outline style
const variantsOutline = {
  bar: tw`border border-primary bg-primary/10`,
  circular: tw`text-primary`,
};

// Variants - soft style
const variantsSoft = {
  bar: tw`bg-primary/15`,
  circular: tw`text-primary/60`,
};

// Sizes
const sizes = {
  sm: {
    track: tw`h-1`,
    fill: tw`h-1`,
    text: tw`text-xs`,
    circular: tw`h-12 w-12`,
  },
  md: {
    track: tw`h-2`,
    fill: tw`h-2`,
    text: tw`text-sm`,
    circular: tw`h-16 w-16`,
  },
  lg: {
    track: tw`h-3`,
    fill: tw`h-3`,
    text: tw`text-base`,
    circular: tw`h-20 w-20`,
  },
};

// Rounded options
const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

// Animation styles
const animatedFill = tw`transition-all duration-300 ease-out`;
const stripedFill = tw`relative overflow-hidden`;
const stripedFillOverlay = tw`absolute inset-0 animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:20px_20px]`;
const indeterminateFill = tw`animate-[indeterminate_1.5s_ease-in-out_infinite]`;
const circularIndeterminate = tw`animate-spin`;

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "bar",
      size = "md",
      appearance = "filled",
      rounded = "full",
      showValue = false,
      label,
      animated = false,
      striped = false,
      indeterminate = false,
      className = "",
      trackClassName = "",
      fillClassName = "",
      ...props
    },
    ref
  ) => {
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Get variant styles based on appearance prop
    const getVariantStyles = () => {
      if (variant === "circular") {
        // For circular, we use text color variants
        switch (appearance) {
          case "outline":
            return variantsOutline.circular;
          case "soft":
            return variantsSoft.circular;
          default:
            return variantsFilled.circular;
        }
      } else {
        // For bar variant, use background color variants
        switch (appearance) {
          case "outline":
            return variantsOutline.bar;
          case "soft":
            return variantsSoft.bar;
          default:
            return variantsFilled.bar;
        }
      }
    };

    // Get fill styles
    const getFillStyles = () => {
      const baseStyles = [getVariantStyles()];

      if (animated) {
        baseStyles.push(animatedFill);
      }

      if (striped) {
        baseStyles.push(stripedFill);
      }

      if (indeterminate) {
        baseStyles.push(indeterminateFill);
      }

      return cn(baseStyles);
    };

    // Get progress width
    const progressWidth = indeterminate ? "100%" : `${percentage}%`;

    return (
      <div
        ref={ref}
        className={cn(progressBase, className)}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || "Progress"}
        {...props}
      >
        {variant === "bar" ? (
          <div className="flex flex-col gap-2">
            {/* Top row: Label and Value */}
            {(label || showValue) && (
              <div className="flex items-center justify-between">
                {/* Label on the left */}
                <div>
                  {label && (
                    <div className="text-foreground flex-shrink-0 text-sm font-medium">{label}</div>
                  )}
                </div>

                {/* Value on the right */}
                <div>
                  {showValue && (
                    <div
                      className={cn(
                        sizes[size].text,
                        "text-muted-foreground flex-shrink-0 font-medium"
                      )}
                    >
                      {Math.round(percentage)}%
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom row: Progress bar */}
            <div className="relative">
              <div
                className={cn(
                  trackBase,
                  sizes[size].track,
                  roundedOptions[rounded],
                  trackClassName
                )}
              >
                {/* Fill */}
                <div
                  className={cn(
                    sizes[size].fill,
                    roundedOptions[rounded],
                    getFillStyles(),
                    fillClassName
                  )}
                  style={{
                    width: progressWidth,
                  }}
                >
                  {/* Striped overlay */}
                  {striped && <div className={cn(stripedFillOverlay)} />}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Circular variant
          <div className={cn("relative flex items-center justify-center", sizes[size].circular)}>
            <svg
              className={cn(
                "h-full w-full -rotate-90 transform",
                indeterminate && circularIndeterminate
              )}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              {indeterminate ? (
                // Indeterminate state: show a partial arc that rotates
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="70 200"
                  strokeLinecap="round"
                  className={cn(getVariantStyles())}
                />
              ) : (
                // Determinate state: show progress based on percentage
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${percentage * 2.827} 282.7`}
                  strokeLinecap="round"
                  className={cn("transition-all duration-300", getVariantStyles())}
                />
              )}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn(sizes[size].text, "text-foreground font-medium")}>
                {showValue && !indeterminate ? `${Math.round(percentage)}%` : ""}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";
