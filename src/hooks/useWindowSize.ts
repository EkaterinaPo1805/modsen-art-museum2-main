import {
	BREAKPOINT_MOBILE,
	BREAKPOINT_TABLET,
	DEFAULT_IMAGES_PER_PAGE,
	IMAGES_PER_PAGE_MOBILE,
	IMAGES_PER_PAGE_TABLET,
} from '@constants/numbers';
import { useState, useEffect } from 'react';

export default function useWindowSize() {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});
	const [imagesPerPage, setImagesPerPage] = useState(DEFAULT_IMAGES_PER_PAGE);

	useEffect(() => {
		const onResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		onResize();
		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		if (size.width <= BREAKPOINT_MOBILE) {
			setImagesPerPage(IMAGES_PER_PAGE_MOBILE);
		} else if (size.width <= BREAKPOINT_TABLET) {
			setImagesPerPage(IMAGES_PER_PAGE_TABLET);
		} else {
			setImagesPerPage(DEFAULT_IMAGES_PER_PAGE);
		}
	}, [size.width]);

	return { imagesPerPage, ...size };
}
