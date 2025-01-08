import React from 'react';

interface SortDropdownProps {
	sortCriteria: string;
	setSortCriteria: (criteria: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
	sortCriteria,
	setSortCriteria,
}) => {
	return (
		<div className="sort-dropdown">
			<select
				value={sortCriteria}
				onChange={(e) => setSortCriteria(e.target.value)}
			>
				<option value="title">Sort by Title</option>
				<option value="artist">Sort by Artist</option>
				<option value="date">Sort by Date</option>
			</select>
		</div>
	);
};

export default SortDropdown;
