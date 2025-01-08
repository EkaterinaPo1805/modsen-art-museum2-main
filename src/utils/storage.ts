const FAVORITES_KEY = 'favorites';

export const getFavorites = (): number[] => {
	const storedFavorites = sessionStorage.getItem(FAVORITES_KEY);
	return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const addFavorite = (id: number): void => {
	const favorites = getFavorites();
	if (!favorites.includes(id)) {
		sessionStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, id]));
	}
};

export const removeFavorite = (id: number): void => {
	const favorites = getFavorites();
	sessionStorage.setItem(
		FAVORITES_KEY,
		JSON.stringify(favorites.filter((favoriteId) => favoriteId !== id))
	);
};

export const isFavorite = (id: number): boolean => {
	const favorites = getFavorites();
	return favorites.includes(id);
};
