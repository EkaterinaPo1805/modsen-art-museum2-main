import bookmark from '@assets/bookmark.svg';
import home from '@assets/home.svg';

export const NAVIGATION_ROUTES = {
	HOME: { path: '/', label: 'Home', icon: home },
	FAVORITES: {
		path: '/favorites',
		label: 'Your favorites',
		icon: bookmark,
	},
	ART_DETAIL: { path: '/art/:dataId', label: 'Art Details', icon: null },
	NOT_FOUND: { path: '*', label: 'Not Found', icon: null },
};

export const ROUTES = {
    HOME: "/",
    FAVORITES: "/favorites",
    ART_DETAIL: "/art/:dataId",
    NOT_FOUND: "*",
  };
