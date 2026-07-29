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

// peer-focus-visible: keyboard-only focus ring rendered via box-shadow
const base = tw`relative inline-flex cursor-pointer items-center justify-center border-2 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50`;

const variants = {
  primary: tw`border-input bg-background hover:border-primary`,
  secondary: tw`border-input bg-background hover:border-secondary-foreground`,
};

const checkedVariants = {
  primary: tw`border-primary bg-primary`,
  secondary: tw`border-secondary-foreground bg-secondary-foreground`,
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
  sm: tw`text-xs`,
  md: tw`text-sm`,
  lg: tw`text-base`,
  xl: tw`text-lg`,
};

const iconSizes = {
  xs: tw`text-[8px]`,
  sm: tw`text-[10px]`,
  md: tw`text-xs`,
  lg: tw`text-sm`,
  xl: tw`text-base`,
};

const textMinHeights = {
  xs: tw`min-h-3`,
  sm: tw`min-h-4`,
  md: tw`min-h-5`,
  lg: tw`min-h-6`,
  xl: tw`min-h-7`,
};

// Keyboard-only focus ring via peer-focus-visible (box-shadow: offset + 2px ring)
const focusRingClass =
  "peer-focus-visible:shadow-[0_0_0_var(--ring-offset)_hsl(var(--background)),0_0_0_calc(var(--ring-offset)+var(--ring-width))_var(--ring-color)]";

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
    React.useImperativeHandle(ref, () => checkboxRef.current as HTMLInputElement);

    const isChecked = checked !== undefined ? checked : internalChecked;
    const isDisabled = disabled;

    React.useEffect(() => {
      if (checkboxRef.current) checkboxRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    const CheckIcon = indeterminate ? FaMinus : FaCheck;

    const customColorStyles = React.useMemo(() => {
      if (!color) return {};
      return { "--checkbox-color": color } as React.CSSProperties;
    }, [color]);

    const checkboxElement = (
      <div className="relative inline-flex items-center">
        <input
          ref={checkboxRef}
          type="checkbox"
          className="peer sr-only"
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
            "self-center",
            // Use checked/indeterminate variant or default
            (isChecked || indeterminate) && !color ? checkedVariants[variant] : variants[variant],
            error && "border-destructive",
            focusRingClass,
            "outline-none",
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
                "text-primary-foreground",
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

    if (!label && !description) return checkboxElement;

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
                  "text-foreground leading-tight font-medium",
                  labelSizes[size],
                  error && "text-destructive"
                )}
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </span>
            )}
            {description && (
              <span
                className={cn(
                  "text-muted-foreground leading-tight",
                  size === "xs" ? "text-xs" : "text-sm",
                  error && "text-destructive"
                )}
              >
                {description}
              </span>
            )}
          </div>
        </label>
        {error && errorMessage && (
          <span className="text-destructive mt-1 text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

// CheckboxGroup interfaces
export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  options: CheckboxOption[];
  direction?: "horizontal" | "vertical";
  checkboxProps?: Partial<CheckboxProps>;
  label?: string;
  description?: string;
  error?: boolean;
  errorMessage?: string;
  enableSelectAll?: boolean;
  selectAllLabel?: string;
}

export interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
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
      if (value === undefined) setInternalValue(newValues);
      onChange?.(newValues);
    };

    const handleSelectAllChange = (checked: boolean) => {
      const newValues = checked ? options.filter(opt => !opt.disabled).map(opt => opt.value) : [];
      if (value === undefined) setInternalValue(newValues);
      onChange?.(newValues);
    };

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
            <span className={cn("text-foreground font-medium", error && "text-destructive")}>
              {label}
            </span>
            {description && (
              <span className={cn("text-muted-foreground text-sm", error && "text-destructive")}>
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

        {error && errorMessage && <span className="text-destructive text-sm">{errorMessage}</span>}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
