import React from "react";
import { FaCheck, FaMinus } from "react-icons/fa";
import { cn, tw } from "../../lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * The visual style of the checkbox
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * The size of the checkbox
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Control the border radius of the checkbox
   * @default "sm"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Custom color for the checkbox (CSS color value)
   */
  color?: string;
  /**
   * Indeterminate state for partial selection
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Smooth scale animation for icon transitions
   * @default false
   */
  animation?: boolean;
  /**
   * Optional label text
   */
  label?: string;
  /**
   * Position of the label relative to checkbox
   * @default "right"
   */
  labelPosition?: "left" | "right";
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Show error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Make checkbox required
   * @default false
   */
  required?: boolean;
}

const base = tw`relative inline-flex cursor-pointer items-center justify-center border-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`;

const variants = {
  primary: tw`border-gray-300 bg-white text-blue-600 focus-within:ring-blue-500 hover:border-blue-300`,
  secondary: tw`border-gray-300 bg-white text-gray-600 focus-within:ring-gray-500 hover:border-gray-400`,
};

const sizes = {
  xs: tw`h-3 w-3`,
  sm: tw`h-4 w-4`,
  md: tw`h-5 w-5`,
  lg: tw`h-6 w-6`,
  xl: tw`h-7 w-7`,
};

const roundedOptions = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
};

const labelSizes = {
  xs: tw`text-xs`,
  sm: tw`text-sm`,
  md: tw`text-base`,
  lg: tw`text-lg`,
  xl: tw`text-xl`,
};

const iconSizes = {
  xs: tw`text-[8px]`,
  sm: tw`text-[10px]`,
  md: tw`text-xs`,
  lg: tw`text-sm`,
  xl: tw`text-base`,
};

