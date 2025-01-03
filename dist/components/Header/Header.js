'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var react_router_dom_1 = require('react-router-dom');
var Logo_1 = __importDefault(require('../Logo/Logo'));
var bookmark_svg_1 = __importDefault(require('../../images/bookmark.svg'));
var Header = function () {
	return react_1.default.createElement(
		'section',
		{ className: 'header' },
		react_1.default.createElement(
			'div',
			{ className: 'container' },
			react_1.default.createElement(
				'header',
				null,
				react_1.default.createElement(Logo_1.default, null),
				react_1.default.createElement(
					'nav',
					{ className: 'favourites' },
					react_1.default.createElement(
						react_router_dom_1.Link,
						{ to: '/favourites' },
						'zzz',
						react_1.default.createElement('img', {
							src: bookmark_svg_1.default,
							alt: 'Favourites',
						}),
						'Your favourites'
					)
				)
			)
		)
	);
};
exports.default = Header;
