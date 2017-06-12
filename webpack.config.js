let path = require('path');

module.exports = function () {
    return {
        entry: "./src/entry", // string | object | a
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js"
        },

        module: {
            rules: [{
                test: /\.css$/,
                use: ['css-loader']
            }]
        },

        devtool: "source-map", // enum
    }
}