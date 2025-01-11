import React from 'react';

import { ARROW_LEFT } from '@constants/strings';
import { ARROW_ICON } from '@constants/svg';

import { PageButtonProps } from '@components/PageButton/index';

const ArrowIcon: React.FC<PageButtonProps> = ({ direction }) => {
	const path =
		direction === ARROW_LEFT
			? 'M8.53209 13.7144L7 15L0.572122 7.33956L1.0734 6.91893L1.05398 6.89579L8.71442 0.467911L10 2L3.37037 7.56292L8.53209 13.7144Z'
			: 'M1.46791 13.7144L3 15L9.42788 7.33956L8.9266 6.91893L8.94602 6.89579L1.28558 0.467911L-1.07377e-07 2L6.62963 7.56292L1.46791 13.7144Z';

	return (
		<svg
			width={ARROW_ICON.width}
			height={ARROW_ICON.height}
			viewBox="0 0 10 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path fillRule="evenodd" clipRule="evenodd" d={path} fill="#393939" />
		</svg>
	);
};

export default ArrowIcon;
