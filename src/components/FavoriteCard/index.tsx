import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { ArtworkData } from '@appTypes/dataFetch';
import CardItem from '@components/CardItem/index';
import Loader from '@components/Loader/index';
import useFetchFavorites from '@hooks/useFetchFavorites';
import { NO_FAVORITES } from '@constants/errorMessages';

import '@components/FavoriteCard/styled';

const FavoriteCard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const favorites = useSelector((state: RootState) => state.favorites.items);

	const { artworks, loading } = useFetchFavorites(favorites, dispatch);

	return (
		<section className="favoritecard-container">
			{loading ? (
				<Loader />
			) : artworks.length === 0 ? (
				<p>{NO_FAVORITES}</p>
			) : (
				<div className="works-gallery">
					{artworks.map((item: ArtworkData) => (
						<CardItem
							key={item.id}
							dataId={item.id}
							title={item.title}
							artist={item.artist}
							publicDomain={item.public_domain}
							imageId={item.image_id}
							variant="compact"
						/>
					))}
				</div>
			)}
		</section>
	);
};

export default FavoriteCard;
