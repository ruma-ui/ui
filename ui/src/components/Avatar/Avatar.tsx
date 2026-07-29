import React, { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { cn, tw } from "../../lib/utils";

export interface AvatarProps {
  /**
   * The visual style of the avatar
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the avatar
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Control the border radius of the avatar
   * @default "full"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Source URL for the avatar image
   */
  src?: string;
  /**
   * Alt text for the avatar image
   */
  alt?: string;
  /**
   * Fallback initials when no image is provided
   */
  initials?: string;
  /**
   * Custom fallback content (overrides initials)
   */
  fallback?: React.ReactNode;
  /**
   * Whether the avatar is clickable
   * @default false
   */
  clickable?: boolean;
  /**
   * Click handler for clickable avatars
   */
  onClick?: () => void;
  /**
   * Show online status indicator
   * @default false
   */
  showStatus?: boolean;
  /**
   * Status indicator type
   * @default "online"
   */
  status?: "online" | "offline" | "away" | "busy";
  /**
   * Custom class name
   */
  className?: string;
  /**
   * ID for the avatar element
   */
  id?: string;
}

// Base styles - Added border for shadow and ensured shadow-sm is always present for primary.
// We will use a border to hold the shadow, and outline for the status.
const avatarBase = tw`relative inline-flex items-center justify-center overflow-hidden bg-muted font-medium text-muted-foreground transition-all duration-150`;

// Variants
const variants = {
  primary: tw`border-2 border-background shadow-sm`,
  secondary: tw`border border-border`,
};

// Sizes
const sizes = {
  xs: { container: tw`h-6 w-6`, text: tw`text-xs` },
  sm: { container: tw`h-8 w-8`, text: tw`text-sm` },
  md: { container: tw`h-10 w-10`, text: tw`text-sm` },
  lg: { container: tw`h-12 w-12`, text: tw`text-base` },
  xl: { container: tw`h-16 w-16`, text: tw`text-lg` },
  "2xl": { container: tw`h-20 w-20`, text: tw`text-xl` },
} as const;

// Rounded options
const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

// Status outline styles
const statusOutlineStyles = {
  online: tw`outline-2 outline-offset-0 outline-success`,
  offline: tw`outline-2 outline-offset-0 outline-muted-foreground/60`,
  away: tw`outline-2 outline-offset-0 outline-warning`,
  busy: tw`outline-2 outline-offset-0 outline-destructive`,
};

// Clickable styles
const clickableStyles = tw`cursor-pointer hover:opacity-80 rui-focus-ring focus:outline-none`;

// Default user icon
const UserIcon = () => <HiOutlineUser className="text-muted-foreground/60 h-full w-full" />;

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "full",
      src,
      alt,
      initials,
      fallback,
      clickable = false,
      onClick,
      showStatus = false,
      status = "online",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const handleImageLoad = () => {
      setImageError(false);
    };

    const handleClick = () => {
      if (clickable && onClick) {
        onClick();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (clickable && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick?.();
      }
    };

    const avatarClasses = cn(
      avatarBase,
      variants[variant], // Always apply the variant's border (for shadow)
      showStatus && statusOutlineStyles[status], // Conditionally apply the status outline
      sizes[size].container,
      sizes[size].text,
      roundedOptions[rounded],
      clickable && clickableStyles,
      className
    );

    const showImage = src && !imageError;
    const showInitials = !showImage && initials;
    const showFallback = !showImage && !showInitials;

    return (
      <div
        ref={ref}
        className={avatarClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? "button" : undefined}
        id={id}
        {...props}
      >
        {/* Image */}
        {showImage && (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="h-full w-full object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}

        {/* Initials */}
        {showInitials && <span className="uppercase select-none">{initials.slice(0, 2)}</span>}

        {/* Fallback */}
        {showFallback && (
          <div className="flex h-full w-full items-center justify-center">
            {fallback || <UserIcon />}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
