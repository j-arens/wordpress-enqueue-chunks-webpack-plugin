import { Compiler, Plugin, Stats } from 'webpack';
import { makeManifest } from './chunk-mapper';
import * as TemplateProcessor from './template-utils';
import { Manifest, Options } from './type';

export default class implements Plugin {
    constructor(opts: Options) {
        const defaults = {
            assetsDir: process.cwd(),
            context: 'plugin',
            delimiter: '-',
            namespace: '',
            phpScriptDir: process.cwd(),
        };
        this.opts = Object.assign({}, defaults, opts);
    }

    protected opts: Options;

    public apply(compiler: Compiler) {
        compiler.hooks.done.tap(
            'WordpressEnqueueChunksPlugin',
            this.onHook.bind(this),
        );
    }

    public onHook({ compilation }: Stats) {
        const manifest = makeManifest(compilation);
        this.makePhpScript(manifest);
    }

    protected makePhpScript(manifest: Manifest) {
        const { readTemplate, writeTemplate, injectProps } = TemplateProcessor;
        const { namespace, delimiter, phpScriptDir } = this.opts;
        const prefix = namespace ? `${namespace}${delimiter}` : '';
        const template = readTemplate('wordpressEnqueueChunksPlugin.php');
        const processed = injectProps(template, { ...this.opts, manifest, prefix });
        writeTemplate(processed, phpScriptDir, 'wordpressEnqueueChunksPlugin.php');
    }
}
