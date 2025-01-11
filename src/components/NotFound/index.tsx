import { Link } from "react-router-dom";
import '@components/NotFound/styled';
import { ROUTES } from "@constants/routes";

const NotFound: React.FC = () => {
	return (
		<main className='page'>
			<h1>Page Not Found</h1>
			<Link className="link" to={ROUTES.HOME}>Go back to Home</Link>
		</main>
	);
};

export default NotFound;
