import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import CardItem from '@components/CardItem';

const mockStore = configureStore([]);
const store = mockStore({
	favorites: {
		items: [],
	},
});

const mockProps = {
	dataId: 1,
	title: 'Test Title',
	artist: 'Test Artist',
	publicDomain: 'Public Domain',
	imageId: 'testImageId',
	variant: 'compact' as 'compact',
};

describe('CardItem Component', () => {
	it('renders correctly with given props', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CardItem {...mockProps} />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText(mockProps.title)).toBeInTheDocument();
		expect(screen.getByText(mockProps.artist)).toBeInTheDocument();
		expect(screen.getByText(mockProps.publicDomain)).toBeInTheDocument();

		const link = screen.getByRole('link', {
			name: `Go to details of ${mockProps.title}`,
		});
		expect(link).toHaveAttribute('href', `/art/${mockProps.dataId}`);
	});

	it('shows loader before image is loaded', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CardItem {...mockProps} />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('hides loader after image is loaded', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CardItem {...mockProps} />
				</BrowserRouter>
			</Provider>
		);

		const image = screen.getByAltText(mockProps.title);
		fireEvent.load(image);

		expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
	});

	it('shows error message when image fails to load', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CardItem {...mockProps} />
				</BrowserRouter>
			</Provider>
		);

		const image = screen.getByAltText(mockProps.title);
		fireEvent.error(image);

		expect(screen.getByText('Failed to load image')).toBeInTheDocument();
		expect(screen.queryByAltText(mockProps.title)).not.toBeInTheDocument();
	});

	it('renders FavoriteButton component', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CardItem {...mockProps} />
				</BrowserRouter>
			</Provider>
		);

		const favoriteButton = screen.getByTestId(
			`favorite-button-${mockProps.dataId}`
		);
		expect(favoriteButton).toBeInTheDocument();
	});
});
