import React, { useEffect, useRef, useState } from "react";
import { cn, tw } from "../../lib/utils";

export interface TooltipProps {
  /**
   * The content to display inside the tooltip
   */
  content: React.ReactNode;
  /**
   * The trigger element that shows the tooltip
   */
  children: React.ReactNode;
  /**
   * The position of the tooltip relative to the trigger
   * @default "auto"
   */
  position?: "auto" | "top" | "bottom" | "left" | "right";
  /**
   * The visual style of the tooltip
   * @default "dark"
   */
  variant?: "dark" | "light" | "primary" | "success" | "warning" | "error";
  /**
   * The size of the tooltip
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Control the border radius of the tooltip
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Whether the tooltip is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Delay in milliseconds before showing the tooltip
   * @default 300
   */
  delay?: number;
  /**
   * Custom class name for the tooltip container
   */
  className?: string;
  /**
   * Custom class name for the tooltip content
   */
  tooltipClassName?: string;
  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  showArrow?: boolean;
  /**
   * ID for the tooltip element
   */
  id?: string;
  /**
   * Maximum width of the tooltip
   * @default "sm"
   */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "none";
}

// Base styles
const tooltipBase = tw`absolute z-50 px-3 py-2 text-sm font-medium shadow-lg transition-opacity duration-200`;

// Max width options
const maxWidthOptions = {
  xs: tw`max-w-xs`,
  sm: tw`max-w-sm`,
  md: tw`max-w-md`,
  lg: tw`max-w-lg`,
  xl: tw`max-w-xl`,
  none: tw`max-w-none`,
};

// Variants
const variants = {
  dark: tw`bg-gray-900 text-white`,
  light: tw`border border-gray-200 bg-white text-gray-900`,
  primary: tw`bg-blue-600 text-white`,
  success: tw`bg-green-600 text-white`,
  warning: tw`bg-yellow-600 text-white`,
  error: tw`bg-red-600 text-white`,
};

// Sizes
const sizes = {
  sm: tw`px-2 py-1 text-xs`,
  md: tw`px-3 py-2 text-sm`,
  lg: tw`px-4 py-3 text-base`,
};

// Rounded options
const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

// Arrow styles
const arrowBase = tw`absolute h-2 w-2 rotate-45 transform`;
const arrowVariants = {
  dark: tw`bg-gray-900`,
  light: tw`border-gray-200 bg-white`,
  primary: tw`bg-blue-600`,
  success: tw`bg-green-600`,
  warning: tw`bg-yellow-600`,
  error: tw`bg-red-600`,
};

const getArrowPosition = (position: string) => {
  switch (position) {
    case "top":
      return tw`bottom-[-4px] left-1/2 -translate-x-1/2 transform`;
    case "bottom":
      return tw`top-[-4px] left-1/2 -translate-x-1/2 transform`;
    case "left":
      return tw`top-1/2 right-[-4px] -translate-y-1/2 transform`;
    case "right":
      return tw`top-1/2 left-[-4px] -translate-y-1/2 transform`;
    default:
      return "";
  }
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "auto",
  variant = "dark",
  size = "md",
  rounded = "md",
  disabled = false,
  delay = 300,
  className = "",
  tooltipClassName = "",
  showArrow = true,
  id,
  maxWidth = "none",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const initialPosition =
    position === "auto" ? "top" : (position as "top" | "bottom" | "left" | "right");
  const [actualPosition, setActualPosition] = useState(initialPosition);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      // Use requestAnimationFrame to ensure tooltip is fully rendered before calculating position
      requestAnimationFrame(() => {
        if (tooltipRef.current && triggerRef.current) {
          const tooltipRect = tooltipRef.current.getBoundingClientRect();
          const triggerRect = triggerRef.current.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          let newPosition: "top" | "bottom" | "left" | "right";

          if (position === "auto") {
            // Calculate available space for each direction
            const spaceTop = triggerRect.top;
            const spaceBottom = viewportHeight - triggerRect.bottom;
            const spaceLeft = triggerRect.left;
            const spaceRight = viewportWidth - triggerRect.right;

            // Priority order: top > left > right > bottom
            const positions = [
              { position: "top" as const, space: spaceTop },
              { position: "left" as const, space: spaceLeft },
              { position: "right" as const, space: spaceRight },
              { position: "bottom" as const, space: spaceBottom },
            ];

            // Find the first position that has enough space
            let bestPosition: "top" | "bottom" | "left" | "right" | null = null;

            for (const { position: pos, space } of positions) {
              const requiredSpace =
                pos === "top" || pos === "bottom" ? tooltipRect.height + 8 : tooltipRect.width + 8;
              if (space >= requiredSpace) {
                bestPosition = pos;
                break;
              }
            }

            // Fallback to top if no position has enough space
            newPosition = bestPosition || "top";
          } else {
            // Check if current position would overflow and flip if necessary
            newPosition = position as "top" | "bottom" | "left" | "right";
            switch (position) {
              case "top":
                if (triggerRect.top - tooltipRect.height - 8 < 0) {
                  newPosition = "bottom";
                }
                break;
              case "bottom":
                if (triggerRect.bottom + tooltipRect.height + 8 > viewportHeight) {
                  newPosition = "top";
                }
                break;
              case "left":
                if (triggerRect.left - tooltipRect.width - 8 < 0) {
                  newPosition = "right";
                }
                break;
              case "right":
                if (triggerRect.right + tooltipRect.width + 8 > viewportWidth) {
                  newPosition = "left";
                }
                break;
            }
          }

          setActualPosition(newPosition);
        }
      });
    }
  }, [isVisible, position, content]);

  const getPositionStyles = () => {
    const offset = 12;

    switch (actualPosition) {
      case "top":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: `${offset}px`,
        };
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: `${offset}px`,
        };
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: `${offset}px`,
        };
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: `${offset}px`,
        };
      default:
        return {};
    }
  };

  const tooltipClasses = cn(
    tooltipBase,
    variants[variant],
    sizes[size],
    roundedOptions[rounded],
    maxWidthOptions[maxWidth],
    maxWidth !== "none" ? "break-words whitespace-normal" : "whitespace-nowrap",
    isVisible ? "opacity-100" : "pointer-events-none opacity-0",
    tooltipClassName
  );

  const arrowClasses = cn(arrowBase, arrowVariants[variant], getArrowPosition(actualPosition));

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
        aria-describedby={id}
      >
        {children}
      </div>

      <div
        ref={tooltipRef}
        id={id}
        role="tooltip"
        className={tooltipClasses}
        style={getPositionStyles()}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {content}
        {showArrow && <div className={arrowClasses} />}
      </div>
    </div>
  );
};

Tooltip.displayName = "Tooltip";
