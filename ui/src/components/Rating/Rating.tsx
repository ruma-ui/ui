import React from "react";
import { cn } from "@ruma-ui/utils";
import { tw } from "@ruma-ui/utils";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The current rating value
   * @default 0
   */
  value?: number;
  /**
   * The maximum rating value
   * @default 5
   */
  max?: number;
  /**
   * The size of the rating stars
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The visual style of the rating
   * @default "default"
   */
  variant?: "default" | "filled" | "outline";
  /**
   * Whether the rating is readonly (non-interactive)
   * @default false
   */
  readonly?: boolean;
  /**
   * Whether the rating is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to show the rating value as text
   * @default false
   */
  showValue?: boolean;
  /**
   * Custom label for the rating value
   */
  label?: string;
  /**
   * Callback when rating changes
   */
  onChange?: (value: number) => void;
  /**
   * Callback when rating is hovered
   */
  onHover?: (value: number) => void;
  /**
   * Precision for rating values (e.g., 0.5 for half stars)
   * @default 1
   */
  precision?: 0.5 | 1;
  /**
   * Animation effect on user interaction
   * @default "none"
   */
  animation?: "none" | "scale" | "glow";
  /**
   * Custom icon for empty/unfilled state
   * @default AiOutlineStar
   */
  emptyIcon?: React.ComponentType<{
    size?: number | string;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
  }>;
  /**
   * Custom icon for filled state
   * @default AiFillStar
   */
  filledIcon?: React.ComponentType<{
    size?: number | string;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
  }>;
  /**
   * Custom color for the rating icons
   * @default uses variant colors
   */
  colorClassName?: string;
}

const base = tw`inline-flex items-center gap-1 select-none`;

const sizes = {
  xs: tw`gap-0.5`,
  sm: tw`gap-1`,
  md: tw`gap-1.5`,
  lg: tw`gap-2`,
  xl: tw`gap-2.5`,
};

const starSizes = {
  xs: 20,
  sm: 26,
  md: 36,
  lg: 40,
  xl: 50,
};

const variants = {
  default: tw`text-gray-300`,
  filled: tw`text-yellow-400`,
  outline: tw`text-gray-400`,
};

const filledVariants = {
  default: tw`text-yellow-500`,
  filled: tw`text-yellow-500`,
  outline: tw`text-yellow-600`,
};

const hoverVariants = {
  default: tw`text-yellow-400`,
  filled: tw`text-yellow-300`,
  outline: tw`text-yellow-500`,
};

const disabledStyles = tw`pointer-events-none opacity-60`;

const animations = {
  none: tw``,
  scale: tw`transition-transform duration-150 ease-out hover:scale-110`,
  glow: tw`transition-shadow duration-200 ease-out hover:drop-shadow-sm`,
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      max = 5,
      size = "md",
      variant = "default",
      readonly = false,
      disabled = false,
      showValue = false,
      label,
      onChange,
      onHover,
      precision = 1,
      animation = "none",
      emptyIcon: EmptyIcon = AiOutlineStar,
      filledIcon: FilledIcon = AiFillStar,
      colorClassName,
      className = "",
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const [isHovering, setIsHovering] = React.useState(false);

    const displayValue = hoverValue !== null ? hoverValue : value;
    const isInteractive = !readonly && !disabled && !!onChange;

    const handleStarClick = (starValue: number) => {
      if (!isInteractive) return;
      onChange?.(starValue);
    };

    const handleStarHover = (starValue: number) => {
      if (!isInteractive) return;
      setHoverValue(starValue);
      setIsHovering(true);
      onHover?.(starValue);
    };

    const handleMouseLeave = () => {
      setHoverValue(null);
      setIsHovering(false);
    };

    const renderStar = (starIndex: number) => {
      const starValue = starIndex + 1;
      const isFilled = displayValue >= starValue;
      const isPartial = displayValue > starIndex && displayValue < starValue;
      const partialWidth = isPartial ? ((displayValue - starIndex) / 1) * 100 : 0;

      // Determine colors based on state and custom color prop
      const getColorClass = (isFilledState: boolean) => {
        if (colorClassName) {
          return colorClassName;
        }
        return isFilledState
          ? cn(filledVariants[variant], isHovering && hoverVariants[variant])
          : variants[variant];
      };

      if (isPartial) {
        // For partial stars, show both outline and filled with clipping
        return (
          <div key={starIndex} className='relative'>
            <EmptyIcon
              size={starSizes[size]}
              className={cn(
                "transition-all duration-200",
                isInteractive && "cursor-pointer",
                getColorClass(false),
                animation !== "none" && animations[animation]
              )}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
            />
            <div className='absolute inset-0 overflow-hidden' style={{ width: `${partialWidth}%` }}>
              <FilledIcon
                size={starSizes[size]}
                className={cn("transition-colors duration-150", getColorClass(true))}
              />
            </div>
          </div>
        );
      } else if (isFilled) {
        // For fully filled stars, just show the filled star
        return (
          <FilledIcon
            key={starIndex}
            size={starSizes[size]}
            className={cn(
              "transition-colors duration-150",
              isInteractive && "cursor-pointer",
              getColorClass(true),
              isInteractive &&
                !isHovering &&
                hoverValue === null &&
                !colorClassName &&
                "hover:text-yellow-400",
              animation !== "none" && animations[animation]
            )}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
          />
        );
      } else {
        // For empty stars, show the outline star
        return (
          <EmptyIcon
            key={starIndex}
            size={starSizes[size]}
            className={cn(
              "transition-colors duration-150",
              isInteractive && "cursor-pointer",
              getColorClass(false),
              isInteractive &&
                !isHovering &&
                hoverValue === null &&
                !colorClassName &&
                "hover:text-yellow-400",
              animation !== "none" && animations[animation]
            )}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
          />
        );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(base, sizes[size], disabled && disabledStyles, className)}
        onMouseLeave={handleMouseLeave}
        role='group'
        aria-label={label || "Rating"}
        {...props}
      >
        <div className='flex items-center'>
          {Array.from({ length: max }, (_, index) => renderStar(index))}
        </div>

        {showValue && (
          <span
            className={cn("ml-2 text-sm font-medium", variants[variant], disabled && "opacity-60")}
            aria-live='polite'
          >
            {displayValue.toFixed(precision === 0.5 ? 1 : 0)}/{max}
          </span>
        )}
      </div>
    );
  }
);
Rating.displayName = "Rating";
