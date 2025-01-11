import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '@components/Footer';

jest.mock('@components/Logo', () => {
	const MockLogo = () => <div>Logo</div>;
	MockLogo.displayName = 'Logo';
	return MockLogo;
});

describe('Footer component', () => {
	test('renders Logo component with black color', () => {
		render(
			<Router>
				<Footer />
			</Router>
		);

		expect(screen.getByText('Logo')).toBeInTheDocument();
	});

	test('renders Modsen Logo with correct link', () => {
		render(
			<Router>
				<Footer />
			</Router>
		);

		const modsenLogoLink = screen.getByRole('link', { name: /modsen logo/i });
		expect(modsenLogoLink).toHaveAttribute(
			'href',
			'https://www.modsen-software.com/'
		);

		const modsenLogoImage = screen.getByAltText(/Modsen Logo/i);
		expect(modsenLogoImage).toBeInTheDocument();
	});
});
