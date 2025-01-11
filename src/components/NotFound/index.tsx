import { Link } from "react-router-dom";
import { ROUTES } from "@constants/routes";

import '@components/NotFound/styled';

const NotFound: React.FC = () => {
	return (
		<main className='page'>
			<h1>Page Not Found</h1>
			<Link className="link" to={ROUTES.HOME}>Go back to Home</Link>
		</main>
	);
};

export default NotFound;
