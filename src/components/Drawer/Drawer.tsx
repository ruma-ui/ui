import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

export interface DrawerProps {
    /**
     * Whether the drawer is open
     */
    open: boolean;
    /**
     * Callback when drawer should close
     */
    onClose: () => void;
    /**
     * The position of the drawer
     * @default "right"
     */
    position?: "left" | "right" | "top" | "bottom";
    /**
     * The size of the drawer (width for left/right, height for top/bottom)
     * @default "md"
     */
    size?: "sm" | "md" | "lg" | "xl" | "full";
    /**
     * The visual style of the drawer
     * @default "primary"
     */
    variant?: "primary" | "secondary";
    /**
     * Control the border radius of the drawer
     * @default "none"
     */
    rounded?: "none" | "sm" | "md" | "lg" | "xl";
    /**
     * Enable/disable animations
     * @default true
     */
    animation?: boolean;
    /**
     * Prevent closing when clicking outside the drawer
     * @default false
     */
    preventClose?: boolean;
    /**
     * Hide the close button
     * @default false
     */
    hideCloseButton?: boolean;
    /**
     * Drawer title displayed in the header
     */
    title?: string;
    /**
     * Optional header content (overrides title)
     */
    header?: React.ReactNode;
    /**
     * Optional footer content
     */
    footer?: React.ReactNode;
    /**
     * Main drawer content
     */
    children: React.ReactNode;
    /**
     * Custom class name for the drawer container
     */
    className?: string;
    /**
     * Custom class name for the overlay
     */
    overlayClassName?: string;
    /**
     * ID for the drawer element
     */
    id?: string;
    /**
     * Aria label for accessibility
     */
    ariaLabel?: string;
    /**
     * Aria labelledby for accessibility
     */
    ariaLabelledBy?: string;
    /**
     * Aria describedby for accessibility
     */
    ariaDescribedBy?: string;
}

// Base styles
const overlayBase = tw`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm`;
const drawerBase = tw`absolute flex flex-col bg-white shadow-xl ring-1 ring-gray-200 outline-none`;
const headerBase = tw`flex items-center justify-between border-b border-gray-200 px-6 py-4`;
const bodyBase = tw`flex-1 overflow-y-auto px-6 py-5`;
const footerBase = tw`border-t border-gray-200 px-6 py-4`;
const closeButtonBase = tw`rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`;

// Variants
const variants = {
    primary: tw`border border-gray-200`,
    secondary: tw`border border-gray-300 bg-gray-50`,
};

// Positions
const positions = {
    left: tw`top-0 left-0 h-full`,
    right: tw`top-0 right-0 h-full`,
    top: tw`top-0 left-0 w-full`,
    bottom: tw`bottom-0 left-0 w-full`,
};

// Sizes
const sizes = {
    left: {
        sm: tw`w-80`,
        md: tw`w-96`,
        lg: tw`w-[28rem]`,
        xl: tw`w-[32rem]`,
        full: tw`w-full`,
    },
    right: {
        sm: tw`w-80`,
        md: tw`w-96`,
        lg: tw`w-[28rem]`,
        xl: tw`w-[32rem]`,
        full: tw`w-full`,
    },
    top: {
        sm: tw`h-80`,
        md: tw`h-96`,
        lg: tw`h-[28rem]`,
        xl: tw`h-[32rem]`,
        full: tw`h-full`,
    },
    bottom: {
        sm: tw`h-80`,
        md: tw`h-96`,
        lg: tw`h-[28rem]`,
        xl: tw`h-[32rem]`,
        full: tw`h-full`,
    },
};

// Rounded options
const roundedOptions = {
    none: tw`rounded-none`,
    sm: tw`rounded-sm`,
    md: tw`rounded-md`,
    lg: tw`rounded-lg`,
    xl: tw`rounded-xl`,
};

// Animation classes
const overlayAnimations = {
    enter: tw`animate-in fade-in-0 duration-200 ease-out`,
    exit: tw`animate-out fade-out-0 duration-150 ease-in`,
};

const drawerAnimations = {
    left: {
        enter: tw`animate-in slide-in-from-left-2 duration-200 ease-out`,
        exit: tw`animate-out slide-out-to-left-2 duration-150 ease-in`,
    },
    right: {
        enter: tw`animate-in slide-in-from-right-2 duration-200 ease-out`,
        exit: tw`animate-out slide-out-to-right-2 duration-150 ease-in`,
    },
    top: {
        enter: tw`animate-in slide-in-from-top-2 duration-200 ease-out`,
        exit: tw`animate-out slide-out-to-top-2 duration-150 ease-in`,
    },
    bottom: {
        enter: tw`animate-in slide-in-from-bottom-2 duration-200 ease-out`,
        exit: tw`animate-out slide-out-to-bottom-2 duration-150 ease-in`,
    },
};

