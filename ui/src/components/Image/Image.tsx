import React from "react";
import { Skeleton } from "../../";
import { cn, tw } from "../../lib/utils";

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> {
  /**
   * The source URL of the image
   */
  src: string;
  /**
   * Alternative text for the image (required for accessibility)
   */
  alt: string;
  /**
   * The width of the image
   */
  width?: number | string;
  /**
   * The height of the image
   */
  height?: number | string;
  /**
   * How the image should be resized to fit its container
   * @default "cover"
   */
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  /**
   * Aspect ratio preset or custom ratio (width/height)
   * @default "auto"
   */
  aspectRatio?: "square" | "video" | "wide" | "portrait" | number | "auto";
  /**
   * Control the border radius of the image
   * @default "none"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Show skeleton loader while image is loading
   * @default false
   */
  showSkeleton?: boolean;
  /**
   * Fallback content to show when image fails to load
   */
  fallback?: React.ReactNode;
  /**
   * Skeleton animation type
   * @default "shimmer"
   */
  skeletonAnimation?: "shimmer" | "wave" | "fade" | "pulse" | "none";
  /**
   * Skeleton variant
   * @default "rectangle"
   */
  skeletonVariant?: "rectangle" | "circle";
  /**
   * Whether the image should fill its container
   * @default false
   */
  fill?: boolean;
}

const base = tw`relative inline-block overflow-hidden`;

const fitOptions = {
  contain: tw`object-contain`,
  cover: tw`object-cover`,
  fill: tw`object-fill`,
  none: tw`object-none`,
  "scale-down": tw`object-scale-down`,
};

const aspectRatioOptions = {
  square: tw`aspect-square`,
  video: tw`aspect-video`,
  wide: tw`aspect-[16/9]`,
  portrait: tw`aspect-[3/4]`,
  auto: tw``,
};

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fit = "cover",
      aspectRatio = "auto",
      rounded = "none",
      className = "",
      style,
      fill = false,
      showSkeleton = false,
      fallback,
      skeletonAnimation = "shimmer",
      skeletonVariant = "rectangle",
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const aspectClass = fill
      ? tw`` // Don't apply aspect ratio when using fill
      : typeof aspectRatio === "number"
        ? `aspect-[${aspectRatio}]`
        : aspectRatioOptions[aspectRatio] || tw``;

    const [hasError, setHasError] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(fill); // Start loaded for fill mode

    const handleLoad = React.useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoaded(true);
        onLoad?.(e);
      },
      [onLoad]
    );

    const handleError = React.useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setHasError(true);
        onError?.(e);
      },
      [onError]
    );

    // Show fallback if image failed to load
    if (hasError && fallback) {
      return (
        <div className={cn(base, aspectClass, roundedOptions[rounded], className)} style={style}>
          {fallback}
        </div>
      );
    }

    return (
      <div
        className={cn(
          base,
          fill ? "h-full w-full" : "",
          aspectClass,
          roundedOptions[rounded],
          className
        )}
        style={style}
      >
        {/* Always render the image to trigger loading events */}
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            fitOptions[fit],
            fill ? "h-full w-full" : "",
            isLoaded ? "opacity-100" : "opacity-0",
            "transition-opacity duration-300 ease-in-out"
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />

        {/* Show skeleton overlay while loading */}
        {showSkeleton && !isLoaded && (
          <Skeleton
            variant={skeletonVariant}
            size='xs' // Use smallest size to minimize default styling
            width={fill ? "100%" : typeof width === "number" ? width : 300}
            height={fill ? "100%" : typeof height === "number" ? height : 200}
            animation={skeletonAnimation}
            className={cn(
              roundedOptions[rounded],
              "absolute inset-0 z-10 flex items-center justify-center",
              fill ? "h-full w-full" : ""
            )}
            style={
              fill
                ? {}
                : {
                    width: typeof width === "number" ? width : 300,
                    height: typeof height === "number" ? height : 200,
                  }
            }
          />
        )}
      </div>
    );
  }
);
Image.displayName = "Image";
