import { render, screen, fireEvent } from '@testing-library/react';
import SortDropdown from '../components/SortDropdown';

describe('SortDropdown component', () => {
	test('renders SortDropdown with options', () => {
		render(<SortDropdown sortCriteria="title" setSortCriteria={() => {}} />);

		expect(screen.getByText('Sort by Title')).toBeInTheDocument();
		expect(screen.getByText('Sort by Artist')).toBeInTheDocument();
		expect(screen.getByText('Sort by Date')).toBeInTheDocument();
	});

	test('calls setSortCriteria when option is selected', () => {
		const setSortCriteriaMock = jest.fn();
		render(
			<SortDropdown
				sortCriteria="title"
				setSortCriteria={setSortCriteriaMock}
			/>
		);

		const select = screen.getByRole('combobox') as HTMLSelectElement;
		fireEvent.change(select, { target: { value: 'artist' } });

		expect(setSortCriteriaMock).toHaveBeenCalledWith('artist');
	});

	test('selects the correct value based on sortCriteria prop', () => {
		render(<SortDropdown sortCriteria="artist" setSortCriteria={() => {}} />);

		const select = screen.getByRole('combobox') as HTMLSelectElement;
		expect(select.value).toBe('artist');
	});
});
