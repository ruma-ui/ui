import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";
import NextImage from "next/image";
import { Skeleton } from "@/components";

export interface ImageProps
    extends Omit<React.ComponentProps<typeof NextImage>, "src" | "alt" | "width" | "height"> {
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
}

const base = tw`inline-block overflow-hidden`;

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
        ref,
    ) => {
        const aspectClass =
            typeof aspectRatio === "number"
                ? `aspect-[${aspectRatio}]`
                : aspectRatioOptions[aspectRatio] || tw``;

        const [hasError, setHasError] = React.useState(false);
        const [isLoaded, setIsLoaded] = React.useState(false);

        // For Next.js Image, width and height are required unless fill is true
        const imageWidth = fill ? undefined : typeof width === "number" ? width : 300;
        const imageHeight = fill ? undefined : typeof height === "number" ? height : 200;

        const handleLoad = React.useCallback(
            (e: React.SyntheticEvent<HTMLImageElement>) => {
                setIsLoaded(true);
                onLoad?.(e);
            },
            [onLoad],
        );

        const handleError = React.useCallback(
            (e: React.SyntheticEvent<HTMLImageElement>) => {
                setHasError(true);
                onError?.(e);
            },
            [onError],
        );

        // Show fallback if image failed to load
        if (hasError && fallback) {
            return (
                <div
                    className={cn(base, aspectClass, roundedOptions[rounded], className)}
                    style={style}
                >
                    {fallback}
                </div>
            );
        }

        return (
            <div
                className={cn(base, aspectClass, roundedOptions[rounded], className)}
                style={style}
            >
                {/* Always render the image to trigger loading events */}
                <NextImage
                    ref={ref}
                    src={src}
                    alt={alt}
                    width={imageWidth}
                    height={imageHeight}
                    fill={fill}
                    className={cn(
                        fitOptions[fit],
                        isLoaded ? "opacity-100" : "opacity-0",
                        "transition-opacity duration-300 ease-in-out",
                    )}
                    onLoad={handleLoad}
                    onError={handleError}
                    {...props}
                />

                {/* Show skeleton overlay while loading */}
                {showSkeleton && !isLoaded && (
                    <Skeleton
                        variant={skeletonVariant}
                        size="xs" // Use smallest size to minimize default styling
                        width={typeof width === "number" ? width : "100%"}
                        height={typeof height === "number" ? height : "100%"}
                        animation={skeletonAnimation}
                        className={cn(
                            roundedOptions[rounded],
                            "absolute z-10",
                            typeof width === "number"
                                ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                : "inset-0",
                        )}
                    />
                )}
            </div>
        );
    },
);
Image.displayName = "Image";
