"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tp = require("../template-utils");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtdXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9fX3Rlc3RzX18vdGVtcGxhdGUtdXRpbHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUF3QztBQUN4QyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUM1QixFQUFFLENBQUMsZ0VBQWdFLEVBQUUsR0FBRyxFQUFFO1FBQ3RFLEVBQUUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzVCLE1BQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDO1FBQzlDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGNBQWMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0YsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7SUFDN0IsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLEdBQUcsRUFBRTtRQUM1QyxFQUFFLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM3QixNQUFNLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxhQUFhLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEYsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO0lBQzNCLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLEVBQUU7UUFDcEQsTUFBTSxHQUFHLEdBQUcseURBQXlELENBQUM7UUFDdEUsTUFBTSxLQUFLLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUM1QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=