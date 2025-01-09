import { configureStore } from '@reduxjs/toolkit';
import artworkReducer from '@store/reducers/artworkReducer';
import artworkDetailReducer from '@store/reducers/artworkDetailReducer';
import favoritesReducer from '@store/reducers/favoritesReducer';
import searchArtworkReducer from '@store/reducers/searchArtworkReducer';

const store = configureStore({
	reducer: {
		artwork: artworkReducer,
		artworkDetail: artworkDetailReducer,
		favorites: favoritesReducer,
		searchArtwork: searchArtworkReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
