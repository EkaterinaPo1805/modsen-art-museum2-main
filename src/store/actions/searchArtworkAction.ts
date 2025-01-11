import { createAsyncThunk } from '@reduxjs/toolkit';

import { searchArtworkApi } from '@api/searchArtwork';
import { ArtworkData } from '@appTypes/dataFetch';
import { UNKNOWN_ERROR } from '@constants/errorMessages';

export const searchArtworkData = createAsyncThunk<
	{ imageData: ArtworkData[] },
	{ searchQuery: string },
	{ rejectValue: string }
>('artwork/searchArtworkData', async ({ searchQuery }, { rejectWithValue }) => {
	try {
		const imageData = await searchArtworkApi(searchQuery);
		return { imageData };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue(UNKNOWN_ERROR);
	}
});
