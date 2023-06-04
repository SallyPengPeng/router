const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader','sass-loader'],
            },
        ],
    },
    devServer: {
        client: {
            logging: 'warn',
        },
        hot: true,
        open: ['/'],
        port: '6789',
        compress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
        }),
    ],
    devtool: 'eval-cheap-source-map'
};