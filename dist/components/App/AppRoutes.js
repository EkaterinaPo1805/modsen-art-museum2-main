'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var react_router_dom_1 = require('react-router-dom');
var Home_1 = __importDefault(require('../../pages/Home'));
var Favourites_1 = __importDefault(require('../../pages/Favourites'));
var AppRoutes = function () {
	return react_1.default.createElement(
		react_router_dom_1.Routes,
		null,
		react_1.default.createElement(react_router_dom_1.Route, {
			path: '/',
			element: react_1.default.createElement(Home_1.default, null),
		}),
		react_1.default.createElement(react_router_dom_1.Route, {
			path: '/favourites',
			element: react_1.default.createElement(Favourites_1.default, null),
		})
	);
};
exports.default = AppRoutes;
