import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

export type TableDensity = "compact" | "normal" | "comfortable";
export type TableVariant = "plain" | "zebra" | "outlined";
export type TableAlign = "left" | "center" | "right";

export interface Column<T> {
    /** Unique key for the column. Used to map row data */
    key: keyof T | string;
    /** Header label or custom node */
    header: React.ReactNode;
    /** Optional accessor for derived values */
    accessor?: (row: T, rowIndex: number) => React.ReactNode;
    /** Text alignment for the column */
    align?: TableAlign;
    /** Optional width (tailwind classes or fixed css width) */
    width?: string;
    /** Whether this column is sticky on the left */
    sticky?: boolean;
    /** Whether this column is resizable */
    resizable?: boolean;
    /** Minimum width for resizable columns */
    minWidth?: number;
    /** Maximum width for resizable columns */
    maxWidth?: number;
    /** Custom className for the column header */
    className?: string | ((column: Column<T>) => string);
}

export interface TableProps<T> {
    /** Columns configuration */
    columns: Column<T>[];
    /** Data rows */
    data: T[];
    /** Visual density */
    density?: TableDensity;
    /** Visual variant */
    variant?: TableVariant;
    /** Add hover effect for rows */
    highlightOnHover?: boolean;
    /** Render when there is no data */
    emptyState?: React.ReactNode;
    /** Optional caption for accessibility */
    caption?: string;
    /** Controlled selection: selected row indices */
    selectedRows?: number[];
    /** Callback when a row is clicked */
    onRowClick?: (row: T, index: number) => void;
    /** Callback when selection toggles for a row (if selection is implemented externally) */
    onSelectRow?: (row: T, index: number, selected: boolean) => void;
    /** Optional className for the wrapper */
    className?: string;
    /** Optional max height to enable scroll with sticky header */
    maxHeight?: string | number;
    /** Enable sticky header */
    stickyHeader?: boolean;
    /** ARIA label (when no visible caption) */
    ariaLabel?: string;
    /** Enable virtualization for large datasets */
    virtualization?: boolean;
    /** Row height for virtualization (in pixels) */
    rowHeight?: number;
    /** Overscan count for virtualization */
    overscan?: number;
    /** Custom className for rows */
    rowClassName?: string | ((row: T, index: number) => string);
    /** Custom className for cells */
    cellClassName?:
        | string
        | ((row: T, column: Column<T>, rowIndex: number, colIndex: number) => string);
    /** Callback when column is resized */
    onColumnResize?: (columnKey: string | keyof T, width: number) => void;
}

const tableBase = tw`w-full border-collapse text-gray-900`;
const wrapperBase = tw`relative w-full overflow-auto rounded-md border border-gray-200 bg-white`;
const headerBase = tw`bg-gray-50 text-left text-sm font-semibold text-gray-700`;
const cellBase = tw`text-sm text-gray-900`;
const outlinedCell = tw`border border-gray-200`;
const hoverRow = tw`hover:!bg-blue-50`;

const densityRow: Record<TableDensity, string> = {
    compact: tw`[&>td]:py-2 [&>th]:py-2`,
    normal: tw`[&>td]:py-3 [&>th]:py-3`,
    comfortable: tw`[&>td]:py-4 [&>th]:py-4`,
};

const densityCellPadding: Record<TableDensity, string> = {
    compact: tw`px-3`,
    normal: tw`px-4`,
    comfortable: tw`px-5`,
};

const densityRowHeight: Record<TableDensity, number> = {
    compact: 36,
    normal: 48,
    comfortable: 60,
};

function getAlign(align?: TableAlign) {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
}

// Hook for virtualization
function useVirtualization(
    enabled: boolean,
    itemCount: number,
    itemHeight: number,
    containerHeight: number,
    overscan = 5,
) {
    const [scrollTop, setScrollTop] = useState(0);

    const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    if (!enabled || containerHeight === 0) {
        return {
            startIndex: 0,
            endIndex: itemCount - 1,
            visibleItems: itemCount,
            totalHeight: 0,
            offsetY: 0,
            onScroll,
        };
    }

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleItemsCount = Math.ceil(containerHeight / itemHeight) + overscan * 2;
    const endIndex = Math.min(itemCount - 1, startIndex + visibleItemsCount);
    const totalHeight = itemCount * itemHeight;
    const offsetY = startIndex * itemHeight;

    return {
        startIndex,
        endIndex,
        visibleItems: endIndex - startIndex + 1,
        totalHeight,
        offsetY,
        onScroll,
    };
}

