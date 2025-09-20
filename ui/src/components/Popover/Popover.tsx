import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn, tw } from "../../lib/utils";

// Popover Context
interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  trigger: "click" | "hover" | "focus";
}

const PopoverContext = createContext<PopoverContextType | null>(null);

const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
};

// Base styles
const contentBase = tw`z-50 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-lg`;

// Animation classes
const contentAnimationIn = tw`animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 ease-out`;
const contentAnimationOut = tw`animate-out fade-out-0 zoom-out-95 slide-out-to-top-2 duration-150 ease-in`;

export interface PopoverProps {
  /**
   * Popover content
   */
  children: React.ReactNode;
  /**
   * Whether the popover is open (controlled)
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
  /**
   * How the popover is triggered
   * @default "click"
   */
  trigger?: "click" | "hover" | "focus";
}

export interface PopoverTriggerProps {
  /**
   * Trigger element content
   */
  children: React.ReactNode;
  /**
   * Additional props for the trigger element
   */
  asChild?: boolean;
}

export interface PopoverContentProps {
  /**
   * Content alignment relative to trigger
   * @default "bottom-start"
   */
  align?:
    | "bottom-start"
    | "bottom-center"
    | "bottom-end"
    | "top-start"
    | "top-center"
    | "top-end"
    | "left"
    | "right";
  /**
   * Content to display in the popover
   */
  children: React.ReactNode;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Whether clicking inside the popover should close it
   * @default false
   */
  closeOnClick?: boolean;
  /**
   * Offset from trigger element in pixels
   * @default 8
   */
  offset?: number;
  /**
   * Whether to automatically adjust position based on available viewport space
   * @default true
   */
  autoPosition?: boolean;
}

// Popover main component
export const Popover: React.FC<PopoverProps> = ({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = "click",
}) => {
  const [isOpen, setIsOpen] = useState(open ?? defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (open === undefined) {
        setIsOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [open, onOpenChange]
  );

  // Update controlled state
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  // Close on outside click (for click trigger)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trigger === "click" &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("[data-popover-content]")
      ) {
        handleOpenChange(false);
      }
    };

    if (isOpen && trigger === "click") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, handleOpenChange, trigger]);

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

  // Cleanup timeout on unmount
  useEffect(() => {
    const currentTimeout = timeoutRef.current;
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, []);

  const contextValue: PopoverContextType = {
    isOpen,
    setIsOpen: handleOpenChange,
    triggerRef,
    trigger,
  };

  return (
    <div className='relative'>
      <PopoverContext.Provider value={contextValue}>{children}</PopoverContext.Provider>
    </div>
  );
};

