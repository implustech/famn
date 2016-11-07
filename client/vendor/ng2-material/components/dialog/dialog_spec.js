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
var util_1 = require('../../platform/testing/util');
var testing_1 = require('@angular/core/testing');
var index_1 = require('../../index');
var util_module_1 = require('../../core/util/util.module');
var core_1 = require('@angular/core');
var dialog_1 = require('./dialog');
var dialog_module_1 = require('./dialog.module');
var template = "\n  <md-dialog>\n    <md-dialog-title>Title</md-dialog-title>\n    Content!\n  </md-dialog>";
util_1.componentSanityCheck('Dialog', 'md-dialog', template);
describe('Dialog', function () {
    var MdDialogComponentTest = (function () {
        function MdDialogComponentTest() {
        }
        __decorate([
            core_1.ViewChild(dialog_1.MdDialog), 
            __metadata('design:type', dialog_1.MdDialog)
        ], MdDialogComponentTest.prototype, "dialog", void 0);
        MdDialogComponentTest = __decorate([
            core_1.Component({
                template: "\n<md-dialog>\n  <md-dialog-title>Title</md-dialog-title>\n  Content!\n</md-dialog>",
            }), 
            __metadata('design:paramtypes', [])
        ], MdDialogComponentTest);
        return MdDialogComponentTest;
    }());
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [MdDialogComponentTest],
            imports: [util_module_1.MdServicesModule, dialog_module_1.MdDialogModule],
            providers: [index_1.MATERIAL_BROWSER_PROVIDERS]
        });
    });
    function setup() {
        return testing_1.TestBed.compileComponents()
            .then(function () {
            var fixture = testing_1.TestBed.createComponent(MdDialogComponentTest);
            fixture.detectChanges();
            return fixture.whenStable().then(function () { return fixture; });
        })
            .catch(function (error) {
            console.error(error);
        });
    }
    describe('show', function () {
        it('(onShow) emits after dialog is shown', testing_1.async(function () {
            setup().then(function (fixture) {
                var tc = fixture.componentInstance;
                var called = false;
                var sub = tc.dialog.onShow.subscribe(function () { return called = true; });
                return tc.dialog.show().then(function () { return util_1.promiseWait(); }).then(function () {
                    sub.unsubscribe();
                    expect(called).toBe(true);
                    return tc.dialog.close();
                });
            });
        }));
    });
    describe('close', function () {
        it('dialog result is true if called with no arguments', testing_1.async(function () {
            setup().then(function (fixture) {
                var tc = fixture.componentInstance;
                var result = 1337;
                var sub = tc.dialog.onClose.subscribe(function (r) { return result = r; });
                return tc.dialog.show()
                    .then(function () { return tc.dialog.close(); })
                    .then(function () { return util_1.promiseWait(); })
                    .then(function () {
                    sub.unsubscribe();
                    expect(result).toBe(true);
                });
            });
        }));
        it('(onClose) emits after dialog is closed and cancel = false', testing_1.async(function () {
            setup().then(function (fixture) {
                var tc = fixture.componentInstance;
                var result;
                var sub = tc.dialog.onClose.subscribe(function (r) { return result = r; });
                return tc.dialog.show()
                    .then(function () { return tc.dialog.close(1337, false); })
                    .then(function () { return util_1.promiseWait(); })
                    .then(function () {
                    sub.unsubscribe();
                    expect(result).toBe(1337);
                });
            });
        }));
        it('(onCancel) emits after dialog is closed and cancel = true', testing_1.async(function () {
            setup().then(function (fixture) {
                var tc = fixture.componentInstance;
                var result;
                var sub = tc.dialog.onCancel.subscribe(function (r) { return result = r; });
                return tc.dialog.show()
                    .then(function () { return tc.dialog.close('test', true); })
                    .then(function () { return util_1.promiseWait(); })
                    .then(function () {
                    sub.unsubscribe();
                    expect(result).toBe('test');
                });
            });
        }));
    });
});
//# sourceMappingURL=dialog_spec.js.map