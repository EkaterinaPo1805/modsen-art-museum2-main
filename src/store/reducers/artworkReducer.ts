import { createSlice } from '@reduxjs/toolkit';
import { fetchArtworkData } from '@store/actions/fetchArtworkAction';

export interface ArtworkData {
	id: number;
	title: string;
	artist: string;
	public_domain: string;
	artist_nationality: string;
	dimensions: string;
	credit_line: string;
	repository: string;
	date: string;
	image_id: string;
	searchQuery?: string;
}

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
				if (type === 'compact') {
					state.loadingCompact = true;
				} else if (type === 'detailed') {
					state.loadingDetailed = true;
				}
			})
			.addCase(fetchArtworkData.fulfilled, (state, action) => {
				const { imageData, totalPages, type } = action.payload;
				state.error = null;
				if (type === 'compact') {
					state.compactData = imageData;
					state.loadingCompact = false;
				} else if (type === 'detailed') {
					state.detailedData = imageData;
					state.loadingDetailed = false;
				}
				state.totalPages = totalPages;
			})
			.addCase(fetchArtworkData.rejected, (state, action) => {
				state.loadingCompact = false;
				state.loadingDetailed = false;
				state.error =
					action.error instanceof Error ? action.error.message : 'No data';
			});
	},
});

export default artworkDataSlice.reducer;
