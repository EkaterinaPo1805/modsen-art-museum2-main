import { useState, useEffect } from 'react';
import { AppDispatch } from '@store/index';
import { searchArtworkData } from '@store/actions/searchArtworkAction';
import { ArtworkData } from '@appTypes/dataFetch';
import { MIN_SEARCH_LENGTH } from '@constants/numbers';
import { FETCH_ARTWORK_ERROR } from '@constants/errorMessages';

const useFetchSearch = (
	debouncedSearchQuery: string,
	dispatch: AppDispatch
) => {
	const [searchResults, setSearchResults] = useState<ArtworkData[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (debouncedSearchQuery.length >= MIN_SEARCH_LENGTH) {
			setLoading(true);
			(async () => {
				try {
					const response = await dispatch(
						searchArtworkData({ searchQuery: debouncedSearchQuery })
					).unwrap();
					setSearchResults(response.imageData || []);
				} catch (error) {
					console.error(FETCH_ARTWORK_ERROR, error);
				} finally {
					setLoading(false);
				}
			})();
		} else {
			setSearchResults([]);
		}
	}, [debouncedSearchQuery, dispatch]);

	return { searchResults, loading };
};

export default useFetchSearch;
