import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/Logo';
import ModsenLogo from '@assets/logo modsen-02 2.svg';

const Footer: React.FC = () => {
	return (
		<section className="footer">
			<div className="container">
				<footer>
					<Logo color="black" />
					<Link to="https://www.modsen-software.com/">
						<img src={ModsenLogo} alt="Modsen Logo" className="ModsenLogo" />
					</Link>
				</footer>
			</div>
		</section>
	);
};

export default Footer;
