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

export const initialState: ArtworkState = {
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