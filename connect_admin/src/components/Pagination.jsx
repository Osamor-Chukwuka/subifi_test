import React from 'react';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Maximum number of page numbers to show

    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPageNumbers) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    // Generate page numbers
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-center pt-7 pb-3">
            <button
                className="px-3 py-2 border border-gray-300 rounded-l-md text-gray-500 hover:bg-gray-100 focus:outline-none"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                &larr; Prev
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`px-3 py-2 border border-gray-300 ${number === currentPage + 1 ? 'bg-[#015693] text-white' : 'text-gray-500 hover:bg-gray-100'
                        } focus:outline-none`}
                    onClick={() => onPageChange(number - 1)}
                >
                    {number}
                </button>
            ))}
            <button
                className="px-3 py-2 border border-gray-300 rounded-r-md text-gray-500 hover:bg-gray-100 focus:outline-none"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
            >
                Next &rarr;
            </button>
        </div>
    );
};

export default Pagination;