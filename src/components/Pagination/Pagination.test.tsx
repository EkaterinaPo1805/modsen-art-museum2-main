import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
	const onPageChangeMock = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders pagination with correct page numbers', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
		expect(screen.getByText('3')).toBeInTheDocument();
	});

	test('does not render left arrow when on the first page', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		const leftArrow = screen.queryByRole('button', { name: /left/i });
		expect(leftArrow).not.toBeInTheDocument();
	});

	test('renders left arrow when currentPage > 1', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		const leftArrow = screen.getByRole('button', { name: /left/i });
		expect(leftArrow).toBeInTheDocument();
	});

	test('does not render right arrow when on the last page', () => {
		render(
			<Pagination
				currentPage={5}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		const rightArrow = screen.queryByRole('button', { name: /right/i });
		expect(rightArrow).not.toBeInTheDocument();
	});

	test('renders right arrow when currentPage < totalPages', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		const rightArrow = screen.getByRole('button', { name: /right/i });
		expect(rightArrow).toBeInTheDocument();
	});

	test('calls onPageChange with correct page number when a page number is clicked', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		const page3Button = screen.getByText('3');
		fireEvent.click(page3Button);

		expect(onPageChangeMock).toHaveBeenCalledWith(3);
	});

	test('calls onPageChange with the correct page number when left arrow is clicked', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		const leftArrow = screen.getByRole('button', { name: /left/i });
		fireEvent.click(leftArrow);

		expect(onPageChangeMock).toHaveBeenCalledWith(1);
	});

	test('calls onPageChange with the correct page number when right arrow is clicked', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		const rightArrow = screen.getByRole('button', { name: /right/i });
		fireEvent.click(rightArrow);

		expect(onPageChangeMock).toHaveBeenCalledWith(3);
	});

	test('highlights the current page as active', () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>
		);

		const activePageButton = screen.getByText('3');
		expect(activePageButton).toHaveClass('active');
	});
});
