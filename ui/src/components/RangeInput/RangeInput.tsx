import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@ruma-ui/utils";
import { tw } from "@ruma-ui/utils";

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

// Design primitives
const wrapperBase = tw`relative inline-flex flex-col`;
const containerBase = tw`inline-flex flex-col gap-2`;
const rangeBase = tw`relative w-full cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`;

const trackBase = tw`relative w-full rounded-full bg-gray-200`;
const trackVariants = {
  primary: tw`bg-blue-600`,
  secondary: tw`bg-gray-600`,
};

const sizes = {
  sm: {
    track: tw`h-1 min-w-[120px]`,
    thumb: tw`h-3 w-3`,
  },
  md: {
    track: tw`h-2 min-w-[160px]`,
    thumb: tw`h-4 w-4`,
  },
  lg: {
    track: tw`h-3 min-w-[200px]`,
    thumb: tw`h-5 w-5`,
  },
};

const thumbBase = tw`absolute block cursor-pointer rounded-full border-1 border-gray-400 bg-white shadow-lg transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-115 disabled:shadow-none`;

const labelBase = tw`font-medium text-gray-900`;
const labelSizes = {
  sm: tw`text-xs`,
  md: tw`text-sm`,
  lg: tw`text-base`,
};

const valueLabelBase = tw`text-gray-600`;
const valueLabelSizes = {
  sm: tw`text-xs`,
  md: tw`text-sm`,
  lg: tw`text-base`,
};

const assistiveContainer = tw`mt-2 px-1`;
const descriptionText = tw`text-sm text-gray-600`;
const errorText = tw`text-sm text-red-600`;

