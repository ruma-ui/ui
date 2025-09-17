import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The visual style of the card
     * @default "default"
     */
    variant?: "default" | "outlined" | "elevated" | "filled";
    /**
     * The padding size inside the card
     * @default "md"
     */
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    /**
     * Control the border radius of the card
     * @default "lg"
     */
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    /**
     * Shadow elevation level
     * @default "sm"
     */
    shadow?: "none" | "sm" | "md" | "lg" | "xl";
    /**
     * Whether the card is clickable
     * @default false
     */
    clickable?: boolean;
    /**
     * Whether the card is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Click handler for clickable cards
     */
    onClick?: () => void;
    /**
     * Card content
     */
    children: React.ReactNode;
    /**
     * Additional classes for the card container
     */
    className?: string;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Header content
     */
    children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Body content
     */
    children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Footer content
     */
    children: React.ReactNode;
}

// Base styles
const cardBase = tw`relative bg-white transition-all duration-200`;

// Variants
const variants = {
    default: tw`border border-gray-200`,
    outlined: tw`border-2 border-gray-300`,
    elevated: tw`border border-gray-200`,
    filled: tw`border border-gray-200 bg-gray-50`,
};

// Padding options
const paddings = {
    none: tw``,
    sm: tw`p-3`,
    md: tw`p-4`,
    lg: tw`p-6`,
    xl: tw`p-8`,
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

// Shadow options
const shadows = {
    none: tw``,
    sm: tw`shadow-sm`,
    md: tw`shadow-md`,
    lg: tw`shadow-lg`,
    xl: tw`shadow-xl`,
};

// Clickable styles
const clickableStyles = tw`cursor-pointer hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`;

// Disabled styles
const disabledStyles = tw`pointer-events-none cursor-not-allowed opacity-60`;

// Hover states for variants
const hoverStates = {
    default: tw`hover:border-gray-300 hover:shadow-sm`,
    outlined: tw`hover:border-gray-400`,
    elevated: tw`hover:shadow-md`,
    filled: tw`hover:bg-gray-100`,
};

export const Card = React.forwardRef<HTMLDivElement | HTMLButtonElement, CardProps>(
    (
        {
            variant = "default",
            padding = "md",
            rounded = "lg",
            shadow = "sm",
            clickable = false,
            disabled = false,
            onClick,
            children,
            className = "",
            ...props
        },
        ref,
    ) => {
        const handleClick = () => {
            if (clickable && !disabled && onClick) {
                onClick();
            }
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (clickable && !disabled && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                onClick?.();
            }
        };

        const cardClasses = cn(
            cardBase,
            variants[variant],
            paddings[padding],
            roundedOptions[rounded],
            shadows[shadow],
            clickable && !disabled && clickableStyles,
            clickable && !disabled && hoverStates[variant],
            disabled && disabledStyles,
            className,
        );

        if (clickable) {
            return (
                <button
                    ref={ref as React.Ref<HTMLButtonElement>}
                    className={cardClasses}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                >
                    {children}
                </button>
            );
        }

        return (
            <div
                ref={ref as React.Ref<HTMLDivElement>}
                className={cardClasses}
                {...(props as React.HTMLAttributes<HTMLDivElement>)}
            >
                {children}
            </div>
        );
    },
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("mb-3 border-b border-gray-200 pb-3", className)}
                {...props}
            >
                {children}
            </div>
        );
    },
);
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div ref={ref} className={cn("flex-1", className)} {...props}>
                {children}
            </div>
        );
    },
);
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("mt-3 border-t border-gray-200 pt-3", className)}
                {...props}
            >
                {children}
            </div>
        );
    },
);
CardFooter.displayName = "CardFooter";