// Ensure the text block has at least the checkbox height for clean vertical centering
const textMinHeights = {
  xs: tw`min-h-3`,
  sm: tw`min-h-4`,
  md: tw`min-h-5`,
  lg: tw`min-h-6`,
  xl: tw`min-h-7`,
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "sm",
      color,
      indeterminate = false,
      animation = false,
      label,
      labelPosition = "right",
      description,
      error = false,
      errorMessage,
      required = false,
      className = "",
      disabled,
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(false);
    const checkboxRef = React.useRef<HTMLInputElement | null>(null);

    // Combine forwarded ref and local ref
    React.useImperativeHandle(ref, () => checkboxRef.current as HTMLInputElement);

    const isChecked = checked !== undefined ? checked : internalChecked;
    const isDisabled = disabled;

    // Update indeterminate property
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const CheckIcon = indeterminate ? FaMinus : FaCheck;

    // Generate custom styles for color prop
    const customColorStyles = React.useMemo(() => {
      if (!color) return {};
      return {
        "--checkbox-color": color,
        "--checkbox-hover-color": color + "20", // Add opacity for hover
        "--checkbox-ring-color": color + "40", // Add opacity for ring
      } as React.CSSProperties;
    }, [color]);

    const checkboxElement = (
      <div className="relative inline-flex items-center">
        <input
          ref={checkboxRef}
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          disabled={isDisabled}
          required={required}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            base,
            sizes[size],
            roundedOptions[rounded],
            // ensure the box itself aligns perfectly in the label row
            "self-center",
            variants[variant],
            color && `hover:border-[${color}]`,
            error && "border-red-500 focus-within:ring-red-500",
            isChecked && !color && variant === "primary" && "border-blue-600 bg-blue-600",
            isChecked && !color && variant === "secondary" && "border-gray-600 bg-gray-600",
            indeterminate && !color && variant === "primary" && "border-blue-600 bg-blue-600",
            indeterminate && !color && variant === "secondary" && "border-gray-600 bg-gray-600",
            className
          )}
          style={{
            ...customColorStyles,
            ...(color &&
              (isChecked || indeterminate) && {
                borderColor: color,
                backgroundColor: color,
              }),
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckIcon
              className={cn(
                "text-white",
                iconSizes[size],
                animation && "transition-all duration-200 ease-out",
                isChecked || indeterminate
                  ? animation
                    ? "scale-100 opacity-100"
                    : "opacity-100"
                  : animation
                    ? "scale-0 opacity-0"
                    : "opacity-0"
              )}
            />
          </div>
        </div>
      </div>
    );

    if (!label && !description) {
      return checkboxElement;
    }

    return (
      <div className="flex flex-col">
        <label
          className={cn(
            "flex cursor-pointer items-center gap-2 select-none",
            isDisabled && "cursor-not-allowed opacity-50",
            labelPosition === "left" && "flex-row-reverse"
          )}
        >
          <div className="flex flex-shrink-0 items-center">{checkboxElement}</div>
          <div className={cn("flex min-w-0 flex-col justify-center", textMinHeights[size])}>
            {label && (
              <span
                className={cn(
                  "leading-tight font-medium text-gray-900",
                  labelSizes[size],
                  error && "text-red-700"
                )}
              >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </span>
            )}
            {description && (
              <span
                className={cn(
                  "leading-tight text-gray-600",
                  size === "xs" ? "text-xs" : "text-sm",
                  error && "text-red-600"
                )}
              >
                {description}
              </span>
            )}
          </div>
        </label>
        {error && errorMessage && <span className="mt-1 text-sm text-red-600">{errorMessage}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

// CheckboxGroup interfaces
export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Array of selected values
   */
  value?: string[];
  /**
   * Default selected values for uncontrolled component
   */
  defaultValue?: string[];
  /**
   * Callback fired when selection changes
   */
  onChange?: (value: string[]) => void;
  /**
   * Array of checkbox options
   */
  options: CheckboxOption[];
  /**
   * Layout direction
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";
  /**
   * Props to pass to individual checkboxes
   */
  checkboxProps?: Partial<CheckboxProps>;
  /**
   * Group label
   */
  label?: string;
  /**
   * Group description
   */
  description?: string;
  /**
   * Show error state for the group
   */
  error?: boolean;
  /**
   * Error message for the group
   */
  errorMessage?: string;
  /**
   * Enable indeterminate state for "Select All" functionality
   * @default false
   */
  enableSelectAll?: boolean;
  /**
   * Label for the "Select All" checkbox
   * @default "Select All"
   */
  selectAllLabel?: string;
}

export interface CheckboxOption {
  /**
   * Unique value for this option
   */
  value: string;
  /**
   * Display label
   */
  label: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
  /**
   * Additional props for this specific checkbox
   */
  props?: Partial<CheckboxProps>;
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      options,
      direction = "vertical",
      checkboxProps = {},
      label,
      description,
      error = false,
      errorMessage,
      enableSelectAll = false,
      selectAllLabel = "Select All",
      className = "",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);

    const selectedValues = value !== undefined ? value : internalValue;

    const handleOptionChange = (optionValue: string, checked: boolean) => {
      const newValues = checked
        ? [...selectedValues, optionValue]
        : selectedValues.filter(v => v !== optionValue);

      if (value === undefined) {
        setInternalValue(newValues);
      }
      onChange?.(newValues);
    };

    const handleSelectAllChange = (checked: boolean) => {
      const newValues = checked ? options.filter(opt => !opt.disabled).map(opt => opt.value) : [];
      if (value === undefined) {
        setInternalValue(newValues);
      }
      onChange?.(newValues);
    };

    // Calculate select all state
    const enabledOptions = options.filter(opt => !opt.disabled);
    const selectedEnabledCount = enabledOptions.filter(opt =>
      selectedValues.includes(opt.value)
    ).length;
    const allSelected = selectedEnabledCount === enabledOptions.length && enabledOptions.length > 0;
    const indeterminate = selectedEnabledCount > 0 && selectedEnabledCount < enabledOptions.length;

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        {label && (
          <div className="flex flex-col">
            <span className={cn("font-medium text-gray-900", error && "text-red-700")}>
              {label}
            </span>
            {description && (
              <span className={cn("text-sm text-gray-600", error && "text-red-600")}>
                {description}
              </span>
            )}
          </div>
        )}

        <div
          className={cn(
            "flex",
            direction === "horizontal" ? "flex-row flex-wrap gap-6" : "flex-col gap-2"
          )}
        >
          {enableSelectAll && (
            <div>
              <Checkbox
                {...checkboxProps}
                label={selectAllLabel}
                checked={allSelected}
                indeterminate={indeterminate}
                onChange={e => handleSelectAllChange(e.target.checked)}
                className="font-semibold"
              />
            </div>
          )}

          <div
            className={cn(
              "flex",
              direction === "horizontal" ? "flex-row flex-wrap gap-6" : "flex-col gap-2",
              enableSelectAll && "pl-5"
            )}
          >
            {options.map(option => (
              <Checkbox
                key={option.value}
                {...checkboxProps}
                {...option.props}
                label={option.label}
                description={option.description}
                disabled={option.disabled}
                checked={selectedValues.includes(option.value)}
                onChange={e => handleOptionChange(option.value, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {error && errorMessage && <span className="text-sm text-red-600">{errorMessage}</span>}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
