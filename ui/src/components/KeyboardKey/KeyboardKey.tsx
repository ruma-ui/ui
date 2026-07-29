import React from "react";
import { cn, tw } from "../../lib/utils";

export interface KeyboardKeyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The visual style of the keyboard key
   * @default "default"
   */
  variant?: "default" | "flat" | "outlined" | "minimal";
  /**
   * The size of the keyboard key
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The key being displayed
   */
  children: React.ReactNode;
  /**
   * Additional styling to make the key appear pressed/active
   * @default false
   */
  pressed?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Whether the key is disabled/inactive
   * @default false
   */
  disabled?: boolean;
  /**
   * Make the key render as a clickable element
   * @default false
   */
  clickable?: boolean;
  /**
   * Click handler for clickable keys
   */
  onClick?: () => void;
  /**
   * The HTML element to render as
   * @default "kbd"
   */
  as?: "kbd" | "span" | "button" | "div";
}

// Base styles for all keyboard keys
const keyBase = tw`inline-flex items-center justify-center font-mono font-medium whitespace-nowrap transition-all duration-150 select-none`;

// Variant styles
const variantStyles = {
  default: tw`border border-border bg-muted text-foreground shadow-sm hover:bg-accent`,
  flat: tw`border border-border bg-background text-foreground/80`,
  outlined: tw`border-2 border-border bg-background text-foreground hover:border-input`,
  minimal: tw`border border-border/60 bg-muted/50 text-muted-foreground`,
};

const activeStyles = {
  default: tw`translate-y-[1px] transform border-input bg-muted shadow-inner`,
  flat: tw`border-border bg-muted shadow-inner`,
  outlined: tw`translate-y-[1px] transform border-input bg-muted shadow-inner`,
  minimal: tw`border-border/80 bg-muted shadow-inner`,
};

const disabledStyles = {
  default: tw`cursor-not-allowed border-border/50 bg-muted/50 text-muted-foreground/50`,
  flat: tw`cursor-not-allowed border-border/30 bg-background text-muted-foreground/40`,
  outlined: tw`cursor-not-allowed border-border/40 bg-background text-muted-foreground/40`,
  minimal: tw`cursor-not-allowed border-border/30 bg-background text-muted-foreground/30`,
};

// Size configurations
const sizes = {
  xs: tw`h-5 min-w-[1.25rem] rounded px-1 text-xs`,
  sm: tw`h-6 min-w-[1.5rem] rounded-sm px-1.5 text-xs`,
  md: tw`h-7 min-w-[1.75rem] rounded-md px-2 text-sm`,
  lg: tw`h-8 min-w-[2rem] rounded-md px-2.5 text-base`,
  xl: tw`h-10 min-w-[2.5rem] rounded-lg px-3 text-lg`,
};

// Clickable styles
const clickableStyles = tw`cursor-pointer rui-focus-ring focus:outline-none`;

export const KeyboardKey = React.forwardRef<HTMLElement, KeyboardKeyProps>(
  (
    {
      variant = "default",
      size = "md",
      children,
      pressed = false,
      className = "",
      disabled = false,
      clickable = false,
      onClick,
      as = "kbd",
      ...props
    },
    ref
  ) => {
    const handleClick = React.useCallback(() => {
      if (clickable && !disabled && onClick) {
        onClick();
      }
    }, [clickable, disabled, onClick]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (clickable && !disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick?.();
        }
      },
      [clickable, disabled, onClick]
    );

    // Determine the component to render
    let Component = as;
    if (clickable && as === "kbd") {
      Component = "button";
    }

    // Build class names
    const keyClasses = cn(
      keyBase,
      sizes[size],
      disabled ? disabledStyles[variant] : pressed ? activeStyles[variant] : variantStyles[variant],
      clickable && !disabled && clickableStyles,
      className
    );

    const elementProps = {
      ref,
      className: keyClasses,
      ...(clickable && {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled,
        ...(Component === "button" && { type: "button" as const }),
      }),
      ...props,
    };

    return React.createElement(Component, elementProps, children);
  }
);

KeyboardKey.displayName = "KeyboardKey";
