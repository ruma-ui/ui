import React from "react";
import { Loader } from "../../";
import { cn, tw } from "../../lib/utils";

export interface FloatingActionButtonAction {
  /**
   * Unique identifier for the action
   */
  id: string;
  /**
   * Icon to display for the action
   */
  icon: React.ReactNode;
  /**
   * Tooltip text for the action
   */
  tooltip?: string;
  /**
   * Click handler for the action
   */
  onClick: () => void;
  /**
   * Whether the action is disabled
   */
  disabled?: boolean;
  /**
   * Variant for the action button
   */
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
}

export interface FloatingActionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  /**
   * The visual style of the floating action button
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  /**
   * The size of the floating action button
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * The position of the floating action button
   * @default "bottom-right"
   */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /**
   * Icon to display in the button - required for FABs
   */
  icon: React.ReactNode;
  /**
   * List of additional actions to display when expanded
   */
  actions?: FloatingActionButtonAction[];
  /**
   * Show a loading spinner and disable the button
   * @default false
   */
  loading?: boolean;
  /**
   * Animation effect on user interaction
   * @default "scale"
   */
  animation?: "none" | "scale" | "glow" | "lift" | "ripple" | "press";
  /**
   * Control the border radius of the button
   * @default "full"
   */
  rounded?: "full" | "xl" | "lg";
  /**
   * Optional tooltip text for accessibility
   */
  tooltip?: string;
  /**
   * Whether to show the tooltip
   * @default false
   */
  showTooltip?: boolean;
  /**
   * Whether the actions are initially expanded
   * @default false
   */
  expanded?: boolean;
  /**
   * Callback when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;
}

const base = tw`fixed z-50 inline-flex transform-gpu cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-200 select-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50`;

const variants = {
  primary: tw`bg-blue-600 text-white shadow-lg hover:bg-blue-500 hover:shadow-xl`,
  secondary: tw`bg-gray-200 text-black shadow-lg outline outline-gray-300 hover:bg-gray-200/80 hover:shadow-xl`,
  tertiary: tw`border border-gray-300 bg-white text-gray-900 shadow-lg hover:shadow-xl`,
  destructive: tw`bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl`,
};

const sizes = {
  sm: tw`h-10 w-10 min-w-[2.5rem] gap-1 px-2 py-2 text-sm`,
  md: tw`h-12 w-12 min-w-[3rem] gap-1.5 px-3 py-3 text-base`,
  lg: tw`h-14 w-14 min-w-[3.5rem] gap-2 px-4 py-4 text-lg`,
  xl: tw`h-16 w-16 min-w-[4rem] gap-2.5 px-5 py-5 text-xl`,
};

const positions = {
  "bottom-right": tw`right-6 bottom-6`,
  "bottom-left": tw`bottom-6 left-6`,
  "top-right": tw`top-6 right-6`,
  "top-left": tw`top-6 left-6`,
};

const roundedOptions = {
  full: tw`rounded-full`,
  xl: tw`rounded-xl`,
  lg: tw`rounded-lg`,
};

const animations = {
  none: tw``,
  scale: tw`transition-transform duration-150 ease-out hover:scale-110 active:scale-95`,
  glow: tw`transition-shadow duration-200 ease-out hover:shadow-xl hover:shadow-blue-500/25`,
  lift: tw`transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-[2px] hover:shadow-2xl active:-translate-y-[1px]`,
  ripple: tw`overflow-hidden`,
  press: tw`transition-transform duration-75 ease-out active:scale-95`,
};

const tooltipBase = tw`pointer-events-none absolute rounded-md bg-gray-900 px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100`;

const actionButtonBase = tw`inline-flex transform-gpu cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-300 select-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50`;

export const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      position = "bottom-right",
      icon,
      actions = [],
      loading = false,
      animation = "scale",
      rounded = "full",
      tooltip,
      showTooltip = false,
      expanded: controlledExpanded,
      onExpandedChange,
      className = "",
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = React.useState(false);
    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
    const isDisabled = disabled || loading;
    const hasActions = actions.length > 0;
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    React.useImperativeHandle(ref, () => btnRef.current as HTMLButtonElement);

    const handleToggle = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (hasActions && !isDisabled) {
          const newExpanded = !isExpanded;
          setInternalExpanded(newExpanded);
          onExpandedChange?.(newExpanded);
        } else {
          onClick?.(e);
        }
      },
      [hasActions, isDisabled, isExpanded, onExpandedChange, onClick]
    );

    type Ripple = { id: number; x: number; y: number; size: number };
    const [ripples, setRipples] = React.useState<Ripple[]>([]);

    const createRipple = React.useCallback(
      (e: { clientX?: number; clientY?: number; type?: string }) => {
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
      else if (variant === "tertiary") opacity = 0.2;
      return {
        "--rui-ripple-opacity": String(opacity),
      } as React.CSSProperties & {
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
        if (e.key === "Enter" || e.key === " ") {
          createRipple({});
        }
      },
      [onKeyDown, createRipple]
    );

    const getActionStyles = React.useCallback(
      (index: number): React.CSSProperties => {
        const mainButtonSize = size === "sm" ? 40 : size === "md" ? 48 : size === "lg" ? 56 : 64;
        const spacing = 16;
        const edgeMargin = 24;

        const offset = edgeMargin + mainButtonSize + spacing + index * (mainButtonSize + spacing);

        const styles: React.CSSProperties = {};
        if (position.includes("bottom")) {
          styles.bottom = `${offset}px`;
        } else {
          styles.top = `${offset}px`;
        }
        if (position.includes("right")) {
          styles.right = `${edgeMargin}px`;
        } else {
          styles.left = `${edgeMargin}px`;
        }
        return styles;
      },
      [size, position]
    );

    const tooltipClasses = React.useMemo(() => {
      const verticalAlign = tw`top-1/2 -translate-y-1/2`;
      if (position.includes("right")) {
        return cn(verticalAlign, tw`right-full mr-4`);
      }
      return cn(verticalAlign, tw`left-full ml-4`);
    }, [position]);

    return (
      <>
        {/* Action Buttons */}
        {hasActions &&
          actions.map((action, index) => (
            <button
              key={action.id}
              className={cn(
                "group fixed z-40", // Position the button directly
                actionButtonBase,
                variants[action.variant || "secondary"],
                sizes[size],
                roundedOptions[rounded],
                animations[animation],
                isExpanded ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
                "transition-all duration-300"
              )}
              style={getActionStyles(index)}
              disabled={action.disabled}
              aria-label={action.tooltip || `Action ${index + 1}`}
              onClick={action.onClick}
            >
              <span className='flex shrink-0 items-center'>{action.icon}</span>
              {showTooltip && action.tooltip && (
                <div className={cn(tooltipBase, tooltipClasses)} role='tooltip'>
                  {action.tooltip}
                </div>
              )}
            </button>
          ))}

        {/* Main FAB */}
        <button
          ref={btnRef}
          className={cn(
            "group", // Add group here for the tooltip
            base,
            variants[variant],
            sizes[size],
            positions[position],
            roundedOptions[rounded],
            animations[animation],
            className
          )}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={loading}
          aria-label={tooltip || (hasActions ? "Toggle actions" : "Floating action button")}
          aria-expanded={hasActions ? isExpanded : undefined}
          onClick={handleToggle}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          style={{ ...style, ...rippleVars }}
          {...restProps}
        >
          {animation === "ripple" && !loading && ripples.length > 0 && (
            <span aria-hidden className='pointer-events-none absolute inset-0'>
              {ripples.map(r => (
                <span
                  key={r.id}
                  className='rui-ripple'
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
              type='spinner'
              variant='primary'
              color='currentColor'
              size={size === "sm" ? "xs" : size === "md" ? "sm" : size === "lg" ? "md" : "md"}
              speed='normal'
              strokeWidth='thick'
            />
          )}
          {!loading && (
            <span
              className={cn(
                "flex shrink-0 items-center transition-transform duration-300",
                hasActions && isExpanded && "rotate-45"
              )}
            >
              {icon}
            </span>
          )}
          {showTooltip && tooltip && (
            <div className={cn(tooltipBase, tooltipClasses)} role='tooltip'>
              {tooltip}
            </div>
          )}
        </button>
      </>
    );
  }
);
FloatingActionButton.displayName = "FloatingActionButton";
