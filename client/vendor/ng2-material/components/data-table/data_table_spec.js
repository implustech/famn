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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var index_1 = require('./index');
var common_1 = require('@angular/common');
var material_1 = require('@angular/material');
var TestComponent = (function () {
    function TestComponent() {
        this.selected = [];
    }
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test-app',
            template: "<md-data-table [selectable]=\"true\">\n      <thead>\n        <tr md-data-table-header-selectable-row>\n          <th>Unit price</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr md-data-table-selectable-row>\n          <td>$2.90</td>\n        </tr>\n        <tr md-data-table-selectable-row>\n          <td>$1.25</td>\n        </tr>\n      </tbody>\n    </md-data-table>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
util_1.componentSanityCheck('Data table', 'md-data-table', "<md-data-table></md-data-table>");
describe('Data table', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                index_1.MdDataTable,
                index_1.MdDataTableSelectableRow,
                index_1.MdDataTableHeaderSelectableRow,
                TestComponent
            ],
            imports: [common_1.CommonModule, material_1.MdCheckboxModule],
            providers: []
        });
    });
    function setup() {
        var result = null;
        return testing_1.TestBed.compileComponents()
            .then(function () {
            var fixture = testing_1.TestBed.createComponent(TestComponent);
            var debug = fixture.debugElement.query(platform_browser_1.By.css('md-data-table'));
            var comp = debug.componentInstance;
            var testComp = fixture.debugElement.componentInstance;
            testComp.selected = [];
            fixture.detectChanges();
            result = {
                fixture: fixture,
                comp: comp,
                debug: debug
            };
            return fixture.whenStable();
        })
            .then(function () { return result; })
            .catch(function (error) {
            console.error(error);
        });
    }
    describe('md-data-table', function () {
        it('should initialize selected', testing_1.async(function () {
            setup().then(function (api) {
                expect(api.comp.selected.length).toEqual(0);
                api.fixture.destroy();
            });
        }));
        it('should toggle checked value when a click is fired on a row checkbox', testing_1.async(function () {
            setup().then(function (api) {
                var row = api.debug.query(platform_browser_1.By.css('tbody tr:first-child'));
                row.nativeElement.click();
                expect(api.comp.selected.length).toEqual(1);
                expect(api.comp.selected[0]).toEqual('0');
                row.nativeElement.click();
                expect(api.comp.selected.length).toEqual(0);
                api.fixture.destroy();
            });
        }));
        it('should check all row checkbox when a click is fired on master checkbox', testing_1.async(function () {
            setup().then(function (api) {
                var masterRow = api.debug.query(platform_browser_1.By.css('thead tr:first-child'));
                masterRow.nativeElement.click();
                expect(api.comp.selected.length).toEqual(2);
                expect(api.comp.selected[0]).toEqual('0');
                masterRow.nativeElement.click();
                expect(api.comp.selected.length).toEqual(0);
                api.fixture.destroy();
            });
        }));
        it('should uncheck master checkbox if a row checkbox is unchecked', testing_1.async(function () {
            setup().then(function (api) {
                var masterRow = api.debug.query(platform_browser_1.By.css('thead tr:first-child'));
                var row = api.debug.query(platform_browser_1.By.css('tbody tr:first-child')).nativeElement;
                masterRow.nativeElement.click();
                expect(masterRow.componentInstance.isActive).toBe(true);
                row.click();
                expect(api.comp.selected.length).toEqual(1);
                expect(api.comp.selected[0]).toEqual('1');
                expect(masterRow.componentInstance.isActive).toBe(false);
                api.fixture.destroy();
            });
        }));
        it('should fire a selectable_change event when a row checkbox change', testing_1.async(function () {
            setup().then(function (api) {
                var row = api.debug.query(platform_browser_1.By.css('tbody tr:first-child')).nativeElement;
                api.comp.onSelectableAll.subscribe(function (event) {
                    expect(event.name).toBe('selectable_change');
                });
                row.click();
                api.fixture.destroy();
            });
        }));
    });
    describe('_unsubscribeChildren', function () {
        it('should reset the selected values', testing_1.async(function () {
            setup().then(function (api) {
                api.comp.selected = ['1', '2'];
                api.comp._unsubscribeChildren();
                expect(api.comp.selected.length).toEqual(0);
            });
        }));
        it('should unsubscribe to listener', testing_1.async(function () {
            setup().then(function (api) {
                var emitter = new core_1.EventEmitter(false);
                var spy = jasmine.createSpy('spy');
                emitter.subscribe(spy);
                api.comp._listeners = [emitter];
                emitter.emit({ name: 'custom_event' });
                api.comp._unsubscribeChildren();
                expect(function () {
                    emitter.emit({ name: 'custom_event2' });
                }).toThrow();
                expect(spy.calls.count()).toEqual(1);
            });
        }));
    });
    describe('_updateChildrenListener', function () {
        it('should ask unsubscription', testing_1.async(function () {
            setup().then(function (api) {
                spyOn(api.comp, '_unsubscribeChildren');
                api.comp._updateChildrenListener(api.comp._rows);
                expect(api.comp._unsubscribeChildren).toHaveBeenCalled();
            });
        }));
    });
});
//# sourceMappingURL=data_table_spec.js.map