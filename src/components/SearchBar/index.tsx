import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import searchIcon from '@assets/search.svg';
import useDebounce from '@hooks/useDebounce';
import useFetchSearch from '@hooks/useFetchSearch';
import useSort from '@hooks/useSort';
import { AppDispatch } from '@store/index';
import { schema } from '@utils/validation';
import CardItem from '@components/CardItem/index';
import SortDropdown from '@components/SortDropdown/index';
import Loader from '@components/Loader/index';
import { MIN_SEARCH_LENGTH } from '@constants/numbers';
import { SEARCH_PLACEHOLDER } from '@constants/strings';
import { NO_RESULTS_FOUND_ERROR } from '@constants/errorMessages';

import '@components/SearchBar/styled';


const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [sortCriteria, setSortCriteria] = useState<string>('title');

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
  const { searchResults, loading } = useFetchSearch(debouncedSearchQuery, dispatch);
  const sortedArtworks = useSort(searchResults, sortCriteria);

  const handleSearchSubmit = (e: React.FormEvent) => e.preventDefault();

  return (
    <section className="search-group">
      <form
        className={`search-form ${errors.searchQuery ? 'error' : ''}`}
        onSubmit={handleSearchSubmit}
      >
        <Controller
          name="searchQuery"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              className="search-input"
            />
          )}
        />
        <button type="button" className="search-button" aria-label="Search">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </form>

      {errors.searchQuery && (
        <p className="error-message">{errors.searchQuery.message}</p>
      )}

      {debouncedSearchQuery.length >= MIN_SEARCH_LENGTH && !errors.searchQuery && (
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
            <p className="search-results">{NO_RESULTS_FOUND_ERROR}</p>
          )}
        </>
      )}
    </section>
  );
};

export default SearchBar;
