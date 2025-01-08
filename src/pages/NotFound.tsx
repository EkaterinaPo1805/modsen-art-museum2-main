import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
	return (
		<div className='page'>
			<h1>Page Not Found</h1>
			<Link className="link" to="/">Go back to Home</Link>
		</div>
	);
};

export default NotFound;
