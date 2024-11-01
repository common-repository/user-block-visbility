const webpack = require( 'webpack' );
const inProduction = process.env.NODE_ENV === 'production';
const WebpackCleanPlugin = require( 'webpack-clean' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );

const entry = {
	'css/style'           : './src/css/style.scss',
	'js/block-visibility' : './src/js/index.js',
}

module.exports = {
	entry,
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
			},
			{
				test: /\.(png|jpg|svg|eot|ttf|woff)$/,
				use: [
					{
						loader: 'url-loader', options: {
							limit: 10000
						},
					},
				],
			},
			{
				test: /\.(css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					'sass-loader',
				],
			},
		],
		
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new WebpackCleanPlugin(
			// Array of JS files in the CSS folder
			Object.keys( entry )
				.filter( ( key ) => key.startsWith( 'css' ) )
				.map( ( key ) => `dist/${key}.js` )
		),
		new OptimizeCssAssetsPlugin(),
	],
	mode: inProduction ? 'production' : 'development',
}
