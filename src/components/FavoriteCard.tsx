import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '@store/index';
import { fetchArtworkDetail } from '@store/actions/artworkActions';
import CardItem from '@components/CardItem/CardItem';
import { ArtworkData } from '@store/reducers/artworkReducers';

const FavoriteCard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const favorites = useSelector((state: RootState) => state.favorites.items);

	const [artworks, setArtworks] = useState<ArtworkData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadArtworks = async () => {
			setLoading(true);
			const loadedIds = new Set<number>();
			const fetchedArtworks: ArtworkData[] = [];

			for (const id of favorites) {
				if (!loadedIds.has(id)) {
					try {
						const artwork = await dispatch(fetchArtworkDetail(id)).unwrap();
						fetchedArtworks.push(artwork);
						loadedIds.add(id);
					} catch (error) {
						console.error(
							`Error fetching details for artwork with id ${id}:`,
							error
						);
					}
				}
			}

			setArtworks(fetchedArtworks);
			setLoading(false);
		};

		if (favorites.length > 0) {
			loadArtworks();
		} else {
			setLoading(false);
		}
	}, [favorites, dispatch]);

	return (
		<div className="favoritecard-container">
			{loading ? (
				<div className="loader">Loading...</div>
			) : artworks.length === 0 ? (
				<p>No favorites available.</p>
			) : (
				<div className="works-gallery">
					{artworks.map((item) => (
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
		</div>
	);
};

export default FavoriteCard;
