"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function readTemplate(file) {
    const filepath = path.resolve(__dirname, `../templates/${file}`);
    return fs.readFileSync(filepath, 'utf8');
}
exports.readTemplate = readTemplate;
function writeTemplate(template, dir, file) {
    const outputPath = path.join(dir, file);
    fs.writeFileSync(outputPath, template, 'utf8');
}
exports.writeTemplate = writeTemplate;
function injectProps(template, props) {
    return template.replace('{% props %}', JSON.stringify(props));
}
exports.injectProps = injectProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdGVtcGxhdGUtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLFNBQWdCLFlBQVksQ0FBQyxJQUFZO0lBQ3JDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUhELG9DQUdDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLFFBQWdCLEVBQUUsR0FBVyxFQUFFLElBQVk7SUFDckUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFIRCxzQ0FHQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxRQUFnQixFQUFFLEtBQWE7SUFDdkQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUZELGtDQUVDIn0=