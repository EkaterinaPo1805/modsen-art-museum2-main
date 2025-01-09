import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@store/index';
import { addFavorite, removeFavorite } from '@store/actions/fetchFavoritesAction';

interface FavoriteButtonProps {
	id: number;
	'data-testid'?: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
	id,
	'data-testid': dataTestId,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const isActive = useSelector((state: RootState) =>
		state.favorites?.items.includes(id)
	);

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(isActive ? removeFavorite(id) : addFavorite(id));
	};

	return (
		<button
			type="button"
			className={`add-to-favourites ${isActive ? 'active' : ''}`}
			onClick={handleClick}
			aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
			data-testid={dataTestId}
		>
			<svg
				width="59"
				height="59"
				viewBox="0 0 59 60"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					y="0.5"
					width="59"
					height="59"
					rx="29.5"
					fill={isActive ? 'rgba(251, 215, 178, 0.3)' : '#F9F9F9'}
				/>
				<path
					d="M36.5444 39.0444L29.5444 35.0444L22.5444 39.0444V23.0444C22.5444 22.514 22.7551 22.0053 23.1302 21.6302C23.5053 21.2551 24.014 21.0444 24.5444 21.0444H34.5444C35.0749 21.0444 35.5836 21.2551 35.9586 21.6302C36.3337 22.0053 36.5444 22.514 36.5444 23.0444V39.0444Z"
					stroke="#F17900"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
};

export default FavoriteButton;
