"use strict";

const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || "development";
const DEV = NODE_ENV === "development";

const buildPath = path.resolve(__dirname, 'public');

const BABEL_QUERY = {
  presets: ['es2015', 'react'],
  plugins: [
    ['transform-object-rest-spread'],
    ['transform-class-properties'],
    // ['transform-decorators-legacy']
  ]
};


const plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(NODE_ENV),
		DEV: JSON.stringify(DEV)
	})
];

const productPlugins = [
	new webpack.optimize.UglifyJsPlugin({
		compress: { warnings: false, drop_console: true, unsafe: true }
	})
];

module.exports = {
	context: path.resolve(__dirname, 'src'),

	entry: './index',

	noInfo: true,

	target: 'web',

	output: {filename: 'index.js', path: buildPath},

	watch: DEV,

	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: DEV ? "cheap-source-map" : null,

	plugins: DEV ? plugins : plugins.concat(productPlugins),

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	module: {
		loaders: [{
			exclude: /node_modules/,
			test: /\.js$/,
			loader: 'babel',
			query: BABEL_QUERY
		}]
	}
}