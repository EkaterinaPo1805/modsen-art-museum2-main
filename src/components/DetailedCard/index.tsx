import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@store/index';
import CardItem from '@components/CardItem/index';
import Pagination from '@components/Pagination/index';
import Loader from '@components/Loader/index';
import useWindowSize from '@hooks/useWindowSize';
import useFetchArtwork from '@hooks/useFetchArtwork';
import { CARD_DETAILED } from '@constants/strings';

import '@components/DetailedCard/styled';

const DetailedCard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [currentPage, setCurrentPage] = useState(1);
	const [pendingPage, setPendingPage] = useState(1);

	const { detailedData, loadingDetailed, error, totalPages } = useSelector(
		(state: RootState) => state.artwork
	);

	const { imagesPerPage } = useWindowSize();

	useFetchArtwork(
		dispatch,
		imagesPerPage,
		loadingDetailed,
		detailedData.length,
		CARD_DETAILED,
		currentPage
	);

	const handlePageChange = useCallback(
		(page: number) => {
			if (page >= 1 && page <= totalPages) {
				setPendingPage(page);
				setCurrentPage(page);
			}
		},
		[totalPages]
	);

	return (
		<section className="detailedcard-container">
			<div className="image-gallery">
				{loadingDetailed ? (
					<Loader />
				) : error ? (
					<Loader errorMessage={error} />
				) : (
					detailedData.map((item) => (
						<CardItem
							key={item.id}
							dataId={item.id}
							title={item.title}
							artist={item.artist}
							publicDomain={item.public_domain}
							imageId={item.image_id}
							variant="detailed"
						/>
					))
				)}
			</div>

			<Pagination
				currentPage={pendingPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</section>
	);
};

export default DetailedCard;
