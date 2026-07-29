import React from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { cn, tw } from "../../lib/utils";

type AlertVariant = "info" | "success" | "warning" | "error";
type AlertSize = "sm" | "md" | "lg";
type AlertStyle = "filled" | "outline" | "soft";
type AlertRounded = "none" | "sm" | "md" | "lg" | "xl";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  /**
   * The visual style of the alert
   * @default "info"
   */
  variant?: AlertVariant;
  /**
   * The size of the alert
   * @default "md"
   */
  size?: AlertSize;
  /**
   * Control the border radius of the alert
   * @default "md"
   */
  rounded?: AlertRounded;
  /**
   * Alert content style
   * @default "filled"
   */
  style?: AlertStyle;
  /**
   * Optional left icon
   */
  startIcon?: React.ReactNode;
  /**
   * Optional right icon or custom action element
   */
  endIcon?: React.ReactNode;
  /**
   * Alert title (optional)
   */
  title?: string;
  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;
  /**
   * Dismiss handler for dismissible alerts
   */
  onDismiss?: () => void;
  /**
   * Custom dismiss icon
   */
  dismissIcon?: React.ReactNode;
  /**
   * Alert content
   */
  children: React.ReactNode;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * ID for the alert element
   */
  id?: string;
  /**
   * Role for screen readers
   * @default "alert"
   */
  role?: "alert" | "alertdialog" | "status";
}

// Base styles
const alertBase = tw`relative flex items-start gap-3 p-4 transition-all duration-150`;

// Variants - filled style
const variantsFilled: Record<AlertVariant, string> = {
  info: tw`bg-info text-info-foreground`,
  success: tw`bg-success text-success-foreground`,
  warning: tw`bg-warning text-warning-foreground`,
  error: tw`bg-destructive text-destructive-foreground`,
};

// Variants - outline style
const variantsOutline: Record<AlertVariant, string> = {
  info: tw`border border-info bg-background text-info`,
  success: tw`border border-success bg-background text-success`,
  warning: tw`border border-warning bg-background text-warning`,
  error: tw`border border-destructive bg-background text-destructive`,
};

// Variants - soft style
const variantsSoft: Record<AlertVariant, string> = {
  info: tw`border border-info/20 bg-info/10 text-info`,
  success: tw`border border-success/20 bg-success/10 text-success`,
  warning: tw`border border-warning/20 bg-warning/10 text-warning`,
  error: tw`border border-destructive/20 bg-destructive/10 text-destructive`,
};

// Sizes
const sizes: Record<AlertSize, { container: string; text: string; title: string; icon: string }> = {
  sm: {
    container: tw`gap-2 p-3`,
    text: tw`text-sm`,
    title: tw`text-sm font-medium`,
    icon: tw`h-4 w-4`,
  },
  md: {
    container: tw`gap-3 p-4`,
    text: tw`text-sm`,
    title: tw`text-sm font-semibold`,
    icon: tw`h-5 w-5`,
  },
  lg: {
    container: tw`gap-4 p-5`,
    text: tw`text-base`,
    title: tw`text-base font-semibold`,
    icon: tw`h-6 w-6`,
  },
} as const;

// Rounded options
const roundedOptions: Record<AlertRounded, string> = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
};

// Icon color variants for different styles
const iconColors: Record<AlertStyle, Record<AlertVariant, string>> = {
  filled: {
    info: tw`text-info-foreground/80`,
    success: tw`text-success-foreground/80`,
    warning: tw`text-warning-foreground/80`,
    error: tw`text-destructive-foreground/80`,
  },
  outline: {
    info: tw`text-info`,
    success: tw`text-success`,
    warning: tw`text-warning`,
    error: tw`text-destructive`,
  },
  soft: {
    info: tw`text-info`,
    success: tw`text-success`,
    warning: tw`text-warning`,
    error: tw`text-destructive`,
  },
};

// Default icons for each variant
const DefaultIcons: Record<
  AlertVariant,
  ({ className }: { className?: string }) => React.ReactElement
> = {
  info: ({ className }: { className?: string }) => (
    <HiOutlineInformationCircle className={cn("h-5 w-5", className)} />
  ),
  success: ({ className }: { className?: string }) => (
    <HiOutlineCheckCircle className={cn("h-5 w-5", className)} />
  ),
  warning: ({ className }: { className?: string }) => (
    <HiOutlineExclamation className={cn("h-5 w-5", className)} />
  ),
  error: ({ className }: { className?: string }) => (
    <HiOutlineExclamationCircle className={cn("h-5 w-5", className)} />
  ),
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      size = "md",
      rounded = "md",
      style = "filled",
      startIcon,
      endIcon,
      title,
      dismissible = false,
      onDismiss,
      dismissIcon,
      children,
      className = "",
      id,
      role = "alert",
      ...props
    },
    ref
  ) => {
    const handleDismiss = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (dismissible && onDismiss) {
        onDismiss();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (dismissible && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onDismiss?.();
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

    // Get icon color
    const getIconColor = () => {
      return iconColors[style || "filled"][variant];
    };

    // Render the appropriate icon
    const renderIcon = () => {
      if (startIcon) {
        return (
          <span className={cn("flex shrink-0 items-start", sizes[size].icon, getIconColor())}>
            {startIcon}
          </span>
        );
      }

      const DefaultIcon = DefaultIcons[variant];
      return (
        <span className={cn("flex shrink-0 items-start", getIconColor())}>
          <DefaultIcon className={sizes[size].icon} />
        </span>
      );
    };

    const alertClasses = cn(
      alertBase,
      getVariantStyles(),
      sizes[size].container,
      sizes[size].text,
      roundedOptions[rounded],
      className
    );

    return (
      <div ref={ref} className={alertClasses} role={role} id={id} {...props}>
        {renderIcon()}

        <div className="min-w-0 flex-1">
          {title && <div className={cn("mb-1", sizes[size].title)}>{title}</div>}
          <div className="break-words">{children}</div>
        </div>

        {endIcon && !dismissible && (
          <span className={cn("flex shrink-0 items-start", sizes[size].icon, getIconColor())}>
            {endIcon}
          </span>
        )}

        {dismissible && (
          <button
            type="button"
            className={cn(
              "rui-focus-ring flex shrink-0 items-start rounded-full p-1 transition-colors duration-150",
              "hover:bg-black/10 focus:outline-none",
              style === "filled" ? "text-white/80 hover:text-white" : "opacity-70 hover:opacity-100"
            )}
            onClick={handleDismiss}
            onKeyDown={handleKeyDown}
            aria-label="Dismiss alert"
          >
            {dismissIcon || <IoClose className="h-4 w-4" />}
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