// Hook for column resizing
function useColumnResizing<T>(
    columns: Column<T>[],
    onColumnResize?: (columnKey: string | keyof T, width: number) => void,
) {
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const [isResizing, setIsResizing] = useState<string | null>(null);
    const [startX, setStartX] = useState(0);
    const [startWidth, setStartWidth] = useState(0);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent, columnKey: string | keyof T, currentWidth: number) => {
            e.preventDefault();
            setIsResizing(String(columnKey));
            setStartX(e.clientX);
            setStartWidth(currentWidth);
        },
        [],
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isResizing) return;

            const diff = e.clientX - startX;
            const newWidth = Math.max(50, startWidth + diff); // Minimum width of 50px

            const column = columns.find((col) => String(col.key) === isResizing);
            if (column?.minWidth && newWidth < column.minWidth) return;
            if (column?.maxWidth && newWidth > column.maxWidth) return;

            setColumnWidths((prev) => ({
                ...prev,
                [isResizing]: newWidth,
            }));
        },
        [isResizing, startX, startWidth, columns],
    );

    const handleMouseUp = useCallback(() => {
        if (isResizing && columnWidths[isResizing]) {
            onColumnResize?.(isResizing, columnWidths[isResizing]);
        }
        setIsResizing(null);
    }, [isResizing, columnWidths, onColumnResize]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const getColumnWidth = (column: Column<T>) => {
        const key = String(column.key);
        return columnWidths[key] ? `${columnWidths[key]}px` : column.width;
    };

    return {
        getColumnWidth,
        handleMouseDown,
        isResizing,
    };
}

