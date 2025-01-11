import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '@store/index';
import { fetchArtworkDetail } from '@store/actions/fetchArtworkDetailAction';
import FavoriteButton from '@components/FavoriteButton';
import Loader from '@components/Loader/index';
import { createImageUrl } from '@utils/createImageUrl';
import '@components/Detail/styled';

const Detail: React.FC = () => {
	const { dataId } = useParams<{ dataId: string }>();
	const dispatch = useDispatch<AppDispatch>();

	const { detailedDataById, loadingDetailById, error } = useSelector(
		(state: RootState) => state.artworkDetail
	);

	useEffect(() => {
		if (dataId) {
			dispatch(fetchArtworkDetail(Number(dataId)));
		}
	}, [dispatch, dataId]);

	const art = detailedDataById;

	const handleBackClick = () => {
		window.history.back();
	};

	return (
		<div className="art-container">
			{loadingDetailById ? (
				<Loader />
			) : error ? (
				<Loader errorMessage={error} />
			) : !art ? (
				<div>NO_RESULTS_FOUND_ERROR</div>
			) : (
				<>
					<div className="art-detail">
						<div className="image-detail">
							<img src={createImageUrl(art.image_id)} alt={art.title} />
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
										<span className="color">Credit Line:</span>{' '}
										{art.credit_line}
									</span>
									<span>
										<span className="color">Repository:</span> {art.repository}
									</span>
									<span>{art.public_domain}</span>
								</div>
							</div>
						</div>
					</div>
					<button className="back-button" onClick={handleBackClick}>
						Back
					</button>
				</>
			)}
		</div>
	);
};

export default Detail;
