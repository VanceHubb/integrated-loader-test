let path = require('path');
const EmitLoader = require("emit-loader/plugin");

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
                use: ['raw-loader', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
            }]
        },
        plugins: [
            // new EmitLoader("styles.css")
        ]
    }
}