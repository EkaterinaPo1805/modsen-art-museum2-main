interface ImageItem {
	id: string;
	title?: string;
	artist_title?: string;
	is_public_domain: boolean;
	image_id: string;
}

export const searchArtworkApi = async (searchQuery: string) => {
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

	return data.data.map((item: ImageItem) => ({
		id: item.id,
		title: item.title || 'Unknown',
		artist: item.artist_title || 'Unknown',
		public_domain: item.is_public_domain ? 'Public' : 'Unpublic',
		image_id: item.image_id,
	}));
};
