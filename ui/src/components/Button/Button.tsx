import React from "react";
import { Loader } from "../Loader/Loader";
import { cn, tw } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "outline" | "tertiary" | "destructive" | "none";
  /**
   * The size of the button
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Optional left icon - accepts any React element
   */
  startIcon?: React.ReactNode;
  /**
   * Optional right icon - accepts any React element
   */
  endIcon?: React.ReactNode;
  /**
   * Show a loading spinner and disable the button
   * @default false
   */
  loading?: boolean;
  /**
   * Make button take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Control the border radius of the button
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Animation effect on user interaction
   * @default "none"
   */
  animation?: "none" | "scale" | "glow" | "lift" | "ripple" | "press";
  /**
   * Button content (text, elements, etc.)
   */
  children: React.ReactNode;
}

// rui-focus-ring provides the :focus-visible ring — 2px offset + 2px ring
const base = tw`rui-focus-ring relative inline-flex transform-gpu cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50`;

const variants = {
  primary: tw`bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md`,
  secondary: tw`bg-secondary text-secondary-foreground shadow-sm ring-1 ring-border hover:bg-secondary/80 hover:shadow-md`,
  outline: tw`border border-primary bg-transparent text-primary hover:bg-accent hover:text-accent-foreground`,
  tertiary: tw`border border-border bg-background text-foreground shadow-sm hover:bg-muted hover:shadow-md`,
  destructive: tw`bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md`,
  none: tw``,
};

const sizes = {
  xs: tw`h-7 min-w-[1.5rem] gap-1 px-2 py-1 text-xs`,
  sm: tw`h-8 min-w-[2rem] gap-1.5 px-2.5 py-1.5 text-xs`,
  md: tw`h-9 min-w-[2.5rem] gap-2 px-3 py-1.5 text-sm`,
  lg: tw`h-10 min-w-[3rem] gap-2.5 px-4 py-2 text-sm`,
  xl: tw`h-12 min-w-[3.5rem] gap-3 px-5 py-2.5 text-base`,
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
  glow: tw`transition-shadow duration-200 ease-out hover:shadow-lg hover:shadow-primary/25`,
  lift: tw`transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-[2px] hover:shadow-lg active:-translate-y-[1px]`,
  ripple: tw`overflow-hidden`,
  press: tw`transition-transform duration-75 ease-out active:scale-95`,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      startIcon,
      endIcon,
      loading = false,
      fullWidth = false,
      rounded = "sm",
      animation = "none",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    React.useImperativeHandle(ref, () => btnRef.current as HTMLButtonElement);

    type Ripple = { id: number; x: number; y: number; size: number };
    const [ripples, setRipples] = React.useState<Ripple[]>([]);

    const createRipple = React.useCallback(
      (e: { clientX?: number; clientY?: number }) => {
        if (animation !== "ripple" || isDisabled) return;
        const el = btnRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.8;
        let x = rect.width / 2;
        let y = rect.height / 2;
        if (typeof e.clientX === "number" && typeof e.clientY === "number") {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
        }
        const id = Date.now() + Math.random();
        setRipples(prev => [...prev.slice(-3), { id, x, y, size }]);
        window.setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id));
        }, 500);
      },
      [animation, isDisabled]
    );

    const rippleVars = React.useMemo(() => {
      let opacity = 0.3;
      if (variant === "primary" || variant === "destructive") opacity = 0.35;
      else if (variant === "secondary") opacity = 0.25;
      else if (variant === "outline" || variant === "tertiary") opacity = 0.2;
      return { "--rui-ripple-opacity": String(opacity) } as React.CSSProperties & {
        "--rui-ripple-opacity": string;
      };
    }, [variant]);

    const { onPointerDown, onKeyDown, style, ...restProps } =
      props as React.ButtonHTMLAttributes<HTMLButtonElement>;

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent<HTMLButtonElement>) => {
        onPointerDown?.(e);
        createRipple(e);
      },
      [onPointerDown, createRipple]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") createRipple({});
      },
      [onKeyDown, createRipple]
    );

    return (
      <button
        ref={btnRef}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          roundedOptions[rounded],
          animations[animation],
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        style={{ ...style, ...rippleVars }}
        {...restProps}
      >
        {animation === "ripple" && !loading && ripples.length > 0 && (
          <span aria-hidden className="pointer-events-none absolute inset-0">
            {ripples.map(r => (
              <span
                key={r.id}
                className="rui-ripple"
                style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
              />
            ))}
          </span>
        )}
        {loading && (
          <Loader
            type="spinner"
            variant="primary"
            color="currentColor"
            size={size === "xs" ? "xs" : size === "sm" ? "xs" : size === "md" ? "sm" : "md"}
            speed="normal"
            strokeWidth="thick"
          />
        )}
        {startIcon && !loading && <span className="flex shrink-0 items-center">{startIcon}</span>}
        <span className="truncate">{children}</span>
        {endIcon && !loading && <span className="flex shrink-0 items-center">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
