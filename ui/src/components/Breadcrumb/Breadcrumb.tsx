import { cn, tw } from "../../lib/utils";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  /**
   * The visual style of the breadcrumb
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the breadcrumb
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Control the border radius of the breadcrumb items
   * @default "sm"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Enable/disable animations
   * @default true
   */
  animation?: boolean;
  /**
   * Make breadcrumb take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItem[];
  /**
   * Custom separator between items
   * @default "/"
   */
  separator?: React.ReactNode;
  /**
   * Maximum number of items to show before collapsing
   */
  maxItems?: number;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Callback when an item is clicked
   */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

// Design primitives matching Select component
const breadcrumbBase = tw`inline-flex items-center`;
const itemBase = tw`inline-flex items-center text-sm font-medium transition-colors duration-200`;

const variants = {
  primary: tw`text-muted-foreground hover:text-primary`,
  secondary: tw`text-muted-foreground/80 hover:text-foreground`,
};

const sizes = {
  sm: { text: tw`text-xs`, gap: tw`gap-1`, padding: tw`px-2 py-1` },
  md: { text: tw`text-sm`, gap: tw`gap-2`, padding: tw`px-3 py-1.5` },
  lg: { text: tw`text-base`, gap: tw`gap-3`, padding: tw`px-4 py-2` },
};

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

const separatorBase = tw`mx-2 text-muted-foreground/60`;
const currentItemBase = tw`font-semibold text-foreground`;
const disabledItemBase = tw`cursor-not-allowed opacity-50`;
const animatedBase = tw`transition-all duration-200`;

const DefaultSeparator = ({ size }: { size: "sm" | "md" | "lg" }) => (
  <span className={cn("text-muted-foreground/60", sizes[size].text)} aria-hidden="true">
    /
  </span>
);

const CollapseIndicator = ({ size }: { size: "sm" | "md" | "lg" }) => (
  <button
    type="button"
    className={cn(
      itemBase,
      "hover:text-foreground hover:bg-accent cursor-pointer",
      sizes[size].text,
      sizes[size].padding,
      roundedOptions.sm
    )}
    aria-label="Show hidden breadcrumb items"
  >
    ...
  </button>
);

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "sm",
      animation = true,
      fullWidth = false,
      items,
      separator,
      maxItems,
      className = "",
      onItemClick,
      ...props
    },
    ref
  ) => {
    // Handle item collapsing
    const displayItems = React.useMemo(() => {
      if (!maxItems || items.length <= maxItems) {
        return items;
      }

      if (maxItems <= 2) {
        return [items[0], ...items.slice(-1)];
      }

      const firstItems = items.slice(0, Math.floor(maxItems / 2));
      const lastItems = items.slice(-Math.floor(maxItems / 2));

      return [...firstItems, { label: "...", disabled: true }, ...lastItems];
    }, [items, maxItems]);

    const handleItemClick = (item: BreadcrumbItem, index: number, event: React.MouseEvent) => {
      if (item.disabled) {
        event.preventDefault();
        return;
      }

      if (item.onClick) {
        event.preventDefault();
        item.onClick();
      }

      onItemClick?.(item, index);
    };

    const containerClasses = cn(breadcrumbBase, fullWidth && "w-full", className);

    return (
      <nav ref={ref} className={containerClasses} aria-label="Breadcrumb" {...props}>
        <ol className={cn("flex items-center", sizes[size].gap)}>
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isCurrent = isLast && !item.href;
            const isCollapsed = item.label === "...";

            return (
              <li key={`${item.label}-${index}`} className="flex items-center">
                {isCollapsed ? (
                  <CollapseIndicator size={size} />
                ) : item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      itemBase,
                      variants[variant],
                      sizes[size].text,
                      sizes[size].padding,
                      roundedOptions[rounded],
                      animation && animatedBase,
                      item.disabled && disabledItemBase,
                      isCurrent && currentItemBase,
                      "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={e => handleItemClick(item, index, e)}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-disabled={item.disabled}
                  >
                    {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      itemBase,
                      variants[variant],
                      sizes[size].text,
                      sizes[size].padding,
                      roundedOptions[rounded],
                      animation && animatedBase,
                      item.disabled && disabledItemBase,
                      isCurrent && currentItemBase,
                      !item.disabled && "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={e => handleItemClick(item, index, e)}
                    disabled={item.disabled}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}
                    {item.label}
                  </button>
                )}

                {!isLast && (
                  <span className={cn(separatorBase, sizes[size].gap)}>
                    {separator || <DefaultSeparator size={size} />}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";
