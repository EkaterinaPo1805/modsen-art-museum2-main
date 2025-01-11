import { useEffect, useState, useCallback } from 'react';
import { AppDispatch } from '@store/index';
import { fetchArtworkDetail } from '@store/actions/fetchArtworkDetailAction';
import { ArtworkData } from '@appTypes/dataFetch';
import { FETCH_ARTWORK_ERROR } from '@constants/errorMessages';

const useFetchFavorites = (favorites: number[], dispatch: AppDispatch) => {
	const [artworks, setArtworks] = useState<ArtworkData[]>([]);
	const [loading, setLoading] = useState(true);

	const loadArtworks = useCallback(async () => {
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
					console.error(`${FETCH_ARTWORK_ERROR} ${id}:`, error);
				}
			}
		}

		setArtworks(fetchedArtworks);
		setLoading(false);
	}, [favorites, dispatch]);

	useEffect(() => {
		if (favorites.length > 0) {
			loadArtworks();
		} else {
			setLoading(false);
		}
	}, [favorites, loadArtworks]);

	return { artworks, loading };
};

export default useFetchFavorites;
