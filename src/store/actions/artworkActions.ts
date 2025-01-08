import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArtworkData } from '@store/reducers/artworkReducers';

interface ImageItem {
	id: string;
	title?: string;
	artist_title?: string;
	is_public_domain: boolean;
	image_id: string;
}

export const searchArtworkData = createAsyncThunk<
	{ imageData: ArtworkData[] },
	{ searchQuery: string },
	{ rejectValue: string }
>('artwork/searchArtworkData', async ({ searchQuery }, { rejectWithValue }) => {
	try {
		const response = await fetch(
			`https://api.artic.edu/api/v1/artworks/search?q=${searchQuery}&fields=id,title,artist_title,is_public_domain,image_id`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch search results');
		}

		const data = await response.json();

		if (!data.data || data.data.length === 0) {
			throw new Error('No results found');
		}

		return {
			imageData: data.data.map((item: ImageItem) => ({
				id: item.id,
				title: item.title || 'Unknown',
				artist: item.artist_title || 'Unknown',
				public_domain: item.is_public_domain ? 'Public' : 'Unpublic',
				image_id: item.image_id,
			})),
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('An unknown error occurred');
	}
});

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
			const response = await fetch(
				`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${imagesPerPage}`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch artwork data');
			}

			const data = await response.json();

			return {
				imageData: data.data.map((item: ImageItem) => ({
					id: item.id,
					title: item.title || 'Unknown',
					artist: item.artist_title || 'Unknown',
					public_domain: item.is_public_domain ? 'Public' : 'Unpublic',
					image_id: item.image_id,
				})),
				totalPages: data.pagination.total_pages,
				type,
			};
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('An unknown error occurred');
		}
	}
);

export const fetchArtworkDetail = createAsyncThunk<
	ArtworkData,
	number,
	{ rejectValue: string }
>('artwork/fetchArtworkDetail', async (id, { rejectWithValue }) => {
	try {
		const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);

		if (!response.ok) {
			throw new Error('Failed to fetch artwork details');
		}

		const data = await response.json();

		return {
			id: data.data.id,
			title: data.data.title || 'Unknown',
			artist: data.data.artist_title || 'Unknown',
			artist_nationality: data.data.place_of_origin || 'Unknown nationality',
			dimensions: data.data.dimensions || 'Not specified',
			credit_line: data.data.credit_line || 'Not specified',
			repository: data.data.repository || 'Not specified',
			date: data.data.date_display || 'Not specified',
			image_id: data.data.image_id,
			public_domain: data.data.is_public_domain ? 'Public' : 'Unpublic',
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('An unknown error occurred');
	}
});
