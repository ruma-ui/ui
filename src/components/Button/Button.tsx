import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";
import { Loader } from "../Loader/Loader";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The visual style of the button
     * @default "primary"
     */
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "none";
    /**
     * The size of the button
     * @default "md"
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Optional left icon - accepts any React element
     */
    startIcon?: React.ReactNode;
    /**
     * Optional right icon - accepts any React element
     */
    endIcon?: React.ReactNode;
    /**
     * Show a loading spinner and disable the button
     * @default false
     */
    loading?: boolean;
    /**
     * Make button take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Control the border radius of the button
     * @default "md"
     */
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    /**
     * Animation effect on user interaction
     * @default "none"
     */
    animation?: "none" | "scale" | "fade" | "slide" | "glow" | "lift" | "ripple" | "press";
    /**
     * Button content (text, elements, etc.)
     */
    children: React.ReactNode;
}

const base = tw`inline-flex cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50`;

const variants = {
    primary: tw`bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md`,
    secondary: tw`bg-gray-100 text-black shadow-sm outline-1 outline-gray-300 hover:bg-gray-200 hover:shadow-md`,
    outline: tw`border border-blue-600 bg-transparent text-blue-600 hover:border-blue-700 hover:bg-blue-50`,
    ghost: tw`border border-gray-300 bg-transparent text-gray-900 shadow-sm hover:shadow-md`,
    destructive: tw`bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md`,
    none: tw``,
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
    scale: tw`transition-transform duration-150 ease-out hover:scale-105 active:scale-95`,
    fade: tw`transition-opacity duration-200 ease-out hover:opacity-90`,
    slide: tw`transition-transform duration-150 ease-out hover:translate-y-[-2px] active:translate-y-0`,
    glow: tw`transition-shadow duration-200 ease-out hover:shadow-lg hover:shadow-blue-500/25`,
    lift: tw`transition-all duration-150 ease-out hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0`,
    ripple: tw`before:rounded-inherit relative overflow-hidden before:absolute before:inset-0 before:scale-0 before:bg-white/20 before:transition-transform before:duration-300 before:ease-out hover:before:scale-100`,
    press: tw`transition-transform duration-75 ease-out active:scale-95`,
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
            rounded = "md",
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
                    <Loader
                        type="spinner"
                        variant="primary"
                        color="currentColor"
                        size={
                            size === "xs"
                                ? "xs"
                                : size === "sm"
                                  ? "xs"
                                  : size === "md"
                                    ? "sm"
                                    : size === "lg"
                                      ? "md"
                                      : "md"
                        }
                        speed="normal"
                        strokeWidth="thick"
                    />
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
