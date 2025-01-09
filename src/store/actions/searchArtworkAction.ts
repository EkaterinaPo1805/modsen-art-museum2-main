import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchArtworkApi } from '@api/searchArtwork';
import { ArtworkData } from '@store/reducers/searchArtworkReducer';


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
		return rejectWithValue('An unknown error occurred');
	}
});
