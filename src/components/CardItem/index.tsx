import React from 'react';
import { Link } from 'react-router-dom';
import { CardItemProps } from '@appTypes/CardItem';
import Loader from '@components/Loader/index';
import FavoriteButton from '@components/FavoriteButton';
import { createImageUrl } from '@utils/createImageUrl';
import useFetchImage from '@hooks/useFetchImage';
import { CARD_COMPACT, NO_IMAGE_TEXT } from '@constants/strings';
import { NAVIGATION_ROUTES } from '@constants/routes';

import '@components/CardItem/styled';

const CardItem: React.FC<CardItemProps> = ({
	dataId,
	title,
	artist,
	publicDomain,
	imageId,
	variant = CARD_COMPACT,
}) => {
	const { loading, error, handleImageLoad, handleImageError } = useFetchImage();
	const imageUrl = React.useMemo(() => createImageUrl(imageId), [imageId]);

	return (
		<Link
			to={NAVIGATION_ROUTES.ART_DETAIL.path.replace(
				':dataId',
				dataId.toString()
			)}
			className="card-link"
			aria-label={`Go to details of ${title}`}
		>
			<article className={`card ${variant}`}>
				<figure className="image-container">
					{loading && !error && <Loader className="card" />}
					{!error ? (
						<img
							src={imageUrl}
							alt={title}
							className="image"
							onLoad={handleImageLoad}
							onError={handleImageError}
						/>
					) : (
						<div className="image-error">
							<p>{NO_IMAGE_TEXT}</p>
						</div>
					)}
				</figure>

				<section className="form">
					<div className="info">
						<span className="art-and-artist">
							<span className="art" title={title}>
								{title}
							</span>
							<span className="artist">{artist}</span>
						</span>
						<p className="publicDomain">{publicDomain}</p>
					</div>
					<FavoriteButton
						id={dataId}
						data-testid={`favorite-button-${dataId}`}
					/>
				</section>
			</article>
		</Link>
	);
};

export default React.memo(CardItem);
