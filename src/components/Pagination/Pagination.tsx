import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";
import { Button } from "@/components";
import {
    HiChevronLeft as ChevronLeft,
    HiChevronRight as ChevronRight,
    HiChevronDoubleLeft as ChevronsLeft,
    HiChevronDoubleRight as ChevronsRight,
} from "react-icons/hi";

export interface PaginationProps {
    /**
     * The current active page (1-indexed)
     */
    currentPage: number;
    /**
     * Total number of pages
     */
    totalPages: number;
    /**
     * Callback function called when page changes
     */
    onPageChange: (page: number) => void;
    /**
     * Maximum number of page buttons to show
     * @default 5
     */
    maxVisiblePages?: number;
    /**
     * Size of the pagination buttons
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * Whether to show first/last navigation buttons
     * @default false
     */
    showFirstLast?: boolean;
    /**
     * Whether to show previous/next navigation buttons
     * @default true
     */
    showPrevNext?: boolean;
    /**
     * Whether the pagination is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Additional CSS classes
     */
    className?: string;
}

const base = tw`flex items-center gap-1`;

const sizes = {
    sm: tw`gap-1.5`,
    md: tw`gap-1.5`,
    lg: tw`gap-2`,
};

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
    (
        {
            currentPage,
            totalPages,
            onPageChange,
            maxVisiblePages = 5,
            size = "md",
            showFirstLast = false,
            showPrevNext = true,
            disabled = false,
            className,
            ...props
        },
        ref,
    ) => {
        // Ensure currentPage is within bounds
        const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

        // Calculate visible page range
        const getVisiblePages = () => {
            const half = Math.floor(maxVisiblePages / 2);
            let start = Math.max(1, safeCurrentPage - half);
            const end = Math.min(totalPages, start + maxVisiblePages - 1);

            // Adjust start if we're near the end
            if (end - start + 1 < maxVisiblePages) {
                start = Math.max(1, end - maxVisiblePages + 1);
            }

            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        };

        const visiblePages = getVisiblePages();
        const showStartEllipsis = visiblePages[0] > 2;
        const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

        const handlePageChange = (page: number) => {
            if (page >= 1 && page <= totalPages && page !== safeCurrentPage && !disabled) {
                onPageChange(page);
            }
        };

        const renderPageButton = (page: number, isActive = false) => (
            <Button
                key={page}
                variant={isActive ? "primary" : "secondary"}
                size={size === "sm" ? "xs" : size === "md" ? "sm" : "md"}
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                className={tw`min-w-[2.5rem] px-3 ${isActive ? "outline outline-blue-600" : ""}`}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? "page" : undefined}
            >
                {page}
            </Button>
        );

        const renderEllipsis = (key: string) => (
            <span
                key={key}
                className={tw`flex h-8 w-8 items-center justify-center text-sm text-gray-500`}
                aria-hidden="true"
            >
                ...
            </span>
        );

        if (totalPages <= 1) {
            return null;
        }

        return (
            <nav
                ref={ref}
                className={cn(base, sizes[size], className)}
                aria-label="Pagination Navigation"
                {...props}
            >
                {/* First button */}
                {showFirstLast && (
                    <Button
                        variant="secondary"
                        size={size === "sm" ? "xs" : size === "md" ? "sm" : "md"}
                        onClick={() => handlePageChange(1)}
                        disabled={disabled || safeCurrentPage === 1}
                        aria-label="Go to first page"
                    >
                        <ChevronsLeft size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
                    </Button>
                )}

                {/* Previous button */}
                {showPrevNext && (
                    <Button
                        variant="secondary"
                        size={size === "sm" ? "xs" : size === "md" ? "sm" : "md"}
                        onClick={() => handlePageChange(safeCurrentPage - 1)}
                        disabled={disabled || safeCurrentPage === 1}
                        aria-label="Go to previous page"
                    >
                        <ChevronLeft size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
                    </Button>
                )}

                {/* First page if not in visible range */}
                {visiblePages[0] > 1 && renderPageButton(1)}

                {/* Start ellipsis */}
                {showStartEllipsis && renderEllipsis("start-ellipsis")}

                {/* Visible page numbers */}
                {visiblePages.map((page) => renderPageButton(page, page === safeCurrentPage))}

                {/* End ellipsis */}
                {showEndEllipsis && renderEllipsis("end-ellipsis")}

                {/* Last page if not in visible range */}
                {visiblePages[visiblePages.length - 1] < totalPages && renderPageButton(totalPages)}

                {/* Next button */}
                {showPrevNext && (
                    <Button
                        variant="secondary"
                        size={size === "sm" ? "xs" : size === "md" ? "sm" : "md"}
                        onClick={() => handlePageChange(safeCurrentPage + 1)}
                        disabled={disabled || safeCurrentPage === totalPages}
                        aria-label="Go to next page"
                    >
                        <ChevronRight size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
                    </Button>
                )}

                {/* Last button */}
                {showFirstLast && (
                    <Button
                        variant="secondary"
                        size={size === "sm" ? "xs" : size === "md" ? "sm" : "md"}
                        onClick={() => handlePageChange(totalPages)}
                        disabled={disabled || safeCurrentPage === totalPages}
                        aria-label="Go to last page"
                    >
                        <ChevronsRight size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
                    </Button>
                )}
            </nav>
        );
    },
);

Pagination.displayName = "Pagination";
