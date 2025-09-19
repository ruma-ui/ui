import React from "react";
import { cn } from "@ruma-ui/utils";
import { tw } from "@ruma-ui/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Array of carousel items to display
   */
  items: React.ReactNode[];
  /**
   * Currently active slide index (controlled)
   */
  activeIndex?: number;
  /**
   * Default active slide index (uncontrolled)
   * @default 0
   */
  defaultActiveIndex?: number;
  /**
   * Called when the active slide changes
   */
  onChange?: (index: number) => void;
  /**
   * Whether the carousel is draggable/swipeable
   * @default true
   */
  draggable?: boolean;
  /**
   * Enable autoplay functionality
   * @default false
   */
  autoplay?: boolean;
  /**
   * Autoplay interval in milliseconds
   * @default 3000
   */
  autoplayInterval?: number;
  /**
   * Pause autoplay on hover
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Show navigation arrows
   * @default true
   */
  showArrows?: boolean;
  /**
   * Show dot indicators
   * @default true
   */
  showDots?: boolean;
  /**
   * Show slide counter (e.g., "1 / 5")
   * @default false
   */
  showCounter?: boolean;
  /**
   * Infinite loop navigation
   * @default true
   */
  infinite?: boolean;
  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;
  /**
   * Custom className for the carousel container
   */
  className?: string;
  /**
   * Custom className for individual slides
   */
  slideClassName?: string;
  /**
   * Custom className for navigation arrows
   */
  arrowClassName?: string;
  /**
   * Custom className for dot indicators
   */
  dotClassName?: string;
}

