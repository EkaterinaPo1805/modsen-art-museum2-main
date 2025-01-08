import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@store/index';
import { fetchArtworkData } from '@store/actions/artworkActions';
import CardItem from '@components/CardItem/CardItem';
import { ArtworkData } from '@store/reducers/artworkReducers';

const CompactCard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const imagesPerPage = 9;

	const { compactData, loadingCompact, error } = useSelector(
		(state: RootState) => state.artwork
	);

	useEffect(() => {
		if (!loadingCompact && compactData.length === 0) {
			dispatch(fetchArtworkData({ page: 1, imagesPerPage, type: 'compact' }));
		}
	}, [dispatch, imagesPerPage, loadingCompact, compactData.length]);

	if (loadingCompact) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="cardpcontainer">
			<div className="works-gallery">
				{compactData.map((item: ArtworkData) => (
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
		</div>
	);
};

export default CompactCard;
