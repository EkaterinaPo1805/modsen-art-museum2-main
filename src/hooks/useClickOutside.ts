import { useEffect } from 'react';

const useClickOutside = (
	ref: React.RefObject<HTMLElement | null>,
	buttonRef: React.RefObject<HTMLButtonElement | null>,
	callback: () => void
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				ref.current &&
				!ref.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				callback();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [ref, callback, buttonRef]);
};

export default useClickOutside;
