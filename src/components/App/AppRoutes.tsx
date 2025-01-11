import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';
import Favorites from '@pages/Favorites';
import ArtDetail from '@pages/ArtDetail';
import ErrorBoundary from '@components/ErrorBoundary/index';
import NotFound from '@pages/NotFound';
import { ROUTES } from '@constants/routes';

const AppRoutes: React.FC = () => {
	return (
		<ErrorBoundary>
			<Routes>
				<Route path={ROUTES.HOME} element={<Home />} />
				<Route path={ROUTES.FAVORITES} element={<Favorites />} />
				<Route path={ROUTES.ART_DETAIL} element={<ArtDetail />} />
				<Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
			</Routes>
		</ErrorBoundary>
	);
};

export default AppRoutes;
