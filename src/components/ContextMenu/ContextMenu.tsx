import React, { useState, useRef, useEffect, useContext, createContext } from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";
import { createPortal } from "react-dom";

// ContextMenu Context
interface ContextMenuContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    position: { x: number; y: number };
    setPosition: (position: { x: number; y: number }) => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

const useContextMenu = () => {
    const context = useContext(ContextMenuContext);
    if (!context) {
        throw new Error("ContextMenu components must be used within a ContextMenu");
    }
    return context;
};

// Base styles (same as Dropdown)
const contentBase = tw`z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg`;
const itemBase = tw`relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm !text-gray-900 transition-colors outline-none select-none hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 disabled:pointer-events-none disabled:opacity-50`;
const labelBase = tw`px-2 py-1.5 text-sm font-semibold text-gray-900`;
const separatorBase = tw`-mx-1 my-1 h-px bg-gray-200`;

// Animation classes
const contentAnimation = tw`animate-in fade-in-0 zoom-in-95 duration-150 ease-out`;

export interface ContextMenuProps {
    /**
     * Context menu content
     */
    children: React.ReactNode;
    /**
     * Whether the context menu is open (controlled)
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

export interface ContextMenuTriggerProps {
    /**
     * Trigger element content
     */
    children: React.ReactNode;
    /**
     * Whether to disable the context menu
     */
    disabled?: boolean;
}

export interface ContextMenuContentProps {
    /**
     * Content to display in the context menu
     */
    children: React.ReactNode;
    /**
     * Custom class name
     */
    className?: string;
}

export interface ContextMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

export interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Label text
     */
    children: React.ReactNode;
}

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Custom class name
     */
    className?: string;
}

export interface ContextMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Group content
     */
    children: React.ReactNode;
}

// ContextMenu main component
export const ContextMenu: React.FC<ContextMenuProps> = ({
    children,
    open,
    defaultOpen = false,
    onOpenChange,
}) => {
    const [isOpen, setIsOpen] = useState(open ?? defaultOpen);
    const [position, setPosition] = useState({ x: 0, y: 0 });

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

    // Close on outside click or escape
    useEffect(() => {
        const handleClickOutside = () => {
            handleOpenChange(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleOpenChange(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isOpen, handleOpenChange]);

    const contextValue: ContextMenuContextType = {
        isOpen,
        setIsOpen: handleOpenChange,
        position,
        setPosition,
    };

    return (
        <ContextMenuContext.Provider value={contextValue}>{children}</ContextMenuContext.Provider>
    );
};

// ContextMenuTrigger component
export const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
    ({ children, disabled = false, ...props }, ref) => {
        const { setIsOpen, setPosition } = useContextMenu();

        const handleContextMenu = (event: React.MouseEvent) => {
            if (disabled) return;

            event.preventDefault();
            event.stopPropagation();

            const x = event.clientX;
            const y = event.clientY;

            setPosition({ x, y });
            setIsOpen(true);
        };

        return (
            <div ref={ref} onContextMenu={handleContextMenu} {...props}>
                {children}
            </div>
        );
    },
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";

// ContextMenuContent component
export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
    ({ className, children, ...props }, ref) => {
        const { isOpen, position } = useContextMenu();
        const contentRef = useRef<HTMLDivElement>(null);
        const [isVisible, setIsVisible] = useState(false);
        const [finalPosition, setFinalPosition] = useState({ x: 0, y: 0 });

        useEffect(() => {
            if (isOpen) {
                setIsVisible(false);

                // Use double requestAnimationFrame to ensure content is fully rendered
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (contentRef.current) {
                            const contentRect = contentRef.current.getBoundingClientRect();
                            const viewportWidth = window.innerWidth;
                            const viewportHeight = window.innerHeight;

                            let x = position.x;
                            let y = position.y;

                            // Adjust horizontal position if needed
                            if (x + contentRect.width > viewportWidth) {
                                x = viewportWidth - contentRect.width - 8; // 8px margin from edge
                            }

                            // Adjust vertical position if needed
                            if (y + contentRect.height > viewportHeight) {
                                y = viewportHeight - contentRect.height - 8; // 8px margin from edge
                            }

                            // Ensure minimum margins from edges
                            x = Math.max(8, x);
                            y = Math.max(8, y);

                            setFinalPosition({ x, y });
                            setIsVisible(true);
                        }
                    });
                });
            } else {
                setIsVisible(false);
            }
        }, [isOpen, position]);

        if (!isOpen) return null;

        // Render off-screen first to measure, then position correctly
        return createPortal(
            <>
                {/* Hidden measurement element */}
                <div
                    ref={contentRef}
                    className={cn(contentBase, "fixed", className)}
                    style={{
                        left: "-9999px",
                        top: "-9999px",
                        visibility: "hidden",
                        pointerEvents: "none",
                    }}
                    data-context-menu-measure
                >
                    {children}
                </div>

                {/* Visible positioned element */}
                {isVisible && (
                    <div
                        ref={(node) => {
                            if (typeof ref === "function") ref(node);
                            else if (ref) ref.current = node;
                        }}
                        className={cn(contentBase, contentAnimation, "fixed", className)}
                        data-context-menu-content
                        role="menu"
                        style={{
                            left: finalPosition.x,
                            top: finalPosition.y,
                        }}
                        {...props}
                    >
                        {children}
                    </div>
                )}
            </>,
            document.body,
        );
    },
);

ContextMenuContent.displayName = "ContextMenuContent";

// ContextMenuItem component
export const ContextMenuItem = React.forwardRef<HTMLButtonElement, ContextMenuItemProps>(
    ({ className, disabled = false, onSelect, children, ...props }, ref) => {
        const { setIsOpen } = useContextMenu();

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

ContextMenuItem.displayName = "ContextMenuItem";

// ContextMenuLabel component
export const ContextMenuLabel: React.FC<ContextMenuLabelProps> = ({ className, ...props }) => {
    return <div className={cn(labelBase, className)} role="group" {...props} />;
};

// ContextMenuSeparator component
export const ContextMenuSeparator: React.FC<ContextMenuSeparatorProps> = ({
    className,
    ...props
}) => {
    return <div className={cn(separatorBase, className)} role="separator" {...props} />;
};

// ContextMenuGroup component
export const ContextMenuGroup: React.FC<ContextMenuGroupProps> = ({ className, ...props }) => {
    return <div className={cn(className)} role="group" {...props} />;
};
