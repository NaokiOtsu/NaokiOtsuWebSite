var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		common: [
			'jquery',
			'underscore'
		]
	},
	output: {
		filename: '[name].bundle.js'
	},
	resolve: {
		root: [
			path.resolve('./node_modules'),
			path.resolve('./js/lib')
		]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'common.bundle.js',
			minChunks: 10
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};