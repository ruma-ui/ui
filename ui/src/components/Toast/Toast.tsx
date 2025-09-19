import React, { useEffect, useState, useRef, createContext, useContext, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@ruma-ui/utils";
import { tw } from "@ruma-ui/utils";

export interface ToastProps {
  /**
   * Whether the toast is visible
   */
  open: boolean;
  /**
   * Callback when toast should close
   */
  onClose: () => void;
  /**
   * The type of toast which determines the visual style and icon
   * @default "info"
   */
  variant?: "success" | "error" | "warning" | "info";
  /**
   * The position of the toast on screen
   * @default "top-right"
   */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  /**
   * The size of the toast
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Auto-dismiss duration in milliseconds. Set to 0 to disable auto-dismiss
   * @default 5000
   */
  duration?: number;
  /**
   * Custom icon to display instead of default variant icon
   */
  icon?: React.ReactNode;
  /**
   * Toast title
   */
  title?: string;
  /**
   * Toast description/content
   */
  description?: string;
  /**
   * Toast content (alternative to title/description)
   */
  children?: React.ReactNode;
  /**
   * Show close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Enable/disable animations
   * @default true
   */
  animation?: boolean;
  /**
   * Custom class name for the toast container
   */
  className?: string;
  /**
   * ID for the toast element
   */
  id?: string;
  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;
}

// Base styles
const toastBase = tw`relative flex max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg ring-1 ring-gray-200 outline-none`;
const contentBase = tw`min-w-0 flex-1`;
const titleBase = tw`text-sm font-semibold break-words`;
const descriptionBase = tw`text-sm break-words`;
const closeButtonBase = tw`flex shrink-0 items-center justify-center rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`;

// Variants
const variants = {
  success: tw`border-green-200 bg-green-50 text-green-800 ring-green-200`,
  error: tw`border-red-200 bg-red-50 text-red-800 ring-red-200`,
  warning: tw`border-yellow-200 bg-yellow-50 text-yellow-800 ring-yellow-200`,
  info: tw`border-blue-200 bg-blue-50 text-blue-800 ring-blue-200`,
};

// Sizes
const sizes = {
  sm: tw`gap-2 p-3`,
  md: tw`gap-3 p-4`,
  lg: tw`gap-4 p-5`,
};

// Positions
const positions = {
  "top-left": tw`top-4 left-4`,
  "top-center": tw`top-4 left-1/2 -translate-x-1/2`,
  "top-right": tw`top-4 right-4`,
  "bottom-left": tw`bottom-4 left-4`,
  "bottom-center": tw`bottom-4 left-1/2 -translate-x-1/2`,
  "bottom-right": tw`right-4 bottom-4`,
};

// Animation classes
const toastAnimations = {
  enter: tw`animate-in fade-in-0 slide-in-from-top-2 duration-300 ease-out`,
  exit: tw`animate-out fade-out-0 slide-out-to-top-2 duration-200 ease-in`,
};

// Default icons for variants
const variantIcons = {
  success: (
    <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
    </svg>
  ),
  error: (
    <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  ),
  warning: (
    <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
      />
    </svg>
  ),
  info: (
    <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  ),
};

// Close icon component
const CloseIcon = () => (
  <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
  </svg>
);

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      open,
      onClose,
      variant = "info",
      position = "top-right",
      size = "md",
      duration = 5000,
      icon,
      title,
      description,
      children,
      showCloseButton = true,
      animation = true,
      className = "",
      id,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const toastRef = useRef<HTMLDivElement>(null);
    const autoDismissRef = useRef<NodeJS.Timeout | null>(null);

    const autoId = React.useId();
    const toastId = id ?? autoId;
    const titleId = `${toastId}-title`;
    const descId = `${toastId}-description`;

    // Auto-dismiss functionality
    useEffect(() => {
      if (open && duration > 0) {
        autoDismissRef.current = setTimeout(() => {
          onClose();
        }, duration);
      }

      return () => {
        if (autoDismissRef.current) {
          clearTimeout(autoDismissRef.current);
        }
      };
    }, [open, duration, onClose]);

    // Clear auto-dismiss on hover
    const handleMouseEnter = () => {
      if (autoDismissRef.current) {
        clearTimeout(autoDismissRef.current);
      }
    };

    // Restart auto-dismiss on mouse leave
    const handleMouseLeave = () => {
      if (open && duration > 0) {
        autoDismissRef.current = setTimeout(() => {
          onClose();
        }, duration);
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
        }, 210); // match duration-200 + small buffer
        return () => clearTimeout(t);
      } else {
        setIsMounted(false);
      }
    }, [open, animation]);

    if (!isMounted) return null;

    const toastClasses = cn(
      toastBase,
      variants[variant],
      sizes[size],
      animation && (isAnimatingOut ? toastAnimations.exit : toastAnimations.enter),
      className
    );

    const toastContent = (
      <div
        ref={ref || toastRef}
        className={toastClasses}
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
        aria-label={ariaLabel}
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description || children ? descId : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={toastId}
        {...props}
      >
        {/* Icon */}
        <div className='flex shrink-0 items-center'>{icon || variantIcons[variant]}</div>

        {/* Content */}
        <div className={contentBase}>
          {children ? (
            <div id={descId} className='break-words'>
              {children}
            </div>
          ) : (
            <>
              {title && (
                <div id={titleId} className={titleBase}>
                  {title}
                </div>
              )}
              {description && (
                <div id={descId} className={cn(descriptionBase, title && "mt-1")}>
                  {description}
                </div>
              )}
            </>
          )}
        </div>

        {/* Close button */}
        {showCloseButton && (
          <button
            type='button'
            className={closeButtonBase}
            onClick={onClose}
            aria-label='Close notification'
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );

    // Position the toast using a portal
    const positionClasses = cn("pointer-events-auto fixed z-50", positions[position]);

    return createPortal(<div className={positionClasses}>{toastContent}</div>, document.body);
  }
);

