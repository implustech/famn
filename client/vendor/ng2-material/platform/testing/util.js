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
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var index_1 = require('../../index');
function promiseWait(milliseconds) {
    if (milliseconds === void 0) { milliseconds = 10; }
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve(); }, milliseconds);
    });
}
exports.promiseWait = promiseWait;
function componentSanityCheck(name, selector, template) {
    var TestComponent = (function () {
        function TestComponent() {
        }
        TestComponent = __decorate([
            core_1.Component({
                selector: 'test-app',
                template: template
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    describe(name, function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    TestComponent
                ],
                imports: [index_1.Ng2MaterialModule],
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
                return fixture.whenStable().then(function () { return fixture; });
            })
                .catch(function (error) {
                return console.error(error);
            });
        }
        describe(selector, function () {
            it('should instantiate component without fail', testing_1.async(function () {
                setup().then(function () { return promiseWait(); });
            }));
            it('should destroy component without fail', testing_1.async(function () {
                setup()
                    .then(function (api) {
                    return api.destroy();
                })
                    .then(function () { return promiseWait(); });
            }));
        });
    });
}
exports.componentSanityCheck = componentSanityCheck;
//# sourceMappingURL=util.js.map