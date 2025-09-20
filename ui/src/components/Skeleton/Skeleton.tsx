import React from "react";
import { cn, tw } from "../../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The shape of the skeleton
   * @default "rectangle"
   */
  variant?: "rectangle" | "circle" | "text";
  /**
   * The size of the skeleton
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The width of the skeleton (can be a number in pixels or a string like "100%")
   * @default "auto"
   */
  width?: number | string;
  /**
   * The height of the skeleton (can be a number in pixels or a string like "100%")
   * @default "auto"
   */
  height?: number | string;
  /**
   * Animation type for the skeleton
   * @default "shimmer"
   */
  animation?: "shimmer" | "wave" | "fade" | "pulse" | "none";
  /**
   * Number of skeleton lines for text variant
   * @default 1
   */
  lines?: number;
  /**
   * Whether to show the skeleton or not
   * @default true
   */
  show?: boolean;
}

const variants = {
  rectangle: tw`rounded-md`,
  circle: tw`rounded-full`,
  text: tw`rounded-sm`,
};

const sizes = {
  xs: tw`h-2`,
  sm: tw`h-3`,
  md: tw`h-4`,
  lg: tw`h-5`,
  xl: tw`h-6`,
};

const animations = {
  shimmer: tw`relative overflow-hidden before:absolute before:inset-0 before:z-10 before:w-full before:animate-[skeleton-shimmer_2s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent`,
  wave: tw`relative overflow-hidden before:absolute before:inset-0 before:z-10 before:animate-[skeleton-wave_1.5s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent`,
  fade: tw`animate-[skeleton-fade_1.5s_ease-in-out_infinite]`,
  pulse: tw`animate-pulse`,
  none: tw``,
};

const textLineSpacing = tw`mb-2 last:mb-0`;

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "rectangle",
      size = "md",
      width = "auto",
      height = "auto",
      animation = "shimmer",
      lines = 1,
      show = true,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    if (!show) return null;

    const skeletonStyle: React.CSSProperties = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      ...style,
    };

    if (variant === "text") {
      return (
        <div ref={ref} className={cn("flex flex-col", className)} {...props}>
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-sm bg-gray-100",
                sizes[size],
                animations[animation],
                textLineSpacing,
                // Make last line shorter for more realistic text appearance
                index === lines - 1 && lines > 1 && "w-3/4"
              )}
              style={{
                width: index === lines - 1 && lines > 1 ? "75%" : skeletonStyle.width,
                ...style,
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-gray-100",
          variants[variant],
          variant !== "circle" && sizes[size],
          animations[animation],
          className
        )}
        style={skeletonStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
