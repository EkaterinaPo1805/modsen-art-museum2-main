import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '@components/Header';

jest.mock('@components/Logo', () => {
	const MockLogo = () => <div>Logo</div>;
	MockLogo.displayName = 'Logo';
	return MockLogo;
});

describe('Header component', () => {
	test('renders correct navigation links for home page', () => {
		window.history.pushState({}, 'Home', '/');

		render(
			<Router>
				<Header />
			</Router>
		);

		const homeLink = screen.queryByRole('link', { name: /Home/i });
		const favoritesLink = screen.getByRole('link', { name: /Your favorites/i });

		expect(homeLink).toBeNull();
		expect(favoritesLink).toBeInTheDocument();
	});

	test('renders correct navigation links for favorites page', () => {
		window.history.pushState({}, 'Favorites', '/favorites');

		render(
			<Router>
				<Header />
			</Router>
		);

		const homeLink = screen.getByRole('link', { name: /Home/i });
		const favoritesLink = screen.getByRole('link', { name: /Your favorites/i });

		expect(homeLink).toBeInTheDocument();
		expect(favoritesLink).toBeInTheDocument();
	});

	test('does not render home link on favorites page', () => {
		window.history.pushState({}, 'Favorites', '/favorites');

		render(
			<Router>
				<Header />
			</Router>
		);

		const homeLink = screen.queryByRole('link', { name: /Home/i });
		expect(homeLink).toBeInTheDocument();
	});
});
