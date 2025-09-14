import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

// FormField Component
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The visual style of the form field
     * @default "primary"
     */
    variant?: "primary" | "secondary";
    /**
     * The size of the form field
     * @default "md"
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Make form field take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Optional label text displayed above the field
     */
    label?: string;
    /**
     * Optional description text displayed below the field
     */
    description?: string;
    /**
     * Show error state
     * @default false
     */
    error?: boolean;
    /**
     * Error message to display below the field
     */
    errorMessage?: string;
    /**
     * Show required indicator on label
     * @default false
     */
    required?: boolean;
    /**
     * Layout direction for label and field
     * @default "vertical"
     */
    direction?: "vertical" | "horizontal";
    /**
     * Disable the form field
     * @default false
     */
    disabled?: boolean;
    /**
     * The form input element(s) to be wrapped
     */
    children: React.ReactNode;
}

const formFieldBase = tw`relative flex transition-all duration-200`;
const labelBase = tw`font-medium text-gray-900 select-none`;
const descriptionBase = tw`text-gray-600`;
const errorBase = tw`text-red-600`;

const formFieldVariants = {
    primary: tw``,
    secondary: tw``,
};

const directions = {
    vertical: tw`flex-col`,
    horizontal: tw`flex-row items-center gap-4`,
};

const formFieldSizes = {
    xs: {
        label: tw`text-xs`,
        description: tw`mt-1 text-xs`,
        error: tw`mt-1 text-xs`,
        gap: tw`gap-1`,
    },
    sm: {
        label: tw`text-sm`,
        description: tw`mt-1 text-sm`,
        error: tw`mt-1 text-sm`,
        gap: tw`gap-1.5`,
    },
    md: {
        label: tw`text-sm`,
        description: tw`mt-1.5 text-sm`,
        error: tw`mt-1.5 text-sm`,
        gap: tw`gap-2`,
    },
    lg: {
        label: tw`text-base`,
        description: tw`mt-2 text-base`,
        error: tw`mt-2 text-base`,
        gap: tw`gap-2.5`,
    },
    xl: {
        label: tw`mb-3 text-lg`,
        description: tw`mt-2.5 text-lg`,
        error: tw`mt-2.5 text-lg`,
        gap: tw`gap-3`,
    },
};

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
    (
        {
            variant = "primary",
            size = "md",
            fullWidth = false,
            label,
            description,
            error = false,
            errorMessage,
            required = false,
            direction = "vertical",
            disabled = false,
            className = "",
            children,
            ...props
        },
        ref,
    ) => {
        const fieldRef = React.useRef<HTMLDivElement | null>(null);
        React.useImperativeHandle(ref, () => fieldRef.current as HTMLDivElement);

        const hasAssistive = Boolean(description || (error && errorMessage));
        const assistiveId = React.useId();

        return (
            <div
                ref={fieldRef}
                className={cn(
                    formFieldBase,
                    formFieldVariants[variant],
                    directions[direction],
                    formFieldSizes[size].gap,
                    fullWidth && "w-full",
                    disabled && "opacity-50",
                    className,
                )}
                {...props}
            >
                {label && (
                    <label
                        className={cn(
                            labelBase,
                            formFieldSizes[size].label,
                            error && "text-red-700",
                            disabled && "opacity-50",
                        )}
                        htmlFor={assistiveId}
                    >
                        {label}
                        {required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                )}

                <div className={cn("min-w-0 flex-1", fullWidth && "w-full")}>{children}</div>

                {hasAssistive && (
                    <div className="min-h-[1rem]">
                        {error && errorMessage ? (
                            <span className={cn(errorBase, formFieldSizes[size].error)}>
                                {errorMessage}
                            </span>
                        ) : description ? (
                            <span className={cn(descriptionBase, formFieldSizes[size].description)}>
                                {description}
                            </span>
                        ) : null}
                    </div>
                )}
            </div>
        );
    },
);

