import React, { useRef } from 'react';

import { useToggle } from '@hooks/useToggle';
import Logo from '@components/Logo/index';
import Navigation from '@components/Navigation/index';
import useClickOutside from '@hooks/useClickOutside';
import BurgerButton from '@components/BurgerButton/index';
import { LOGO_COLOR_HEADER } from '@constants/strings';

import '@components/Header/styled';

const Header: React.FC = () => {
	const [isMenuOpen, toggleMenu] = useToggle(false);
	const menuRef = useRef<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	useClickOutside(menuRef, buttonRef, isMenuOpen, () => toggleMenu());

	return (
		<header className="header">
			<div className="header_container">
				<Logo color={LOGO_COLOR_HEADER} />
				<BurgerButton
					buttonRef={buttonRef}
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={toggleMenu}
				/>
				<nav
					ref={menuRef}
					className={`navigation ${isMenuOpen ? 'open' : ''}`}
					aria-label="Main navigation"
				>
					<Navigation />
				</nav>
			</div>
		</header>
	);
};

export default React.memo(Header);
