"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compilation = require("../../dev/fixtures/compilation");
const __1 = require("../");
const tp = require('../template-utils');
tp.writeTemplate = jest.fn();
tp.injectProps = jest.fn();
describe('Plugin', () => {
    let instance;
    beforeEach(() => {
        instance = new __1.default({
            assetsDir: 'location/of/assets',
            phpScriptDir: 'template/output/location',
        });
    });
    describe('onHook()', () => {
        it('gets a manifest and delegates writing the template', () => {
            const spy = jest.spyOn(instance, 'makePhpScript');
            instance.onHook({ compilation });
            expect(spy).toBeCalled();
            spy.mockRestore();
        });
    });
    describe('makePhpScript', () => {
        it('prepares the script and outputs it', () => {
            instance.makePhpScript({});
            expect(tp.writeTemplate).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvX190ZXN0c19fL3BsdWdpbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOERBQThEO0FBQzlELDJCQUF5QjtBQUN6QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUV4QyxFQUFFLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM3QixFQUFFLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUUzQixRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUNwQixJQUFJLFFBQVEsQ0FBQztJQUViLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixRQUFRLEdBQUcsSUFBSSxXQUFNLENBQUM7WUFDbEIsU0FBUyxFQUFFLG9CQUFvQjtZQUMvQixZQUFZLEVBQUUsMEJBQTBCO1NBQzNDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDdEIsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQUcsRUFBRTtZQUMxRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNsRCxRQUFRLENBQUMsTUFBTSxDQUFFLEVBQUUsV0FBVyxFQUFVLENBQUMsQ0FBQztZQUMxQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDekIsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUMzQixFQUFFLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFO1lBQzFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9