FormField.displayName = "FormField";

// FormSection Component
export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The visual style of the form section
     * @default "primary"
     */
    variant?: "primary" | "secondary";
    /**
     * The size of the form section
     * @default "md"
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Make form section take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Optional title for the section
     */
    title?: string;
    /**
     * Optional description for the section
     */
    description?: string;
    /**
     * Show error state for the section
     * @default false
     */
    error?: boolean;
    /**
     * Error message for the section
     */
    errorMessage?: string;
    /**
     * Show the section in a bordered container
     * @default false
     */
    bordered?: boolean;
    /**
     * Spacing between section elements
     * @default "md"
     */
    spacing?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Disable all elements in the section
     * @default false
     */
    disabled?: boolean;
    /**
     * The form fields and content to be grouped
     */
    children: React.ReactNode;
}

const formSectionBase = tw`relative flex flex-col transition-all duration-200`;
const titleBase = tw`font-semibold text-gray-900`;

const formSectionVariants = {
    primary: tw``,
    secondary: tw``,
};

const sectionSpacings = {
    xs: tw`gap-2`,
    sm: tw`gap-3`,
    md: tw`gap-4`,
    lg: tw`gap-6`,
    xl: tw`gap-8`,
};

const sectionSizes = {
    xs: {
        title: tw`text-lg`,
        description: tw`text-xs`,
        error: tw`text-xs`,
    },
    sm: {
        title: tw`text-xl`,
        description: tw`text-sm`,
        error: tw`text-sm`,
    },
    md: {
        title: tw`text-2xl`,
        description: tw`text-sm`,
        error: tw`text-sm`,
    },
    lg: {
        title: tw`text-3xl`,
        description: tw`text-base`,
        error: tw`text-base`,
    },
    xl: {
        title: tw`text-4xl`,
        description: tw`text-lg`,
        error: tw`text-lg`,
    },
};

const borderedStyles = tw`rounded-lg border border-gray-200 bg-white p-4 shadow-sm`;