const carouselBase = tw`relative h-64 w-full min-w-0 overflow-hidden rounded-lg bg-gray-50`;
const slideContainer = tw`relative h-full w-full`;
const slideBase = tw`absolute inset-0 h-full w-full flex-shrink-0`;
const arrowBase = tw`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`;
const dotsContainer = tw`absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2`;
const dotBase = tw`h-2 w-2 rounded-full bg-white/60 transition-all duration-200 hover:bg-white/80 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none`;
const activeDot = tw`scale-125 bg-white`;
const counterBase = tw`absolute top-4 right-4 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white`;

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      activeIndex: controlledActiveIndex,
      defaultActiveIndex = 0,
      onChange,
      draggable = true,
      autoplay = false,
      autoplayInterval = 3000,
      pauseOnHover = true,
      showArrows = true,
      showDots = true,
      showCounter = false,
      infinite = true,
      animationDuration = 300,
      className = "",
      slideClassName = "",
      arrowClassName = "",
      dotClassName = "",
      ...props
    },
    ref
  ) => {
    const [internalActiveIndex, setInternalActiveIndex] = React.useState(defaultActiveIndex);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState<{
      x: number;
      y: number;
    } | null>(null);
    const [dragOffset, setDragOffset] = React.useState(0);
    const [isAutoplayPaused, setIsAutoplayPaused] = React.useState(false);

    const carouselRef = React.useRef<HTMLDivElement>(null);
    const slideContainerRef = React.useRef<HTMLDivElement>(null);
    const autoplayRef = React.useRef<NodeJS.Timeout | null>(null);

    // Combine forwarded ref and local ref
    React.useImperativeHandle(ref, () => carouselRef.current as HTMLDivElement);

    const activeIndex = controlledActiveIndex ?? internalActiveIndex;
    const totalItems = items.length;

    // Reset to first slide if activeIndex is out of bounds
    React.useEffect(() => {
      if (activeIndex >= totalItems) {
        const newIndex = totalItems > 0 ? 0 : 0;
        if (controlledActiveIndex === undefined) {
          setInternalActiveIndex(newIndex);
        }
        onChange?.(newIndex);
      }
    }, [activeIndex, totalItems, controlledActiveIndex, onChange]);

    const goToSlide = React.useCallback(
      (index: number) => {
        if (totalItems === 0) return;

        let newIndex = index;
        if (infinite) {
          if (index < 0) newIndex = totalItems - 1;
          if (index >= totalItems) newIndex = 0;
        } else {
          newIndex = Math.max(0, Math.min(totalItems - 1, index));
        }

        if (controlledActiveIndex === undefined) {
          setInternalActiveIndex(newIndex);
        }
        onChange?.(newIndex);
      },
      [totalItems, infinite, controlledActiveIndex, onChange]
    );

    const goToNext = React.useCallback(() => {
      goToSlide(activeIndex + 1);
    }, [goToSlide, activeIndex]);

    const goToPrev = React.useCallback(() => {
      goToSlide(activeIndex - 1);
    }, [goToSlide, activeIndex]);

    // Autoplay functionality
    React.useEffect(() => {
      if (autoplay && !isAutoplayPaused && totalItems > 1) {
        autoplayRef.current = setInterval(() => {
          goToNext();
        }, autoplayInterval);
      } else {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
          autoplayRef.current = null;
        }
      }

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }, [autoplay, autoplayInterval, isAutoplayPaused, totalItems, goToNext]);

    // Drag handlers
    const handleDragStart = React.useCallback(
      (clientX: number, clientY: number) => {
        if (!draggable) return;
        setIsDragging(true);
        setDragStart({ x: clientX, y: clientY });
        setDragOffset(0);
        setIsAutoplayPaused(true);
      },
      [draggable]
    );

    const handleDragMove = React.useCallback(
      (clientX: number, clientY: number) => {
        if (!isDragging || !dragStart || !carouselRef.current) return;

        const deltaX = clientX - dragStart.x;
        const deltaY = clientY - dragStart.y;

        // Only allow horizontal dragging if horizontal movement is greater
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          const containerWidth = carouselRef.current.offsetWidth;
          const maxOffset = containerWidth * 0.3; // Allow 30% drag
          const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
          setDragOffset(clampedOffset);
        }
      },
      [isDragging, dragStart]
    );

    const handleDragEnd = React.useCallback(() => {
      if (!isDragging || !carouselRef.current) return;

      const containerWidth = carouselRef.current.offsetWidth;
      const threshold = containerWidth * 0.15; // 15% threshold for slide change

      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
          goToPrev();
        } else {
          goToNext();
        }
      }

      setIsDragging(false);
      setDragStart(null);
      setDragOffset(0);
      setIsAutoplayPaused(false);
    }, [isDragging, dragOffset, goToNext, goToPrev]);

    // Mouse events
    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        handleDragStart(e.clientX, e.clientY);
      },
      [handleDragStart]
    );

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent) => {
        handleDragMove(e.clientX, e.clientY);
      },
      [handleDragMove]
    );

    const handleMouseUp = React.useCallback(() => {
      handleDragEnd();
    }, [handleDragEnd]);

    // Touch events
    const handleTouchStart = React.useCallback(
      (e: React.TouchEvent) => {
        const touch = e.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
      },
      [handleDragStart]
    );

    const handleTouchMove = React.useCallback(
      (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          handleDragMove(touch.clientX, touch.clientY);
        }
      },
      [handleDragMove]
    );

    const handleTouchEnd = React.useCallback(() => {
      handleDragEnd();
    }, [handleDragEnd]);

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            goToPrev();
            break;
          case "ArrowRight":
            e.preventDefault();
            goToNext();
            break;
          case "Home":
            e.preventDefault();
            goToSlide(0);
            break;
          case "End":
            e.preventDefault();
            goToSlide(totalItems - 1);
            break;
        }
      },
      [goToPrev, goToNext, goToSlide, totalItems]
    );

    // Hover handlers for autoplay pause
    const handleMouseEnter = React.useCallback(() => {
      if (pauseOnHover) {
        setIsAutoplayPaused(true);
      }
    }, [pauseOnHover]);

    const handleMouseLeave = React.useCallback(() => {
      if (pauseOnHover) {
        setIsAutoplayPaused(false);
      }
    }, [pauseOnHover]);

    if (totalItems === 0) {
      return (
        <div ref={carouselRef} className={cn(carouselBase, className)} {...props}>
          <div className='flex h-48 items-center justify-center text-gray-500'>
            No items to display
          </div>
        </div>
      );
    }

    return (
      <div
        ref={carouselRef}
        className={cn(carouselBase, className)}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          handleMouseLeave();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        tabIndex={0}
        role='region'
        aria-label='Carousel'
        aria-live='polite'
        {...props}
      >
        <div
          ref={slideContainerRef}
          className={slideContainer}
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% ${
              isDragging ? `+ ${dragOffset}px` : ""
            }))`,
            transition: isDragging ? "none" : `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(slideBase, slideClassName)}
              style={{
                left: `${index * 100}%`,
              }}
              role='img'
              aria-label={`Slide ${index + 1} of ${totalItems}`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && totalItems > 1 && (
          <>
            <button
              className={cn(arrowBase, arrowClassName, "left-4")}
              onClick={goToPrev}
              disabled={!infinite && activeIndex === 0}
              aria-label='Previous slide'
              type='button'
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              className={cn(arrowBase, arrowClassName, "right-4")}
              onClick={goToNext}
              disabled={!infinite && activeIndex === totalItems - 1}
              aria-label='Next slide'
              type='button'
            >
              <FaChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {showDots && totalItems > 1 && (
          <div className={dotsContainer}>
            {items.map((_, index) => (
              <button
                key={index}
                className={cn(dotBase, dotClassName, index === activeIndex && activeDot)}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                type='button'
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {showCounter && totalItems > 1 && (
          <div className={counterBase}>
            {activeIndex + 1} / {totalItems}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";
