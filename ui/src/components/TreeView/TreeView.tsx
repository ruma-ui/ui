import { cn, tw } from "../../lib/utils";
import React, { createContext, useCallback, useContext, useState } from "react";
import { IoChevronForward } from "react-icons/io5";

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Allow multiple items to be selected at once
   * @default false
   */
  multiple?: boolean;
  /**
   * Allow multiple items to be expanded at once
   * @default true
   */
  multipleExpanded?: boolean;
  /**
   * Show indentation guides
   * @default false
   */
  indentGuide?: boolean;
  /**
   * Initially selected item values
   * @default []
   */
  defaultSelected?: string[];
  /**
   * Initially expanded item values
   * @default []
   */
  defaultExpanded?: string[];
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selected: string[]) => void;
  /**
   * Callback when expansion changes
   */
  onExpansionChange?: (expanded: string[]) => void;
  /**
   * Tree content (TreeItem components)
   */
  children: React.ReactNode;
}

export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique identifier for the tree item
   */
  value: string;
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Tree item content
   */
  children: React.ReactNode;
}

export interface TreeItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display for the tree item
   */
  children: React.ReactNode;
}

export interface TreeItemTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Trigger content
   */
  children: React.ReactNode;
  /**
   * Whether the item has children (affects icon display)
   * @default true
   */
  hasChildren?: boolean;
}

export interface TreeItemChildrenProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Children content
   */
  children: React.ReactNode;
}

// Context for tree state management
interface TreeViewContextType {
  selectedItems: Set<string>;
  expandedItems: Set<string>;
  toggleSelection: (value: string) => void;
  toggleExpansion: (value: string) => void;
  multiple: boolean;
  multipleExpanded: boolean;
  indentGuide: boolean;
}

const TreeViewContext = createContext<TreeViewContextType | null>(null);

interface TreeItemContextType {
  value: string;
  isSelected: boolean;
  isExpanded: boolean;
  disabled: boolean;
  level: number;
}

const TreeItemContext = createContext<TreeItemContextType | null>(null);

const useTreeView = () => {
  const context = useContext(TreeViewContext);
  if (!context) {
    throw new Error("TreeView components must be used within a TreeView");
  }
  return context;
};

const useTreeItem = () => {
  const context = useContext(TreeItemContext);
  if (!context) {
    throw new Error("TreeItem components must be used within a TreeItem");
  }
  return context;
};

const baseItem = tw`rui-focus-ring relative flex items-center gap-1 rounded-sm px-2 py-1 text-sm transition-colors select-none hover:bg-accent hover:text-accent-foreground focus-visible:outline-none`;

const selectedItem = tw`bg-accent text-accent-foreground hover:bg-accent/80`;

const disabledItem = tw`pointer-events-none cursor-not-allowed opacity-50`;

const expandIcon = tw`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200`;

const IndentGuide: React.FC<{ level: number; isLast?: boolean }> = ({ level, isLast = false }) => {
  if (level === 0) return null;

  const guides = [];
  for (let i = 0; i < level; i++) {
    const isCurrentLevel = i === level - 1;
    guides.push(
      <div
        key={i}
        className={cn(
          "bg-border/60 absolute top-0 bottom-0 w-px",
          isCurrentLevel && !isLast && "bg-border"
        )}
        style={{
          left: `${(i + 1) * 16 + 8}px`, // Align with center of chevron icon
        }}
      />
    );
  }
  return guides;
};

