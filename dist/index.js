'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var client_1 = require('react-dom/client');
var react_redux_1 = require('react-redux');
var react_router_dom_1 = require('react-router-dom');
var App_1 = __importDefault(require('./components/App/App'));
var store_1 = require('./store');
var root = (0, client_1.createRoot)(document.getElementById('root'));
root.render(
	react_1.default.createElement(
		react_redux_1.Provider,
		{ store: store_1.store },
		react_1.default.createElement(
			react_router_dom_1.BrowserRouter,
			null,
			react_1.default.createElement(App_1.default, null)
		)
	)
);
