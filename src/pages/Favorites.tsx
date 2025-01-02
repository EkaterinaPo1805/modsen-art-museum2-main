import React from 'react';

import FavoriteCard from '@components/FavoriteCard';
import Header from '@components/Header/Header';
import bookmark from '@assets/bookmark.svg';
import Footer from '@components/Footer/Footer';

const Favourites = () => {
	return (
		<div className="page">
			<Header />
			<div className="title">
				<h1>Here are your</h1>
				<div className="favorites-title">
					<img src={bookmark} alt="Favorites" className="bookmark" />
					<h1 className="color">Favorites</h1>
				</div>
			</div>
			<section className="favorites-card">
				<div className="section-title">
					<h3>Saved by you</h3>
					<h2>Your favorites list</h2>
				</div>
				<FavoriteCard />
			</section>
			<Footer />
		</div>
	);
};

export default Favourites;
