path    = require "path"
webpack = require "webpack"
module.exports =
    context: __dirname + "/app",
    entry: "./entry.coffee",
    output:
        path: __dirname + "/dist/app",
        filename: "bundle.js",
    module:
        loaders: [
            { test: /\.cjsx$/, loaders: ['coffee', 'cjsx']},
            { test: /\.coffee$/, loader: "coffee-loader" },
            { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            { test: /\.sass$/, loader: "style!css!sass?indentedSyntax" }
        ]

    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
    ]
