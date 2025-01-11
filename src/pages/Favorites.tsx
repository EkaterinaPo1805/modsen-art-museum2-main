import React, { useCallback } from 'react';

import FavoriteCard from '@components/FavoriteCard/index';

import Header from '@components/Header/index';
import Footer from '@components/Footer/index';
import bookmark from '@assets/bookmark.svg';

const Favourites: React.FC = () => {
	const renderTitle = useCallback(
		() => (
			<>
				<h1>Here are your</h1>
				<div className="favorites-title">
					<img src={bookmark} alt="Favorites" className="bookmark" />
					<h1 className="color">Favorites</h1>
				</div>
			</>
		),
		[]
	);

	const renderSectionTitle = useCallback(
		() => (
			<div className="section-title">
				<h3>Saved by you</h3>
				<h2>Your favorites list</h2>
			</div>
		),
		[]
	);

	return (
		<div className="page">
			<Header />
			<main>
				<div className="title">{renderTitle()}</div>
				<section className="favorites-card">
					{renderSectionTitle()}
					<FavoriteCard />
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Favourites;
