import { createSlice } from '@reduxjs/toolkit';
import { searchArtworkData } from '@store/actions/searchArtworkAction';

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
						: 'No search data';
			});
	},
});

export default searchArtworkSlice.reducer;
