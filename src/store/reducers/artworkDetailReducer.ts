import { createSlice } from '@reduxjs/toolkit';
import { fetchArtworkDetail } from '@store/actions/fetchArtworkDetailAction';

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
						: 'No artwork detail';
			});
	},
});

export default artworkDetailSlice.reducer;
