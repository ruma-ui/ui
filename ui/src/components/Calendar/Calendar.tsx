import type { Locale } from "date-fns";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React from "react";
import { HiChevronLeft as ChevronLeft, HiChevronRight as ChevronRight } from "react-icons/hi";
import { cn, tw } from "../../lib/utils";

export interface CalendarProps {
  /** Currently selected date (controlled). */
  selectedDate?: Date | null;
  /** Called when a day is selected. */
  onDateSelect?: (date: Date) => void;

  /** Minimum selectable date (inclusive). */
  minDate?: Date;
  /** Maximum selectable date (inclusive). */
  maxDate?: Date;
  /** Disable a specific day using a predicate. */
  isDateDisabled?: (date: Date) => boolean;

  /** 0=Sunday ... 6=Saturday. @default 0 */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** i18n locale from date-fns. */
  locale?: Locale;
  /** Show days from adjacent months. @default true */
  showOutsideDays?: boolean;
  /** Show native selects to pick month and year. @default true */
  showMonthYearPickers?: boolean;
  /** Disable animations between months. @default false */
  disableAnimation?: boolean;

  /** Control currently visible month (controlled). */
  month?: Date;
  /** Called when visible month changes (via navigation). */
  onMonthChange?: (nextMonth: Date) => void;

  /** Optional id for accessibility. */
  id?: string;
  /** Custom className for the outer wrapper. */
  className?: string;
}

const wrapper = tw`inline-flex flex-col rounded-md border border-border bg-card p-3 text-foreground`;
const header = tw`mb-2 flex items-center justify-between`;
const navBtn = tw`rui-focus-ring inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border text-foreground hover:bg-accent hover:text-accent-foreground active:bg-muted`;
const monthLabel = tw`px-2 text-sm font-semibold`;
const pickerWrap = tw`flex items-center gap-2`;
const selectBase = tw`rui-field-focus h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none`;
const grid = tw`grid grid-cols-7 gap-1`;
const dow = tw`py-1 text-center text-xs font-medium text-muted-foreground`;
const dayBase = tw`rui-focus-ring relative flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors focus:outline-none`;

function clampToDay(date: Date) {
  // normalize to noon to avoid DST edge cases on comparisons if needed
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  return d;
}