export const TreeView: React.FC<TreeViewProps> = ({
  children,
  className,
  multiple = false,
  multipleExpanded = true,
  indentGuide = false,
  defaultSelected = [],
  defaultExpanded = [],
  onSelectionChange,
  onExpansionChange,
  ...props
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(defaultSelected));
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(defaultExpanded));

  const toggleSelection = useCallback(
    (value: string) => {
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(value)) {
          newSet.delete(value);
        } else {
          if (!multiple) {
            newSet.clear();
          }
          newSet.add(value);
        }
        onSelectionChange?.(Array.from(newSet));
        return newSet;
      });
    },
    [multiple, onSelectionChange]
  );

  const toggleExpansion = useCallback(
    (value: string) => {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(value)) {
          // Collapsing current item
          newSet.delete(value);
        } else {
          // Expanding current item
          if (!multipleExpanded) {
            // In single expansion mode, we need to be smarter about what to collapse
            // We should only collapse items that are siblings or at the same level
            const itemsToRemove: string[] = [];

            // Find all expanded items and determine which ones to collapse
            newSet.forEach(expandedValue => {
              if (expandedValue !== value) {
                // For now, we'll collapse all other items in single expansion mode
                // This maintains the current behavior but ensures consistency
                itemsToRemove.push(expandedValue);
              }
            });

            itemsToRemove.forEach(item => newSet.delete(item));
          }
          newSet.add(value);
        }
        onExpansionChange?.(Array.from(newSet));
        return newSet;
      });
    },
    [multipleExpanded, onExpansionChange]
  );

  const contextValue: TreeViewContextType = {
    selectedItems,
    expandedItems,
    toggleSelection,
    toggleExpansion,
    multiple,
    multipleExpanded,
    indentGuide,
  };

  return (
    <TreeViewContext.Provider value={contextValue}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TreeViewContext.Provider>
  );
};

export const TreeItem: React.FC<TreeItemProps> = ({
  children,
  className,
  value,
  disabled = false,
  ...props
}) => {
  const { selectedItems, expandedItems } = useTreeView();
  const isSelected = selectedItems.has(value);
  const isExpanded = expandedItems.has(value);

  // Get level from parent context or default to 0
  const parentContext = useContext(TreeItemContext);
  const level = parentContext ? parentContext.level + 1 : 0;

  const contextValue: TreeItemContextType = {
    value,
    isSelected,
    isExpanded,
    disabled,
    level,
  };

  return (
    <TreeItemContext.Provider value={contextValue}>
      <div className={cn("relative", disabled && disabledItem, className)} {...props}>
        {children}
      </div>
    </TreeItemContext.Provider>
  );
};

export const TreeItemContent: React.FC<TreeItemContentProps> = ({
  children,
  className,
  ...props
}) => {
  const { toggleSelection, toggleExpansion, indentGuide } = useTreeView();
  const { value, isSelected, isExpanded, disabled, level } = useTreeItem();

  const handleClick = () => {
    if (!disabled) {
      toggleSelection(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        toggleSelection(value);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (!isExpanded) {
          toggleExpansion(value);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (isExpanded) {
          toggleExpansion(value);
        }
        break;
    }
  };

  // Check if children contains TreeItemTrigger
  const hasTrigger = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === TreeItemTrigger
  );

  return (
    <div
      className={cn(baseItem, isSelected && selectedItem, disabled && disabledItem, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="treeitem"
      aria-selected={isSelected}
      aria-expanded={isExpanded}
      aria-disabled={disabled}
      {...props}
    >
      {indentGuide && <IndentGuide level={level} />}
      <div className="flex items-center" style={{ paddingLeft: `${level * 16 + 8}px` }}>
        {hasTrigger ? (
          children
        ) : (
          <div
            className="flex flex-1 items-center gap-1"
            style={{ marginLeft: `${level > 0 ? 16 : 0}px` }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export const TreeItemTrigger: React.FC<TreeItemTriggerProps> = ({
  children,
  className,
  hasChildren = true,
  ...props
}) => {
  const { toggleExpansion } = useTreeView();
  const { value, isExpanded, disabled } = useTreeItem();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      toggleExpansion(value);
    }
  };

  return (
    <button
      className={cn(
        "flex flex-1 items-center text-left",
        disabled && "cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <div className="flex flex-1 items-center gap-1">
        {hasChildren ? (
          <IoChevronForward className={cn(expandIcon, isExpanded && "rotate-90")} />
        ) : (
          <div className="w-4" /> // Placeholder to maintain alignment
        )}
        {children}
      </div>
    </button>
  );
};

export const TreeItemChildren: React.FC<TreeItemChildrenProps> = ({
  children,
  className,
  ...props
}) => {
  const { isExpanded } = useTreeItem();

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200 ease-in-out",
        isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
