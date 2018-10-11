import Plugin from '../';
import * as compilation from '../../dev/fixtures/compilation';
const tp = require('../template-utils');
const manifest = require('../../dev/fixtures/manifest.json');

describe('Plugin', () => {
    let instance;

    beforeEach(() => {
        instance = new Plugin({
            assetsDir: 'location/of/assets',
            phpScriptDir: 'template/output/location',
        });
        tp.writeTemplate = jest.fn();
    });

    describe('onHook()', () => {
        it('gets a manifest and delegates writing the template', () => {
            const spy = jest.spyOn(instance, 'makePhpScript');
            instance.onHook(({ compilation } as any));
            expect(spy).toBeCalled();
            spy.mockRestore();
        });
    });

    describe('makePhpScript', () => {
        it('prepares the script and outputs it', () => {
            instance.makePhpScript(manifest);
            expect(tp.writeTemplate).toHaveBeenCalled();
        });
    });
});
