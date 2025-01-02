import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FavoriteButton from '@components/FavoriteButton/FavoriteButton';

interface CardItemProps {
	dataId: number;
	title: string;
	artist: string;
	publicDomain: string;
	imageId: string;
	variant?: 'compact' | 'detailed';
}

const CardItem: React.FC<CardItemProps> = ({
	dataId,
	title,
	artist,
	publicDomain,
	imageId,
	variant = 'compact',
}) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleImageLoad = () => {
		setLoading(false);
	};

	const handleImageError = () => {
		setError(true);
		setLoading(false);
	};

	return (
		<Link
			to={`/art/${dataId}`}
			className="card-link"
			aria-label={`Go to details of ${title}`}
		>
			<div className={`card ${variant}`}>
				{loading && !error && (
					<div className="image-loader">
						<p>Loading...</p>
					</div>
				)}

				<div className="image-container">
					{!error ? (
						<img
							src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
							alt={title}
							className="image"
							onLoad={handleImageLoad}
							onError={handleImageError}
						/>
					) : (
						<div className="image-error">
							<p>No image</p>
						</div>
					)}
				</div>

				<div className="form">
					<div className="info">
						<div className="art-and-artist">
							<span className="art" title={title}>
								{title}
							</span>
							<span className="artist">{artist}</span>
						</div>
						<span className="publicDomain">{publicDomain}</span>
					</div>
					<FavoriteButton
						id={dataId}
						data-testid={`favorite-button-${dataId}`}
					/>
				</div>
			</div>
		</Link>
	);
};

export default CardItem;
