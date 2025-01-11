import React, { useMemo, useCallback } from 'react';
import PageButton from '@components/PageButton/index';
import { PAGE_COUNT } from '@constants/numbers';

import '@components/Pagination/styled';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const usePageRange = (currentPage: number, totalPages: number) => {
	return useMemo(() => {
		const pageCount = PAGE_COUNT;
		const start = Math.max(1, currentPage - Math.floor(pageCount / 2));
		const end = Math.min(totalPages, start + pageCount - 1);
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}, [currentPage, totalPages]);
};

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const pageRange = usePageRange(currentPage, totalPages);

	const handlePageChange = useCallback(
		(page: number) => {
			onPageChange(page);
		},
		[onPageChange]
	);

	return (
		<nav className="pagination" aria-label="Pagination">
			{currentPage > 1 && (
				<PageButton
					direction="left"
					onClick={() => handlePageChange(currentPage - 1)}
				/>
			)}

			<ul className="page-list">
				{pageRange.map((pageNumber) => (
					<li key={pageNumber} className="page-item">
						<button
							className={`page-btn ${pageNumber === currentPage ? 'active' : ''}`}
							onClick={() => handlePageChange(pageNumber)}
						>
							{pageNumber}
						</button>
					</li>
				))}
			</ul>

			{currentPage < totalPages && (
				<PageButton
					direction="right"
					onClick={() => handlePageChange(currentPage + 1)}
				/>
			)}
		</nav>
	);
};

export default Pagination;
