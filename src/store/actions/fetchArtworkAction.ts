import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArtworkApi } from '@api/fetchArtwork';
import { ArtworkData } from '@store/reducers/artworkReducer';


export const fetchArtworkData = createAsyncThunk<
	{
		imageData: ArtworkData[];
		totalPages: number;
		type: 'compact' | 'detailed';
	},
	{ page: number; imagesPerPage: number; type: 'compact' | 'detailed' },
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
			return rejectWithValue('An unknown error occurred');
		}
	}
);
