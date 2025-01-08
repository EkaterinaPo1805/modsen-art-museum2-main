import React, { useEffect, useRef } from 'react';

interface BurgerButtonProps {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
	isMenuOpen,
	setIsMenuOpen,
}) => {
    const burgerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (
			menuRef.current &&
			!menuRef.current.contains(e.target as Node) &&
			burgerRef.current &&
			!burgerRef.current.contains(e.target as Node)
		) {
			setIsMenuOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<button ref={burgerRef} className="burger-button" onClick={toggleMenu}>
			<span className={`burger-icon ${isMenuOpen ? 'open' : ''}`}></span>
		</button>
	);
};

export default BurgerButton;
