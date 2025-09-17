import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

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
const alertBase = tw`relative flex items-start gap-3 p-4 transition-all duration-200`;

// Variants - filled style
const variantsFilled: Record<AlertVariant, string> = {
    info: tw`bg-blue-600 text-white`,
    success: tw`bg-green-600 text-white`,
    warning: tw`bg-yellow-600 text-white`,
    error: tw`bg-red-600 text-white`,
};

// Variants - outline style
const variantsOutline: Record<AlertVariant, string> = {
    info: tw`border border-blue-600 bg-white text-blue-700`,
    success: tw`border border-green-600 bg-white text-green-700`,
    warning: tw`border border-yellow-600 bg-white text-yellow-700`,
    error: tw`border border-red-600 bg-white text-red-700`,
};

// Variants - soft style
const variantsSoft: Record<AlertVariant, string> = {
    info: tw`border border-blue-200 bg-blue-50 text-blue-800`,
    success: tw`border border-green-200 bg-green-50 text-green-800`,
    warning: tw`border border-yellow-200 bg-yellow-50 text-yellow-800`,
    error: tw`border border-red-200 bg-red-50 text-red-800`,
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
        text: tw`text-base`,
        title: tw`text-base font-semibold`,
        icon: tw`h-5 w-5`,
    },
    lg: {
        container: tw`gap-4 p-5`,
        text: tw`text-lg`,
        title: tw`text-lg font-semibold`,
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
        info: tw`text-blue-100`,
        success: tw`text-green-100`,
        warning: tw`text-yellow-100`,
        error: tw`text-red-100`,
    },
    outline: {
        info: tw`text-blue-600`,
        success: tw`text-green-600`,
        warning: tw`text-yellow-600`,
        error: tw`text-red-600`,
    },
    soft: {
        info: tw`text-blue-600`,
        success: tw`text-green-600`,
        warning: tw`text-yellow-600`,
        error: tw`text-red-600`,
    },
};

// Default icons for each variant
const DefaultIcons: Record<
    AlertVariant,
    ({ className }: { className?: string }) => React.ReactElement
> = {
    info: ({ className }: { className?: string }) => (
        <svg
            className={cn("h-5 w-5", className)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
    success: ({ className }: { className?: string }) => (
        <svg
            className={cn("h-5 w-5", className)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
    warning: ({ className }: { className?: string }) => (
        <svg
            className={cn("h-5 w-5", className)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
        </svg>
    ),
    error: ({ className }: { className?: string }) => (
        <svg
            className={cn("h-5 w-5", className)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
};

// Close icon component
const CloseIcon = ({ className }: { className?: string }) => (
    <svg
        className={cn("h-4 w-4", className)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

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
        ref,
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
            return iconColors[style!][variant];
        };

        // Render the appropriate icon
        const renderIcon = () => {
            if (startIcon) {
                return (
                    <span
                        className={cn(
                            "flex shrink-0 items-start",
                            sizes[size].icon,
                            getIconColor(),
                        )}
                    >
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
            className,
        );

        return (
            <div ref={ref} className={alertClasses} role={role} id={id} {...props}>
                {renderIcon()}

                <div className="min-w-0 flex-1">
                    {title && <div className={cn("mb-1", sizes[size].title)}>{title}</div>}
                    <div className="break-words">{children}</div>
                </div>

                {endIcon && !dismissible && (
                    <span
                        className={cn(
                            "flex shrink-0 items-start",
                            sizes[size].icon,
                            getIconColor(),
                        )}
                    >
                        {endIcon}
                    </span>
                )}

                {dismissible && (
                    <button
                        type="button"
                        className={cn(
                            "flex shrink-0 items-start rounded-full p-1 transition-colors duration-200",
                            "hover:bg-black/10 focus:ring-2 focus:ring-white/50 focus:outline-none",
                            style === "filled"
                                ? "text-white/80 hover:text-white"
                                : "opacity-70 hover:opacity-100",
                        )}
                        onClick={handleDismiss}
                        onKeyDown={handleKeyDown}
                        aria-label="Dismiss alert"
                    >
                        {dismissIcon || <CloseIcon className="h-4 w-4" />}
                    </button>
                )}
            </div>
        );
    },
);

Alert.displayName = "Alert";
