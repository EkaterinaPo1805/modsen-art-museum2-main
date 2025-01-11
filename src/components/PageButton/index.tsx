import React from 'react';
import ArrowIcon from '@components/ArrowIcon/index';
import { ARROW_LEFT, ARROW_RIGHT } from '@constants/strings';
import '@components/PageButton/styled';

export interface PageButtonProps {
	direction: typeof ARROW_LEFT | typeof ARROW_RIGHT;
	onClick?: () => void;
}

const PageButton: React.FC<PageButtonProps> = ({ direction, onClick }) => (
	<button className="page-btn" aria-label={direction} onClick={onClick}>
		<ArrowIcon direction={direction} />
	</button>
);

export default PageButton;
