import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';
import Favorites from '@pages/Favorites';
import ArtDetail from '@pages/ArtDetail';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

const AppRoutes: React.FC = () => {
	return (
		<ErrorBoundary>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/art/:dataId" element={<ArtDetail />} />
			</Routes>
		</ErrorBoundary>
	);
};

export default AppRoutes;
