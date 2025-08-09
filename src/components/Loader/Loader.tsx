import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The visual style of the loader
     * @default "primary"
     */
    variant?: "primary" | "secondary";
    /**
     * Custom color for the loader (overrides variant)
     */
    color?: string;
    /**
     * The size of the loader
     * @default "md"
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * The type of loader animation
     * @default "spinner"
     */
    type?: "spinner" | "dots" | "pulse" | "wave" | "bars" | "ring";
    /**
     * Optional text label displayed below the loader
     */
    label?: string;
    /**
     * Make loader take full width and height of its container
     * @default false
     */
    fullSize?: boolean;
    /**
     * Animation speed of the loader
     * @default "normal"
     */
    speed?: "slow" | "normal" | "fast";
}

const base = tw`inline-flex items-center justify-center`;

const variants = {
    primary: tw`text-blue-600`,
    secondary: tw`text-gray-600`,
};

const sizes = {
    xs: tw`h-4 w-4`,
    sm: tw`h-6 w-6`,
    md: tw`h-8 w-8`,
    lg: tw`h-12 w-12`,
    xl: tw`h-16 w-16`,
};

const speeds = {
    slow: tw`animate-[spin_2s_linear_infinite]`,
    normal: tw`animate-spin`,
    fast: tw`animate-[spin_0.5s_linear_infinite]`,
};

const spinnerSizes = {
    xs: { strokeWidth: 2, size: 16 },
    sm: { strokeWidth: 2, size: 24 },
    md: { strokeWidth: 2.5, size: 32 },
    lg: { strokeWidth: 3, size: 48 },
    xl: { strokeWidth: 3.5, size: 64 },
};

