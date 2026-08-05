import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { cn, tw } from "../../lib/utils";

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Callback when modal should close
   */
  onClose: () => void;
  /**
   * The visual style of the modal
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the modal
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Control the border radius of the modal
   * @default "lg"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Enable/disable animations
   * @default true
   */
  animation?: boolean;
  /**
   * Prevent closing when clicking outside the modal
   * @default false
   */
  preventClose?: boolean;
  /**
   * Hide the close button
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * Modal title displayed in the header
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
   * Main modal content
   */
  children: React.ReactNode;
  /**
   * Custom class name for the modal container
   */
  className?: string;
  /**
   * Custom class name for the overlay
   */
  overlayClassName?: string;
  /**
   * ID for the modal element
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
const overlayBase = tw`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm`;
const modalBase = tw`relative max-h-[85vh] w-full overflow-hidden bg-card text-card-foreground shadow-2xl border border-border outline-none`;
const headerBase = tw`flex items-center justify-between border-b border-border px-4 py-3`;
const bodyBase = tw`flex-1 overflow-y-auto p-4 text-sm text-foreground/90`;
const footerBase = tw`flex items-center justify-end gap-2.5 border-t border-border bg-muted/30 px-4 py-3`;
const closeButtonBase = tw`rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground rui-focus-ring focus:outline-none`;

// Variants
const variants = {
  primary: tw`border border-border`,
  secondary: tw`border border-border bg-muted/20`,
};

// Sizes
const sizes = {
  sm: tw`max-w-sm`,
  md: tw`max-w-md`,
  lg: tw`max-w-lg`,
  xl: tw`max-w-xl`,
  full: tw`mx-4 max-w-none sm:mx-8 md:mx-16`,
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
  exit: tw`animate-out fade-out-0 duration-200 ease-in`,
};

const modalAnimations = {
  enter: tw`animate-in fade-in-0 zoom-in-95 duration-200 ease-out`,
  exit: tw`animate-out fade-out-0 zoom-out-95 duration-200 ease-in`,
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      variant = "primary",
      size = "md",
      rounded = "sm",
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
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    const autoId = React.useId();
    const modalId = id ?? autoId;
    const titleId = `${modalId}-title`;
    const descId = `${modalId}-description`;

    // Focus management
    useEffect(() => {
      if (open) {
        // Store the previously focused element
        previousFocusRef.current = document.activeElement as HTMLElement;

        // Focus the modal container
        setTimeout(() => {
          modalRef.current?.focus();
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

    // Prevent body scroll when modal is open
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
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0] as HTMLElement;
        const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

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

    // Support exit animations without flicker by tracking prevOpen and using fill-mode forwards
    const [isMounted, setIsMounted] = useState(open);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const prevOpenRef = useRef(open);

    useEffect(() => {
      if (open) {
        setIsMounted(true);
        setIsAnimatingOut(false);
      } else if (prevOpenRef.current && animation) {
        setIsAnimatingOut(true);
        const t = setTimeout(() => {
          setIsMounted(false);
          setIsAnimatingOut(false);
        }, 210);
        return () => clearTimeout(t);
      } else {
        setIsMounted(false);
        setIsAnimatingOut(false);
      }
      prevOpenRef.current = open;
    }, [open, animation]);

    if (!isMounted) return null;

    const modalClasses = cn(
      modalBase,
      variants[variant],
      sizes[size],
      roundedOptions[rounded],
      animation && (isAnimatingOut ? modalAnimations.exit : modalAnimations.enter),
      className
    );

    const overlayClasses = cn(
      overlayBase,
      animation && (isAnimatingOut ? overlayAnimations.exit : overlayAnimations.enter),
      overlayClassName
    );

    const modalContent = (
      <div
        className={overlayClasses}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || (title ? titleId : undefined)}
        aria-describedby={ariaDescribedBy || descId}
        style={{ animationFillMode: "forwards" }}
      >
        <div
          ref={ref || modalRef}
          className={modalClasses}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          id={modalId}
          style={{ animationFillMode: "forwards" }}
          {...props}
        >
          {/* Header */}
          {(header || title || !hideCloseButton) && (
            <div className={headerBase}>
              <div className="min-w-0 flex-1">
                {header ||
                  (title && (
                    <h2 id={titleId} className="text-foreground truncate text-lg font-semibold">
                      {title}
                    </h2>
                  ))}
              </div>
              {!hideCloseButton && (
                <button
                  type="button"
                  className={closeButtonBase}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <IoClose className="h-5 w-5" />
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

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = "Modal";
