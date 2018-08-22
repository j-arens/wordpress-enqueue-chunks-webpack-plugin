import { Compiler, Plugin, Stats } from 'webpack';
import { makeManifest } from './ChunkMapper';
import * as TemplateProcessor from './TemplateProcessor';
import { Manifest, Options } from './type';

export default class implements Plugin {

    protected opts: Options;

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
        const { read, write, injectProps } = TemplateProcessor;
        const { namespace, delimiter, phpScriptDir } = this.opts;
        const prefix = namespace ? `${namespace}${delimiter}` : '';
        const template = read('wordpressEnqueueChunksPlugin.php');
        const processed = injectProps(template, {
            ...this.opts,
            manifest: JSON.stringify(manifest),
            prefix,
        });
        write(processed, phpScriptDir, 'wordpressEnqueueChunksPlugin.php');
    }
}
