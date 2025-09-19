import React from "react";
import { cn } from "@ruma-ui/utils";
import { tw } from "@ruma-ui/utils";

export interface TopLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The current progress value (0-100). Set to null for indeterminate state
   * @default null
   */
  progress?: number | null;
  /**
   * Whether the loader is visible
   * @default true
   */
  show?: boolean;
  /**
   * The height of the loader bar
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The color variant of the loader
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  /**
   * Custom color for the loader (overrides variant)
   */
  color?: string;
  /**
   * Animation speed
   * @default "normal"
   */
  speed?: "slow" | "normal" | "fast";
  /**
   * Whether to show a glow effect
   * @default false
   */
  glow?: boolean;
  /**
   * Z-index for the loader
   * @default 50
   */
  zIndex?: number;
  /**
   * Custom class name for the loader bar
   */
  barClassName?: string;
}

const base = tw`fixed top-0 left-0 w-full transform-gpu overflow-hidden transition-all duration-300 ease-out`;

const sizes = {
  xs: tw`h-0.5`,
  sm: tw`h-1`,
  md: tw`h-1.5`,
  lg: tw`h-2`,
  xl: tw`h-3`,
};

// Added text colors to variants for glow effect to work correctly
const variants = {
  primary: tw`bg-blue-600 text-blue-600`,
  secondary: tw`bg-gray-600 text-gray-600`,
  success: tw`bg-green-600 text-green-600`,
  warning: tw`bg-yellow-600 text-yellow-600`,
  error: tw`bg-red-600 text-red-600`,
};

const speeds = {
  slow: tw`transition-all duration-500 ease-out`,
  normal: tw`transition-all duration-300 ease-out`,
  fast: tw`transition-all duration-200 ease-out`,
};

const glowEffect = tw`shadow-lg shadow-current/50`;

const smoothWidthTransition = tw`transition-[width] duration-300 ease-out`;

const indeterminateAnimation = tw`animate-[indeterminate_1.5s_ease-in-out_infinite]`;

export const TopLoader = React.forwardRef<HTMLDivElement, TopLoaderProps>(
  (
    {
      progress = null,
      show = true,
      size = "md",
      variant = "primary",
      color,
      speed = "normal",
      glow = false,
      zIndex = 50,
      className = "",
      barClassName = "",
      ...props
    },
    ref
  ) => {
    // Calculate width based on progress with smooth transitions
    const progressValue = progress === null ? 100 : Math.min(Math.max(progress, 0), 100);
    const width = `${progressValue}%`;

    // Determine if indeterminate
    const isIndeterminate = progress === null;

    return (
      <div
        ref={ref}
        className={cn(
          base,
          speeds[speed],
          show ? "opacity-100" : "pointer-events-none opacity-0",
          className
        )}
        style={{ zIndex }}
        role='progressbar'
        aria-valuenow={isIndeterminate ? undefined : progress || 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label='Loading progress'
        {...props}
      >
        <div
          className={cn(
            "h-full w-full max-w-full overflow-hidden",
            sizes[size],
            !color && variants[variant],
            glow && glowEffect,
            !isIndeterminate && smoothWidthTransition,
            isIndeterminate && indeterminateAnimation,
            barClassName
          )}
          style={{
            width: width,
            backgroundColor: color,
            boxShadow: glow ? `0 0 10px ${color || "currentColor"}` : undefined,
            willChange: !isIndeterminate ? "width" : undefined,
          }}
        />
      </div>
    );
  }
);

TopLoader.displayName = "TopLoader";
