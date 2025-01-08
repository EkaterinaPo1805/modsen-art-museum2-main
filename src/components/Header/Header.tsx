import React, { useState, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '@components/Logo';
import bookmark from '@assets/bookmark.svg';
import home from '@assets/home.svg';
import useClickOutside from '@hooks/useClickOutside';

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const menuRef = useRef<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	useClickOutside(menuRef, buttonRef, () => setIsMenuOpen(false));

	const navigationItems = useMemo(() => {
		if (location.pathname === '/') {
			return (
				<Link to="/favorites" className="navigation-item">
					<img src={bookmark} alt="Favorites" />
					Your favorites
				</Link>
			);
		} else {
			return (
				<>
					<Link to="/" className="navigation-item">
						<img src={home} alt="Home" />
						Home
					</Link>
					<Link to="/favorites" className="navigation-item">
						<img src={bookmark} alt="Favorites" />
						Your favorites
					</Link>
				</>
			);
		}
	}, [location.pathname]);

	return (
		<section className="header">
			<header className="header__container">
				<Logo color="white" />
				<button ref={buttonRef} className="burger-button" onClick={toggleMenu}>
					<span className={`burger-icon ${isMenuOpen ? 'open' : ''}`}></span>
				</button>
				<nav ref={menuRef} className={`navigation ${isMenuOpen ? 'open' : ''}`}>
					{navigationItems}
				</nav>
			</header>
		</section>
	);
};

export default Header;
