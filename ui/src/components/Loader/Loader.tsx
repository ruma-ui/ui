import { cn, tw } from "../../lib/utils";
import React from "react";

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
  /**
   * Controls the stroke width for spinner and ring loaders
   * @default "normal"
   */
  strokeWidth?: "thin" | "normal" | "thick";
}

const base = tw`inline-flex items-center justify-center`;

const variants = {
  primary: tw`text-primary`,
  secondary: tw`text-muted-foreground`,
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
  xs: { size: 16 },
  sm: { size: 24 },
  md: { size: 32 },
  lg: { size: 48 },
  xl: { size: 64 },
};

const strokeWidths = {
  thin: {
    xs: 1.5,
    sm: 1.5,
    md: 2,
    lg: 2.5,
    xl: 3,
  },
  normal: {
    xs: 2,
    sm: 2,
    md: 2.5,
    lg: 3,
    xl: 3.5,
  },
  thick: {
    xs: 2.5,
    sm: 3,
    md: 3.5,
    lg: 4,
    xl: 5,
  },
};

const renderSpinner = (
  size: keyof typeof sizes,
  variant: keyof typeof variants,
  speed: keyof typeof speeds,
  strokeWidth: keyof typeof strokeWidths
) => {
  const { size: svgSize } = spinnerSizes[size];
  const strokeWidthValue = strokeWidths[strokeWidth][size];
  const radius = svgSize / 2 - strokeWidthValue;
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
        strokeWidth={strokeWidthValue}
        opacity="0.25"
      />
      <path
        d={`M ${center} ${strokeWidthValue} A ${radius} ${radius} 0 0 1 ${
          center + radius
        } ${center}`}
        stroke="currentColor"
        strokeWidth={strokeWidthValue}
        strokeLinecap="round"
      />
    </svg>
  );
};

const renderDots = (
  size: keyof typeof sizes,
  variant: keyof typeof variants,
  speed: keyof typeof speeds
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

  return (
    <div className={cn("flex", dotSpacing[size])}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={cn(
            dotSize[size],
            "rounded-full bg-current",
            speed === "fast" && "animate-[bounce_0.6s_infinite]",
            speed === "normal" && "animate-[bounce_1.4s_infinite]",
            speed === "slow" && "animate-[bounce_2s_infinite]"
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
  speed: keyof typeof speeds
) => {
  return (
    <div
      className={cn(
        sizes[size],
        "rounded-full bg-current",
        speed === "fast" && "animate-[pulse_0.8s_ease-in-out_infinite]",
        speed === "normal" && "animate-pulse",
        speed === "slow" && "animate-[pulse_3s_ease-in-out_infinite]"
      )}
    />
  );
};

const renderWave = (
  size: keyof typeof sizes,
  variant: keyof typeof variants,
  speed: keyof typeof speeds
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
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          className={cn(
            barWidth[size],
            "bg-current",
            speed === "fast" && "animate-[wave_0.6s_ease-in-out_infinite]",
            speed === "normal" && "animate-[wave_1.2s_ease-in-out_infinite]",
            speed === "slow" && "animate-[wave_2s_ease-in-out_infinite]"
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
  speed: keyof typeof speeds
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
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={cn(
            barWidth[size],
            "bg-current",
            barHeight[size],
            speed === "fast" && "animate-[bounce_0.6s_infinite]",
            speed === "normal" && "animate-[bounce_1.4s_infinite]",
            speed === "slow" && "animate-[bounce_2s_infinite]"
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
  strokeWidth: keyof typeof strokeWidths
) => {
  const borderWidthClasses = {
    thin: {
      xs: "border-[1.5px]",
      sm: "border-[1.5px]",
      md: "border-2",
      lg: "border-[2.5px]",
      xl: "border-[3px]",
    },
    normal: {
      xs: "border-2",
      sm: "border-2",
      md: "border-[2.5px]",
      lg: "border-[3px]",
      xl: "border-[3.5px]",
    },
    thick: {
      xs: "border-[2.5px]",
      sm: "border-[3px]",
      md: "border-[3.5px]",
      lg: "border-4",
      xl: "border-[5px]",
    },
  };

  return (
    <div
      className={cn(
        sizes[size],
        "rounded-full border-current border-t-transparent",
        borderWidthClasses[strokeWidth][size],
        speeds[speed]
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
      strokeWidth = "normal",
      ...props
    },
    ref
  ) => {
    const renderLoader = () => {
      switch (type) {
        case "spinner":
          return renderSpinner(size, variant, speed, strokeWidth);
        case "dots":
          return renderDots(size, variant, speed);
        case "pulse":
          return renderPulse(size, variant, speed);
        case "wave":
          return renderWave(size, variant, speed);
        case "bars":
          return renderBars(size, variant, speed);
        case "ring":
          return renderRing(size, variant, speed, strokeWidth);
        default:
          return renderSpinner(size, variant, speed, strokeWidth);
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
          className
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
  }
);

Loader.displayName = "Loader";
