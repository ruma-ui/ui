import { cn, tw } from "../../lib/utils";
import { format, isAfter, isBefore, isSameDay, isValid, parse } from "date-fns";
import React from "react";
import { Calendar } from "../Calendar/Calendar";

export interface DatePickerProps {
  /** Controlled selected date value. */
  value?: Date | null;
  /** Callback when date changes (valid date or null when cleared). */
  onChange?: (date: Date | null) => void;

  /** Minimum allowed date (inclusive). */
  minDate?: Date;
  /** Maximum allowed date (inclusive). Defaults to today if not provided. */
  maxDate?: Date;

  /** Optional label text shown above the input. */
  label?: string;
  /** Optional helper/description text below the control. */
  description?: string;

  /** When provided, shows error state and this message. Overrides internal validation. */
  error?: string;

  /** Disable the entire control. */
  disabled?: boolean;

  /** Placeholder for the input. @default "MM/DD/YYYY" */
  placeholder?: string;

  /** Whether to show a calendar popover button and calendar. @default true */
  withCalendar?: boolean;

  /** Order of segments. @default "dmy" (DD/MM/YYYY). Accepts "dmy" | "mdy" | "ymd" */
  order?: "dmy" | "mdy" | "ymd";

  /** Visual variant for consistency with TextInput. */
  variant?: "primary" | "secondary";
  /** Size for consistency with TextInput. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Border radius for consistency. */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /** Make control take full width of container. */
  fullWidth?: boolean;
  /** Preset width of the wrapper. */
  width?: "sm" | "md" | "lg" | "xl";

  /** Additional className for the field wrapper. */
  className?: string;
  /** Optional id for input association. */
  id?: string;
}

// Sizing and style tokens aligned with TextInput
const wrapperBase = tw`relative inline-flex w-full flex-col`;
const fieldBase = tw`relative inline-flex items-center border bg-white text-gray-900 transition-all duration-200 focus-within:ring-3 disabled:cursor-not-allowed disabled:opacity-50`;
const variants = {
  primary: tw`border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-200`,
  secondary: tw`border-gray-300 bg-gray-50 focus-within:border-gray-500 focus-within:ring-gray-200`,
};
const sizes = {
  xs: {
    container: tw`h-8`,
    input: tw`text-xs`,
    padX: "px-2",
    gap: "gap-1.5",
  },
  sm: { container: tw`h-9`, input: tw`text-sm`, padX: "px-3", gap: "gap-2" },
  md: {
    container: tw`h-10`,
    input: tw`text-base`,
    padX: "px-3.5",
    gap: "gap-2",
  },
  lg: {
    container: tw`h-12`,
    input: tw`text-lg`,
    padX: "px-4",
    gap: "gap-2.5",
  },
  xl: { container: tw`h-14`, input: tw`text-xl`, padX: "px-5", gap: "gap-3" },
} as const;

// Icon button sizes to match control size
const iconBtnSizes: Record<keyof typeof sizes, string> = {
  xs: "h-6 w-6",
  sm: "h-7 w-7",
  md: "h-7 w-7",
  lg: "h-8 w-8",
  xl: "h-9 w-9",
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
  md: tw`text-sm`,
  lg: tw`text-base`,
  xl: tw`text-base`,
};
const widths = {
  sm: tw`w-64`,
  md: tw`w-80`,
  lg: tw`w-96`,
  xl: tw`w-[30rem]`,
} as const;

// Token placeholders for empty segments
const TOKEN_DD = "DD";
const TOKEN_MM = "MM";
const TOKEN_YYYY = "YYYY";

// Helpers
function clampToDay(d: Date) {
  const x = new Date(d);
  x.setHours(12, 0, 0, 0);
  return x;
}

function inRange(date: Date, minDate?: Date, maxDate?: Date) {
  const d = clampToDay(date);
  if (minDate && isBefore(d, clampToDay(minDate))) return false;
  if (maxDate && isAfter(d, clampToDay(maxDate))) return false;
  return true;
}

