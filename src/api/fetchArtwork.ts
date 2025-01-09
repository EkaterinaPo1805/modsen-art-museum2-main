interface ImageItem {
	id: string;
	title?: string;
	artist_title?: string;
	is_public_domain: boolean;
	image_id: string;
}

export const fetchArtworkApi = async (page: number, imagesPerPage: number) => {
	const response = await fetch(
		`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${imagesPerPage}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch artwork data');
	}

	const data = await response.json();

	return {
		data: data.data.map((item: ImageItem) => ({
			id: item.id,
			title: item.title || 'Unknown',
			artist: item.artist_title || 'Unknown',
			public_domain: item.is_public_domain ? 'Public' : 'Unpublic',
			image_id: item.image_id,
		})),
		totalPages: data.pagination.total_pages,
	};
};
