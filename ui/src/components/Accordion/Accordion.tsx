import React, { createContext, useContext, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { cn } from "../../lib/utils";

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Allow multiple items to be expanded at once
   * @default false
   */
  multiple?: boolean;
  /**
   * Accordion content (AccordionItem components)
   */
  children: React.ReactNode;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique identifier for the accordion item
   */
  value: string;
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Accordion item content
   */
  children: React.ReactNode;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Trigger content
   */
  children: React.ReactNode;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display when accordion item is expanded
   */
  children: React.ReactNode;
}

// Context for accordion state management
interface AccordionContextType {
  expandedItems: Set<string>;
  toggle: (value: string) => void;
  multiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionItemContextType {
  value: string;
  isExpanded: boolean;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionTrigger and AccordionContent must be used within an AccordionItem");
  }
  return context;
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  multiple = false,
  ...props
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggle = (value: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        if (!multiple) {
          newSet.clear();
        }
        newSet.add(value);
      }
      return newSet;
    });
  };

  const contextValue: AccordionContextType = {
    expandedItems,
    toggle,
    multiple,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className,
  value,
  disabled = false,
  ...props
}) => {
  const { expandedItems } = useAccordion();
  const isExpanded = expandedItems.has(value);

  const contextValue: AccordionItemContextType = {
    value,
    isExpanded,
    disabled,
  };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div className={cn("border-border border-b last:border-b-0", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  ...props
}) => {
  const { toggle } = useAccordion();
  const { value, isExpanded, disabled } = useAccordionItem();

  const handleClick = () => {
    if (!disabled) {
      toggle(value);
    }
  };

  return (
    <button
      className={cn(
        "rui-focus-ring hover:text-foreground flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      aria-expanded={isExpanded}
      {...props}
    >
      <span>{children}</span>
      <IoChevronDown
        className={cn(
          "text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
      />
    </button>
  );
};

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
  ...props
}) => {
  const { isExpanded } = useAccordionItem();

  return (
    <div
      className={cn(
        "overflow-hidden text-sm duration-200",
        isExpanded
          ? "animate-in fade-in slide-in-from-top-2 pb-4 ease-out"
          : "animate-out fade-out slide-out-to-top-2 max-h-0 ease-in",
        className
      )}
      {...props}
    >
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
};