export function Table<T extends Record<string, any>>({
    columns,
    data = [],
    density = "normal",
    variant = "plain",
    highlightOnHover = true,
    emptyState = <div className="p-6 text-center text-sm text-gray-500">No data</div>,
    caption,
    selectedRows,
    onRowClick,
    onSelectRow,
    className = "",
    maxHeight,
    stickyHeader = true,
    ariaLabel,
    virtualization = false,
    rowHeight,
    overscan = 5,
    rowClassName,
    cellClassName,
    onColumnResize,
}: TableProps<T>) {
    const tableId = React.useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(0);

    const hasData = data && data.length > 0;
    const effectiveRowHeight = rowHeight || densityRowHeight[density];

    // Column resizing
    const { getColumnWidth, handleMouseDown, isResizing } = useColumnResizing(
        columns,
        onColumnResize,
    );

    // Virtualization
    const { startIndex, endIndex, totalHeight, offsetY, onScroll } = useVirtualization(
        virtualization && hasData,
        data.length,
        effectiveRowHeight,
        containerHeight,
        overscan,
    );

    // Update container height
    useEffect(() => {
        if (containerRef.current && (virtualization || stickyHeader || maxHeight)) {
            const updateHeight = () => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    setContainerHeight(rect.height);
                }
            };

            // Initial measurement
            updateHeight();

            // Use ResizeObserver to track container size changes
            const resizeObserver = new ResizeObserver(updateHeight);
            resizeObserver.observe(containerRef.current);

            // Also update on window resize
            window.addEventListener("resize", updateHeight);

            return () => {
                resizeObserver.disconnect();
                window.removeEventListener("resize", updateHeight);
            };
        }
    }, [virtualization, stickyHeader, maxHeight]);

    const getRowClassName = (row: T, index: number) => {
        if (typeof rowClassName === "function") {
            return rowClassName(row, index);
        }
        return rowClassName || "";
    };

    const getCellClassName = (row: T, column: Column<T>, rowIndex: number, colIndex: number) => {
        if (typeof cellClassName === "function") {
            return cellClassName(row, column, rowIndex, colIndex);
        }
        return cellClassName || "";
    };

    const getColumnClassName = (column: Column<T>) => {
        if (typeof column.className === "function") {
            return column.className(column);
        }
        return column.className || "";
    };

    const visibleData = virtualization && hasData ? data.slice(startIndex, endIndex + 1) : data;

    // Sticky header implementation
    const headerElement = (
        <thead className={cn(headerBase, stickyHeader && "sticky top-0 z-20 bg-gray-50")}>
            <tr className={cn(densityRow[density])}>
                {columns.map((col, i) => (
                    <th
                        key={String(col.key) + i}
                        scope="col"
                        className={cn(
                            densityCellPadding[density],
                            variant === "outlined" && outlinedCell,
                            getAlign(col.align),
                            col.sticky && "sticky left-0 z-30 bg-gray-50",
                            getColumnClassName(col),
                            "relative",
                        )}
                        style={{ width: getColumnWidth(col) }}
                    >
                        <div
                            className={cn(
                                "flex items-center",
                                col.align === "right"
                                    ? "justify-end"
                                    : col.align === "center"
                                      ? "justify-center"
                                      : "justify-between",
                            )}
                        >
                            <span
                                className={cn(
                                    col.align === "right" && col.resizable ? "mr-2" : "",
                                    col.align === "center" ? "flex-1 text-center" : "",
                                )}
                            >
                                {col.header}
                            </span>
                            {col.resizable && (
                                <div
                                    className={cn(
                                        "absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-blue-500",
                                        isResizing === String(col.key) && "bg-blue-500",
                                        col.align === "right" ? "relative" : "",
                                    )}
                                    onMouseDown={(e) => {
                                        const currentWidth = getColumnWidth(col);
                                        const widthInPx = currentWidth?.includes("px")
                                            ? parseInt(currentWidth)
                                            : currentWidth?.includes("rem")
                                              ? parseInt(currentWidth) * 16
                                              : 150; // default fallback
                                        handleMouseDown(e, col.key, widthInPx);
                                    }}
                                />
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );

    const bodyElement = (
        <tbody>
            {!hasData && (
                <tr>
                    <td
                        colSpan={columns.length}
                        className={cn("p-0", variant === "outlined" && outlinedCell)}
                    >
                        {emptyState}
                    </td>
                </tr>
            )}
            {virtualization && hasData && offsetY > 0 && (
                <tr>
                    <td
                        colSpan={columns.length}
                        style={{ height: offsetY, padding: 0, border: "none" }}
                    />
                </tr>
            )}
            {hasData &&
                visibleData.map((row, relativeIndex) => {
                    const actualIndex = virtualization ? startIndex + relativeIndex : relativeIndex;
                    const isSelected = selectedRows?.includes(actualIndex) ?? false;
                    return (
                        <tr
                            key={`${tableId}-row-${actualIndex}`}
                            className={cn(
                                "group",
                                densityRow[density],
                                variant === "zebra" && actualIndex % 2 === 1 && "bg-gray-50",
                                isSelected && "!bg-blue-50/70",
                                highlightOnHover && "hover:!bg-blue-50",
                                onRowClick && "cursor-pointer",
                                getRowClassName(row, actualIndex),
                            )}
                            onClick={() => onRowClick?.(row, actualIndex)}
                            style={virtualization ? { height: effectiveRowHeight } : {}}
                            onMouseEnter={(e) => {
                                if (highlightOnHover) {
                                    e.currentTarget.style.setProperty(
                                        "--row-hover-bg",
                                        "rgb(239 246 255)",
                                    );
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (highlightOnHover) {
                                    e.currentTarget.style.removeProperty("--row-hover-bg");
                                }
                            }}
                        >
                            {columns.map((col, colIndex) => {
                                const value = col.accessor
                                    ? col.accessor(row, actualIndex)
                                    : (row as any)[col.key as any];
                                return (
                                    <td
                                        key={`${tableId}-cell-${actualIndex}-${colIndex}`}
                                        className={cn(
                                            cellBase,
                                            densityCellPadding[density],
                                            variant === "outlined" && outlinedCell,
                                            getAlign(col.align),
                                            col.sticky && "sticky left-0 z-10",
                                            getCellClassName(row, col, actualIndex, colIndex),
                                        )}
                                        style={{
                                            width: getColumnWidth(col),
                                            backgroundColor: col.sticky
                                                ? isSelected
                                                    ? "rgb(147 197 253 / 0.7)"
                                                    : "var(--row-hover-bg, " +
                                                      (variant === "zebra" && actualIndex % 2 === 1
                                                          ? "rgb(249 250 251)"
                                                          : "white") +
                                                      ")"
                                                : undefined,
                                        }}
                                    >
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            {virtualization &&
                hasData &&
                totalHeight - offsetY - visibleData.length * effectiveRowHeight > 0 && (
                    <tr>
                        <td
                            colSpan={columns.length}
                            style={{
                                height:
                                    totalHeight - offsetY - visibleData.length * effectiveRowHeight,
                                padding: 0,
                                border: "none",
                            }}
                        />
                    </tr>
                )}
        </tbody>
    );

    const table = (
        <table
            className={cn(
                tableBase,
                variant !== "plain" && "w-full",
                variant === "outlined" && "border border-gray-200",
                className,
            )}
            aria-label={ariaLabel}
        >
            {caption && <caption className="sr-only">{caption}</caption>}
            {headerElement}
            {bodyElement}
        </table>
    );

    if (stickyHeader || maxHeight || virtualization) {
        return (
            <div
                ref={containerRef}
                className={cn(wrapperBase, "overflow-auto")}
                style={{
                    maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
                    height: virtualization
                        ? typeof maxHeight === "number"
                            ? `${maxHeight}px`
                            : maxHeight || "400px"
                        : "auto",
                }}
                role="region"
                aria-label={caption || ariaLabel}
                onScroll={virtualization ? onScroll : undefined}
            >
                {table}
            </div>
        );
    }

    return <div className={cn(wrapperBase)}>{table}</div>;
}

Table.displayName = "Table";
