import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArtworkDetailApi } from '@api/fetchArtworkDetail';
import { ArtworkData } from '@appTypes/dataFetch';
import { UNKNOWN_ERROR } from '@constants/errorMessages';

export const fetchArtworkDetail = createAsyncThunk<
	ArtworkData,
	number,
	{ rejectValue: string }
>('artwork/fetchArtworkDetail', async (id, { rejectWithValue }) => {
	try {
		const artworkDetail = await fetchArtworkDetailApi(id);
		return artworkDetail;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue(UNKNOWN_ERROR);
	}
});
