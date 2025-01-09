import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import searchIcon from '@assets/search.svg';
import useDebounce from '@hooks/useDebounce';
import { searchArtworkData } from '@store/actions/searchArtworkAction';
import { AppDispatch } from '@store/index';
import CardItem from '@components/CardItem/CardItem';
import SortDropdown from '@components/SortDropdown/SortDropdown';
import { ArtworkData } from '@store/reducers/searchArtworkReducer';
import Loader from './Loader';

const MIN_LENGTH = 3;

const schema = yup.object().shape({
	searchQuery: yup
		.string()
		.trim()
		.min(
			MIN_LENGTH,
			`Search query must be at least ${MIN_LENGTH} characters long.`
		)
		.required('Search field cannot be empty.'),
});

const SearchBar: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [searchResults, setSearchResults] = useState<ArtworkData[]>([]);
	const [sortCriteria, setSortCriteria] = useState<string>('title');
	const [loading, setLoading] = useState<boolean>(false);

	const {
		control,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { searchQuery: '' },
		mode: 'onChange',
	});

	const searchQuery = watch('searchQuery');
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	useEffect(() => {
		if (debouncedSearchQuery.length >= MIN_LENGTH) {
			setLoading(true);
			(async () => {
				try {
					const response = await dispatch(
						searchArtworkData({ searchQuery: debouncedSearchQuery })
					).unwrap();
					setSearchResults(response.imageData || []);
				} catch (error) {
					console.error('Error fetching artwork data:', error);
				} finally {
					setLoading(false);
				}
			})();
		} else {
			setSearchResults([]);
		}
	}, [debouncedSearchQuery, dispatch]);

	const sortedArtworks = useMemo(() => {
		return [...searchResults].sort((a, b) => {
			if (sortCriteria === 'title') return a.title.localeCompare(b.title);
			if (sortCriteria === 'artist') return a.artist.localeCompare(b.artist);
			if (sortCriteria === 'date')
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			return 0;
		});
	}, [searchResults, sortCriteria]);

	return (
		<div className="search-group">
			<form
				className={`search-form ${errors.searchQuery ? 'error' : ''}`}
				onSubmit={(e) => e.preventDefault()}
			>
				<Controller
					name="searchQuery"
					control={control}
					render={({ field }) => (
						<input
							{...field}
							type="text"
							placeholder="Search art, artist, work..."
							className="search-input"
						/>
					)}
				/>
				<button type="button" className="search-button">
					<img src={searchIcon} alt="Search" className="search-icon" />
				</button>
			</form>

			{errors.searchQuery && (
				<p className="error-message">{errors.searchQuery.message}</p>
			)}

			{debouncedSearchQuery.length >= MIN_LENGTH && !errors.searchQuery && (
				<>
					<SortDropdown
						sortCriteria={sortCriteria}
						setSortCriteria={setSortCriteria}
					/>
					{loading ? (
						<Loader />
					) : sortedArtworks.length > 0 ? (
						<div className="search-results">
							{sortedArtworks.map((item) => (
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
					) : (
						<p className="search-results">No results found</p>
					)}
				</>
			)}
		</div>
	);
};

export default SearchBar;
