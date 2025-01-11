import { NO_RESULTS_FOUND_ERROR } from '@constants/errorMessages';
import { createSlice } from '@reduxjs/toolkit';

import { searchArtworkData } from '@store/actions/searchArtworkAction';
import { ArtworkData } from '@appTypes/dataFetch';
interface SearchArtworkState {
	searchResults: ArtworkData[];
	loadingSearch: boolean;
	error: string | null;
}

const initialState: SearchArtworkState = {
	searchResults: [],
	loadingSearch: false,
	error: null,
};

const searchArtworkSlice = createSlice({
	name: 'searchArtwork',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(searchArtworkData.pending, (state) => {
				state.loadingSearch = true;
			})
			.addCase(searchArtworkData.fulfilled, (state, action) => {
				state.loadingSearch = false;
				state.error = null;
				state.searchResults = action.payload.imageData;
			})
			.addCase(searchArtworkData.rejected, (state, action) => {
				state.loadingSearch = false;
				state.error =
					action.error instanceof Error
						? action.error.message
						: NO_RESULTS_FOUND_ERROR;
			});
	},
});

export default searchArtworkSlice.reducer;
