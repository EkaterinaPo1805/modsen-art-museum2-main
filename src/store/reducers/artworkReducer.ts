import { NO_RESULTS_FOUND_ERROR } from '@constants/errorMessages';
import { CARD_COMPACT, CARD_DETAILED } from '@constants/strings';
import { createSlice } from '@reduxjs/toolkit';

import { fetchArtworkData } from '@store/actions/fetchArtworkAction';
import { ArtworkData } from '@appTypes/dataFetch';

interface ArtworkDataState {
	compactData: ArtworkData[];
	detailedData: ArtworkData[];
	loadingCompact: boolean;
	loadingDetailed: boolean;
	totalPages: number;
	error: string | null;
}

const initialState: ArtworkDataState = {
	compactData: [],
	detailedData: [],
	loadingCompact: false,
	loadingDetailed: false,
	totalPages: 1,
	error: null,
};

const artworkDataSlice = createSlice({
	name: 'artworkData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArtworkData.pending, (state, action) => {
				const type = action.meta.arg.type;
				if (type === CARD_COMPACT) {
					state.loadingCompact = true;
				} else if (type === CARD_DETAILED) {
					state.loadingDetailed = true;
				}
			})
			.addCase(fetchArtworkData.fulfilled, (state, action) => {
				const { imageData, totalPages, type } = action.payload;
				state.error = null;
				if (type === CARD_COMPACT) {
					state.compactData = imageData;
					state.loadingCompact = false;
				} else if (type === CARD_DETAILED) {
					state.detailedData = imageData;
					state.loadingDetailed = false;
				}
				state.totalPages = totalPages;
			})
			.addCase(fetchArtworkData.rejected, (state, action) => {
				state.loadingCompact = false;
				state.loadingDetailed = false;
				state.error =
					action.error instanceof Error
						? action.error.message
						: NO_RESULTS_FOUND_ERROR;
			});
	},
});

export default artworkDataSlice.reducer;