// PopoverTrigger component
export const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ children, asChild = false, ...props }, forwardedRef) => {
    const { isOpen, setIsOpen, triggerRef, trigger } = usePopover();

    // Use the forwarded ref if provided, otherwise use the context ref
    const ref = React.useRef<HTMLElement>(null);
    const actualRef = forwardedRef || triggerRef;

    React.useImperativeHandle(actualRef, () => ref.current as HTMLElement);

    const handleClick = () => {
      if (trigger === "click") {
        setIsOpen(!isOpen);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (trigger === "click" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    const handleMouseEnter = () => {
      if (trigger === "hover") {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (trigger === "hover") {
        setIsOpen(false);
      }
    };

    const handleFocus = () => {
      if (trigger === "focus") {
        setIsOpen(true);
      }
    };

    const handleBlur = (event: React.FocusEvent) => {
      if (trigger === "focus") {
        // Add a small delay to allow focus to move to popover content
        setTimeout(() => {
          const relatedTarget = event.relatedTarget as Element;
          const activeElement = document.activeElement as Element;

          // Don't close if focus is on popover content or moving to it
          if (
            !relatedTarget?.closest("[data-popover-content]") &&
            !activeElement?.closest("[data-popover-content]")
          ) {
            setIsOpen(false);
          }
        }, 10);
      }
    };

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as React.HTMLAttributes<HTMLElement>;
      const existingStyle = childProps.style || {};
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
        ...(trigger === "hover" && {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }),
        ...(trigger === "focus" && {
          onFocus: handleFocus,
          onBlur: handleBlur,
        }),
        "aria-expanded": isOpen,
        "aria-haspopup": "dialog",
        style: { position: "relative", ...existingStyle },
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <button
        ref={node => {
          ref.current = node;
          if (typeof actualRef === "function") {
            actualRef(node);
          } else if (actualRef) {
            actualRef.current = node;
          }
        }}
        type='button'
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...(trigger === "hover" && {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        })}
        {...(trigger === "focus" && {
          onFocus: handleFocus,
          onBlur: handleBlur,
        })}
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        style={{ position: "relative" }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      align = "bottom-start",
      className,
      children,
      closeOnClick = false,
      offset = 8,
      autoPosition = true,
      ...props
    },
    ref
  ) => {
    const { isOpen, triggerRef, setIsOpen, trigger } = usePopover();
    const contentRef = useRef<HTMLDivElement>(null);
    const [actualAlign, setActualAlign] = useState(align);
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);

    // Handle opening and closing animations
    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        setIsClosing(false);
      } else if (shouldRender) {
        setIsClosing(true);
        // Remove the element after animation completes
        const timeout = setTimeout(() => {
          setShouldRender(false);
          setIsClosing(false);
        }, 150); // Match the animation duration
        return () => clearTimeout(timeout);
      }
    }, [isOpen, shouldRender]);

    useEffect(() => {
      if (isOpen && contentRef.current && triggerRef.current && autoPosition) {
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
                  vertical: viewportHeight - triggerRect.bottom,
                  horizontal: viewportWidth - triggerRect.left,
                },
              },
              {
                align: "bottom-center" as const,
                space: {
                  vertical: viewportHeight - triggerRect.bottom,
                  horizontal:
                    Math.min(
                      triggerRect.left + triggerRect.width / 2,
                      viewportWidth - (triggerRect.left + triggerRect.width / 2)
                    ) * 2,
                },
              },
              {
                align: "bottom-end" as const,
                space: {
                  vertical: viewportHeight - triggerRect.bottom,
                  horizontal: triggerRect.right,
                },
              },
              {
                align: "top-start" as const,
                space: {
                  vertical: triggerRect.top,
                  horizontal: viewportWidth - triggerRect.left,
                },
              },
              {
                align: "top-center" as const,
                space: {
                  vertical: triggerRect.top,
                  horizontal:
                    Math.min(
                      triggerRect.left + triggerRect.width / 2,
                      viewportWidth - (triggerRect.left + triggerRect.width / 2)
                    ) * 2,
                },
              },
              {
                align: "top-end" as const,
                space: {
                  vertical: triggerRect.top,
                  horizontal: triggerRect.right,
                },
              },
              {
                align: "left" as const,
                space: {
                  vertical: Math.max(triggerRect.top, viewportHeight - triggerRect.bottom),
                  horizontal: triggerRect.left,
                },
              },
              {
                align: "right" as const,
                space: {
                  vertical: Math.max(triggerRect.top, viewportHeight - triggerRect.bottom),
                  horizontal: viewportWidth - triggerRect.right,
                },
              },
            ];

            // Find the best alignment that fits
            let bestAlign = align;
            let maxVisibleArea = 0;

            for (const { align: testAlign, space } of alignments) {
              const requiredWidth = contentRect.width;
              const requiredHeight = contentRect.height;

              const fitsHorizontally = space.horizontal >= requiredWidth;
              const fitsVertically = space.vertical >= requiredHeight;

              if (fitsHorizontally && fitsVertically) {
                const visibleArea = space.horizontal * space.vertical;
                if (visibleArea > maxVisibleArea) {
                  maxVisibleArea = visibleArea;
                  bestAlign = testAlign;
                }
              }
            }

            setActualAlign(bestAlign);
          }
        });
      } else if (!autoPosition) {
        setActualAlign(align);
      }
    }, [isOpen, align, children, triggerRef, autoPosition]);

    const getPositionStyles = (): React.CSSProperties => {
      if (!triggerRef.current) return {};

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const containerRect = triggerRef.current.parentElement?.getBoundingClientRect();

      if (!containerRect) return {};

      // Calculate trigger position relative to container
      const triggerLeft = triggerRect.left - containerRect.left;
      const triggerTop = triggerRect.top - containerRect.top;
      const triggerWidth = triggerRect.width;
      const triggerHeight = triggerRect.height;

      switch (actualAlign) {
        case "bottom-start":
          return {
            position: "absolute",
            left: `${triggerLeft}px`,
            top: `${triggerTop + triggerHeight + offset}px`,
          };
        case "bottom-center":
          return {
            position: "absolute",
            left: `${triggerLeft + triggerWidth / 2}px`,
            top: `${triggerTop + triggerHeight + offset}px`,
            transform: "translateX(-50%)",
          };
        case "bottom-end":
          return {
            position: "absolute",
            left: `${triggerLeft + triggerWidth}px`,
            top: `${triggerTop + triggerHeight + offset}px`,
            transform: "translateX(-100%)",
          };
        case "top-start":
          return {
            position: "absolute",
            left: `${triggerLeft}px`,
            top: `${triggerTop - offset}px`,
            transform: "translateY(-100%)",
          };
        case "top-center":
          return {
            position: "absolute",
            left: `${triggerLeft + triggerWidth / 2}px`,
            top: `${triggerTop - offset}px`,
            transform: "translateX(-50%) translateY(-100%)",
          };
        case "top-end":
          return {
            position: "absolute",
            left: `${triggerLeft + triggerWidth}px`,
            top: `${triggerTop - offset}px`,
            transform: "translateX(-100%) translateY(-100%)",
          };
        case "left":
          return {
            position: "absolute",
            left: `${triggerLeft - offset}px`,
            top: `${triggerTop + triggerHeight / 2}px`,
            transform: "translateX(-100%) translateY(-50%)",
          };
        case "right":
          return {
            position: "absolute",
            left: `${triggerLeft + triggerWidth + offset}px`,
            top: `${triggerTop + triggerHeight / 2}px`,
            transform: "translateY(-50%)",
          };
        default:
          return {};
      }
    };

    const handleContentClick = () => {
      if (closeOnClick) {
        setIsOpen(false);
      }
    };

    const handleContentFocus = () => {
      // Keep popover open when content receives focus for focus trigger
    };

    const handleContentBlur = () => {
      if (trigger === "focus") {
        // Check if focus is moving back to trigger or staying within popover
        setTimeout(() => {
          const activeElement = document.activeElement as Element;
          const triggerElement = triggerRef.current;

          if (
            !activeElement?.closest("[data-popover-content]") &&
            activeElement !== triggerElement
          ) {
            setIsOpen(false);
          }
        }, 10);
      }
    };
    if (!shouldRender) {
      return null;
    }

    if (!shouldRender) return null;

    const animationClass = isClosing ? contentAnimationOut : contentAnimationIn;

    return (
      <div
        ref={node => {
          contentRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(contentBase, animationClass, className)}
        data-popover-content
        role='dialog'
        style={getPositionStyles()}
        onClick={handleContentClick}
        onFocus={handleContentFocus}
        onBlur={handleContentBlur}
        tabIndex={trigger === "focus" ? 0 : -1}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = "PopoverContent";
