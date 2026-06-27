'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    showing: number;
    isDisabled?: boolean;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    showing,
    isDisabled = false,
}: PaginationProps) => {
    // Don't show if no items
    if (totalItems === 0) return null;

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;
        const halfVisible = Math.floor(maxVisible / 2);

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - halfVisible);
            let end = Math.min(totalPages - 1, currentPage + halfVisible);

            if (currentPage <= halfVisible + 1) {
                end = maxVisible;
            }

            if (currentPage >= totalPages - halfVisible) {
                start = totalPages - maxVisible + 1;
            }

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push('...');
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col items-center gap-3 mt-4 pt-2">
            {/* Page numbers with Previous/Next buttons - Centered */}
            <div className="flex items-center gap-1">
                {/* Previous Button - Square */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={isFirstPage || isDisabled}
                    className={`
            w-8 h-8 flex items-center justify-center
            text-sm font-medium text-gray-600
            border border-gray-300 rounded
            hover:bg-gray-50 transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
                    aria-label="Previous page"
                >
                    ◄
                </button>

                {/* Page Numbers */}
                {totalPages > 1 && getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        disabled={typeof page !== 'number' || isDisabled}
                        className={`
              w-8 h-8 flex items-center justify-center
              text-sm font-medium rounded
              transition-colors
              ${page === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                            }
              ${typeof page !== 'number' ? 'cursor-default' : ''}
            `}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === currentPage ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ))}

                {/* Showing text - Centered below */}
                <div className="text-sm text-gray-800 font-semibold">
                    Showing {showing} to {Math.min(showing, totalItems)} from {totalItems}
                </div>

                {/* Next Button - Square */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={isLastPage || isDisabled}
                    className={`
            w-8 h-8 flex items-center justify-center
            text-sm font-medium text-gray-600
            border border-gray-300 rounded
            hover:bg-gray-50 transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
                    aria-label="Next page"
                >
                    ►
                </button>
            </div>


        </div>
    );
};