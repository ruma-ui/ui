import React from "react";
import { cn } from "@ruma-ui/utils";
import { tw } from "@ruma-ui/utils";

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

// Base styles
const badgeBase = tw`inline-flex items-center font-medium transition-all duration-200`;

// Variants - filled style
const variantsFilled = {
  primary: tw`bg-blue-600 text-white`,
  secondary: tw`bg-gray-600 text-white`,
  success: tw`bg-green-600 text-white`,
  warning: tw`bg-yellow-600 text-white`,
  error: tw`bg-red-600 text-white`,
  info: tw`bg-cyan-600 text-white`,
};

// Variants - outline style
const variantsOutline = {
  primary: tw`border border-blue-600 bg-white text-blue-600`,
  secondary: tw`border border-gray-600 bg-white text-gray-600`,
  success: tw`border border-green-600 bg-white text-green-600`,
  warning: tw`border border-yellow-600 bg-white text-yellow-600`,
  error: tw`border border-red-600 bg-white text-red-600`,
  info: tw`border border-cyan-600 bg-white text-cyan-600`,
};

// Variants - soft style
const variantsSoft = {
  primary: tw`bg-blue-50 text-blue-700`,
  secondary: tw`bg-gray-50 text-gray-700`,
  success: tw`bg-green-50 text-green-700`,
  warning: tw`bg-yellow-50 text-yellow-700`,
  error: tw`bg-red-50 text-red-700`,
  info: tw`bg-cyan-50 text-cyan-700`,
};

// Hover states for clickable badges
const hoverStatesFilled = {
  primary: tw`hover:bg-blue-700`,
  secondary: tw`hover:bg-gray-700`,
  success: tw`hover:bg-green-700`,
  warning: tw`hover:bg-yellow-700`,
  error: tw`hover:bg-red-700`,
  info: tw`hover:bg-cyan-700`,
};

const hoverStatesOutline = {
  primary: tw`hover:bg-blue-50`,
  secondary: tw`hover:bg-gray-50`,
  success: tw`hover:bg-green-50`,
  warning: tw`hover:bg-yellow-50`,
  error: tw`hover:bg-red-50`,
  info: tw`hover:bg-cyan-50`,
};

const hoverStatesSoft = {
  primary: tw`hover:bg-blue-100`,
  secondary: tw`hover:bg-gray-100`,
  success: tw`hover:bg-green-100`,
  warning: tw`hover:bg-yellow-100`,
  error: tw`hover:bg-red-100`,
  info: tw`hover:bg-cyan-100`,
};

// Sizes
const sizes = {
  sm: { container: tw`h-5 gap-1 px-2`, text: tw`text-xs`, icon: tw`h-3 w-3` },
  md: {
    container: tw`h-6 gap-1.5 px-2.5`,
    text: tw`text-xs`,
    icon: tw`h-3.5 w-3.5`,
  },
  lg: { container: tw`h-7 gap-2 px-3`, text: tw`text-sm`, icon: tw`h-4 w-4` },
} as const;

// Rounded options
const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

// Clickable styles
const clickableStyles = tw`cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none`;

// Focus ring colors
const focusRings = {
  primary: tw`focus:ring-blue-500`,
  secondary: tw`focus:ring-gray-500`,
  success: tw`focus:ring-green-500`,
  warning: tw`focus:ring-yellow-500`,
  error: tw`focus:ring-red-500`,
  info: tw`focus:ring-cyan-500`,
};

// Close icon component
const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-3 w-3", className)}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
  </svg>
);

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
      if (clickable && onClick) {
        onClick();
      }
    };

    const handleDismiss = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (dismissible && onDismiss) {
        onDismiss();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (clickable && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick?.();
      }
    };

    // Get variant styles based on style prop
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

    // Get hover styles for clickable badges
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
      clickable && focusRings[variant],
      className
    );

    const Component = clickable ? "button" : "span";

    return (
      <Component
        ref={ref as any}
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

        <span className='truncate'>{children}</span>

        {endIcon && !dismissible && (
          <span className={cn("flex items-center", sizes[size].icon)}>{endIcon}</span>
        )}

        {dismissible && (
          <button
            type='button'
            className={cn(
              "ml-1 flex items-center rounded-full p-0.5 hover:bg-black/10 focus:ring-1 focus:ring-white/50 focus:outline-none",
              sizes[size].icon
            )}
            onClick={handleDismiss}
            aria-label='Remove badge'
          >
            <CloseIcon />
          </button>
        )}
      </Component>
    );
  }
);

Badge.displayName = "Badge";
