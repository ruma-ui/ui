import React from "react";
import { IoClose } from "react-icons/io5";
import { cn, tw } from "../../lib/utils";

export interface BadgeProps {
  /**
   * The visual style of the badge
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  /**
   * The size of the badge
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Control the border radius of the badge
   * @default "full"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Badge content style
   * @default "filled"
   */
  style?: "filled" | "outline" | "soft";
  /**
   * Optional left icon
   */
  startIcon?: React.ReactNode;
  /**
   * Optional right icon
   */
  endIcon?: React.ReactNode;
  /**
   * Whether the badge is clickable
   * @default false
   */
  clickable?: boolean;
  /**
   * Click handler for clickable badges
   */
  onClick?: () => void;
  /**
   * Whether the badge can be dismissed
   * @default false
   */
  dismissible?: boolean;
  /**
   * Dismiss handler for dismissible badges
   */
  onDismiss?: () => void;
  /**
   * Badge content
   */
  children: React.ReactNode;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * ID for the badge element
   */
  id?: string;
}

const badgeBase = tw`inline-flex items-center font-medium transition-all duration-200`;

// Filled
const variantsFilled = {
  primary: tw`bg-primary text-primary-foreground`,
  secondary: tw`bg-secondary text-secondary-foreground`,
  success: tw`bg-success text-success-foreground`,
  warning: tw`bg-warning text-warning-foreground`,
  error: tw`bg-destructive text-destructive-foreground`,
  info: tw`bg-info text-info-foreground`,
};

// Outline
const variantsOutline = {
  primary: tw`border border-primary bg-background text-primary`,
  secondary: tw`border border-secondary-foreground bg-background text-secondary-foreground`,
  success: tw`border border-success bg-background text-success`,
  warning: tw`border border-warning bg-background text-warning`,
  error: tw`border border-destructive bg-background text-destructive`,
  info: tw`border border-info bg-background text-info`,
};

// Soft
const variantsSoft = {
  primary: tw`bg-accent text-accent-foreground`,
  secondary: tw`bg-secondary text-secondary-foreground`,
  success: tw`bg-success/15 text-success`,
  warning: tw`bg-warning/15 text-warning`,
  error: tw`bg-destructive/15 text-destructive`,
  info: tw`bg-info/15 text-info`,
};

// Hover states for clickable badges
const hoverStatesFilled = {
  primary: tw`hover:bg-primary/90`,
  secondary: tw`hover:bg-secondary/80`,
  success: tw`hover:bg-success/90`,
  warning: tw`hover:bg-warning/90`,
  error: tw`hover:bg-destructive/90`,
  info: tw`hover:bg-info/90`,
};

const hoverStatesOutline = {
  primary: tw`hover:bg-accent`,
  secondary: tw`hover:bg-secondary`,
  success: tw`hover:bg-success/10`,
  warning: tw`hover:bg-warning/10`,
  error: tw`hover:bg-destructive/10`,
  info: tw`hover:bg-info/10`,
};

const hoverStatesSoft = {
  primary: tw`hover:bg-accent/80`,
  secondary: tw`hover:bg-secondary/80`,
  success: tw`hover:bg-success/25`,
  warning: tw`hover:bg-warning/25`,
  error: tw`hover:bg-destructive/25`,
  info: tw`hover:bg-info/25`,
};

const sizes = {
  sm: { container: tw`h-5 gap-1 px-2`, text: tw`text-xs`, icon: tw`h-3 w-3` },
  md: { container: tw`h-6 gap-1.5 px-2.5`, text: tw`text-xs`, icon: tw`h-3.5 w-3.5` },
  lg: { container: tw`h-7 gap-2 px-3`, text: tw`text-sm`, icon: tw`h-4 w-4` },
} as const;

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

// rui-focus-ring: keyboard-only focus via :focus-visible
const clickableStyles = tw`rui-focus-ring cursor-pointer`;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "full",
      style = "filled",
      startIcon,
      endIcon,
      clickable = false,
      onClick,
      dismissible = false,
      onDismiss,
      children,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (clickable && onClick) onClick();
    };
    const handleDismiss = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (dismissible && onDismiss) onDismiss();
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (clickable && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick?.();
      }
    };

    const getVariantStyles = () => {
      switch (style) {
        case "outline":
          return variantsOutline[variant];
        case "soft":
          return variantsSoft[variant];
        default:
          return variantsFilled[variant];
      }
    };

    const getHoverStyles = () => {
      if (!clickable) return "";
      switch (style) {
        case "outline":
          return hoverStatesOutline[variant];
        case "soft":
          return hoverStatesSoft[variant];
        default:
          return hoverStatesFilled[variant];
      }
    };

    const badgeClasses = cn(
      badgeBase,
      getVariantStyles(),
      sizes[size].container,
      sizes[size].text,
      roundedOptions[rounded],
      clickable && clickableStyles,
      clickable && getHoverStyles(),
      className
    );

    const Component = clickable ? "button" : "span";

    return (
      <Component
        ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
        className={badgeClasses}
        onClick={clickable ? handleClick : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
        type={clickable ? "button" : undefined}
        id={id}
        {...props}
      >
        {startIcon && (
          <span className={cn("flex items-center", sizes[size].icon)}>{startIcon}</span>
        )}
        <span className="truncate">{children}</span>
        {endIcon && !dismissible && (
          <span className={cn("flex items-center", sizes[size].icon)}>{endIcon}</span>
        )}
        {dismissible && (
          <button
            type="button"
            className={cn(
              "rui-focus-ring ml-1 flex items-center rounded-full p-0.5 hover:bg-black/10",
              sizes[size].icon
            )}
            onClick={handleDismiss}
            aria-label="Remove badge"
          >
            <IoClose className="h-3 w-3" />
          </button>
        )}
      </Component>
    );
  }
);

Badge.displayName = "Badge";