export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
    (
        {
            variant = "primary",
            size = "md",
            fullWidth = false,
            title,
            description,
            error = false,
            errorMessage,
            bordered = false,
            spacing = "md",
            disabled = false,
            className = "",
            children,
            ...props
        },
        ref,
    ) => {
        const sectionRef = React.useRef<HTMLDivElement | null>(null);
        React.useImperativeHandle(ref, () => sectionRef.current as HTMLDivElement);

        return (
            <div
                ref={sectionRef}
                className={cn(
                    formSectionBase,
                    formSectionVariants[variant],
                    sectionSpacings[spacing],
                    fullWidth && "w-full",
                    bordered && borderedStyles,
                    disabled && "opacity-50",
                    className,
                )}
                {...props}
            >
                {(title || description) && (
                    <div className="flex flex-col gap-2">
                        {title && (
                            <h3
                                className={cn(
                                    titleBase,
                                    sectionSizes[size].title,
                                    error && "text-red-700",
                                )}
                            >
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p
                                className={cn(
                                    descriptionBase,
                                    sectionSizes[size].description,
                                    error && "text-red-600",
                                )}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {children}

                {error && errorMessage && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3">
                        <p className={cn(errorBase, sectionSizes[size].error)}>{errorMessage}</p>
                    </div>
                )}
            </div>
        );
    },
);

FormSection.displayName = "FormSection";

// Form Component
export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onError"> {
    /**
     * The visual style of the form
     * @default "primary"
     */
    variant?: "primary" | "secondary";
    /**
     * The size of the form elements
     * @default "md"
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Layout direction for form fields
     * @default "vertical"
     */
    direction?: "vertical" | "horizontal";
    /**
     * Spacing between form fields
     * @default "md"
     */
    spacing?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Make form take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Show form in a card-like container
     * @default false
     */
    card?: boolean;
    /**
     * Optional title for the form
     */
    title?: string;
    /**
     * Optional description for the form
     */
    description?: string;
    /**
     * Show error state for the entire form
     * @default false
     */
    error?: boolean;
    /**
     * Error message for the entire form
     */
    errorMessage?: string;
    /**
     * Show loading state for the form
     * @default false
     */
    loading?: boolean;
    /**
     * Loading message
     * @default "Submitting..."
     */
    loadingMessage?: string;
    /**
     * Disable all form elements
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback fired when form is submitted
     */
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    /**
     * Callback fired when form validation fails
     */
    onError?: (errors: Record<string, string>) => void;
}

const formBase = tw`relative flex transition-all duration-200`;

const formVariants = {
    primary: tw`text-gray-900`,
    secondary: tw`text-gray-700`,
};

const formSpacings = {
    xs: tw`gap-2`,
    sm: tw`gap-3`,
    md: tw`gap-4`,
    lg: tw`gap-6`,
    xl: tw`gap-8`,
};

const formDirections = {
    vertical: tw`flex-col`,
    horizontal: tw`flex-row flex-wrap`,
};

const cardStyles = tw`rounded-lg border border-gray-200 bg-white p-6 shadow-sm`;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
    (
        {
            variant = "primary",
            size = "md",
            direction = "vertical",
            spacing = "md",
            fullWidth = false,
            card = false,
            title,
            description,
            error = false,
            errorMessage,
            loading = false,
            loadingMessage = "Submitting...",
            disabled = false,
            className = "",
            children,
            onSubmit,
            onError,
            ...props
        },
        ref,
    ) => {
        const formRef = React.useRef<HTMLFormElement | null>(null);
        React.useImperativeHandle(ref, () => formRef.current as HTMLFormElement);

        const handleSubmit = React.useCallback(
            (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();

                if (loading || disabled) return;

                // Basic form validation
                const errors: Record<string, string> = {};

                // Check for required fields
                const requiredFields = event.currentTarget.querySelectorAll("[required]");
                requiredFields.forEach((field) => {
                    const input = field as HTMLInputElement;
                    if (!input.value.trim()) {
                        const fieldName = input.name || input.id || "Field";
                        errors[input.name || input.id || "field"] = `${fieldName} is required`;
                    }
                });

                if (Object.keys(errors).length > 0) {
                    onError?.(errors);
                    return;
                }

                onSubmit?.(event);
            },
            [loading, disabled, onSubmit, onError],
        );

        const formContent = (
            <>
                {(title || description) && (
                    <div className="mb-6">
                        {title && (
                            <h2
                                className={cn(
                                    "mb-2 font-semibold text-gray-900",
                                    size === "xs" && "text-lg",
                                    size === "sm" && "text-xl",
                                    size === "md" && "text-2xl",
                                    size === "lg" && "text-3xl",
                                    size === "xl" && "text-4xl",
                                )}
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p
                                className={cn(
                                    "text-gray-600",
                                    size === "xs" && "text-sm",
                                    size === "sm" && "text-sm",
                                    size === "md" && "text-base",
                                    size === "lg" && "text-lg",
                                    size === "xl" && "text-xl",
                                )}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div
                    className={cn(
                        formBase,
                        formVariants[variant],
                        formDirections[direction],
                        formSpacings[spacing],
                        fullWidth && "w-full",
                        disabled && "pointer-events-none opacity-50",
                    )}
                >
                    {children}
                </div>

                {error && errorMessage && (
                    <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                )}

                {loading && (
                    <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
                        <p className="text-sm text-blue-600">{loadingMessage}</p>
                    </div>
                )}
            </>
        );

        return (
            <form
                ref={formRef}
                className={cn(card ? cardStyles : "", fullWidth && "w-full", className)}
                onSubmit={handleSubmit}
                noValidate
                {...props}
            >
                {formContent}
            </form>
        );
    },
);

Form.displayName = "Form";
