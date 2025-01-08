import { createSlice } from '@reduxjs/toolkit';
import {
	fetchArtworkData,
	fetchArtworkDetail,
	searchArtworkData,
} from '@store/actions/artworkActions';

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

export interface ArtworkState {
	imageData: ArtworkData[];
	compactData: ArtworkData[];
	detailedData: ArtworkData[];
	detailedDataById: ArtworkData | null;
	searchResults: ArtworkData[];
	loadingCompact: boolean;
	loadingDetailed: boolean;
	loadingDetailById: boolean;
	loadingSearch: boolean;
	error: string | null;
	totalPages: number;
	selectedArtwork: ArtworkData | null;
}

const initialState: ArtworkState = {
	imageData: [],
	compactData: [],
	detailedData: [],
	detailedDataById: null,
	searchResults: [],
	loadingCompact: false,
	loadingDetailed: false,
	loadingDetailById: false,
	loadingSearch: false,
	error: null,
	totalPages: 1,
	selectedArtwork: null,
};

const artSlice = createSlice({
	name: 'artwork',
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
						: 'No search data';
			})

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
			.addCase(fetchArtworkDetail.pending, (state) => {
				state.loadingDetailById = true;
			})
			.addCase(fetchArtworkDetail.fulfilled, (state, action) => {
				state.error = null;
				state.detailedDataById = action.payload;
				state.loadingDetailById = false;
			})
			.addCase(fetchArtworkData.rejected, (state, action) => {
				state.loadingCompact = false;
				state.loadingDetailed = false;
				state.loadingDetailById = false;
				state.error =
					action.error instanceof Error ? action.error.message : 'No data';
			})
			.addCase(fetchArtworkDetail.rejected, (state, action) => {
				state.loadingDetailById = false;
				state.error =
					action.error instanceof Error
						? action.error.message
						: 'No artwork detail';
			});
	},
});

export default artSlice.reducer;
