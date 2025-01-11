import { NO_RESULTS_FOUND_ERROR } from '@constants/errorMessages';
import { createSlice } from '@reduxjs/toolkit';

import { fetchArtworkDetail } from '@store/actions/fetchArtworkDetailAction';
import { ArtworkData } from '@appTypes/dataFetch';
interface ArtworkDataState {
	detailedDataById: ArtworkData | null;
	loadingDetailById: boolean;
	error: string | null;
}

const initialState: ArtworkDataState = {
	detailedDataById: null,
	loadingDetailById: false,
	error: null,
};

const artworkDetailSlice = createSlice({
	name: 'artworkDetail',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArtworkDetail.pending, (state) => {
				state.loadingDetailById = true;
			})
			.addCase(fetchArtworkDetail.fulfilled, (state, action) => {
				state.error = null;
				state.detailedDataById = action.payload;
				state.loadingDetailById = false;
			})
			.addCase(fetchArtworkDetail.rejected, (state, action) => {
				state.loadingDetailById = false;
				state.error =
					action.error instanceof Error
						? action.error.message
						: NO_RESULTS_FOUND_ERROR;
			});
	},
});

export default artworkDetailSlice.reducer;
