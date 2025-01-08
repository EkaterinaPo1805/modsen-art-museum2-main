import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@store/index';
import { fetchArtworkData } from '@store/actions/artworkActions';
import CardItem from '@components/CardItem/CardItem';
import Pagination from '@components/Pagination/Pagination';
import Loader from './Loader';

const DetailedCard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [currentPage, setCurrentPage] = useState(1);
	const [pendingPage, setPendingPage] = useState(1);
	const [imagesPerPage, setImagesPerPage] = useState(3);

	const { detailedData, loadingDetailed, error, totalPages } = useSelector(
		(state: RootState) => state.artwork
	);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setImagesPerPage(1);
			} else if (window.innerWidth <= 1440) {
				setImagesPerPage(2);
			} else {
				setImagesPerPage(3);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		dispatch(
			fetchArtworkData({ page: currentPage, imagesPerPage, type: 'detailed' })
		);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [dispatch, currentPage, imagesPerPage]);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setPendingPage(page);
			setCurrentPage(page);
		}
	};

	return (
		<div className="favoritecard-container">
			<div className="image-gallery">
				{loadingDetailed ? (
					<Loader />
				) : error ? (
					<div>{error}</div>
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
		</div>
	);
};

export default DetailedCard;
