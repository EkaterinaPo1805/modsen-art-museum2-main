import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
	children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error caught by ErrorBoundary: ', error, errorInfo);
		this.setState({ errorInfo });
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<h2>Something went wrong.</h2>
					<p>We&apos;re sorry, but an unexpected error occurred.</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
