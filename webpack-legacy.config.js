let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function () {
    return {
        entry: "./assets/entry", // string | object | a
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js"
        },

        module: {
            rules: [{
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract(
                    {use:['raw-loader', 'postcss-loader', 'sass-loader']})
            }]
        },
        devtool: "source-map",
        plugins: [
            new ExtractTextPlugin("styles.css")
        ]
    }
}