import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/Logo/index';
import ModsenLogo from '@assets/logo modsen-02 2.svg';
import { MODSEN_URL } from '@constants/urls';
import { LOGO_COLOR_FOOTER } from '@constants/strings';

import '@components/Footer/styled';

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<Logo color={LOGO_COLOR_FOOTER} />
				<Link to={MODSEN_URL}>
					<img src={ModsenLogo} alt="Modsen Logo" className="ModsenLogo" />
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
