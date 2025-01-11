import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@store/index';
import CardItem from '@components/CardItem';
import { ArtworkData } from '@appTypes/dataFetch';
import Loader from '@components/Loader/index';
import useFetchArtwork from '@hooks/useFetchArtwork';
import { CARD_COMPACT } from '@constants/strings';
import { IMAGES_PER_PAGE_COMPACT } from '@constants/numbers';

import '@components/CompactCard/styled';

const CompactCard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { compactData, loadingCompact, error } = useSelector(
		(state: RootState) => state.artwork
	);

	useFetchArtwork(
		dispatch,
		IMAGES_PER_PAGE_COMPACT,
		loadingCompact,
		compactData.length,
		CARD_COMPACT,
		1
	);

	return (
		<section className="cardcontainer">
			<div className="works-gallery">
				{loadingCompact ? (
					<Loader />
				) : error ? (
					<Loader errorMessage={error} />
				) : (
					compactData.map((item: ArtworkData) => (
						<CardItem
							key={item.id}
							dataId={item.id}
							title={item.title}
							artist={item.artist}
							publicDomain={item.public_domain}
							imageId={item.image_id}
							variant={CARD_COMPACT}
						/>
					))
				)}
			</div>
		</section>
	);
};

export default CompactCard;
