import '@testing-library/jest-dom';

if (typeof global.TextEncoder === 'undefined') {
	import('util').then(({ TextEncoder, TextDecoder }) => {
		global.TextEncoder = TextEncoder as typeof global.TextEncoder;
		global.TextDecoder = TextDecoder as typeof global.TextDecoder;
	});
}
