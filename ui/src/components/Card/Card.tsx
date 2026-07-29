import React from "react";
import { cn, tw } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style of the card
   * @default "default"
   */
  variant?: "default" | "outlined" | "elevated" | "filled";
  /**
   * The padding size inside the card
   * @default "md"
   */
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Control the border radius of the card
   * @default "lg"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Shadow elevation level
   * @default "sm"
   */
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Whether the card is clickable
   * @default false
   */
  clickable?: boolean;
  /**
   * Whether the card is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Click handler for clickable cards
   */
  onClick?: () => void;
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Additional classes for the card container
   */
  className?: string;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const cardBase = tw`relative bg-card text-card-foreground transition-all duration-200`;

const variants = {
  default: tw`border border-border`,
  outlined: tw`border-2 border-border`,
  elevated: tw`border border-border`,
  filled: tw`border border-border bg-muted`,
};

const paddings = {
  none: tw``,
  sm: tw`p-3`,
  md: tw`p-4`,
  lg: tw`p-6`,
  xl: tw`p-8`,
};

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

const shadows = {
  none: tw``,
  sm: tw`shadow-sm`,
  md: tw`shadow-md`,
  lg: tw`shadow-lg`,
  xl: tw`shadow-xl`,
};

// rui-focus-ring: keyboard-only :focus-visible ring
const clickableStyles = tw`rui-focus-ring cursor-pointer`;

const disabledStyles = tw`pointer-events-none cursor-not-allowed opacity-60`;

const hoverStates = {
  default: tw`hover:border-ring/40 hover:shadow-sm`,
  outlined: tw`hover:border-ring/40`,
  elevated: tw`hover:shadow-md`,
  filled: tw`hover:bg-secondary`,
};

export const Card = React.forwardRef<HTMLDivElement | HTMLButtonElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      rounded = "lg",
      shadow = "sm",
      clickable = false,
      disabled = false,
      onClick,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (clickable && !disabled && onClick) onClick();
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (clickable && !disabled && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick?.();
      }
    };

    const cardClasses = cn(
      cardBase,
      variants[variant],
      paddings[padding],
      roundedOptions[rounded],
      shadows[shadow],
      clickable && !disabled && clickableStyles,
      clickable && !disabled && hoverStates[variant],
      disabled && disabledStyles,
      className
    );

    if (clickable) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={cardClasses}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cardClasses}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={cn("border-border mb-3 border-b pb-3", className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  )
);
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={cn("border-border mt-3 border-t pt-3", className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";
