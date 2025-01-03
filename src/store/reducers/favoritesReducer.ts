import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
	items: number[];
}

const FAVORITES_KEY = 'favorites';

const storedFavorites = sessionStorage.getItem(FAVORITES_KEY);
let initialFavorites: number[] = [];

try {
	initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
} catch (error) {
	console.error('Failed to parse favorites from sessionStorage', error);
}

const initialState: FavoritesState = {
	items: initialFavorites,
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<number>) => {
			if (!state.items.includes(action.payload)) {
				state.items.push(action.payload);
				sessionStorage.setItem(FAVORITES_KEY, JSON.stringify(state.items));
			}
		},
		removeFavorite: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((id: number) => id !== action.payload);
			sessionStorage.setItem(FAVORITES_KEY, JSON.stringify(state.items));
		},
	},
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