const errorStyles = tw`ring-red-500`;

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
    const rangeRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const activeThumbRef = useRef<0 | 1 | null>(null);
    const [draggingThumb, setDraggingThumb] = useState<0 | 1 | null>(null);

    const autoId = React.useId();
    const rangeId = id ?? autoId;
    const hasAssistive = Boolean(description || (error && errorMessage));
    const assistiveId = `${rangeId}-desc`;

    // Determine if component is controlled
    const isControlled = value !== undefined;

    // Update internal state when controlled value changes
    useEffect(() => {
      if (!isControlled) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, isControlled]);

    // For controlled components, sync internal state with prop changes
    useEffect(() => {
      if (isControlled) {
        setInternalValue(value);
      }
    }, [value, isControlled]);

    const currentValue = isControlled ? value : internalValue;

    // Ensure values are within bounds and min <= max
    const clampedValue: [number, number] = [
      Math.min(Math.max(currentValue[0], min), Math.min(currentValue[1], max)),
      Math.min(Math.max(currentValue[1], Math.min(currentValue[0], max)), max),
    ];

    // Calculate percentages for styling
    const minPercent = ((clampedValue[0] - min) / (max - min)) * 100;
    const maxPercent = ((clampedValue[1] - min) / (max - min)) * 100;

    const formatValue = (val: number) => {
      return valueFormatter ? valueFormatter(val) : val.toString();
    };

    const getValueFromPosition = (clientX: number): number => {
      if (!trackRef.current) return clampedValue[0];

      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = percent * (max - min) + min;

      // Round to nearest step
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.min(Math.max(steppedValue, min), max);
    };

    const updateValue = useCallback(
      (newValue: [number, number]) => {
        const clamped: [number, number] = [
          Math.min(Math.max(newValue[0], min), Math.min(newValue[1], max)),
          Math.min(Math.max(newValue[1], Math.min(newValue[0], max)), max),
        ];

        if (isControlled) {
          // For controlled components, just call onChange
          onChange?.(clamped);
        } else {
          // For uncontrolled components, update internal state
          setInternalValue(clamped);
          onChange?.(clamped);
        }
      },
      [isControlled, onChange, min, max]
    );

    const handlePointerDown = (e: React.PointerEvent, thumbIndex: 0 | 1) => {
      if (disabled) return;

      e.preventDefault();
      activeThumbRef.current = thumbIndex;
      setDraggingThumb(thumbIndex);

      // Prevent text selection during drag
      document.body.style.userSelect = "none";

      const updateThumb = (clientX: number) => {
        const newValue = getValueFromPosition(clientX);
        if (thumbIndex === 0) {
          updateValue([newValue, clampedValue[1]]);
        } else {
          updateValue([clampedValue[0], newValue]);
        }
      };

      // Add global listeners for drag
      const handlePointerMove = (e: PointerEvent) => {
        e.preventDefault();
        updateThumb(e.clientX);
      };

      const handlePointerUp = () => {
        // Restore text selection
        document.body.style.userSelect = "";
        setDraggingThumb(null);
        onChangeEnd?.(clampedValue);
        activeThumbRef.current = null;
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    };

    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled) return;

      e.preventDefault();
      const clickValue = getValueFromPosition(e.clientX);

      // Determine which thumb is closer to the click position
      const distanceToMin = Math.abs(clickValue - clampedValue[0]);
      const distanceToMax = Math.abs(clickValue - clampedValue[1]);

      const thumbIndex = distanceToMin <= distanceToMax ? 0 : 1;

      if (thumbIndex === 0) {
        updateValue([clickValue, clampedValue[1]]);
      } else {
        updateValue([clampedValue[0], clickValue]);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent, thumbIndex: 0 | 1) => {
      if (disabled) return;

      let newValue = clampedValue[thumbIndex];

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newValue = Math.max(min, clampedValue[thumbIndex] - step);
          break;
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newValue = Math.min(max, clampedValue[thumbIndex] + step);
          break;
        case "Home":
          e.preventDefault();
          newValue = thumbIndex === 0 ? min : clampedValue[0];
          break;
        case "End":
          e.preventDefault();
          newValue = thumbIndex === 0 ? clampedValue[1] : max;
          break;
        case "PageUp":
          e.preventDefault();
          newValue = Math.min(max, clampedValue[thumbIndex] + (max - min) * 0.1);
          break;
        case "PageDown":
          e.preventDefault();
          newValue = Math.max(min, clampedValue[thumbIndex] - (max - min) * 0.1);
          break;
        default:
          return;
      }

      if (thumbIndex === 0) {
        updateValue([newValue, clampedValue[1]]);
      } else {
        updateValue([clampedValue[0], newValue]);
      }
      onChangeEnd?.(thumbIndex === 0 ? [newValue, clampedValue[1]] : [clampedValue[0], newValue]);
    };

    const trackClasses = cn(trackBase, sizes[size].track, className);

    const thumbClasses = cn(
      thumbBase,
      sizes[size].thumb,
      error && errorStyles,
      disabled && "shadow-none"
    );

    const labelClasses = cn(
      labelBase,
      labelSizes[size],
      error && "text-red-700",
      disabled && "text-gray-500"
    );

    const valueLabelClasses = cn(
      valueLabelBase,
      valueLabelSizes[size],
      error && "text-red-700",
      disabled && "text-gray-500"
    );

    return (
      <div ref={ref} className={wrapperBase}>
        {label && (
          <div className='mb-3 flex items-center justify-between'>
            <label htmlFor={rangeId} className={labelClasses}>
              {label}
            </label>
            {showValue && (
              <span className={valueLabelClasses}>
                {formatValue(clampedValue[0])} - {formatValue(clampedValue[1])}
              </span>
            )}
          </div>
        )}

        <div className={cn(containerBase, "w-full min-w-[200px]")}>
          <div ref={rangeRef} className={rangeBase} id={rangeId} {...props}>
            <div
              ref={trackRef}
              className={cn(trackClasses, "absolute top-1/2 -translate-y-1/2")}
              onClick={handleTrackClick}
            >
              {/* Range fill */}
              <div
                className={cn("absolute top-0 rounded-full", trackVariants[variant])}
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                  height: "100%",
                }}
              />

              {/* Min thumb */}
              <div
                className={cn(
                  thumbClasses,
                  draggingThumb === 0 && "scale-115 ring-2 ring-blue-300"
                )}
                style={{
                  left: `${minPercent}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                onPointerDown={e => handlePointerDown(e, 0)}
                onKeyDown={e => handleKeyDown(e, 0)}
                tabIndex={disabled ? -1 : 0}
                role='slider'
                aria-valuemin={min}
                aria-valuemax={clampedValue[1]}
                aria-valuenow={clampedValue[0]}
                aria-disabled={disabled}
                aria-describedby={hasAssistive ? assistiveId : undefined}
              />

              {/* Max thumb */}
              <div
                className={cn(
                  thumbClasses,
                  draggingThumb === 1 && "scale-115 ring-2 ring-blue-300"
                )}
                style={{
                  left: `${maxPercent}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                onPointerDown={e => handlePointerDown(e, 1)}
                onKeyDown={e => handleKeyDown(e, 1)}
                tabIndex={disabled ? -1 : 0}
                role='slider'
                aria-valuemin={clampedValue[0]}
                aria-valuemax={max}
                aria-valuenow={clampedValue[1]}
                aria-disabled={disabled}
                aria-describedby={hasAssistive ? assistiveId : undefined}
              />
            </div>
          </div>
        </div>

        {hasAssistive && (
          <div id={assistiveId} className={assistiveContainer}>
            {error && errorMessage ? (
              <span className={errorText}>{errorMessage}</span>
            ) : description ? (
              <span className={descriptionText}>{description}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

RangeInput.displayName = "RangeInput";
