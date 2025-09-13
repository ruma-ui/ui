import React, { useState, useRef, useEffect, useContext, createContext } from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

// DropdownMenu Context
interface DropdownMenuContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

const useDropdownMenu = () => {
    const context = useContext(DropdownMenuContext);
    if (!context) {
        throw new Error("DropdownMenu components must be used within a DropdownMenu");
    }
    return context;
};

// Base styles
const contentBase = tw`z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg`;
const itemBase = tw`relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm !text-gray-900 transition-colors outline-none select-none hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 disabled:pointer-events-none disabled:opacity-50`;
const labelBase = tw`px-2 py-1.5 text-sm font-semibold text-gray-900`;
const separatorBase = tw`-mx-1 my-1 h-px bg-gray-200`;

// Animation classes
const contentAnimation = tw`animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150 ease-out`;

export interface DropdownMenuProps {
    /**
     * Dropdown menu content
     */
    children: React.ReactNode;
    /**
     * Whether the dropdown is open (controlled)
     */
    open?: boolean;
    /**
     * Default open state
     */
    defaultOpen?: boolean;
    /**
     * Callback when open state changes
     */
    onOpenChange?: (open: boolean) => void;
}

export interface DropdownMenuTriggerProps {
    /**
     * Trigger element content
     */
    children: React.ReactNode;
    /**
     * Additional props for the trigger element
     */
    asChild?: boolean;
}

export interface DropdownMenuContentProps {
    /**
     * Content alignment relative to trigger
     * @default "bottom-start"
     */
    align?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
    /**
     * Content to display in the dropdown
     */
    children: React.ReactNode;
    /**
     * Custom class name
     */
    className?: string;
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Whether the item is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback when item is selected
     */
    onSelect?: () => void;
}

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Label text
     */
    children: React.ReactNode;
}

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Custom class name
     */
    className?: string;
}

export interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Group content
     */
    children: React.ReactNode;
}

// DropdownMenu main component
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    children,
    open,
    defaultOpen = false,
    onOpenChange,
}) => {
    const [isOpen, setIsOpen] = useState(open ?? defaultOpen);
    const triggerRef = useRef<HTMLElement>(null);

    const handleOpenChange = React.useCallback(
        (newOpen: boolean) => {
            if (open === undefined) {
                setIsOpen(newOpen);
            }
            onOpenChange?.(newOpen);
        },
        [open, onOpenChange],
    );

    // Update controlled state
    useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open);
        }
    }, [open]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest("[data-dropdown-menu-content]")
            ) {
                handleOpenChange(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, handleOpenChange]);

    // Close on escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleOpenChange(false);
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, handleOpenChange]);

    const contextValue: DropdownMenuContextType = {
        isOpen,
        setIsOpen: handleOpenChange,
        triggerRef,
    };

    return (
        <div className="relative">
            <DropdownMenuContext.Provider value={contextValue}>
                {children}
            </DropdownMenuContext.Provider>
        </div>
    );
};

