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
            jsonManifest: false,
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
        this.makePhpScript(manifest, this.opts.jsonManifest);
    }

    protected makePhpScript(manifest: Manifest, extractJsonManifest: boolean) {
        const { readTemplate, writeTemplate, injectProps } = TemplateProcessor;
        const { namespace, delimiter, phpScriptDir } = this.opts;
        const prefix = namespace ? `${namespace}${delimiter}` : '';
        const props = { ...this.opts, manifest, prefix };

        if (extractJsonManifest) {
            writeTemplate(JSON.stringify(props), phpScriptDir, 'chunksManifest.json');
        }

        const phpScriptTemplate = readTemplate('wordpressEnqueueChunksPlugin.php');
        const processed = injectProps(phpScriptTemplate, props);
        writeTemplate(processed, phpScriptDir, 'wordpressEnqueueChunksPlugin.php');
    }
}
