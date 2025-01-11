import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArtworkApi } from '@api/fetchArtwork';
import { ArtworkData } from '@appTypes/dataFetch';
import { CARD_COMPACT, CARD_DETAILED } from '@constants/strings';
import { UNKNOWN_ERROR } from '@constants/errorMessages';

export const fetchArtworkData = createAsyncThunk<
	{
		imageData: ArtworkData[];
		totalPages: number;
		type: typeof CARD_COMPACT | typeof CARD_DETAILED;
	},
	{
		page: number;
		imagesPerPage: number;
		type: typeof CARD_COMPACT | typeof CARD_DETAILED;
	},
	{ rejectValue: string }
>(
	'artwork/fetchArtworkData',
	async ({ page, imagesPerPage, type }, { rejectWithValue }) => {
		try {
			const { data: imageData, totalPages } = await fetchArtworkApi(
				page,
				imagesPerPage
			);
			return { imageData, totalPages, type };
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue(UNKNOWN_ERROR);
		}
	}
);
