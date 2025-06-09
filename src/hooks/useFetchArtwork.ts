import { useEffect, useState } from 'react';
import { fetchArtworkData } from '@store/actions/fetchArtworkAction';
import { CARD_COMPACT, CARD_DETAILED } from '@constants/strings';

const useFetchArtwork = (
	dispatch: any,
	imagesPerPage: number,
	loading: boolean,
	dataLength: number,
	type: typeof CARD_COMPACT | typeof CARD_DETAILED,
	currentPage: number
) => {
	const [previousPage, setPreviousPage] = useState(currentPage);
	const [previousImagesPerPage, setPreviousImagesPerPage] =
		useState(imagesPerPage);

	useEffect(() => {
		if (
			!loading &&
			(dataLength === 0 ||
				currentPage !== previousPage ||
				imagesPerPage !== previousImagesPerPage)
		) {
			dispatch(fetchArtworkData({ page: currentPage, imagesPerPage, type }));

			setPreviousPage(currentPage);
			setPreviousImagesPerPage(imagesPerPage);
		}
	}, [
		dispatch,
		imagesPerPage,
		loading,
		dataLength,
		type,
		currentPage,
		previousPage,
		previousImagesPerPage,
	]);
};

export default useFetchArtwork;
