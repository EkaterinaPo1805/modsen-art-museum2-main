import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import favoritesReducer from '@store/reducers/favoritesReducer';
import artworkReducer from '@store/reducers/artworkReducer';
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

const mockArtworkDetailState = {
	...mockArtworkState,
};

const mockSearchArtworkState = {
	searchResults: [], // Обновлено
	loadingSearch: false, // Обновлено
	error: null,
};

const createMockStore = (initialState: RootState) =>
	configureStore({
		reducer: {
			favorites: favoritesReducer,
			artwork: artworkReducer,
			artworkDetail: () => mockArtworkDetailState,
			searchArtwork: () => mockSearchArtworkState,
		},
		preloadedState: initialState,
	});

const renderWithStore = (ui: JSX.Element, initialState: RootState) => {
	const store = createMockStore(initialState);
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		store,
	};
};

describe('FavoriteButton', () => {
	it('renders the button with correct aria-label when not active', () => {
		const initialState: RootState = {
			favorites: { items: [] },
			artwork: mockArtworkState,
			artworkDetail: mockArtworkDetailState,
			searchArtwork: mockSearchArtworkState,
		};

		renderWithStore(
			<FavoriteButton id={1} data-testid="favorite-button-1" />,
			initialState
		);

		const button = screen.getByTestId('favorite-button-1');
		expect(button).toHaveAttribute('aria-label', 'Add to favorites');
	});

	it('renders the button with correct aria-label when active', () => {
		const initialState: RootState = {
			favorites: { items: [1] },
			artwork: mockArtworkState,
			artworkDetail: mockArtworkDetailState,
			searchArtwork: mockSearchArtworkState,
		};

		renderWithStore(
			<FavoriteButton id={1} data-testid="favorite-button-1" />,
			initialState
		);

		const button = screen.getByTestId('favorite-button-1');
		expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
	});

	it('dispatches addFavorite when clicked and not active', () => {
		const initialState: RootState = {
			favorites: { items: [] },
			artwork: mockArtworkState,
			artworkDetail: mockArtworkDetailState,
			searchArtwork: mockSearchArtworkState,
		};

		const { store } = renderWithStore(
			<FavoriteButton id={1} data-testid="favorite-button-1" />,
			initialState
		);

		const button = screen.getByTestId('favorite-button-1');
		fireEvent.click(button);

		const state = store.getState();
		expect(state.favorites.items).toContain(1);
	});

	it('dispatches removeFavorite when clicked and active', () => {
		const initialState: RootState = {
			favorites: { items: [1] },
			artwork: mockArtworkState,
			artworkDetail: mockArtworkDetailState,
			searchArtwork: mockSearchArtworkState,
		};

		const { store } = renderWithStore(
			<FavoriteButton id={1} data-testid="favorite-button-1" />,
			initialState
		);

		const button = screen.getByTestId('favorite-button-1');
		fireEvent.click(button);

		const state = store.getState();
		expect(state.favorites.items).not.toContain(1);
	});
});
