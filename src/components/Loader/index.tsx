import React from 'react';
import '@components/Loader/styled';

interface LoaderProps {
	className?: string;
	errorMessage?: string;
}

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
	<div className="error-message">{message}</div>
);

const Loader: React.FC<LoaderProps> = ({
	className = '',
	errorMessage = '',
}) => {
	return (
		<section className={`loader-container ${className}`} aria-live="polite">
			{errorMessage ? (
				<ErrorMessage message={errorMessage} />
			) : (
				<span className="loader" aria-hidden="true"></span>
			)}
		</section>
	);
};

export default React.memo(Loader);
