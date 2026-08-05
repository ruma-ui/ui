import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cn, tw } from "../../lib/utils";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The default active tab value (uncontrolled)
   * @default first tab
   */
  defaultValue?: string;
  /**
   * The controlled active tab value
   */
  value?: string;
  /**
   * Callback when active tab changes
   */
  onValueChange?: (value: string) => void;
  /**
   * The visual style of the tabs
   * @default "default"
   */
  variant?: "default" | "underline" | "pills";
  /**
   * The size of the tabs
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Orientation of the tabs
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Whether tabs should take full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Tab content
   */
  children: React.ReactNode;
}

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab list content (Tab components)
   */
  children: React.ReactNode;
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Unique value for the tab
   */
  value: string;
  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Tab content
   */
  children: React.ReactNode;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value that corresponds to the tab
   */
  value: string;
  /**
   * Panel content
   */
  children: React.ReactNode;
}

// Context for tabs state management
interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
  variant: "default" | "underline" | "pills";
  size: "sm" | "md" | "lg";
  orientation: "horizontal" | "vertical";
  fullWidth: boolean;
}

const TabsContext = createContext<TabsContextType | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab components must be used within a Tabs component");
  }
  return context;
};

const baseTabList = tw`flex border-b border-border bg-background`;
const baseTab = tw`relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium whitespace-nowrap transition-all focus:outline-none rui-focus-ring disabled:pointer-events-none disabled:opacity-50`;
const baseTabPanel = tw`mt-4 focus-visible:outline-none`;

const tabListVariants = {
  default: tw``,
  underline: tw`border-b-2`,
  pills: tw`rounded-sm bg-muted p-1`,
};

const tabListOrientations = {
  horizontal: tw`flex-row`,
  vertical: tw`flex-col border-r border-b-0 border-border`,
};

const tabVariants = {
  default: {
    inactive: tw`cursor-pointer border-b-2 border-transparent text-muted-foreground hover:text-primary`,
    active: tw`border-b-2 border-primary text-primary`,
  },
  underline: {
    inactive: tw`cursor-pointer border-b-2 border-transparent text-muted-foreground hover:text-primary`,
    active: tw`border-b-2 border-primary text-primary`,
  },
  pills: {
    inactive: tw`cursor-pointer bg-transparent text-muted-foreground hover:text-foreground`,
    active: tw`bg-background text-primary shadow-sm`,
  },
};

const tabSizes = {
  sm: tw`px-2 py-1.5 text-xs`,
  md: tw`px-3 py-2 text-sm`,
  lg: tw`px-4 py-2.5 text-base`,
};

const tabPanelVariants = {
  horizontal: tw``,
  vertical: tw`ml-8`,
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  className,
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  fullWidth = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>("");

  // Determine if controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  // Set default value on mount
  useEffect(() => {
    if (!value && defaultValue) {
      handleValueChange(defaultValue);
    }
  }, [defaultValue, value, handleValueChange]);

  const contextValue: TabsContextType = {
    value,
    onValueChange: handleValueChange,
    variant,
    size,
    orientation,
    fullWidth,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<TabListProps> = ({ children, className, ...props }) => {
  const { variant, orientation, fullWidth } = useTabs();

  return (
    <div
      className={cn(
        baseTabList,
        tabListVariants[variant],
        tabListOrientations[orientation],
        fullWidth && "w-full",
        className
      )}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({
  children,
  className,
  value,
  disabled = false,
  onClick,
  ...props
}) => {
  const { value: activeValue, onValueChange, variant, size, fullWidth } = useTabs();
  const isActive = activeValue === value;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onValueChange(value);
    }
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Handle keyboard navigation
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled) {
        onValueChange(value);
      }
    }
  };

  return (
    <button
      className={cn(
        baseTab,
        tabSizes[size],
        isActive ? tabVariants[variant].active : tabVariants[variant].inactive,
        fullWidth && "flex-1",
        variant === "pills" && isActive && "rounded-sm",
        variant === "pills" && !isActive && "rounded-sm",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({ children, className, value, ...props }) => {
  const { value: activeValue, orientation } = useTabs();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      className={cn(baseTabPanel, tabPanelVariants[orientation], className)}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      id={`tabpanel-${value}`}
      {...props}
    >
      {children}
    </div>
  );
};
