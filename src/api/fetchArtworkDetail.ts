export const fetchArtworkDetailApi = async (id: number) => {
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
};
