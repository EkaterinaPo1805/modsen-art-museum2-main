import React, { useCallback } from 'react';

import Header from '@components/Header/index';
import Footer from '@components/Footer/index';
import SearchBar from '@components/SearchBar/index';
import CompactCard from '@components/CompactCard/index';
import DetailedCard from '@components/DetailedCard/index';

const Home: React.FC = () => {
	const renderSearchSection = useCallback(
		() => (
			<section className="search-container">
				<h1>
					let's find some <span>art</span> here!
				</h1>
				<SearchBar />
			</section>
		),
		[]
	);

	const renderCardSection = useCallback(
		(title: string, subtitle: string, CardComponent: React.ElementType) => (
			<section className="card-container">
				<div className="title">
					<h3>{title}</h3>
					<h2>{subtitle}</h2>
				</div>
				<CardComponent />
			</section>
		),
		[]
	);

	return (
		<div className="page">
			<Header />
			<main>
				{renderSearchSection()}
				{renderCardSection(
					'Topics for you',
					'Other works for you',
					DetailedCard
				)}
				{renderCardSection(
					'Here some more',
					'Our special gallery',
					CompactCard
				)}
			</main>
			<Footer />
		</div>
	);
};

export default Home;
