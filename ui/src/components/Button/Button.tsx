import React from "react";
import { Loader } from "../../";
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

const base = tw`relative inline-flex transform-gpu cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50`;

const variants = {
  primary: tw`bg-blue-600 text-white shadow-sm hover:bg-blue-500 hover:shadow-md`,
  secondary: tw`bg-gray-200 text-black shadow-sm outline outline-gray-300 hover:bg-gray-200/80 hover:shadow-md`,
  outline: tw`border border-blue-600 bg-transparent text-blue-600 hover:border-blue-700 hover:bg-blue-50`,
  tertiary: tw`border border-gray-300 bg-white text-gray-900 shadow-sm hover:shadow-md`,
  destructive: tw`bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md`,
  none: tw``,
};

const sizes = {
  xs: tw`h-6 min-w-[1.5rem] gap-1 px-2 py-1 text-xs`,
  sm: tw`h-8 min-w-[2rem] gap-1.5 px-3 py-1.5 text-sm`,
  md: tw`h-10 min-w-[2.5rem] gap-2 px-4 py-2 text-base`,
  lg: tw`h-12 min-w-[3rem] gap-2.5 px-6 py-3 text-lg`,
  xl: tw`h-14 min-w-[3.5rem] gap-3 px-8 py-4 text-xl`,
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
  glow: tw`transition-shadow duration-200 ease-out hover:shadow-lg hover:shadow-blue-500/25`,
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
      rounded = "md",
      animation = "none",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    // Combine forwarded ref and local ref
    React.useImperativeHandle(ref, () => btnRef.current as HTMLButtonElement);

    type Ripple = { id: number; x: number; y: number; size: number };
    const [ripples, setRipples] = React.useState<Ripple[]>([]);

    const createRipple = (e: { clientX?: number; clientY?: number; type?: string }) => {
      if (animation !== "ripple" || isDisabled) return;
      const el = btnRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8; // cover fully
      let x = rect.width / 2;
      let y = rect.height / 2;
      if (typeof e.clientX === "number" && typeof e.clientY === "number") {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      const id = Date.now() + Math.random();
      setRipples(prev => [...prev.slice(-3), { id, x, y, size }]);
      // cleanup after animation
      window.setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 500);
    };

    // Variant-aware ripple opacity (color uses currentColor)
    const rippleVars = React.useMemo(() => {
      let opacity = 0.3;
      if (variant === "primary" || variant === "destructive") opacity = 0.35;
      else if (variant === "secondary") opacity = 0.25;
      else if (variant === "outline" || variant === "tertiary") opacity = 0.2;
      return {
        "--rui-ripple-opacity": String(opacity),
      } as React.CSSProperties & {
        "--rui-ripple-opacity": string;
      };
    }, [variant]);

    // Compose user-provided handlers
    const { onPointerDown, onKeyDown, style, ...restProps } =
      props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent<HTMLButtonElement>) => {
        onPointerDown?.(e);
        createRipple(e);
      },
      [onPointerDown, animation, isDisabled]
    );
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          createRipple({});
        }
      },
      [onKeyDown, animation, isDisabled]
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
                style={{
                  left: r.x,
                  top: r.y,
                  width: r.size,
                  height: r.size,
                }}
              />
            ))}
          </span>
        )}
        {loading && (
          <Loader
            type="spinner"
            variant="primary"
            color="currentColor"
            size={
              size === "xs"
                ? "xs"
                : size === "sm"
                  ? "xs"
                  : size === "md"
                    ? "sm"
                    : size === "lg"
                      ? "md"
                      : "md"
            }
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
