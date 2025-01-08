import React from 'react';

interface LoaderProps {
    className?: string;
  }

  const Loader: React.FC<LoaderProps> = ({
    className = '',
  }) => {
	return (
		<div className={`loader-container ${className}`}>
			<span className="loader"></span>
		</div>
	);
};

export default Loader;
