const tsc = require('typescript');
const tsconfig = require('../../tsconfig.json');

module.exports = {
    process(src, path) {
        if (!path.endsWith('.ts')) {
            return src;
        }
        return tsc.transpile(
            src,
            tsconfig.compilerOptions,
            path,
        );
    },
};
