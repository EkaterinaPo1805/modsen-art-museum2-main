import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

const ProblematicComponent = () => {
	throw new Error('Test error');
};

describe('ErrorBoundary', () => {
	test('renders children if no error occurs', () => {
		render(
			<ErrorBoundary>
				<div>Test Content</div>
			</ErrorBoundary>
		);
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	test('renders error message when an error is thrown in a child component', () => {
		render(
			<ErrorBoundary>
				<ProblematicComponent />
			</ErrorBoundary>
		);

		expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
		expect(
			screen.getByText("We're sorry, but an unexpected error occurred.")
		).toBeInTheDocument();
	});

	test('logs error to the console when an error is caught', () => {
		const consoleErrorSpy = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		render(
			<ErrorBoundary>
				<ProblematicComponent />
			</ErrorBoundary>
		);

		expect(consoleErrorSpy).toHaveBeenCalled();

		consoleErrorSpy.mockRestore();
	});

	test('does not render children after an error has been caught', () => {
		render(
			<ErrorBoundary>
				<ProblematicComponent />
			</ErrorBoundary>
		);

		expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
	});
});
