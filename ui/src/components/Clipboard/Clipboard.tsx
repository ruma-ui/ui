import React from "react";
import { cn } from "@ruma-ui/utils";
import { tw } from "@ruma-ui/utils";
import { FaCopy } from "react-icons/fa";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { Tooltip } from "../../";

export interface ClipboardProps {
  /**
   * The text content to copy to clipboard
   */
  value: string;
  /**
   * The visual style of the clipboard trigger
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /**
   * The size of the clipboard trigger
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Show only the icon without text
   * @default true
   */
  iconOnly?: boolean;
  /**
   * Tooltip content to show on hover
   * @default "Copy to clipboard"
   */
  tooltip?: string;
  /**
   * Show visual feedback when text is copied
   * @default true
   */
  showFeedback?: boolean;
  /**
   * Custom feedback text to display
   * @default "Copied!"
   */
  feedbackText?: string;
  /**
   * Duration in milliseconds to show feedback
   * @default 2000
   */
  feedbackDuration?: number;
  /**
   * Callback fired when text is successfully copied
   */
  onCopy?: (value: string) => void;
  /**
   * Callback fired when copy fails
   */
  onError?: (error: Error) => void;
  /**
   * Disable the clipboard functionality
   * @default false
   */
  disabled?: boolean;
  /**
   * Animation effect on user interaction
   * @default "none"
   */
  animation?: "none" | "scale" | "glow" | "press";
  /**
   * Control the border radius
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Additional CSS classes
   */
  className?: string;
}

const base = tw`relative inline-flex transform-gpu cursor-pointer items-center justify-center transition-all duration-200 select-none focus:outline-none disabled:pointer-events-none disabled:opacity-50`;

const variants = {
  primary: tw`focus:ring-opacity-50 bg-blue-600 p-2 text-white shadow-sm hover:bg-blue-500 hover:shadow-md`,
  secondary: tw`focus:ring-opacity-50 bg-gray-200 p-2 text-black shadow-sm hover:bg-gray-200/80 hover:shadow-md`,
  outline: tw`focus:ring-opacity-50 border border-blue-600 bg-transparent p-2 text-blue-600 hover:bg-blue-50`,
  ghost: tw`focus:ring-opacity-50 bg-transparent p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900`,
};

const sizes = {
  sm: tw`text-sm`,
  md: tw`text-base`,
  lg: tw`text-lg`,
};

// Modified animations to work better with state changes
const animations = {
  none: tw``,
  scale: tw`transition-transform duration-150 ease-out hover:scale-105 active:scale-95`,
  glow: tw`transition-shadow duration-200 ease-out hover:shadow-lg hover:shadow-blue-500/25`,
  press: tw`transition-transform duration-200 ease-out active:scale-95`,
};

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

// Helper function to get color classes based on variant and copied state
const getColorClass = (variant: string, isCopied: boolean, showFeedback: boolean) => {
  // For outline variant, text should be white when copied
  if (variant === "outline" && isCopied && showFeedback) {
    return "text-white";
  }

  // Default colors for each variant
  switch (variant) {
    case "primary":
      return "text-white";
    case "secondary":
      return "text-black";
    case "outline":
      return "text-blue-600";
    case "ghost":
      return "text-gray-600";
    default:
      return "text-gray-600";
  }
};

export const Clipboard = React.forwardRef<HTMLButtonElement, ClipboardProps>(
  (
    {
      value,
      variant = "primary",
      size = "md",
      iconOnly = true,
      tooltip = "Copy to clipboard",
      showFeedback = true,
      feedbackText = "Copied!",
      feedbackDuration = 2000,
      onCopy,
      onError,
      disabled = false,
      rounded = "md",
      animation = "none",
      className = "",
      ...props
    },
    ref
  ) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleCopy = React.useCallback(async () => {
      if (disabled) return;

      try {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
        onCopy?.(value);

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set timeout to hide feedback
        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
        }, feedbackDuration);
      } catch (error) {
        onError?.(error as Error);
      }
    }, [value, disabled, onCopy, onError, feedbackDuration]);

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

    // Create a fixed-width container for icons to prevent layout shift
    const icon = (
      <div
        className='relative inline-flex flex-shrink-0 items-center justify-center'
        style={{ width: iconSize, height: iconSize }}
      >
        <FaCopy
          size={iconSize}
          className={cn(
            "absolute transition-all duration-300 ease-out",
            isCopied && showFeedback ? "scale-0 opacity-0" : "scale-100 opacity-100",
            getColorClass(variant, isCopied, showFeedback)
          )}
        />
        <LiaCheckDoubleSolid
          size={iconSize}
          className={cn(
            "absolute transition-all duration-300 ease-out",
            isCopied && showFeedback ? "scale-100 opacity-100" : "scale-0 opacity-0",
            getColorClass(variant, isCopied, showFeedback)
          )}
        />
      </div>
    );

    // Create fixed-width text container to prevent layout shift
    const textContent = !iconOnly && (
      <span
        className='relative ml-1.5 flex-shrink-0 overflow-hidden transition-all duration-300'
        style={{
          minWidth: Math.max(feedbackText.length * 0.6, "Copy".length * 0.6) + "rem",
          height: size === "sm" ? "1rem" : size === "lg" ? "1.25rem" : "1.125rem",
        }}
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center transition-all duration-300",
            isCopied && showFeedback ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
            getColorClass(variant, false, false) // Use default color for "Copy" text
          )}
        >
          Copy
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center transition-all duration-300",
            isCopied && showFeedback ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
            getColorClass(variant, isCopied, showFeedback) // Use appropriate color for feedback text
          )}
        >
          {feedbackText}
        </span>
      </span>
    );

    const buttonContent = (
      <button
        ref={ref}
        className={cn(
          base,
          sizes[size],
          roundedOptions[rounded],
          // Always apply animations, but conditionally apply hover states
          animations[animation],
          // Apply base variant styles
          variants[variant],
          // Apply copied state overrides
          isCopied &&
            showFeedback &&
            [
              // Override hover states when copied
              "hover:scale-100 active:scale-100", // Reset scale transforms
              "hover:-translate-y-0", // Reset lift transforms
              // Apply copied visual state
              variant === "primary" && "bg-blue-700 shadow-md",
              variant === "secondary" && "bg-gray-300 shadow-md",
              variant === "outline" &&
                "border-blue-600 bg-blue-600 text-white shadow-md hover:bg-blue-600",
            ].filter(Boolean),
          className
        )}
        disabled={disabled}
        onClick={handleCopy}
        aria-label={isCopied && showFeedback ? feedbackText : "Copy to clipboard"}
        style={{
          // Prevent layout shift by maintaining consistent dimensions
          minHeight: size === "sm" ? "2rem" : size === "lg" ? "2.75rem" : "2.25rem",
        }}
        {...props}
      >
        {icon}
        {textContent}
      </button>
    );

    if (tooltip) {
      return (
        <Tooltip content={isCopied && showFeedback ? feedbackText : tooltip} position='top'>
          {buttonContent}
        </Tooltip>
      );
    }

    return buttonContent;
  }
);

Clipboard.displayName = "Clipboard";
