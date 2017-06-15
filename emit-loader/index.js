const fs = require('fs');
const path = require('path');

function emitLoader(source, map) {
    const emitFile = this.emitFile;
    const resourcePath = this.resourcePath;
    const outputPath = path.join('intermediate', path.basename(resourcePath, '.css') + '.css');
    emitFile(outputPath, source, map);
    return JSON.stringify(new Date().valueOf());
}

module.exports = emitLoader;
// module.exports.raw = true;