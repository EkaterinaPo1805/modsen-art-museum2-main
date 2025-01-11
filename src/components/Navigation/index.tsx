import { Link, useLocation } from 'react-router-dom';

import { NAVIGATION_ROUTES } from '@constants/routes';

import '@components/Navigation/styled';

const Navigation: React.FC = () => {
	const location = useLocation();

	return (
		<nav className='paths'>
			{Object.values(NAVIGATION_ROUTES).map(({ path, label, icon }) =>
				icon &&
				(location.pathname !== NAVIGATION_ROUTES.HOME.path ||
					path !== NAVIGATION_ROUTES.HOME.path) ? (
					<Link key={path} to={path} className="navigation-item">
						<img src={icon} alt={label} />
						{label}
					</Link>
				) : null
			)}
		</nav>
	);
};

export default Navigation;
