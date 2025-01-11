import { useState, useCallback } from 'react';

const useFetchImage = (
	onLoadCallback?: () => void,
	onErrorCallback?: () => void
) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleImageLoad = useCallback(() => {
		setLoading(false);
		if (onLoadCallback) onLoadCallback();
	}, [onLoadCallback]);

	const handleImageError = useCallback(() => {
		setError(true);
		setLoading(false);
		if (onErrorCallback) onErrorCallback();
	}, [onErrorCallback]);

	return { loading, error, handleImageLoad, handleImageError };
};

export default useFetchImage;
