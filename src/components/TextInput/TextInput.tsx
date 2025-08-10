import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    /**
     * The visual style of the input
     * @default "primary"
     */
    variant?: "primary" | "secondary";
    /**
     * The size of the input
     * @default "md"
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Control the border radius of the input
     * @default "sm"
     */
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    /**
     * Make input take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Optional left icon - accepts any React element
     */
    startIcon?: React.ReactNode;
    /**
     * Optional right icon - accepts any React element
     */
    endIcon?: React.ReactNode;
    /**
     * Optional label text displayed above the input
     */
    label?: string;
    /**
     * Optional helper/description text displayed below the input
     */
    description?: string;
    /**
     * Show error state
     * @default false
     */
    error?: boolean;
    /**
     * Error message to display below the input
     */
    errorMessage?: string;
    /**
     * Preset width of the input wrapper
     * @default "md"
     */
    width?: "sm" | "md" | "lg" | "xl";
}

const wrapperBase = tw`relative inline-flex w-full flex-col`;
const fieldBase = tw`relative inline-flex items-center border bg-white text-gray-900 transition-all duration-200 focus-within:ring-3 disabled:cursor-not-allowed disabled:opacity-50`;

const variants = {
    primary: tw`border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-200`,
    secondary: tw`border-gray-300 bg-gray-50 focus-within:border-gray-500 focus-within:ring-gray-200`,
};

const sizes = {
    xs: { container: tw`h-8`, input: tw`text-xs`, padX: "px-2", gap: "gap-1.5" },
    sm: { container: tw`h-9`, input: tw`text-sm`, padX: "px-3", gap: "gap-2" },
    md: { container: tw`h-10`, input: tw`text-base`, padX: "px-3.5", gap: "gap-2" },
    lg: { container: tw`h-12`, input: tw`text-lg`, padX: "px-4", gap: "gap-2.5" },
    xl: { container: tw`h-14`, input: tw`text-xl`, padX: "px-5", gap: "gap-3" },
} as const;

const roundedOptions = {
    none: tw`rounded-none`,
    sm: tw`rounded-sm`,
    md: tw`rounded-md`,
    lg: tw`rounded-lg`,
    xl: tw`rounded-xl`,
    full: tw`rounded-full`,
};

const labelSizes = {
    xs: tw`text-xs`,
    sm: tw`text-sm`,
    md: tw`text-sm`,
    lg: tw`text-base`,
    xl: tw`text-base`,
};

const widths = {
    sm: tw`w-64`,
    md: tw`w-80`,
    lg: tw`w-96`,
    xl: tw`w-[30rem]`,
} as const;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            variant = "primary",
            size = "md",
            rounded = "sm",
            fullWidth = false,
            width = "md",
            startIcon,
            endIcon,
            label,
            description,
            error = false,
            errorMessage,
            className = "",
            id,
            disabled,
            ...props
        },
        ref,
    ) => {
        const inputRef = React.useRef<HTMLInputElement | null>(null);
        React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
        const autoId = React.useId();
        const inputId = id ?? autoId;

        const hasAssistive = Boolean(description || (error && errorMessage));
        const assistiveId = `${inputId}-desc`;

        return (
            <div className={cn(wrapperBase, fullWidth ? "w-full" : (widths[width] ?? "w-auto"))}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "mb-1 font-medium text-gray-900",
                            labelSizes[size],
                            error && "text-red-700",
                        )}
                    >
                        {label}
                    </label>
                )}
                <div
                    className={cn(
                        fieldBase,
                        variants[variant],
                        sizes[size].container,
                        roundedOptions[rounded],
                        sizes[size].padX,
                        sizes[size].gap,
                        error &&
                            "border-red-500 focus-within:border-red-500 focus-within:ring-red-200",
                        fullWidth && "w-full",
                        className,
                    )}
                >
                    {startIcon && (
                        <span className="flex shrink-0 items-center text-gray-500">
                            {startIcon}
                        </span>
                    )}
                    <input
                        ref={inputRef}
                        id={inputId}
                        className={cn(
                            "min-w-0 flex-1 bg-transparent outline-none placeholder:font-light placeholder:text-gray-400",
                            sizes[size].input,
                        )}
                        aria-invalid={error || undefined}
                        aria-describedby={hasAssistive ? assistiveId : undefined}
                        disabled={disabled}
                        {...props}
                    />
                    {endIcon && (
                        <span className="flex shrink-0 items-center text-gray-500">{endIcon}</span>
                    )}
                </div>
                {hasAssistive && (
                    <div id={assistiveId} className="mt-1 min-h-[1rem]">
                        {error && errorMessage ? (
                            <span className="text-sm text-red-600">{errorMessage}</span>
                        ) : description ? (
                            <span className="text-sm text-gray-600">{description}</span>
                        ) : null}
                    </div>
                )}
            </div>
        );
    },
);

TextInput.displayName = "TextInput";
