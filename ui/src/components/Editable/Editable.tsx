import React from "react";
import { cn, tw } from "../../lib/utils";

export interface EditableProps {
  /**
   * The current value of the editable text
   */
  value?: string;
  /**
   * Default value when component is uncontrolled
   */
  defaultValue?: string;
  /**
   * Placeholder text shown when value is empty
   */
  placeholder?: string;
  /**
   * Callback fired when the value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback fired when editing starts
   */
  onEditStart?: () => void;
  /**
   * Callback fired when editing ends (save or cancel)
   */
  onEditEnd?: (value: string, saved: boolean) => void;
  /**
   * Callback fired when changes are saved
   */
  onSave?: (value: string) => void;
  /**
   * Callback fired when editing is cancelled
   */
  onCancel?: () => void;
  /**
   * The size of the editable component
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Control the border radius
   * @default "sm"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Make component take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the component is in read-only mode
   * @default false
   */
  readOnly?: boolean;
  /**
   * Whether to show save/cancel buttons when editing
   * @default false
   */
  showButtons?: boolean;
  /**
   * Custom save button text
   * @default "Save"
   */
  saveText?: string;
  /**
   * Custom cancel button text
   * @default "Cancel"
   */
  cancelText?: string;
  /**
   * Whether to save on Enter key press
   * @default true
   */
  saveOnEnter?: boolean;
  /**
   * Whether to cancel on Escape key press
   * @default true
   */
  cancelOnEscape?: boolean;
  /**
   * Trigger mode for starting edit
   * @default "click"
   */
  trigger?: "click" | "doubleClick";
  /**
   * Maximum length of the text
   */
  maxLength?: number;
  /**
   * Minimum length of the text
   */
  minLength?: number;
  /**
   * Custom CSS class
   */
  className?: string;
  /**
   * Content to display when not editing (can be used for custom rendering)
   */
  children?: React.ReactNode;
}

const sizes = {
  xs: { container: tw`min-h-6 text-xs`, gap: "gap-1" },
  sm: { container: tw`min-h-8 text-sm`, gap: "gap-1.5" },
  md: { container: tw`min-h-10 text-base`, gap: "gap-2" },
  lg: { container: tw`min-h-12 text-lg`, gap: "gap-2.5" },
  xl: { container: tw`min-h-14 text-xl`, gap: "gap-3" },
} as const;

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

const buttonBase = tw`inline-flex items-center justify-center rounded px-2 py-1 text-xs font-medium transition-colors duration-150 focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:pointer-events-none disabled:opacity-50`;

export const Editable = React.forwardRef<HTMLDivElement, EditableProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      placeholder = "Click to edit...",
      onChange,
      onEditStart,
      onEditEnd,
      onSave,
      onCancel,
      size = "md",
      rounded = "sm",
      fullWidth = false,
      disabled = false,
      readOnly = false,
      showButtons = false,
      saveText = "Save",
      cancelText = "Cancel",
      saveOnEnter = true,
      cancelOnEscape = true,
      trigger = "click",
      maxLength,
      minLength,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [editValue, setEditValue] = React.useState("");

    const inputRef = React.useRef<HTMLInputElement>(null);

    // Determine if component is controlled
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const isDisabled = disabled || readOnly;

    // Handle starting edit mode
    const handleStartEdit = React.useCallback(() => {
      if (isDisabled) return;
      setIsEditing(true);
      setEditValue(value);
      onEditStart?.();
    }, [isDisabled, value, onEditStart]);

    // Focus and select input text after entering edit mode
    React.useEffect(() => {
      if (isEditing) {
        requestAnimationFrame(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        });
      }
    }, [isEditing]);

    const handleSave = React.useCallback(() => {
      if (!isEditing) return;
      const newValue = editValue.trim();

      if (minLength !== undefined && newValue.length < minLength) return;
      if (maxLength !== undefined && newValue.length > maxLength) return;

      if (value !== newValue) {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        onSave?.(newValue);
      }

      onEditEnd?.(newValue, true);
      setIsEditing(false);
    }, [
      isEditing,
      editValue,
      value,
      minLength,
      maxLength,
      isControlled,
      onChange,
      onSave,
      onEditEnd,
    ]);

    const handleCancel = React.useCallback(() => {
      setEditValue(value);
      onCancel?.();
      onEditEnd?.(value, false);
      setIsEditing(false);
    }, [value, onCancel, onEditEnd]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && saveOnEnter) {
        e.preventDefault();
        handleSave();
      } else if (e.key === "Escape" && cancelOnEscape) {
        e.preventDefault();
        handleCancel();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(e.target.value);
    };

    const handleSaveMouseDown = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent input from blurring before save
      handleSave();
    };

    const handleCancelMouseDown = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent input from blurring before cancel
      handleCancel();
    };

    const isEmpty = !value;
    const displayValue = value || placeholder;

    return (
      <div
        ref={ref}
        className={cn(
          "font-inherit relative inline-flex items-center align-baseline",
          sizes[size].container,
          roundedOptions[rounded],
          fullWidth && "w-full",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
        onClick={!isEditing && trigger === "click" ? handleStartEdit : undefined}
        onDoubleClick={!isEditing && trigger === "doubleClick" ? handleStartEdit : undefined}
        {...props}
      >
        {isEditing ? (
          <div className={cn("flex w-full items-center", sizes[size].gap)}>
            {/* Grid container for input sizer and input field */}
            <div className='relative grid grow items-center'>
              {/* Sizer: Renders text invisibly to define width */}
              <span className='invisible col-start-1 row-start-1 p-0 whitespace-pre' aria-hidden>
                {editValue || placeholder || "\u00A0"}
              </span>

              {/* Input: Overlays the sizer */}
              <input
                ref={inputRef}
                type='text'
                value={editValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                maxLength={maxLength}
                minLength={minLength}
                className={cn(
                  "col-start-1 row-start-1 w-full border-none bg-transparent p-0 text-gray-900 ring-0 outline-none",
                  isEmpty && "text-gray-400"
                )}
                disabled={isDisabled}
                aria-label='Edit text'
              />
            </div>
            {showButtons && (
              <div className='flex shrink-0 items-center gap-1'>
                <button
                  type='button'
                  onMouseDown={handleSaveMouseDown}
                  className={cn(
                    buttonBase,
                    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                  )}
                  disabled={isDisabled}
                  aria-label={saveText}
                >
                  {saveText}
                </button>
                <button
                  type='button'
                  onMouseDown={handleCancelMouseDown}
                  className={cn(
                    buttonBase,
                    "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500"
                  )}
                  disabled={isDisabled}
                  aria-label={cancelText}
                >
                  {cancelText}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            tabIndex={isDisabled ? -1 : 0}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleStartEdit();
              }
            }}
            role='button'
            aria-label={`Edit: ${displayValue}`}
            className='truncate'
          >
            {children || (
              <span className={cn("select-none", isEmpty && "text-gray-400 italic")}>
                {displayValue}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Editable.displayName = "Editable";
