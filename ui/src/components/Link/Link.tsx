import { cn, tw } from "../../lib/utils";
import React from "react";

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /**
   * The visual style of the link
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "tertiary" | "destructive" | "none";
  /**
   * The size of the link
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * URL to navigate to
   */
  href: string;
  /**
   * Optional start icon - accepts any React element
   */
  startIcon?: React.ReactNode;
  /**
   * Optional end icon - accepts any React element
   */
  endIcon?: React.ReactNode;
  /**
   * Control the text decoration
   * @default "default"
   */
  underline?: "none" | "hover" | "always" | "default";
  /**
   * Control the border radius
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Animation effect on user interaction
   * @default "none"
   */
  animation?: "none" | "scale" | "glow" | "lift" | "press";
  /**
   * Link content (text, elements, etc.)
   */
  children: React.ReactNode;
  /**
   * Whether the link opens in a new tab
   * @default false
   */
  external?: boolean;
  /**
   * Control focus ring visibility
   * @default true
   */
  focusRing?: boolean;
}

const base = tw`inline-flex items-center gap-2 font-medium transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50`;

const variants = {
  primary: tw`text-primary hover:text-primary/80 active:text-primary/60`,
  secondary: tw`text-muted-foreground hover:text-foreground active:text-foreground/80`,
  tertiary: tw`text-muted-foreground/70 hover:text-muted-foreground active:text-foreground/70`,
  destructive: tw`text-destructive hover:text-destructive/80 active:text-destructive/60`,
  none: tw``,
};

const sizes = {
  xs: tw`gap-1 text-xs`,
  sm: tw`gap-1.5 text-sm`,
  md: tw`gap-2 text-base`,
  lg: tw`gap-2.5 text-lg`,
  xl: tw`gap-3 text-xl`,
};

const underlineOptions = {
  none: tw`no-underline`,
  hover: tw`no-underline hover:underline`,
  always: tw`underline`,
  default: tw``, // Uses browser default
};

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

const animations = {
  none: tw``,
  scale: tw`transition-transform duration-150 ease-out hover:scale-105 active:scale-95`,
  glow: tw`transition-shadow duration-200 ease-out hover:shadow-lg hover:shadow-current/25`,
  lift: tw`transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-[1px] hover:shadow-md active:-translate-y-[0.5px]`,
  press: tw`transition-transform duration-75 ease-out active:scale-95`,
};

const focusRingStyles = tw`rui-focus-ring focus:outline-none`;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      startIcon,
      endIcon,
      underline = "default",
      rounded = "md",
      animation = "none",
      children,
      external = false,
      focusRing = true,
      className = "",
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // Determine if link is external based on href or explicit external prop
    const isExternal =
      external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    // Auto-set target and rel for external links
    const linkTarget = target || (isExternal ? "_blank" : undefined);
    const linkRel =
      rel || (isExternal && linkTarget === "_blank" ? "noopener noreferrer" : undefined);

    const linkClasses = cn(
      base,
      variants[variant],
      sizes[size],
      underlineOptions[underline],
      roundedOptions[rounded],
      animations[animation],
      focusRing && focusRingStyles,
      className
    );

    const linkContent = (
      <>
        {startIcon && <span className="flex shrink-0 items-center">{startIcon}</span>}
        <span className="truncate">{children}</span>
        {endIcon && <span className="flex shrink-0 items-center">{endIcon}</span>}
      </>
    );

    return (
      <a href={href} ref={ref} className={linkClasses} target={linkTarget} rel={linkRel} {...props}>
        {linkContent}
      </a>
    );
  }
);

Link.displayName = "Link";