Toast.displayName = "Toast";

// Toast context and hook

export interface ToastItem {
  id: string;
  open: boolean;
  variant?: "success" | "error" | "warning" | "info";
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  size?: "sm" | "md" | "lg";
  duration?: number;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  animation?: boolean;
  className?: string;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id" | "open">) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, updates: Partial<ToastItem>) => void;
  success: (
    title: string,
    description?: string,
    options?: Partial<Omit<ToastItem, "id" | "open" | "variant" | "title" | "description">>
  ) => string;
  error: (
    title: string,
    description?: string,
    options?: Partial<Omit<ToastItem, "id" | "open" | "variant" | "title" | "description">>
  ) => string;
  warning: (
    title: string,
    description?: string,
    options?: Partial<Omit<ToastItem, "id" | "open" | "variant" | "title" | "description">>
  ) => string;
  info: (
    title: string,
    description?: string,
    options?: Partial<Omit<ToastItem, "id" | "open" | "variant" | "title" | "description">>
  ) => string;
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
    options?: Partial<Omit<ToastItem, "id" | "open" | "title" | "description">>
  ) => Promise<T>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, "id" | "open">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      ...toast,
      id,
      open: true,
    };
    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.map(toast => (toast.id === id ? { ...toast, open: false } : toast)));
    // Remove from state after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<ToastItem>) => {
    setToasts(prev => prev.map(toast => (toast.id === id ? { ...toast, ...updates } : toast)));
  }, []);

  const success = useCallback(
    (
      title: string,
      description?: string,
      options?: Partial<Omit<ToastItem, "id" | "open" | "variant" | "title" | "description">>
    ) => {
      return addToast({
        variant: "success",
        title,
        description,
        ...options,
      });
    },
    [addToast]
  );

  const error = useCallback(
    (
      title: string,
      description?: string,
      options?: Partial<Omit<ToastItem, "id" | "open" | "variant" | "title" | "description">>
    ) => {
      return addToast({
        variant: "error",
        title,
        description,
        ...options,
      });
    },
    [addToast]
  );

  const warning = useCallback(
    (
      title: string,
      description?: string,
      options?: Partial<Omit<ToastItem, "id" | "open" | "variant" | "title" | "description">>
    ) => {
      return addToast({
        variant: "warning",
        title,
        description,
        ...options,
      });
    },
    [addToast]
  );

  const info = useCallback(
    (
      title: string,
      description?: string,
      options?: Partial<Omit<ToastItem, "id" | "open" | "variant" | "title" | "description">>
    ) => {
      return addToast({
        variant: "info",
        title,
        description,
        ...options,
      });
    },
    [addToast]
  );

  const promise = useCallback(
    async <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: unknown) => string);
      },
      options?: Partial<Omit<ToastItem, "id" | "open" | "title" | "description">>
    ): Promise<T> => {
      const id = addToast({
        variant: "info",
        title: messages.loading,
        ...options,
      });

      try {
        const data = await promise;
        const successMessage =
          typeof messages.success === "function" ? messages.success(data) : messages.success;
        updateToast(id, {
          variant: "success",
          title: successMessage,
        });
        return data;
      } catch (error) {
        const errorMessage =
          typeof messages.error === "function" ? messages.error(error) : messages.error;
        updateToast(id, {
          variant: "error",
          title: errorMessage,
        });
        throw error;
      }
    },
    [addToast, updateToast]
  );

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    updateToast,
    success,
    error,
    warning,
    info,
    promise,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          open={toast.open}
          onClose={() => removeToast(toast.id)}
          variant={toast.variant}
          position={toast.position}
          size={toast.size}
          duration={toast.duration}
          icon={toast.icon}
          title={toast.title}
          description={toast.description}
          showCloseButton={toast.showCloseButton}
          animation={toast.animation}
          className={toast.className}
        >
          {toast.children}
        </Toast>
      ))}
    </ToastContext.Provider>
  );
};
