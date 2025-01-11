import { FETCH_ARTWORK_ERROR } from '@constants/errorMessages';
import {
	PUBLIC_DOMAIN,
	UNKNOWN_TEXT,
	UNPUBLIC_DOMAIN,
} from '@constants/strings';
import { API_URL } from '@constants/urls';

interface ImageItem {
	id: string;
	title?: string;
	artist_title?: string;
	is_public_domain: boolean;
	image_id: string;
}

export const fetchArtworkApi = async (page: number, imagesPerPage: number) => {
	const response = await fetch(
		`${API_URL}?page=${page}&limit=${imagesPerPage}`
	);

	if (!response.ok) {
		throw new Error(FETCH_ARTWORK_ERROR);
	}

	const data = await response.json();

	return {
		data: data.data.map((item: ImageItem) => ({
			id: item.id,
			title: item.title || UNKNOWN_TEXT,
			artist: item.artist_title || UNKNOWN_TEXT,
			public_domain: item.is_public_domain ? PUBLIC_DOMAIN : UNPUBLIC_DOMAIN,
			image_id: item.image_id,
		})),
		totalPages: data.pagination.total_pages,
	};
};
