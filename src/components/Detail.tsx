import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '@store/index';
import { fetchArtworkDetail } from '@store/actions/artworkActions';
import FavoriteButton from '@components/FavoriteButton/FavoriteButton';

const Detail: React.FC = () => {
	const { dataId } = useParams<{ dataId: string }>();
	const dispatch = useDispatch<AppDispatch>();

	const { detailedDataById, loadingDetailById, error } = useSelector(
		(state: RootState) => state.artwork
	);

	useEffect(() => {
		if (dataId) {
			dispatch(fetchArtworkDetail(Number(dataId)));
		}
	}, [dispatch, dataId]);

	if (loadingDetailById) {
		return (
			<div className="loading-container">
				<p>Loading...</p>
			</div>
		);
	}

	if (error) return <div>{error}</div>;

	const art = detailedDataById;

	if (!art) {
		return <div>There isn&apos;t such art</div>;
	}

	return (
		<div className="art-container">
			<div className="art-detail">
				<div className="image-detail">
					<img
						src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
						alt={art.title}
					/>
					<div className="favorite-button">
						<FavoriteButton id={art.id} />
					</div>
				</div>
				<div className="container">
					<div className="art-and-artist-and-date">
						<span className="art">{art.title}</span>
						<div className="artist-and-date">
							<span className="artist">{art.artist}</span>
							<span className="date">{art.date}</span>
						</div>
					</div>

					<div className="overview">
						<span>Overview</span>
						<div className="info">
							<span>
								<span className="color">Nationality:</span>{' '}
								{art.artist_nationality}
							</span>
							<span>
								<span className="color">Dimensions: Sheet:</span>{' '}
								{art.dimensions}
							</span>
							<span>
								<span className="color">Credit Line:</span> {art.credit_line}
							</span>
							<span>
								<span className="color">Repository:</span> {art.repository}
							</span>
							<span>{art.public_domain}</span>
						</div>
					</div>
				</div>
			</div>
			<button className="back-button" onClick={() => window.history.back()}>
				Back
			</button>
		</div>
	);
};

export default Detail;
