import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { cn, tw } from "../../lib/utils";

// Main Menu Context
interface NavigationMenuContextType {
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
  variant: "default" | "underline" | "pills";
  activeItem: string | null;
  setActiveItem: (value: string | null) => void;
  openMenus: Set<string>;
  toggleMenu: (value: string) => void;
}

const NavigationMenuContext = createContext<NavigationMenuContextType | null>(null);

const useNavigationMenu = () => {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error("NavigationMenu components must be used within a NavigationMenu");
  }
  return context;
};

// Item-specific Context
interface NavigationMenuItemContextType {
  value: string;
}

const NavigationMenuItemContext = createContext<NavigationMenuItemContextType | null>(null);

const useNavigationMenuItem = () => {
  const context = useContext(NavigationMenuItemContext);
  if (!context) {
    throw new Error(
      "NavigationMenuTrigger or NavigationMenuContent must be used within a NavigationMenuItem"
    );
  }
  return context;
};

// Base styles
const menuBase = tw`flex bg-background`;
const itemBase = tw`rui-focus-ring relative inline-flex w-full items-center justify-start px-3 py-2 text-left text-sm font-medium whitespace-nowrap transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50`;
const submenuBase = tw`absolute z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground p-1 shadow-md`;

// Animation classes
const submenuAnimationIn = tw`animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150 ease-out`;
const submenuAnimationOut = tw`animate-out fade-out-0 zoom-out-95 slide-out-to-top-2 duration-100 ease-in`;

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The orientation of the navigation menu
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The size of the navigation items
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * The visual style of the navigation menu
   * @default "default"
   */
  variant?: "default" | "underline" | "pills";
  /**
   * Navigation menu content
   */
  children: React.ReactNode;
}

export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Navigation menu list content (NavigationMenuItem components)
   */
  children: React.ReactNode;
}

export interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Unique value for the navigation item
   */
  value: string;
  /**
   * Whether the item is active/currently selected
   * @default false
   */
  active?: boolean;
  /**
   * Navigation item content
   */
  children: React.ReactNode;
}

export interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Trigger content
   */
  children: React.ReactNode;
}

export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display in the submenu
   */
  children: React.ReactNode;
}

export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link content
   */
  children: React.ReactNode;
  /**
   * Whether the link is active
   * @default false
   */
  active?: boolean;
}

export interface NavigationMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group title
   */
  title?: string;
  /**
   * Group content
   */
  children: React.ReactNode;
}

// Menu variants
const menuVariants = {
  default: tw``,
  underline: tw`border-b border-border`,
  pills: tw`rounded-lg bg-muted p-1`,
};

const menuOrientations = {
  horizontal: tw`flex-row`,
  vertical: tw`flex-col`,
};

// Item variants with hover effects
const itemVariants = {
  default: {
    inactive: tw`cursor-pointer text-muted-foreground hover:bg-accent hover:text-accent-foreground`,
    active: tw`bg-accent text-accent-foreground`,
  },
  underline: {
    inactive: tw`cursor-pointer border-b-2 border-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground`,
    active: tw`border-b-2 border-primary text-primary`,
  },
  pills: {
    inactive: tw`cursor-pointer bg-transparent text-muted-foreground hover:bg-background hover:text-accent-foreground`,
    active: tw`bg-background text-primary shadow-sm`,
  },
};

const itemSizes = {
  sm: tw`px-2 py-1 text-xs`,
  md: tw`px-3 py-1.5 text-sm`,
  lg: tw`px-4 py-2 text-base`,
};

// Increased spacing for submenus
const submenuPositions = {
  horizontal: {
    top: tw`top-full left-0 mt-2`,
    bottom: tw`bottom-full left-0 mb-2`,
  },
  vertical: {
    right: tw`top-0 left-full ml-2`,
    left: tw`top-0 right-full mr-2`,
  },
};

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  children,
  className,
  orientation = "horizontal",
  size = "md",
  variant = "default",
  ...props
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const toggleMenu = useCallback(
    (value: string) => {
      setOpenMenus(prev => {
        const newSet = new Set(prev);
        if (newSet.has(value)) {
          newSet.delete(value);
        } else {
          if (orientation === "horizontal") newSet.clear();
          newSet.add(value);
        }
        return newSet;
      });
    },
    [orientation]
  );

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest("[data-navigation-menu]")) {
        setOpenMenus(new Set());
      }
    };

    if (openMenus.size > 0) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openMenus]);

  // Close menus on escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenus(new Set());
      }
    };

    if (openMenus.size > 0) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [openMenus]);

  const contextValue: NavigationMenuContextType = {
    orientation,
    size,
    variant,
    activeItem,
    setActiveItem,
    openMenus,
    toggleMenu,
  };

  return (
    <nav
      className={cn(menuBase, menuVariants[variant], menuOrientations[orientation], className)}
      data-navigation-menu
      {...props}
    >
      <NavigationMenuContext.Provider value={contextValue}>
        {children}
      </NavigationMenuContext.Provider>
    </nav>
  );
};