function isOutOfRange(date: Date, minDate?: Date, maxDate?: Date) {
  const d = clampToDay(date);
  if (minDate && isBefore(d, clampToDay(minDate))) return true;
  if (maxDate && isAfter(d, clampToDay(maxDate))) return true;
  return false;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate = null,
  onDateSelect,
  minDate,
  maxDate,
  isDateDisabled,
  weekStartsOn = 0,
  locale,
  showOutsideDays = true,
  showMonthYearPickers = true,
  disableAnimation = false,
  month,
  onMonthChange,
  id,
  className = "",
}) => {
  const today = React.useMemo(() => new Date(), []);

  // Controlled or uncontrolled month state
  const initialMonth = React.useMemo(() => {
    if (month) return startOfMonth(month);
    if (selectedDate) return startOfMonth(selectedDate);
    return startOfMonth(today);
  }, [month, selectedDate, today]);

  const [internalMonth, setInternalMonth] = React.useState<Date>(initialMonth);

  // Keep internal month in sync when controlled props change
  React.useEffect(() => {
    if (month) setInternalMonth(startOfMonth(month));
  }, [month]);

  React.useEffect(() => {
    // When user selects a date via external control, keep month visible to that date
    if (!month && selectedDate) setInternalMonth(startOfMonth(selectedDate));
  }, [selectedDate, month]);

  const visibleMonth = month ? startOfMonth(month) : internalMonth;

  const start = startOfWeek(startOfMonth(visibleMonth), {
    weekStartsOn,
    locale,
  });
  const end = endOfWeek(endOfMonth(visibleMonth), { weekStartsOn, locale });
  const days = eachDayOfInterval({ start, end });
  // Ensure 6 rows (42 days) to keep height stable
  if (days.length < 42) {
    const toAdd = 42 - days.length;
    const last = days[days.length - 1];
    for (let i = 1; i <= toAdd; i++) {
      days.push(addDays(last, i));
    }
  }

  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(startOfWeek(new Date(), { weekStartsOn, locale }), i);
    return format(d, "EEEEE", { locale }); // S M T W T F S
  });

  const [animDir, setAnimDir] = React.useState<"left" | "right" | null>(null);

  const goPrev = () => {
    const next = startOfMonth(addMonths(visibleMonth, -1));
    setAnimDir("right");
    if (month) onMonthChange?.(next);
    else setInternalMonth(next);
  };

  const goNext = () => {
    const next = startOfMonth(addMonths(visibleMonth, 1));
    setAnimDir("left");
    if (month) onMonthChange?.(next);
    else setInternalMonth(next);
  };

  // Clear animation marker shortly after month changes so re-renders can re-apply class
  React.useEffect(() => {
    if (!animDir) return;
    const t = setTimeout(() => setAnimDir(null), 250);
    return () => clearTimeout(t);
  }, [animDir]);

  const handleSelect = (day: Date, disabled: boolean) => {
    if (disabled) return;
    onDateSelect?.(day);
  };

  return (
    <div id={id} className={cn(wrapper, className)} role="group" aria-label="Calendar">
      {/* Header */}
      <div className={header}>
        <button type="button" className={navBtn} aria-label="Previous month" onClick={goPrev}>
          <ChevronLeft size={16} />
        </button>
        {showMonthYearPickers ? (
          <div className={pickerWrap}>
            {/* Month select */}
            <select
              aria-label="Select month"
              className={selectBase}
              value={visibleMonth.getMonth()}
              onChange={e => {
                const m = Number(e.target.value);
                const next = new Date(visibleMonth);
                next.setMonth(m);
                next.setDate(1);
                const normalized = startOfMonth(next);
                if (month) onMonthChange?.(normalized);
                else setInternalMonth(normalized);
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i}>
                  {format(new Date(2020, i, 1), "LLLL", {
                    locale,
                  })}
                </option>
              ))}
            </select>
            {/* Year select: show a reasonable window around current year */}
            <select
              aria-label="Select year"
              className={selectBase}
              value={visibleMonth.getFullYear()}
              onChange={e => {
                const y = Number(e.target.value);
                const next = new Date(visibleMonth);
                next.setFullYear(y);
                next.setDate(1);
                const normalized = startOfMonth(next);
                if (month) onMonthChange?.(normalized);
                else setInternalMonth(normalized);
              }}
            >
              {(() => {
                const years: number[] = [];
                const center = today.getFullYear();
                const startY = center - 50; // 50 years back
                const endY = center + 50; // 50 years ahead
                for (let y = startY; y <= endY; y++) years.push(y);
                return years.map(y => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ));
              })()}
            </select>
          </div>
        ) : (
          <div className={monthLabel} aria-live="polite" aria-atomic>
            {format(visibleMonth, "MMMM yyyy", { locale })}
          </div>
        )}
        <button type="button" className={navBtn} aria-label="Next month" onClick={goNext}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Grid header (days of week) */}
      <div className={grid} role="row">
        {weekdayLabels.map(label => (
          <div key={label} className={dow} role="columnheader" aria-label={label}>
            {label}
          </div>
        ))}
      </div>

      {/* Days */}
      <div
        className={cn(
          grid,
          !disableAnimation &&
            animDir === "left" &&
            "animate-in slide-in-from-right-4 fade-in duration-200 ease-out",
          !disableAnimation &&
            animDir === "right" &&
            "animate-in slide-in-from-left-4 fade-in duration-200 ease-out"
        )}
        role="grid"
        aria-readonly
      >
        {days.map(day => {
          const inCurrentMonth = isSameMonth(day, visibleMonth);
          const outOfMonth = !inCurrentMonth;
          const outOfRange = isOutOfRange(day, minDate, maxDate);
          const predicateDisabled = isDateDisabled?.(day) ?? false;
          const disabled = outOfRange || predicateDisabled || (!showOutsideDays && outOfMonth);

          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const todayFlag = isToday(day);

          const dayClasses = cn(
            dayBase,
            disabled && "cursor-not-allowed opacity-40",
            !disabled && "cursor-pointer hover:bg-accent hover:text-accent-foreground",
            outOfMonth && showOutsideDays && "text-muted-foreground/60",
            isSelected &&
              "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
            todayFlag && !isSelected && "ring-1 ring-border font-semibold"
          );

          return (
            <button
              key={day.toISOString()}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              aria-disabled={disabled}
              disabled={disabled}
              onClick={() => handleSelect(day, disabled)}
              className={dayClasses}
              title={format(day, "PPPP", { locale })}
            >
              <span className={tw`leading-none`}>{format(day, "d", { locale })}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";

export default Calendar;
