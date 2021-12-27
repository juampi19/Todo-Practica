const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpack = require('copy-webpack-plugin');


module.exports = {

    mode: 'development',

    output: {
        clean: true
    },


    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false
                },
            },

            {
                test: /\.css$/i,
                exclude: /app.css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /app.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],

            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new copyWebpack({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
      
    ]

}