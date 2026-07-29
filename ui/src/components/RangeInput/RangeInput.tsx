import React, { useEffect, useRef, useState } from "react";
import { cn, tw } from "../../lib/utils";

export interface RangeInputProps {
  /**
   * The current range values
   */
  value?: [number, number];
  /**
   * Default range values for uncontrolled component
   * @default [0, 100]
   */
  defaultValue?: [number, number];
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
   * Whether the range input is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * The visual style of the range input
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the range input
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Show value labels
   * @default false
   */
  showValue?: boolean;
  /**
   * Custom value formatter
   */
  valueFormatter?: (value: number) => string;
  /**
   * Optional label text displayed above the range input
   */
  label?: string;
  /**
   * Optional helper/description text displayed below the range input
   */
  description?: string;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display below the range input
   */
  errorMessage?: string;
  /**
   * Callback when range values change
   */
  onChange?: (value: [number, number]) => void;
  /**
   * Callback when range value change ends
   */
  onChangeEnd?: (value: [number, number]) => void;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * ID for the range input element
   */
  id?: string;
}

const wrapperBase = tw`inline-flex w-full flex-col`;

// Sizes map matching Slider exactly (wrapper height is equal to thumb height)
const sizes = {
  sm: { wrapper: tw`h-4 min-w-[120px]`, track: tw`h-1`, thumb: tw`h-3 w-3`, text: tw`text-xs` },
  md: { wrapper: tw`h-5 min-w-[160px]`, track: tw`h-2`, thumb: tw`h-4 w-4`, text: tw`text-sm` },
  lg: { wrapper: tw`h-6 min-w-[200px]`, track: tw`h-3`, thumb: tw`h-5 w-5`, text: tw`text-base` },
} as const;

const trackFillVariants = {
  primary: tw`bg-primary`,
  secondary: tw`bg-secondary-foreground`,
};

const thumbBase = tw`
  absolute top-1/2 -translate-y-1/2
  block cursor-pointer rounded-full
  border border-border bg-background
  shadow-sm transition-[transform,shadow,border-color,background-color] duration-150 ease-in-out
  hover:scale-110 hover:shadow-md
  disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none
`;

