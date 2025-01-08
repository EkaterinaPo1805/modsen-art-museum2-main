'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var museum_logo_2_svg_1 = __importDefault(
	require('../../images/museum-logo 2.svg')
);
var react_router_dom_1 = require('react-router-dom');
var Logo = function () {
	return react_1.default.createElement(
		'div',
		{ className: 'logo' },
		react_1.default.createElement(
			react_router_dom_1.Link,
			{ to: '/' },
			react_1.default.createElement('img', {
				src: museum_logo_2_svg_1.default,
				alt: 'Museum of Art',
			})
		)
	);
};
exports.default = Logo;
