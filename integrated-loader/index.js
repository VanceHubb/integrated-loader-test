const sass = require('node-sass');
const fs = require('fs');
const path = require('path');

function integrated(content) {
    const callback = this.async();
    const resourcePath = this.resourcePath;
    const outputPath = path.join('intermediate', resourcePath.replace(/[\/:\\]/g, '-')); // need better solution to ensure uniqueness on filename

    sassLoader()
        .then(writeFile)
        .then(handleSuccess)
        .catch(handleError);

    function sassLoader() {
        // refer: https://github.com/webpack-contrib/sass-loader
        // refer: https://github.com/sass/node-sass 
        return new Promise((resolve, reject) => {
            sass.render({
                file: resourcePath
            }, (err, result) => {
                if (err) return reject(err);
                return resolve(result.css);
            });
        });
    }

    function posscssLoader() {
        // refer: https://github.com/postcss/postcss-loader
        // refer: https://github.com/postcss/postcss

    }

    function writeFile(input) {
        return new Promise((resolve, reject) => {
            fs.writeFile(outputPath, input, (err) => {
                if (err) return reject(err);
                return resolve();
            })
        });
    }

    function handleSuccess() {
        callback(null, '"intemediate file generated on '+new Date().toISOString()+': ' + outputPath + '"');
    }

    function handleError(err) {
        callback(err);
    }
}

module.exports = integrated;
// module.exports.raw = true;