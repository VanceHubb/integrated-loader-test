const fs = require('fs');
const path = require('path');
function IntegratedPlugin() {}

IntegratedPlugin.prototype.apply = function (compiler, call) {
    compiler.plugin('after-emit', function (compilation, callback) {
        const cssPaths = Object.keys(compilation.assets)
            .filter((cssPath) => path.extname(cssPath) === ".css");
        const output = cssPaths.map((cssPath) => `@import './${cssPath}';\n`).join('');
        const outputPath = path.join(compilation.outputOptions.path, 'output.css');

        fs.writeFile(outputPath, output, (err) => {
            if (err) {
                console.warn(err);
            } else {
                console.log('\noutput.css updated.');
            }
            callback();
        });
    });
}

module.exports = IntegratedPlugin;