import * as fs from 'fs';
import * as path from 'path';

export function readTemplate(file: string): string {
    const filepath = path.resolve(__dirname, `../templates/${file}`);
    return fs.readFileSync(filepath, 'utf8');
}

export function writeTemplate(template: string, dir: string, file: string) {
    const outputPath = path.join(dir, file);
    fs.writeFileSync(outputPath, template, 'utf8');
}

export function injectProps(template: string, props: object): string {
    return template.replace('{% props %}', JSON.stringify(props));
}
