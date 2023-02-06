const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/contentScripts/index.tsx', //
        popup: './src/popup/reactSrc/popupEntry.tsx',
        settings: './src/settings/reactSrc/settingsEntry.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: true,
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Popup',
            chunks: ['popup'],
            template: './src/popup/popup.html',
            filename: 'popup.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Settings',
            chunks: ['settings'],
            template: './src/settings/settings.html',
            filename: 'settings.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            },
        ],
    },
};
