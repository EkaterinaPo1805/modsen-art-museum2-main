import React, { useCallback } from 'react';

import { SORT_CRITERIA } from '@constants/strings';

import '@components/SortDropdown/styled';

interface SortDropdownProps {
	sortCriteria: string;
	setSortCriteria: (criteria: string) => void;
}

const handleSortChange =
	(setSortCriteria: (criteria: string) => void) =>
	(e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortCriteria(e.target.value);
	};

const SortDropdown: React.FC<SortDropdownProps> = ({
	sortCriteria,
	setSortCriteria,
}) => {
	const memoizedHandleSortChange = useCallback(
		handleSortChange(setSortCriteria),
		[setSortCriteria]
	);

	return (
		<section className="sort-dropdown">
			<label htmlFor="sort-select" className="sort-label">
				Sort by:
			</label>
			<select
				id="sort-select"
				value={sortCriteria}
				onChange={memoizedHandleSortChange}
				aria-label="Sort options"
			>
				<option value={SORT_CRITERIA.TITLE}>Title</option>
				<option value={SORT_CRITERIA.ARTIST}>Artist</option>
				<option value={SORT_CRITERIA.DATE}>Date</option>
			</select>
		</section>
	);
};

export default React.memo(SortDropdown);
