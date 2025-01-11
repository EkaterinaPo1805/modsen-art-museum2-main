import React, { useCallback } from 'react';

import '@components/BurgerButton/styled';

interface BurgerButtonProps {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
	isMenuOpen,
	setIsMenuOpen,
	buttonRef,
}) => {
	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, [setIsMenuOpen]);

	return (
		<button
			ref={buttonRef}
			className="burger-button"
			onClick={toggleMenu}
			aria-label="Toggle menu"
		>
			<span className={`burger-icon ${isMenuOpen ? 'open' : ''}`} />
		</button>
	);
};

export default BurgerButton;
