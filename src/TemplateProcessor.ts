import * as fs from 'fs';
import * as path from 'path';

const tryCatch = <T>(fn, msg: string = '') => (...args): T => {
    try {
        return fn(...args);
    } catch (err) {
        if (err.code === 'ENOENT' || err.code === 'EACCES') {
            console.log(msg); // tslint:disable-line
            return;
        } else {
            throw err;
        }
    }
};

function readTemplate(file: string): string {
    const filepath = path.resolve(__dirname, `../templates/${file}`);
    return fs.readFileSync(filepath, 'utf8');
}

function writeTemplate(template: string, dir: string, file: string) {
    const outputPath = path.join(dir, file);
    fs.writeFileSync(outputPath, template, 'utf8');
}

export function injectProps(template: string, props: object): string {
    const header = read('header.txt');
    return eval('`' + template + '`'); // tslint:disable-line
}

export const read = tryCatch<string>(
    readTemplate,
    'wordpressEnqueueChunksPlugin: Unable to read template',
);

export const write = tryCatch<string>(
    writeTemplate,
    'wordpressEnqueueChunksPlugin: Unable to write template',
);
