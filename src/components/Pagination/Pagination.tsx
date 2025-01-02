import React from 'react';
import ArrowIcon from '@components/ArrowIcon';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const getPageRange = () => {
		const pageCount = 4;
		const start = Math.max(1, currentPage - Math.floor(pageCount / 2));
		const end = Math.min(totalPages, start + pageCount - 1);
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	return (
		<div className="pagination">
			{currentPage > 1 && (
				<button
					className="page-btn"
					aria-label="left"
					onClick={() => onPageChange(currentPage - 1)}
				>
					<ArrowIcon direction="left" />
				</button>
			)}

			{getPageRange().map((pageNumber) => (
				<button
					key={pageNumber}
					className={`page-btn ${pageNumber === currentPage ? 'active' : ''}`}
					onClick={() => onPageChange(pageNumber)}
				>
					{pageNumber}
				</button>
			))}

			{currentPage < totalPages && (
				<button
					className="page-btn"
					aria-label="right"
					onClick={() => onPageChange(currentPage + 1)}
				>
					<ArrowIcon direction="right" />
				</button>
			)}
		</div>
	);
};

export default Pagination;
