import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import favoritesReducer from '@store/reducers/favoritesReducer';
import FavoriteButton from '@components/FavoriteButton/FavoriteButton';
import { JSX } from 'react';

const mockArtworkState = {
	imageData: [],
	compactData: [],
	detailedData: [],
	detailedDataById: null,
	searchResults: [],
	loadingCompact: false,
	loadingDetailed: false,
	loadingDetailById: false,
	loadingSearch: false,
	error: null,
	totalPages: 1,
	selectedArtwork: null,
};

const mockStore = (initialState: RootState) =>
	configureStore({
		reducer: {
			favorites: favoritesReducer,
			artwork: () => mockArtworkState,
		},
		preloadedState: initialState,
	});

const renderWithStore = (ui: JSX.Element, initialState: RootState) => {
	const store = mockStore(initialState);
	return render(<Provider store={store}>{ui}</Provider>);
};

describe('FavoriteButton', () => {
	it('renders the button with correct aria-label when not active', () => {
		renderWithStore(<FavoriteButton id={1} data-testid="favorite-button-1" />, {
			favorites: { items: [] },
			artwork: mockArtworkState,
		});
		const button = screen.getByTestId('favorite-button-1');
		expect(button).toHaveAttribute('aria-label', 'Add to favorites');
	});

	it('renders the button with correct aria-label when active', () => {
		renderWithStore(<FavoriteButton id={1} data-testid="favorite-button-1" />, {
			favorites: { items: [1] },
			artwork: mockArtworkState,
		});
		const button = screen.getByTestId('favorite-button-1');
		expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
	});

	it('dispatches addFavorite when clicked and not active', () => {
		const store = configureStore({
			reducer: {
				favorites: favoritesReducer,
				artwork: () => mockArtworkState,
			},
		});

		render(
			<Provider store={store}>
				<FavoriteButton id={1} data-testid="favorite-button-1" />
			</Provider>
		);
		const button = screen.getByTestId('favorite-button-1');
		fireEvent.click(button);
		expect(store.getState().favorites.items).toContain(1);
	});

	it('dispatches removeFavorite when clicked and active, handles already removed', () => {
		const store = configureStore({
			reducer: {
				favorites: favoritesReducer,
				artwork: () => mockArtworkState,
			},
		});

		const initialState = {
			favorites: { items: [1] },
			artwork: mockArtworkState,
		};

		renderWithStore(
			<FavoriteButton id={1} data-testid="favorite-button-1" />,
			initialState
		);
		const button = screen.getByTestId('favorite-button-1');

		fireEvent.click(button);

		expect(store.getState().favorites.items).not.toContain(1);

		fireEvent.click(button);

		expect(store.getState().favorites.items).not.toContain(1);
	});
});
