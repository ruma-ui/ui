import React, { useEffect, useRef, useState } from "react";
import { cn, tw } from "../../lib/utils";

export interface SliderProps {
  /**
   * The current value of the slider
   */
  value?: number;
  /**
   * Default value for uncontrolled slider
   * @default 0
   */
  defaultValue?: number;
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  /**
   * Step increment
   * @default 1
   */
  step?: number;
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * The visual style of the slider
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the slider
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Show value label
   * @default false
   */
  showValue?: boolean;
  /**
   * Custom value formatter
   */
  valueFormatter?: (value: number) => string;
  /**
   * Optional label text displayed above the slider
   */
  label?: string;
  /**
   * Optional helper/description text displayed below the slider
   */
  description?: string;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display below the slider
   */
  errorMessage?: string;
  /**
   * Callback when slider value changes
   */
  onChange?: (value: number) => void;
  /**
   * Callback when slider value change ends
   */
  onChangeEnd?: (value: number) => void;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * ID for the slider element
   */
  id?: string;
}

// rui-focus-ring: keyboard-only :focus-visible ring via .rui-focus-ring CSS class.
// The slider wrapper needs an explicit height equal to the thumb so the
// absolute-positioned track has a proper containing block.
const wrapperBase = tw`inline-flex w-full flex-col`;

// Per-size table: wrapper height must be >= thumb height so the absolute
// track center-aligns properly. Track height defines the rail.
const sizes = {
  sm: { wrapper: tw`h-4 min-w-[120px]`, track: tw`h-1`, thumb: tw`h-3 w-3`, text: tw`text-xs` },
  md: { wrapper: tw`h-5 min-w-[160px]`, track: tw`h-2`, thumb: tw`h-4 w-4`, text: tw`text-sm` },
  lg: { wrapper: tw`h-6 min-w-[200px]`, track: tw`h-3`, thumb: tw`h-5 w-5`, text: tw`text-base` },
} as const;

const trackFillVariants = {
  primary: tw`bg-primary`,
  secondary: tw`bg-secondary-foreground`,
};

// Thumb: bg-background with border so it reads on any surface
const thumbBase = tw`
  absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
  block cursor-pointer rounded-full
  border-2 border-primary bg-background
  shadow-sm transition-[transform,shadow,border-color,background-color] duration-150 ease-in-out
  hover:scale-110 hover:shadow-md
  disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none
`;

const labelBase = tw`mb-1.5 font-medium text-foreground`;

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      variant = "primary",
      size = "md",
      showValue = false,
      valueFormatter,
      label,
      description,
      error = false,
      errorMessage,
      onChange,
      onChangeEnd,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const autoId = React.useId();
    const sliderId = id ?? autoId;
    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${sliderId}-desc`;

    const isControlled = value !== undefined;

    useEffect(() => {
      if (!isControlled) setInternalValue(defaultValue);
    }, [defaultValue, isControlled]);

    useEffect(() => {
      if (isControlled) setInternalValue(value);
    }, [value, isControlled]);

    const currentValue = isControlled && value !== undefined ? value : internalValue;
    const clampedValue = Math.min(Math.max(currentValue, min), max);
    const percentage = ((clampedValue - min) / (max - min)) * 100;
    const formatValue = (val: number) => (valueFormatter ? valueFormatter(val) : val.toString());

    const getValueFromPosition = (clientX: number) => {
      if (!trackRef.current) return clampedValue;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.min(max, Math.max(min, Math.round((pct * (max - min) + min) / step) * step));
    };

    const updateValue = (newVal: number) => {
      const clamped = Math.min(max, Math.max(min, newVal));
      if (!isControlled) setInternalValue(clamped);
      onChange?.(clamped);
    };

    const handlePointerDown = (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      let current = getValueFromPosition(e.clientX);
      updateValue(current);

      const onMove = (ev: PointerEvent) => {
        current = getValueFromPosition(ev.clientX);
        updateValue(current);
      };
      const onUp = () => {
        setIsDragging(false);
        onChangeEnd?.(current);
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      let next = clampedValue;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          next = Math.min(max, clampedValue + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          next = Math.max(min, clampedValue - step);
          break;
        case "Home":
          e.preventDefault();
          next = min;
          break;
        case "End":
          e.preventDefault();
          next = max;
          break;
        case "PageUp":
          e.preventDefault();
          next = Math.min(max, clampedValue + (max - min) * 0.1);
          break;
        case "PageDown":
          e.preventDefault();
          next = Math.max(min, clampedValue - (max - min) * 0.1);
          break;
        default:
          return;
      }
      updateValue(next);
      onChangeEnd?.(next);
    };

    const thumbClasses = cn(
      thumbBase,
      sizes[size].thumb,
      error && "border-destructive",
      isDragging && "scale-110"
    );

    return (
      <div ref={ref} className={cn(wrapperBase, className)}>
        {/* Label row */}
        {(label || showValue) && (
          <div className="mb-2 flex items-center justify-between">
            {label && (
              <label
                htmlFor={sliderId}
                className={cn(
                  labelBase,
                  sizes[size].text,
                  error && "text-destructive",
                  disabled && "text-muted-foreground"
                )}
              >
                {label}
              </label>
            )}
            {showValue && (
              <span
                className={cn(
                  "text-muted-foreground tabular-nums",
                  sizes[size].text,
                  error && "text-destructive"
                )}
              >
                {formatValue(clampedValue)}
              </span>
            )}
          </div>
        )}

        {/*
          Slider interaction area.
          - Has an explicit height (= thumb height) so the absolute track has a
            proper containing block and `top-1/2` works correctly.
          - `flex items-center` centers the track rail within the wrapper.
          - rui-focus-ring handles :focus-visible ring for keyboard nav.
        */}
        <div
          className={cn(
            "rui-focus-ring relative flex w-full cursor-pointer items-center outline-none",
            sizes[size].wrapper,
            disabled && "cursor-not-allowed opacity-50"
          )}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={clampedValue}
          aria-disabled={disabled}
          aria-describedby={hasAssistive ? assistiveId : undefined}
          id={sliderId}
          {...props}
        >
          {/* Track rail — full width, relative so fill + thumb are positioned within it */}
          <div
            ref={trackRef}
            className={cn("bg-secondary relative w-full rounded-full", sizes[size].track)}
          >
            {/* Filled portion */}
            <div
              className={cn("absolute inset-y-0 left-0 rounded-full", trackFillVariants[variant])}
              style={{ width: `${percentage}%` }}
            />
            {/* Thumb */}
            <div className={thumbClasses} style={{ left: `${percentage}%` }} />
          </div>
        </div>

        {/* Assistive text */}
        {hasAssistive && (
          <div id={assistiveId} className="mt-2 px-0.5">
            {error && errorMessage ? (
              <span className="text-destructive text-sm">{errorMessage}</span>
            ) : description ? (
              <span className="text-muted-foreground text-sm">{description}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
