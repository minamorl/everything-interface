'use strict';

let path = require("path");
let webpack = require("webpack");
module.exports = {
    context: __dirname + "/app",
    entry: "./entry.js",
    output: {
        path: __dirname + "/dist/app",
        filename: "bundle.js",
    },
    module: {
        loaders: [{
            test: /\.cjsx$/,
            loaders: ['coffee', 'cjsx']
        }, {
            test: /\.coffee$/,
            loader: "coffee-loader"
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.sass$/,
            loader: "style!css!sass?indentedSyntax"
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
    ]
}