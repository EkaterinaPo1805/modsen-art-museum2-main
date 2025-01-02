import { configureStore } from '@reduxjs/toolkit';

import artReducer from '@store/reducers/artworkReducers';
import favoritesReducer from '@store/reducers/favoritesReducer';

const store = configureStore({
	reducer: {
		artwork: artReducer,
		favorites: favoritesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
