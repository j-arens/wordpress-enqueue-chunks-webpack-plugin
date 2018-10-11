import * as tp from '../template-utils';
const fs = require('fs');

describe('readTemplate()', () => {
    it('locates templates and returns the template content as a string', () => {
        fs.readFileSync = jest.fn();
        const template = 'the-best-template-ever.php';
        tp.readTemplate(template);
        expect(fs.readFileSync).toBeCalledWith(`${process.cwd()}/templates/${template}`, 'utf8');
    });
});

describe('writeTemplate()', () => {
    it('creates a template at the given path', () => {
        fs.writeFileSync = jest.fn();
        const content = 'how noun brown cow';
        const path = 'my/dest/dir';
        const file = 'fantastic.txt';
        tp.writeTemplate(content, path, file);
        expect(fs.writeFileSync).toBeCalledWith(`${path}/${file}`, content, 'utf8');
    });
});

describe('injectProps()', () => {
    it('replaces the props tag in a string with json', () => {
        const str = 'g-day mate, shrimp on the barbie, {% props %}, vegemite';
        const props = { kangaroo: 1, crocodile: 2 };
        const result = tp.injectProps(str, props);
        expect(result).toBe(`g-day mate, shrimp on the barbie, ${JSON.stringify(props)}, vegemite`);
    });
});
