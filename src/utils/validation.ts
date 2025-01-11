import * as yup from 'yup';

export const MIN_LENGTH = 3;

export const schema = yup.object().shape({
	searchQuery: yup
		.string()
		.trim()
		.min(
			MIN_LENGTH,
			`Search query must be at least ${MIN_LENGTH} characters long.`
		)
		.required('Search field cannot be empty.'),
});