export const RangeInput = React.forwardRef<HTMLDivElement, RangeInputProps>(
  (
    {
      value,
      defaultValue = [0, 100],
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
    const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
    const trackRef = useRef<HTMLDivElement>(null);
    const activeThumbRef = useRef<0 | 1 | null>(null);
    const [draggingThumb, setDraggingThumb] = useState<0 | 1 | null>(null);

    const autoId = React.useId();
    const rangeId = id ?? autoId;
    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${rangeId}-desc`;

    const isControlled = value !== undefined;

    useEffect(() => {
      if (!isControlled) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, isControlled]);

    useEffect(() => {
      if (isControlled && value) {
        setInternalValue(value);
      }
    }, [value, isControlled]);

    const currentValue = isControlled && value ? value : internalValue;
    const clampedValue: [number, number] = [
      Math.min(Math.max(currentValue[0], min), max),
      Math.min(Math.max(currentValue[1], min), max),
    ];

    const valueRef = useRef<[number, number]>(clampedValue);
    valueRef.current = clampedValue;

    const minPercent = ((clampedValue[0] - min) / (max - min)) * 100;
    const maxPercent = ((clampedValue[1] - min) / (max - min)) * 100;
    const formatValue = (val: number) => (valueFormatter ? valueFormatter(val) : val.toString());

    const getValueFromPosition = (clientX: number) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const val = pct * (max - min) + min;
      return Math.round(val / step) * step;
    };

    const updateValue = (newVal: [number, number]) => {
      const sorted: [number, number] = newVal[0] <= newVal[1] ? newVal : [newVal[1], newVal[0]];
      const clamped: [number, number] = [
        Math.min(max, Math.max(min, sorted[0])),
        Math.min(max, Math.max(min, sorted[1])),
      ];
      if (!isControlled) {
        setInternalValue(clamped);
      }
      onChange?.(clamped);
    };

    const handlePointerDown = (e: React.PointerEvent, thumbIndex: 0 | 1) => {
      if (disabled) return;
      e.stopPropagation();
      e.preventDefault();
      setDraggingThumb(thumbIndex);
      activeThumbRef.current = thumbIndex;

      const onMove = (ev: PointerEvent) => {
        const newVal = getValueFromPosition(ev.clientX);
        const currentVals = valueRef.current;
        if (thumbIndex === 0) {
          updateValue([newVal, currentVals[1]]);
        } else {
          updateValue([currentVals[0], newVal]);
        }
      };

      const onUp = (ev: PointerEvent) => {
        setDraggingThumb(null);
        const finalVal = getValueFromPosition(ev.clientX);
        const currentVals = valueRef.current;
        const nextVal: [number, number] =
          thumbIndex === 0 ? [finalVal, currentVals[1]] : [currentVals[0], finalVal];
        const sorted: [number, number] =
          nextVal[0] <= nextVal[1] ? nextVal : [nextVal[1], nextVal[0]];
        onChangeEnd?.(sorted);
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    };

    const handleTrackClick = (e: React.PointerEvent) => {
      if (disabled) return;
      const clickVal = getValueFromPosition(e.clientX);
      const distMin = Math.abs(clampedValue[0] - clickVal);
      const distMax = Math.abs(clampedValue[1] - clickVal);

      const targetThumb: 0 | 1 = distMin < distMax ? 0 : 1;
      if (targetThumb === 0) {
        updateValue([clickVal, clampedValue[1]]);
        onChangeEnd?.([clickVal, clampedValue[1]]);
      } else {
        updateValue([clampedValue[0], clickVal]);
        onChangeEnd?.([clampedValue[0], clickVal]);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent, thumbIndex: 0 | 1) => {
      if (disabled) return;
      let val = clampedValue[thumbIndex];
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          val = Math.min(max, val + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          val = Math.max(min, val - step);
          break;
        case "Home":
          e.preventDefault();
          val = min;
          break;
        case "End":
          e.preventDefault();
          val = max;
          break;
        case "PageUp":
          e.preventDefault();
          val = Math.min(max, val + (max - min) * 0.1);
          break;
        case "PageDown":
          e.preventDefault();
          val = Math.max(min, val - (max - min) * 0.1);
          break;
        default:
          return;
      }

      const nextVal: [number, number] =
        thumbIndex === 0 ? [val, clampedValue[1]] : [clampedValue[0], val];
      updateValue(nextVal);
      onChangeEnd?.(nextVal[0] <= nextVal[1] ? nextVal : [nextVal[1], nextVal[0]]);
    };

    return (
      <div ref={ref} className={cn(wrapperBase, className)}>
        {/* Labels row */}
        {(label || showValue) && (
          <div className="mb-2 flex items-center justify-between">
            {label && (
              <span
                className={cn(
                  "text-foreground font-medium",
                  sizes[size].text,
                  error && "text-destructive",
                  disabled && "text-muted-foreground"
                )}
              >
                {label}
              </span>
            )}
            {showValue && (
              <span
                className={cn(
                  "text-muted-foreground tabular-nums",
                  sizes[size].text,
                  error && "text-destructive",
                  disabled && "opacity-50"
                )}
              >
                {formatValue(clampedValue[0])} - {formatValue(clampedValue[1])}
              </span>
            )}
          </div>
        )}

        {/* Range rail interaction area */}
        <div
          className={cn(
            "relative flex w-full items-center select-none",
            sizes[size].wrapper,
            disabled && "cursor-not-allowed opacity-50"
          )}
          id={rangeId}
          {...props}
        >
          <div
            ref={trackRef}
            className={cn(
              "bg-secondary relative w-full cursor-pointer rounded-full",
              sizes[size].track
            )}
            onPointerDown={handleTrackClick}
          >
            {/* Range fill */}
            <div
              className={cn("absolute inset-y-0 rounded-full", trackFillVariants[variant])}
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />

            {/* Min Thumb */}
            <div
              className={cn(
                thumbBase,
                sizes[size].thumb,
                error && "border-destructive",
                draggingThumb === 0 &&
                  "scale-110 shadow-[0_0_0_var(--ring-offset)_hsl(var(--background)),0_0_0_calc(var(--ring-offset)+var(--ring-width))_var(--ring-color)]",
                "rui-focus-ring outline-none"
              )}
              style={{ left: `${minPercent}%` }}
              onPointerDown={e => handlePointerDown(e, 0)}
              onKeyDown={e => handleKeyDown(e, 0)}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={clampedValue[1]}
              aria-valuenow={clampedValue[0]}
              aria-disabled={disabled}
              aria-describedby={hasAssistive ? assistiveId : undefined}
            />

            {/* Max Thumb */}
            <div
              className={cn(
                thumbBase,
                sizes[size].thumb,
                error && "border-destructive",
                draggingThumb === 1 &&
                  "scale-110 shadow-[0_0_0_var(--ring-offset)_hsl(var(--background)),0_0_0_calc(var(--ring-offset)+var(--ring-width))_var(--ring-color)]",
                "rui-focus-ring outline-none"
              )}
              style={{ left: `${maxPercent}%` }}
              onPointerDown={e => handlePointerDown(e, 1)}
              onKeyDown={e => handleKeyDown(e, 1)}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={clampedValue[0]}
              aria-valuemax={max}
              aria-valuenow={clampedValue[1]}
              aria-disabled={disabled}
              aria-describedby={hasAssistive ? assistiveId : undefined}
            />
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

RangeInput.displayName = "RangeInput";
