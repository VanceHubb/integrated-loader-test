let path = require('path');

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
                use: ['raw-loader','sass-loader']
            }]
        },
        resolve: {
            extensions: [".js", ".css", ".sass"]
        }
    }
}