export const NavigationMenuList: React.FC<NavigationMenuListProps> = ({
  children,
  className,
  ...props
}) => {
  const { orientation } = useNavigationMenu();

  return (
    <ul
      className={cn("flex", orientation === "horizontal" ? "flex-row" : "flex-col", className)}
      role="menubar"
      {...props}
    >
      {children}
    </ul>
  );
};

export const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  children,
  className,
  value,
  active = false,
  ...props
}) => {
  const { activeItem, setActiveItem } = useNavigationMenu();

  useEffect(() => {
    if (active && activeItem !== value) {
      setActiveItem(value);
    }
  }, [active, value, activeItem, setActiveItem]);

  return (
    <NavigationMenuItemContext.Provider value={{ value }}>
      <li className={cn("relative", className)} role="none" {...props}>
        {children}
      </li>
    </NavigationMenuItemContext.Provider>
  );
};

export const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ children, className, onClick, ...props }, ref) => {
  const { orientation, size, variant, activeItem, openMenus, toggleMenu } = useNavigationMenu();
  const { value } = useNavigationMenuItem();

  const isActive = activeItem === value;
  const isOpen = openMenus.has(value);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleMenu(value);
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu(value);
    }
  };

  const ChevronIcon = orientation === "horizontal" ? IoChevronDown : IoChevronForward;

  return (
    <button
      ref={ref}
      className={cn(
        itemBase,
        itemSizes[size],
        isActive ? itemVariants[variant].active : itemVariants[variant].inactive,
        (variant === "default" || variant === "pills") && "rounded-md",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-haspopup="true"
      role="menuitem"
      {...props}
    >
      {children}
      <ChevronIcon
        className={cn(
          "ml-1 h-3 w-3 transition-transform duration-200",
          isOpen && (orientation === "horizontal" ? "rotate-180" : "rotate-90")
        )}
      />
    </button>
  );
});

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ children, className, ...props }, ref) => {
    const { orientation, openMenus } = useNavigationMenu();
    const { value } = useNavigationMenuItem();
    const contentRef = useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

    const isOpen = openMenus.has(value);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);
    const [positionClass, setPositionClass] = useState("");

    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        setIsClosing(false);
      } else if (shouldRender) {
        setIsClosing(true);
        const timer = setTimeout(() => {
          setShouldRender(false);
          setIsClosing(false);
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [isOpen, shouldRender]);

    useEffect(() => {
      if (isOpen && contentRef.current) {
        const anchorElement = contentRef.current.closest("li");
        if (!anchorElement) return;

        const anchorRect = anchorElement.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();

        if (orientation === "vertical") {
          const spaceRight = window.innerWidth - anchorRect.right;
          if (spaceRight < contentRect.width && anchorRect.left >= contentRect.width) {
            setPositionClass(submenuPositions.vertical.left);
          } else {
            setPositionClass(submenuPositions.vertical.right);
          }
        } else {
          setPositionClass(submenuPositions.horizontal.top);
        }
      }
    }, [isOpen, orientation]);

    if (!shouldRender) return null;

    return (
      <div
        ref={contentRef}
        className={cn(
          submenuBase,
          isClosing ? submenuAnimationOut : submenuAnimationIn,
          positionClass,
          className
        )}
        role="menu"
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ children, className, active = false, ...props }, ref) => {
    const { size, variant, activeItem } = useNavigationMenu();
    const isActive = active || activeItem === props.href;

    return (
      <a
        ref={ref}
        className={cn(
          itemBase,
          itemSizes[size],
          isActive ? itemVariants[variant].active : itemVariants[variant].inactive,
          (variant === "default" || variant === "pills") && "rounded-md",
          className
        )}
        role="menuitem"
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenuGroup: React.FC<NavigationMenuGroupProps> = ({
  children,
  className,
  title,
  ...props
}) => {
  const { size } = useNavigationMenu();

  return (
    <div className={className} role="group" {...props}>
      {title && (
        <div
          className={cn(
            itemSizes[size],
            "border-border text-muted-foreground my-0.5 border-b font-semibold tracking-wider"
          )}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
};
