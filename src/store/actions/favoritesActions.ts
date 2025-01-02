import { PayloadAction } from '@reduxjs/toolkit';

export const addFavorite = (id: number): PayloadAction<number> => ({
	type: 'favorites/addFavorite',
	payload: id,
});

export const removeFavorite = (id: number): PayloadAction<number> => ({
	type: 'favorites/removeFavorite',
	payload: id,
});
