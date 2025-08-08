import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The visual style of the button
     */
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    /**
     * The size of the button
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Optional left icon
     */
    startIcon?: React.ReactNode;
    /**
     * Optional right icon
     */
    endIcon?: React.ReactNode;
    /**
     * Show a loading spinner
     */
    loading?: boolean;
    /**
     * Make button take full width
     */
    fullWidth?: boolean;
    /**
     * Make button rounded
     */
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    /**
     * Button animation on interaction
     */
    animation?: "none" | "pulse" | "bounce" | "scale";
    /**
     * Children (button label)
     */
    children: React.ReactNode;
}

const base = tw`inline-flex cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50`;

const variants = {
    primary: tw`bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md`,
    secondary: tw`border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50 hover:shadow-md`,
    outline: tw`border border-blue-600 bg-transparent text-blue-600 hover:border-blue-700 hover:bg-blue-50`,
    ghost: tw`bg-transparent text-gray-900 hover:bg-gray-100`,
    destructive: tw`bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md`,
};

const sizes = {
    xs: tw`h-6 min-w-[1.5rem] gap-1 px-2 py-1 text-xs`,
    sm: tw`h-8 min-w-[2rem] gap-1.5 px-3 py-1.5 text-sm`,
    md: tw`h-10 min-w-[2.5rem] gap-2 px-4 py-2 text-base`,
    lg: tw`h-12 min-w-[3rem] gap-2.5 px-6 py-3 text-lg`,
    xl: tw`h-14 min-w-[3.5rem] gap-3 px-8 py-4 text-xl`,
};

const roundedOptions = {
    none: tw`rounded-none`,
    sm: tw`rounded-sm`,
    md: tw`rounded-md`,
    lg: tw`rounded-lg`,
    xl: tw`rounded-xl`,
    full: tw`rounded-full`,
};

const animations = {
    none: tw``,
    pulse: tw`hover:animate-pulse`,
    bounce: tw`hover:animate-bounce`,
    scale: tw`hover:scale-105 active:scale-95`,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            className = "",
            startIcon,
            endIcon,
            loading = false,
            fullWidth = false,
            rounded = "xl",
            animation = "none",
            children,
            disabled,
            ...props
        },
        ref,
    ) => {
        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                className={cn(
                    base,
                    variants[variant],
                    sizes[size],
                    roundedOptions[rounded],
                    animations[animation],
                    fullWidth && "w-full",
                    className,
                )}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={loading}
                {...props}
            >
                {loading && (
                    <svg
                        className={cn(
                            "animate-spin text-current",
                            size === "xs" && "h-3 w-3",
                            size === "sm" && "h-3.5 w-3.5",
                            size === "md" && "h-4 w-4",
                            size === "lg" && "h-5 w-5",
                            size === "xl" && "h-6 w-6",
                        )}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <circle
                            cx="8"
                            cy="8"
                            r="7"
                            stroke="currentColor"
                            strokeWidth="2"
                            opacity="0.25"
                        />
                        <path
                            d="M15 8a7 7 0 0 1-7 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                )}
                {startIcon && !loading && (
                    <span className="flex shrink-0 items-center">{startIcon}</span>
                )}
                <span className="truncate">{children}</span>
                {endIcon && !loading && (
                    <span className="flex shrink-0 items-center">{endIcon}</span>
                )}
            </button>
        );
    },
);
Button.displayName = "Button";
