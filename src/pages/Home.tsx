import React from 'react';

import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import SearchBar from '@components/SearchBar';
import CompactCard from '@components/CompactCard';
import DetailedCard from '@components/DetailedCard';

const Home: React.FC = () => {
	return (
		<div className="page">
			<Header />
			<section className="search-container">
				<h1>
					let&apos;s find some <span>art</span> here!
				</h1>
				<SearchBar />
			</section>
			<section className="card-container">
				<div className="title">
					<h3>Topics for you</h3>
					<h2>Other works for you</h2>
				</div>
				<DetailedCard />
			</section>
			<section className="card-container">
				<div className="title">
					<h3>Here some more</h3>
					<h2>Our special gallery</h2>
				</div>
				<CompactCard />
			</section>
			<Footer />
		</div>
	);
};

export default Home;
