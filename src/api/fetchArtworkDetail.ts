import { FETCH_ARTWORK_ERROR } from '@constants/errorMessages';
import {
	PUBLIC_DOMAIN,
	UNKNOWN_TEXT,
	UNPUBLIC_DOMAIN,
} from '@constants/strings';
import { API_URL } from '@constants/urls';

export const fetchArtworkDetailApi = async (id: number) => {
	const response = await fetch(`${API_URL}/${id}`);

	if (!response.ok) {
		throw new Error(FETCH_ARTWORK_ERROR);
	}

	const data = await response.json();

	return {
		id: data.data.id,
		title: data.data.title || UNKNOWN_TEXT,
		artist: data.data.artist_title || UNKNOWN_TEXT,
		artist_nationality: data.data.place_of_origin || UNKNOWN_TEXT,
		dimensions: data.data.dimensions || UNKNOWN_TEXT,
		credit_line: data.data.credit_line || UNKNOWN_TEXT,
		repository: data.data.repository || UNKNOWN_TEXT,
		date: data.data.date_display || UNKNOWN_TEXT,
		image_id: data.data.image_id,
		public_domain: data.data.is_public_domain ? PUBLIC_DOMAIN : UNPUBLIC_DOMAIN,
	};
};
