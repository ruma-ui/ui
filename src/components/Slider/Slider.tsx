import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

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

// Design primitives
const wrapperBase = tw`relative inline-flex flex-col`;
const containerBase = tw`inline-flex flex-col gap-2`;
const sliderBase = tw`relative w-full cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`;

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

const labelBase = tw`mb-2 font-medium text-gray-900`;
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
        ref,
    ) => {
        const [internalValue, setInternalValue] = useState(defaultValue);
        const sliderRef = useRef<HTMLDivElement>(null);
        const trackRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);

        const autoId = React.useId();
        const sliderId = id ?? autoId;
        const hasAssistive = Boolean(description || (error && errorMessage));
        const assistiveId = `${sliderId}-desc`;

        // Determine if component is controlled
        const isControlled = value !== undefined;

        // Update internal state when controlled value changes (for initialization)
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

        // Clamp value between min and max
        const clampedValue = Math.min(Math.max(currentValue, min), max);

        // Calculate percentage for styling
        const percentage = ((clampedValue - min) / (max - min)) * 100;

        const formatValue = (val: number) => {
            return valueFormatter ? valueFormatter(val) : val.toString();
        };

        const getValueFromPosition = (clientX: number) => {
            if (!trackRef.current) return clampedValue;

            const rect = trackRef.current.getBoundingClientRect();
            const percent = (clientX - rect.left) / rect.width;

            const clampedPercent = Math.max(0, Math.min(1, percent));
            const rawValue = clampedPercent * (max - min) + min;

            // Round to nearest step
            const steppedValue = Math.round(rawValue / step) * step;
            return Math.min(Math.max(steppedValue, min), max);
        };

        const handleTrackClick = (e: React.PointerEvent) => {
            if (disabled) return;

            e.preventDefault();
            const newValue = getValueFromPosition(e.clientX);
            updateValue(newValue);
            onChangeEnd?.(newValue);
        };

        const handlePointerDown = (e: React.PointerEvent) => {
            if (disabled) return;

            e.preventDefault();
            setIsDragging(true);
            let currentValue = getValueFromPosition(e.clientX);
            updateValue(currentValue);

            // Add global listeners for drag
            const handlePointerMove = (e: PointerEvent) => {
                e.preventDefault();
                currentValue = getValueFromPosition(e.clientX);
                updateValue(currentValue);
            };

            const handlePointerUp = () => {
                setIsDragging(false);
                onChangeEnd?.(currentValue);
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp);
            };

            document.addEventListener("pointermove", handlePointerMove);
            document.addEventListener("pointerup", handlePointerUp);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (disabled) return;

            let newValue = clampedValue;

            switch (e.key) {
                case "ArrowLeft":
                case "ArrowDown":
                    e.preventDefault();
                    newValue = Math.max(min, clampedValue - step);
                    break;
                case "ArrowRight":
                case "ArrowUp":
                    e.preventDefault();
                    newValue = Math.min(max, clampedValue + step);
                    break;
                case "Home":
                    e.preventDefault();
                    newValue = min;
                    break;
                case "End":
                    e.preventDefault();
                    newValue = max;
                    break;
                case "PageUp":
                    e.preventDefault();
                    newValue = Math.min(max, clampedValue + (max - min) * 0.1);
                    break;
                case "PageDown":
                    e.preventDefault();
                    newValue = Math.max(min, clampedValue - (max - min) * 0.1);
                    break;
                default:
                    return;
            }

            updateValue(newValue);
            onChangeEnd?.(newValue);
        };

        const updateValue = (newValue: number) => {
            const clamped = Math.min(Math.max(newValue, min), max);

            if (isControlled) {
                // For controlled components, just call onChange
                onChange?.(clamped);
            } else {
                // For uncontrolled components, update internal state
                setInternalValue(clamped);
                onChange?.(clamped);
            }
        };

        const trackClasses = cn(trackBase, sizes[size].track, className);

        const thumbClasses = cn(
            thumbBase,
            sizes[size].thumb,
            error && errorStyles,
            disabled && "shadow-none",
            isDragging && "ring-2 ring-blue-300",
        );

        const labelClasses = cn(
            labelBase,
            labelSizes[size],
            error && "text-red-700",
            disabled && "text-gray-500",
        );

        const valueLabelClasses = cn(
            valueLabelBase,
            valueLabelSizes[size],
            error && "text-red-700",
            disabled && "text-gray-500",
        );

        return (
            <div ref={ref} className={wrapperBase}>
                {label && (
                    <div className="flex items-center justify-between">
                        <label htmlFor={sliderId} className={labelClasses}>
                            {label}
                        </label>
                        {showValue && (
                            <span className={valueLabelClasses}>{formatValue(clampedValue)}</span>
                        )}
                    </div>
                )}

                <div className={cn(containerBase, "w-full min-w-[200px]")}>
                    <div
                        ref={sliderRef}
                        className={sliderBase}
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
                        <div
                            ref={trackRef}
                            className={cn(trackClasses, "absolute top-1/2 -translate-y-1/2")}
                            onPointerDown={handleTrackClick}
                        >
                            <div
                                className={cn(
                                    "absolute top-0 left-0 h-full rounded-full",
                                    trackVariants[variant],
                                )}
                                style={{
                                    width: `${percentage}%`,
                                }}
                            />
                            <div
                                className={thumbClasses}
                                style={{
                                    left: `${percentage}%`,
                                    top: "50%",
                                    transform: `translateX(-50%) translateY(-50%)`,
                                }}
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
    },
);

Slider.displayName = "Slider";