function parseMMDDYYYY(text: string): Date | null {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text)) return null;
  // Interpret as DD/MM/YYYY for this component
  const parsed = parse(text, "dd/MM/yyyy", new Date());
  if (!isValid(parsed)) return null;
  return parsed;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate: maxDateProp,
  label,
  description,
  error,
  disabled,
  placeholder = "MM/DD/YYYY",
  withCalendar = true,
  order = "dmy",
  variant = "primary",
  size = "md",
  rounded = "sm",
  fullWidth = false,
  width = "md",
  className = "",
  id,
}) => {
  const autoId = React.useId();
  const inputId = id ?? autoId;

  // Refs for inputs
  const mmRef = React.useRef<HTMLInputElement | null>(null);
  const ddRef = React.useRef<HTMLInputElement | null>(null);
  const yyyyRef = React.useRef<HTMLInputElement | null>(null);

  const today = React.useMemo(() => new Date(), []);
  const maxDate = React.useMemo(() => (maxDateProp ? maxDateProp : today), [maxDateProp, today]);

  // Internal segment state
  const [dd, setDD] = React.useState<string>(value ? format(value, "dd") : "");
  const [mm, setMM] = React.useState<string>(value ? format(value, "MM") : "");
  const [yyyy, setYYYY] = React.useState<string>(value ? format(value, "yyyy") : "");

  const [open, setOpen] = React.useState(false);
  const [activeSeg, setActiveSeg] = React.useState<0 | 1 | 2>(0); // 0=DD,1=MM,2=YYYY
  const [touched, setTouched] = React.useState(false);

  // Keep segments in sync with controlled value
  React.useEffect(() => {
    if (!value) {
      setMM("");
      setDD("");
      setYYYY("");
      return;
    }
    const nextDD = format(value, "dd");
    const nextMM = format(value, "MM");
    const nextYYYY = format(value, "yyyy");
    if (dd !== nextDD) setDD(nextDD);
    if (mm !== nextMM) setMM(nextMM);
    if (yyyy !== nextYYYY) setYYYY(nextYYYY);
  }, [value]);

  const hasAssistive = Boolean(description || error);
  const assistiveId = `${inputId}-desc`;

  const text = React.useMemo(() => {
    const parts = [dd, mm, yyyy];
    const filled = parts.every(p => p.length > 0);
    return filled ? `${dd}/${mm}/${yyyy}` : "";
  }, [dd, mm, yyyy]);

  const currentDate = React.useMemo(() => parseMMDDYYYY(text), [text]);
  const isValidDate = React.useMemo(() => {
    if (!currentDate) return false;
    return inRange(currentDate, minDate, maxDate);
  }, [currentDate, minDate, maxDate]);

  // Display helpers: show leading zero visually for 1-digit segments
  // const ddDisplay = dd.length === 1 ? `0${dd}` : dd;
  // const mmDisplay = mm.length === 1 ? `0${mm}` : mm;
  // const yyyyDisplay =
  //     yyyy.length > 0 && yyyy.length < 4 ? yyyy.padStart(4, "0") : yyyy;

  const anyFilled = mm.length > 0 || dd.length > 0 || yyyy.length > 0;
  const isComplete = dd.length === 2 && mm.length === 2 && yyyy.length === 4;
  const showError = Boolean(error || (touched && isComplete && !isValidDate));
  const errorMessage = error || (!isValidDate && isComplete ? "Invalid date" : undefined);

  const focusSeg = (seg: 0 | 1 | 2) => {
    setActiveSeg(seg);
    requestAnimationFrame(() => {
      if (seg === 0) ddRef.current?.select();
      else if (seg === 1) mmRef.current?.select();
      else yyyyRef.current?.select();
    });
  };

  // Order-aware navigation
  const orderSeq: (0 | 1 | 2)[] = React.useMemo(() => {
    if (order === "mdy") return [1, 0, 2];
    if (order === "ymd") return [2, 1, 0];
    return [0, 1, 2]; // dmy
  }, [order]);
  const movePrev = () => {
    const idx = orderSeq.indexOf(activeSeg as 0 | 1 | 2);
    const prevIdx = Math.max(0, idx - 1);
    focusSeg(orderSeq[prevIdx]);
  };
  const moveNext = () => {
    const idx = orderSeq.indexOf(activeSeg as 0 | 1 | 2);
    const nextIdx = Math.min(orderSeq.length - 1, idx + 1);
    focusSeg(orderSeq[nextIdx]);
  };

  const normalizeDigits = (s: string) => s.replace(/[^0-9]/g, "");

  const commitIfValid = (ddStr: string, mmStr: string, yyyyStr: string) => {
    const filled = ddStr.length === 2 && mmStr.length === 2 && yyyyStr.length === 4;
    if (!filled) return;
    const nextText = `${ddStr}/${mmStr}/${yyyyStr}`;
    const d = parseMMDDYYYY(nextText);
    if (d && inRange(d, minDate, maxDate)) {
      if (!value || !isSameDay(value, d)) onChange?.(d);
    }
  };

  const clearAll = () => {
    setMM("");
    setDD("");
    setYYYY("");
    onChange?.(null);
  };

  const handleFocusField = (seg: 0 | 1 | 2) => {
    setTouched(true);
    focusSeg(seg);
  };

  const handleKeyDownField = (e: React.KeyboardEvent<HTMLInputElement>, seg: 0 | 1 | 2) => {
    if (disabled) return;
    const key = e.key;
    // Navigation
    if (key === "ArrowLeft") {
      e.preventDefault();
      setActiveSeg(seg);
      movePrev();
      return;
    }
    if (key === "ArrowRight") {
      e.preventDefault();
      setActiveSeg(seg);
      moveNext();
      return;
    }
    if (key === "/") {
      e.preventDefault();
      moveNext();
      return;
    }
    if (key === "Delete") {
      e.preventDefault();
      clearAll();
      return;
    }
    if (key === "Backspace") {
      const val = seg === 0 ? dd : seg === 1 ? mm : yyyy;
      if (val.length === 0) {
        // Jump back if the current segment is empty
        e.preventDefault();
        movePrev();
        return;
      }
    }
  };

  const onChangeDD: React.ChangeEventHandler<HTMLInputElement> = e => {
    // Allow user to type a single digit; when our UI shows 0x and user types another digit,
    // the input might become 0xD -> take the last two digits to form the intended value.
    let raw = normalizeDigits(e.target.value);
    if (raw.length > 2) raw = raw.slice(-2);
    let digits = raw;
    // Clamp only when 2 digits available
    if (digits.length === 2) {
      let n = Number(digits);
      if (n < 1) n = 1;
      if (n > 31) n = 31;
      digits = n.toString().padStart(2, "0");
    }
    setDD(digits);
    if (digits.length === 2) moveNext();
    commitIfValid(digits, mm, yyyy);
  };
  const onChangeMM: React.ChangeEventHandler<HTMLInputElement> = e => {
    // Similar behavior to day: allow single digit, and handle UI-prepended zero by using last two digits
    let raw = normalizeDigits(e.target.value);
    if (raw.length > 2) raw = raw.slice(-2);
    let digits = raw;
    // Clamp only when 2 digits available
    if (digits.length === 2) {
      let n = Number(digits);
      if (n < 1) n = 1;
      if (n > 12) n = 12;
      digits = n.toString().padStart(2, "0");
    }
    setMM(digits);
    if (digits.length === 2) moveNext();
    commitIfValid(dd, digits, yyyy);
  };
  const onChangeYYYY: React.ChangeEventHandler<HTMLInputElement> = e => {
    // Allow progressive typing; when UI shows leading zeros, use last 4 typed digits
    let raw = normalizeDigits(e.target.value);
    if (raw.length > 4) raw = raw.slice(-4);
    setYYYY(raw);
    // Only commit when 4 digits present; also auto-advance to next segment if any (e.g., order="ymd")
    if (raw.length === 4) {
      commitIfValid(dd, mm, raw);
      moveNext();
    }
  };

  const handleBlurField: React.FocusEventHandler<HTMLInputElement> = () => {
    if (!anyFilled) {
      onChange?.(null);
      return;
    }
    // Do not auto-commit on blur to avoid focus jumps; only commit via input completion
    commitIfValid(dd, mm, yyyy);
  };

  // Popover and calendar
  const popRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popRef.current && !popRef.current.contains(target)) {
        // If click occurs outside the popover, close
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={cn(wrapperBase, fullWidth ? "w-full" : (widths[width] ?? "w-auto"))}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "mb-1 font-medium text-gray-900",
            labelSizes[size],
            showError && "text-red-700"
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          fieldBase,
          variants[variant],
          sizes[size].container,
          roundedOptions[rounded],
          sizes[size].padX,
          "gap-0.5", // tighter spacing between segments
          showError && "border-red-500 focus-within:border-red-500 focus-within:ring-red-200",
          fullWidth && "w-full",
          className
        )}
        onMouseDown={e => {
          if (disabled) return;
          const target = e.target as HTMLElement;
          const hitInput = target.closest("input");
          const hitButton = target.closest("button");
          if (!hitInput && !hitButton) {
            // Focus the first segment based on order
            e.preventDefault();
            if (order === "mdy") mmRef.current?.focus();
            else if (order === "ymd") yyyyRef.current?.focus();
            else ddRef.current?.focus();
          }
        }}
      >
        {/* Segment inputs rendered based on order prop */}
        {(() => {
          const parts: Array<React.ReactElement> = [];
          const pushSep = () =>
            parts.push(
              <span
                key={`sep-${parts.length}`}
                aria-hidden
                className='px-0 text-gray-400 select-none'
              >
                /
              </span>
            );
          const pushDD = () =>
            parts.push(
              <input
                key='dd'
                ref={ddRef}
                id={inputId}
                value={dd}
                placeholder={TOKEN_DD}
                onFocus={() => handleFocusField(0)}
                onKeyDown={e => handleKeyDownField(e, 0)}
                onBlur={handleBlurField}
                onChange={onChangeDD}
                inputMode='numeric'
                aria-invalid={showError || undefined}
                aria-describedby={hasAssistive ? assistiveId : undefined}
                disabled={disabled}
                className={cn(
                  "w-9 min-w-0 bg-transparent text-center outline-none",
                  "placeholder:font-light placeholder:text-gray-400",
                  sizes[size].input
                )}
              />
            );
          const pushMM = () =>
            parts.push(
              <input
                key='mm'
                ref={mmRef}
                value={mm}
                placeholder={TOKEN_MM}
                onFocus={() => handleFocusField(1)}
                onKeyDown={e => handleKeyDownField(e, 1)}
                onBlur={handleBlurField}
                onChange={onChangeMM}
                inputMode='numeric'
                disabled={disabled}
                className={cn(
                  "w-9 min-w-0 bg-transparent text-center outline-none",
                  "placeholder:font-light placeholder:text-gray-400",
                  sizes[size].input
                )}
              />
            );
          const pushYYYY = () =>
            parts.push(
              <input
                key='yyyy'
                ref={yyyyRef}
                value={yyyy}
                placeholder={TOKEN_YYYY}
                onFocus={() => handleFocusField(2)}
                onKeyDown={e => handleKeyDownField(e, 2)}
                onBlur={handleBlurField}
                onChange={onChangeYYYY}
                inputMode='numeric'
                disabled={disabled}
                className={cn(
                  "w-16 min-w-0 bg-transparent text-center outline-none",
                  "placeholder:font-light placeholder:text-gray-400",
                  sizes[size].input
                )}
              />
            );

          const addOrdered = (first: () => void, second: () => void, third: () => void) => {
            first();
            pushSep();
            second();
            pushSep();
            third();
          };

          if (order === "mdy") addOrdered(pushMM, pushDD, pushYYYY);
          else if (order === "ymd") addOrdered(pushYYYY, pushMM, pushDD);
          else addOrdered(pushDD, pushMM, pushYYYY); // default dmy

          return parts;
        })()}

        {/* Calendar toggle button */}
        {withCalendar && (
          <button
            type='button'
            aria-label='Open calendar'
            onClick={() => setOpen(v => !v)}
            disabled={disabled}
            className={cn(
              "ml-auto inline-flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              iconBtnSizes[size]
            )}
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden>
              <rect
                x='3'
                y='4'
                width='18'
                height='18'
                rx='2'
                ry='2'
                stroke='currentColor'
                strokeWidth='2'
              />
              <path
                d='M16 2v4M8 2v4M3 10h18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </button>
        )}

        {/* Popover */}
        {withCalendar && open && (
          <div
            ref={popRef}
            className={tw`animate-in fade-in zoom-in-95 absolute top-[calc(100%+6px)] left-0 z-50 w-max rounded-md bg-white shadow-lg duration-150`}
            role='dialog'
            aria-modal={false}
          >
            <Calendar
              selectedDate={currentDate ?? undefined}
              minDate={minDate}
              maxDate={maxDate}
              onDateSelect={(d: Date) => {
                const ndd = format(d, "dd");
                const nmm = format(d, "MM");
                const nyyyy = format(d, "yyyy");
                setDD(ndd);
                setMM(nmm);
                setYYYY(nyyyy);
                onChange?.(d);
                setOpen(false);
                // Focus back to first segment based on order for quick edits
                requestAnimationFrame(() => {
                  if (order === "mdy") mmRef.current?.focus();
                  else if (order === "ymd") yyyyRef.current?.focus();
                  else ddRef.current?.focus();
                });
              }}
            />
          </div>
        )}
      </div>

      {hasAssistive && (
        <div id={assistiveId} className='mt-1 min-h-[1rem]'>
          {showError && errorMessage ? (
            <span className='text-sm text-red-600'>{errorMessage}</span>
          ) : description ? (
            <span className='text-sm text-gray-600'>{description}</span>
          ) : null}
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