// DropdownMenuTrigger component
export const DropdownMenuTrigger = React.forwardRef<HTMLElement, DropdownMenuTriggerProps>(
    ({ children, asChild = false, ...props }, forwardedRef) => {
        const { isOpen, setIsOpen, triggerRef } = useDropdownMenu();

        // Use the forwarded ref if provided, otherwise use the context ref
        const ref = React.useRef<HTMLElement>(null);
        const actualRef = forwardedRef || triggerRef;

        React.useImperativeHandle(actualRef, () => ref.current as HTMLElement);

        const handleClick = () => {
            setIsOpen(!isOpen);
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsOpen(!isOpen);
            }
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, {
                ref: (node: HTMLElement) => {
                    ref.current = node;
                    if (typeof actualRef === "function") {
                        actualRef(node);
                    } else if (actualRef) {
                        actualRef.current = node;
                    }
                },
                onClick: handleClick,
                onKeyDown: handleKeyDown,
                "aria-expanded": isOpen,
                "aria-haspopup": "menu",
                ...props,
            } as React.HTMLAttributes<HTMLElement>);
        }

        return (
            <button
                ref={(node) => {
                    ref.current = node;
                    if (typeof actualRef === "function") {
                        actualRef(node);
                    } else if (actualRef) {
                        actualRef.current = node;
                    }
                }}
                type="button"
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                {...props}
            >
                {children}
            </button>
        );
    },
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
    ({ align = "bottom-start", className, children, ...props }, ref) => {
        const { isOpen, triggerRef } = useDropdownMenu();
        const contentRef = useRef<HTMLDivElement>(null);
        const [actualAlign, setActualAlign] = useState(align);

        useEffect(() => {
            if (isOpen && contentRef.current && triggerRef.current) {
                // Use requestAnimationFrame to ensure content is fully rendered before calculating position
                requestAnimationFrame(() => {
                    if (contentRef.current && triggerRef.current) {
                        const contentRect = contentRef.current.getBoundingClientRect();
                        const triggerRect = triggerRef.current.getBoundingClientRect();
                        const viewportWidth = window.innerWidth;
                        const viewportHeight = window.innerHeight;

                        // Calculate available space for each alignment
                        const alignments = [
                            {
                                align: "bottom-start" as const,
                                space: {
                                    top: viewportHeight - triggerRect.bottom,
                                    left: triggerRect.left,
                                    right: viewportWidth - triggerRect.left,
                                },
                            },
                            {
                                align: "bottom-end" as const,
                                space: {
                                    top: viewportHeight - triggerRect.bottom,
                                    left: viewportWidth - triggerRect.right,
                                    right: triggerRect.right,
                                },
                            },
                            {
                                align: "top-start" as const,
                                space: {
                                    top: triggerRect.top,
                                    left: triggerRect.left,
                                    right: viewportWidth - triggerRect.left,
                                },
                            },
                            {
                                align: "top-end" as const,
                                space: {
                                    top: triggerRect.top,
                                    left: viewportWidth - triggerRect.right,
                                    right: triggerRect.right,
                                },
                            },
                        ];

                        // Find the best alignment that fits
                        let bestAlign = align;
                        let maxVisibleArea = 0;

                        for (const { align: testAlign, space } of alignments) {
                            const requiredWidth = contentRect.width;
                            const requiredHeight = contentRect.height;

                            const fitsHorizontally =
                                space.left >= requiredWidth || space.right >= requiredWidth;
                            const fitsVertically = space.top >= requiredHeight;

                            if (fitsHorizontally && fitsVertically) {
                                // Calculate visible area for this alignment
                                const visibleWidth = Math.min(
                                    requiredWidth,
                                    space.left + space.right,
                                );
                                const visibleHeight = Math.min(requiredHeight, space.top);
                                const visibleArea = visibleWidth * visibleHeight;

                                if (visibleArea > maxVisibleArea) {
                                    maxVisibleArea = visibleArea;
                                    bestAlign = testAlign;
                                }
                            }
                        }

                        setActualAlign(bestAlign);
                    }
                });
            }
        }, [isOpen, align, children, triggerRef]);

        const getPositionStyles = () => {
            const offset = 4; // 4px gap from trigger

            switch (actualAlign) {
                case "bottom-start":
                    return {
                        top: "100%",
                        left: 0,
                        marginTop: `${offset}px`,
                        transform: "translateY(0)",
                    };
                case "bottom-end":
                    return {
                        top: "100%",
                        right: 0,
                        marginTop: `${offset}px`,
                        transform: "translateY(0)",
                    };
                case "top-start":
                    return {
                        bottom: "100%",
                        left: 0,
                        marginBottom: `${offset}px`,
                        transform: "translateY(0)",
                    };
                case "top-end":
                    return {
                        bottom: "100%",
                        right: 0,
                        marginBottom: `${offset}px`,
                        transform: "translateY(0)",
                    };
                default:
                    return {};
            }
        };

        if (!isOpen) return null;

        return (
            <div
                ref={(node) => {
                    contentRef.current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                }}
                className={cn(contentBase, contentAnimation, "absolute", className)}
                data-dropdown-menu-content
                role="menu"
                style={getPositionStyles()}
                {...props}
            >
                {children}
            </div>
        );
    },
);

DropdownMenuContent.displayName = "DropdownMenuContent";

// DropdownMenuItem component
export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
    ({ className, disabled = false, onSelect, children, ...props }, ref) => {
        const { setIsOpen } = useDropdownMenu();

        const handleClick = () => {
            if (!disabled) {
                onSelect?.();
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleClick();
            }
        };

        return (
            <button
                ref={ref}
                type="button"
                className={cn(itemBase, className)}
                disabled={disabled}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role="menuitem"
                {...props}
            >
                {children}
            </button>
        );
    },
);

DropdownMenuItem.displayName = "DropdownMenuItem";

// DropdownMenuLabel component
export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ className, ...props }) => {
    return <div className={cn(labelBase, className)} role="group" {...props} />;
};

// DropdownMenuSeparator component
export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
    className,
    ...props
}) => {
    return <div className={cn(separatorBase, className)} role="separator" {...props} />;
};

// DropdownMenuGroup component
export const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({ className, ...props }) => {
    return <div className={cn(className)} role="group" {...props} />;
};
