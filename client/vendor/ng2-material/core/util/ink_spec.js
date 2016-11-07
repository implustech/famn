"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var ink_1 = require('./ink');
var platform_browser_1 = require('@angular/platform-browser');
var defaultTemplate = "<div md-ink></div>";
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        core_1.Component({
            selector: 'ink-test-component',
            template: defaultTemplate
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
describe('Ink', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                TestComponent
            ],
            providers: []
        });
    });
    function setup(template) {
        if (template === void 0) { template = null; }
        if (template) {
            testing_1.TestBed.overrideComponent(TestComponent, {
                set: {
                    template: template
                }
            });
        }
        return testing_1.TestBed.compileComponents()
            .then(function () {
            var fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            return fixture;
        })
            .catch(function (error) { return console.error.bind(console); });
    }
    describe('canApply', function () {
        it('should return true if element does not have md-no-ink attribute', testing_1.async(function () {
            setup("<div></div>")
                .then(function (api) {
                var el = api.debugElement.query(platform_browser_1.By.css('div'));
                expect(ink_1.Ink.canApply(el.nativeElement)).toBe(true);
            });
        }));
        it('should return false if element does have md-no-ink attribute', testing_1.async(function () {
            setup("<div md-no-ink></div>")
                .then(function (api) {
                var el = api.debugElement.query(platform_browser_1.By.css('div'));
                expect(ink_1.Ink.canApply(el.nativeElement)).toBe(false);
            });
        }));
    });
});
//# sourceMappingURL=ink_spec.js.map