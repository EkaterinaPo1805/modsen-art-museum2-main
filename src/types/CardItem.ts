import { CARD_COMPACT, CARD_DETAILED } from '@constants/strings';

export interface CardItemProps {
	dataId: number;
	title: string;
	artist: string;
	publicDomain: string;
	imageId: string;
	variant?: typeof CARD_COMPACT | typeof CARD_DETAILED;
}
