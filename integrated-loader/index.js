const fs = require('fs');
const path = require('path');
const Spinner = require('cli-spinner').Spinner;

function integrated(content) {
    const callback = this.async();
    const emitFile = this.emitFile;
    const resourcePath = this.resourcePath;
    const outputPath = path.join('intermediate', path.basename(resourcePath, '.css') + '.css');
    const spinner = new Spinner('processing ' + outputPath + '.. %s');
    spinner.start();

    sassLoader()
        .then(postcssLoader)
        .then(writeFile)
        .then(handleSuccess)
        .catch(handleError);

    function sassLoader() {
        // refer: https://github.com/webpack-contrib/sass-loader
        // refer: https://github.com/sass/node-sass 
        const sass = require('node-sass');
        return new Promise((resolve, reject) => {
            sass.render({
                file: resourcePath,
                outFile: outputPath,
                sourceMap: true
            }, (err, result) => {
                if (err) return reject(err);
                return resolve({css: result.css, map: result.map});
            });
        });
    }

    function postcssLoader(input) {
        // refer: https://github.com/postcss/postcss-loader
        // refer: https://github.co m/postcss/postcss

        const postcss = require('postcss');
        const autoprefixer = require('autoprefixer');

        return new Promise((resolve, reject) => {
            postcss([autoprefixer])
                .process(input.css, {
                    from:outputPath,
                     to: outputPath,
                     map: {
                         inline: false,
                         annotation:false,
                        //  prev: input.map
                     }})
                .then(result => {
                    console.log(result.map);
                                        resolve({css:result.css, map: result.map});
                })
        });
    }

    function writeFile(input) {
        return new Promise((resolve, reject) => {
            emitFile(outputPath, input.css);
            return resolve();
        });
    }

    function handleSuccess() {
        spinner.stop();
        // different value for each build, so webpack will be notified
        callback(null, JSON.stringify(new Date().valueOf()));
    }

    function handleError(err) {
        spinner.stop();
        callback(err);
    }
}

module.exports = integrated;
// module.exports.raw = true;