// Close icon component
const CloseIcon = () => (
    <svg
        className="h-5 w-5"
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

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
    (
        {
            open,
            onClose,
            position = "right",
            size = "md",
            variant = "primary",
            rounded = "none",
            animation = true,
            preventClose = false,
            hideCloseButton = false,
            title,
            header,
            footer,
            children,
            className = "",
            overlayClassName = "",
            id,
            ariaLabel,
            ariaLabelledBy,
            ariaDescribedBy,
            ...props
        },
        ref,
    ) => {
        const drawerRef = useRef<HTMLDivElement>(null);
        const previousFocusRef = useRef<HTMLElement | null>(null);

        const autoId = React.useId();
        const drawerId = id ?? autoId;
        const titleId = `${drawerId}-title`;
        const descId = `${drawerId}-description`;

        // Focus management
        useEffect(() => {
            if (open) {
                // Store the previously focused element
                previousFocusRef.current = document.activeElement as HTMLElement;

                // Focus the drawer container
                setTimeout(() => {
                    drawerRef.current?.focus();
                }, 50);
            } else if (previousFocusRef.current) {
                // Return focus to the previously focused element
                previousFocusRef.current.focus();
            }
        }, [open]);

        // Handle escape key
        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Escape" && open && !preventClose) {
                    onClose();
                }
            };

            if (open) {
                document.addEventListener("keydown", handleKeyDown);
                return () => document.removeEventListener("keydown", handleKeyDown);
            }
        }, [open, onClose, preventClose]);

        // Prevent body scroll when drawer is open
        useEffect(() => {
            if (open) {
                const originalStyle = window.getComputedStyle(document.body).overflow;
                document.body.style.overflow = "hidden";
                return () => {
                    document.body.style.overflow = originalStyle;
                };
            }
        }, [open]);

        // Handle overlay click
        const handleOverlayClick = (event: React.MouseEvent) => {
            if (event.target === event.currentTarget && !preventClose) {
                onClose();
            }
        };

        // Focus trap for accessibility
        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Tab") {
                const drawer = drawerRef.current;
                if (!drawer) return;

                const focusableElements = drawer.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );
                const firstFocusable = focusableElements[0] as HTMLElement;
                const lastFocusable = focusableElements[
                    focusableElements.length - 1
                ] as HTMLElement;

                if (event.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        event.preventDefault();
                        lastFocusable?.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        event.preventDefault();
                        firstFocusable?.focus();
                    }
                }
            }
        };

        // Support exit animations by keeping mounted until animation completes
        const [isMounted, setIsMounted] = useState(open);
        const [isAnimatingOut, setIsAnimatingOut] = useState(false);

        useEffect(() => {
            if (open) {
                setIsMounted(true);
                setIsAnimatingOut(false);
            } else if (animation) {
                setIsAnimatingOut(true);
                const t = setTimeout(() => {
                    setIsMounted(false);
                    setIsAnimatingOut(false);
                }, 160); // match duration-150 + small buffer
                return () => clearTimeout(t);
            } else {
                setIsMounted(false);
            }
        }, [open, animation]);

        if (!isMounted) return null;

        const drawerClasses = cn(
            drawerBase,
            positions[position],
            sizes[position][size],
            variants[variant],
            roundedOptions[rounded],
            animation &&
                (isAnimatingOut
                    ? drawerAnimations[position].exit
                    : drawerAnimations[position].enter),
            className,
        );

        const overlayClasses = cn(
            overlayBase,
            animation && (isAnimatingOut ? overlayAnimations.exit : overlayAnimations.enter),
            overlayClassName,
        );

        const drawerContent = (
            <div
                className={overlayClasses}
                onClick={handleOverlayClick}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy || (title ? titleId : undefined)}
                aria-describedby={ariaDescribedBy || descId}
            >
                <div
                    ref={ref || drawerRef}
                    className={drawerClasses}
                    tabIndex={-1}
                    onKeyDown={handleKeyDown}
                    id={drawerId}
                    {...props}
                >
                    {/* Header */}
                    {(header || title || !hideCloseButton) && (
                        <div className={headerBase}>
                            <div className="min-w-0 flex-1">
                                {header ||
                                    (title && (
                                        <h2
                                            id={titleId}
                                            className="truncate text-lg font-semibold text-gray-900"
                                        >
                                            {title}
                                        </h2>
                                    ))}
                            </div>
                            {!hideCloseButton && (
                                <button
                                    type="button"
                                    className={closeButtonBase}
                                    onClick={onClose}
                                    aria-label="Close drawer"
                                >
                                    <CloseIcon />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <div id={descId} className={bodyBase}>
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && <div className={footerBase}>{footer}</div>}
                </div>
            </div>
        );

        return createPortal(drawerContent, document.body);
    },
);

Drawer.displayName = "Drawer";
