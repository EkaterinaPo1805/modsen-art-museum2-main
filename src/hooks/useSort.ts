import { useMemo } from 'react';
import { ArtworkData } from '@appTypes/dataFetch';
import { SORT_CRITERIA } from '@constants/strings';

const useSort = (searchResults: ArtworkData[], sortCriteria: string) => {
	return useMemo(() => {
		return [...searchResults].sort((a, b) => {
			if (sortCriteria === SORT_CRITERIA.TITLE)
				return a.title.localeCompare(b.title);
			if (sortCriteria === SORT_CRITERIA.ARTIST)
				return a.artist.localeCompare(b.artist);
			if (sortCriteria === SORT_CRITERIA.DATE)
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			return 0;
		});
	}, [searchResults, sortCriteria]);
};

export default useSort;