const renderSpinner = (
    size: keyof typeof sizes,
    variant: keyof typeof variants,
    speed: keyof typeof speeds,
) => {
    const { strokeWidth, size: svgSize } = spinnerSizes[size];
    const radius = svgSize / 2 - strokeWidth;
    const center = svgSize / 2;

    return (
        <svg
            className={cn(sizes[size], speeds[speed])}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                opacity="0.25"
            />
            <path
                d={`M ${center} ${strokeWidth} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    );
};

const renderDots = (
    size: keyof typeof sizes,
    variant: keyof typeof variants,
    speed: keyof typeof speeds,
) => {
    const dotSize = {
        xs: "w-1 h-1",
        sm: "w-1.5 h-1.5",
        md: "w-2 h-2",
        lg: "w-3 h-3",
        xl: "w-4 h-4",
    };

    const dotSpacing = {
        xs: "space-x-1",
        sm: "space-x-1",
        md: "space-x-1",
        lg: "space-x-1.5",
        xl: "space-x-2",
    };

    const animationDelay = speed === "fast" ? "0.25s" : speed === "slow" ? "1s" : "0.5s";

    return (
        <div className={cn("flex", dotSpacing[size])}>
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={cn(
                        dotSize[size],
                        "rounded-full bg-current",
                        speed === "fast" && "animate-[bounce_0.6s_infinite]",
                        speed === "normal" && "animate-[bounce_1.4s_infinite]",
                        speed === "slow" && "animate-[bounce_2s_infinite]",
                    )}
                    style={{
                        animationDelay: `${i * (speed === "fast" ? 0.1 : speed === "slow" ? 0.3 : 0.2)}s`,
                    }}
                />
            ))}
        </div>
    );
};

const renderPulse = (
    size: keyof typeof sizes,
    variant: keyof typeof variants,
    speed: keyof typeof speeds,
) => {
    return (
        <div
            className={cn(
                sizes[size],
                "rounded-full bg-current",
                speed === "fast" && "animate-[pulse_0.8s_ease-in-out_infinite]",
                speed === "normal" && "animate-pulse",
                speed === "slow" && "animate-[pulse_3s_ease-in-out_infinite]",
            )}
        />
    );
};

const renderWave = (
    size: keyof typeof sizes,
    variant: keyof typeof variants,
    speed: keyof typeof speeds,
) => {
    const barWidth = {
        xs: "w-0.5",
        sm: "w-0.5",
        md: "w-1",
        lg: "w-1.5",
        xl: "w-2",
    };

    const barSpacing = {
        xs: "space-x-0.5",
        sm: "space-x-0.5",
        md: "space-x-0.5",
        lg: "space-x-1",
        xl: "space-x-1",
    };

    return (
        <div className={cn("flex items-end", barSpacing[size], sizes[size])}>
            {[0, 1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={cn(
                        barWidth[size],
                        "bg-current",
                        speed === "fast" && "animate-[wave_0.6s_ease-in-out_infinite]",
                        speed === "normal" && "animate-[wave_1.2s_ease-in-out_infinite]",
                        speed === "slow" && "animate-[wave_2s_ease-in-out_infinite]",
                    )}
                    style={{
                        height: "100%",
                        animationDelay: `${i * (speed === "fast" ? 0.05 : speed === "slow" ? 0.2 : 0.1)}s`,
                        transformOrigin: "bottom",
                    }}
                />
            ))}
        </div>
    );
};

const renderBars = (
    size: keyof typeof sizes,
    variant: keyof typeof variants,
    speed: keyof typeof speeds,
) => {
    const barHeight = {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
    };

    const barWidth = {
        xs: "w-0.5",
        sm: "w-1",
        md: "w-1",
        lg: "w-1.5",
        xl: "w-2",
    };

    const barSpacing = {
        xs: "space-x-0.5",
        sm: "space-x-0.5",
        md: "space-x-0.5",
        lg: "space-x-1",
        xl: "space-x-1",
    };

    return (
        <div className={cn("flex items-center", barSpacing[size])}>
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={cn(
                        barWidth[size],
                        "bg-current",
                        barHeight[size],
                        speed === "fast" && "animate-[bounce_0.6s_infinite]",
                        speed === "normal" && "animate-[bounce_1.4s_infinite]",
                        speed === "slow" && "animate-[bounce_2s_infinite]",
                    )}
                    style={{
                        animationDelay: `${i * (speed === "fast" ? 0.1 : speed === "slow" ? 0.3 : 0.2)}s`,
                    }}
                />
            ))}
        </div>
    );
};

const renderRing = (
    size: keyof typeof sizes,
    variant: keyof typeof variants,
    speed: keyof typeof speeds,
) => {
    const borderWidth = {
        xs: "border-2",
        sm: "border-2",
        md: "border-[2.5px]",
        lg: "border-[3px]",
        xl: "border-[3.5px]",
    };

    return (
        <div
            className={cn(
                sizes[size],
                "rounded-full border-current border-t-transparent",
                borderWidth[size],
                speeds[speed],
            )}
        />
    );
};

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
    (
        {
            variant = "primary",
            color,
            size = "md",
            type = "spinner",
            className = "",
            label,
            fullSize = false,
            speed = "normal",
            ...props
        },
        ref,
    ) => {
        const renderLoader = () => {
            switch (type) {
                case "spinner":
                    return renderSpinner(size, variant, speed);
                case "dots":
                    return renderDots(size, variant, speed);
                case "pulse":
                    return renderPulse(size, variant, speed);
                case "wave":
                    return renderWave(size, variant, speed);
                case "bars":
                    return renderBars(size, variant, speed);
                case "ring":
                    return renderRing(size, variant, speed);
                default:
                    return renderSpinner(size, variant, speed);
            }
        };

        return (
            <div
                ref={ref}
                className={cn(
                    base,
                    !color && variants[variant],
                    fullSize && "h-full w-full",
                    label && "flex-col gap-2",
                    className,
                )}
                style={color ? { color } : undefined}
                role="status"
                aria-label={label || "Loading"}
                {...props}
            >
                {renderLoader()}
                {label && <span className="text-sm font-medium text-current">{label}</span>}
            </div>
        );
    },
);

Loader.displayName = "Loader";
