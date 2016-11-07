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
var forms_1 = require('@angular/forms');
var util_module_1 = require('../../core/util/util.module');
describe('Pagination', function () {
    util_1.componentSanityCheck('MdPaginationRange', 'md-pagination-range', "<md-pagination-range></md-pagination-range>");
    describe('MdPaginationRange', function () {
        var service;
        var TestComponent = (function () {
            function TestComponent() {
                this.page2 = {
                    currentPage: 2,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                this.page3 = {
                    currentPage: 3,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                this.defaultRangeFormat = '{start}-{end} / {total}';
            }
            TestComponent = __decorate([
                core_1.Component({
                    selector: 'test-app',
                    template: "<md-pagination-range></md-pagination-range>"
                }), 
                __metadata('design:paramtypes', [])
            ], TestComponent);
            return TestComponent;
        }());
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    index_1.MdPaginationRange,
                    TestComponent
                ],
                imports: [common_1.CommonModule, forms_1.FormsModule, util_module_1.MdServicesModule],
                providers: [index_1.PaginationService]
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
            var result = null;
            return testing_1.TestBed.compileComponents()
                .then(testing_1.inject([index_1.PaginationService], function (serv) {
                service = serv;
            }))
                .then(function () {
                var fixture = testing_1.TestBed.createComponent(TestComponent);
                var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination-range'));
                var comp = debug.componentInstance;
                fixture.detectChanges();
                result = {
                    fixture: fixture,
                    comp: comp,
                    debug: debug
                };
                return fixture.whenStable();
            })
                .then(function () { return result; })
                .catch(function (error) { return console.error.bind(console); });
        }
        describe('default values', function () {
            it('should have a default model', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.model.currentPage).toEqual(0);
                    expect(api.comp.model.itemsPerPage).toEqual(0);
                    expect(api.comp.model.totalItems).toEqual(0);
                });
            }));
            it('should accept custom model', testing_1.async(function () {
                return setup("<md-pagination-range [model]=\"page2\"></md-pagination-range>").then(function (api) {
                    expect(api.comp.model.currentPage).toEqual(2);
                    expect(api.comp.model.itemsPerPage).toEqual(30);
                    expect(api.comp.model.totalItems).toEqual(65);
                });
            }));
            it('should have a default name', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.name).toEqual('default');
                });
            }));
            it('should accept a custom name', testing_1.async(function () {
                return setup("<md-pagination-range name=\"book\"></md-pagination-range>").then(function (api) {
                    expect(api.comp.name).toEqual('book');
                });
            }));
            it('should have a default range format', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.computedRangeFormat).toEqual('{start}-{end} of {total}');
                });
            }));
            it('should accept a custom range format', testing_1.async(function () {
                return setup("<md-pagination-range [range-format]=\"defaultRangeFormat\"></md-pagination-range>").then(function (api) {
                    expect(api.comp.rangeFormat).toEqual('{start}-{end} / {total}');
                });
            }));
        });
        describe('construct', function () {
            var service, updatedPagination = {
                currentPage: 1,
                itemsPerPage: 30,
                totalItems: 65
            };
            it('should listen PaginationService', testing_1.async(function () {
                return setup().then(function (api) {
                    service = testing_1.TestBed.get(index_1.PaginationService);
                    service.onChange.subscribe(function (event) {
                        expect(api.comp.model).toEqual(updatedPagination);
                    });
                    service.change('default', updatedPagination);
                });
            }));
            it('should listen PaginationService only for his reference name', testing_1.async(function () {
                return setup("<md-pagination-range name=\"book\"></md-pagination-range>").then(function (api) {
                    service = testing_1.TestBed.get(index_1.PaginationService);
                    service.onChange.subscribe(function () {
                        expect(api.comp.model).toEqual({
                            currentPage: 0,
                            itemsPerPage: 0,
                            totalItems: 0
                        });
                    });
                    service.change('default', updatedPagination);
                });
            }));
        });
        describe('getFormattedValue', function () {
            it('should replace pattern in the range format', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.getFormattedValue(1, 5, 30)).toEqual('1-5 of 30');
                });
            }));
        });
        describe('getRange', function () {
            it('should calculate range at the middle', testing_1.async(function () {
                return setup("<md-pagination-range [model]=\"page2\"></md-pagination-range>").then(function (api) {
                    spyOn(api.comp, 'getFormattedValue').and.callThrough();
                    var result = api.comp.getRange();
                    expect(result['changingThisBreaksApplicationSecurity']).toEqual('31-60 of 65');
                    expect(api.comp.getFormattedValue).toHaveBeenCalledWith(31, 60, 65);
                });
            }));
            it('should calculate range at the end', testing_1.async(function () {
                return setup("<md-pagination-range [model]=\"page3\"></md-pagination-range>").then(function (api) {
                    spyOn(api.comp, 'getFormattedValue').and.callThrough();
                    var result = api.comp.getRange();
                    expect(result['changingThisBreaksApplicationSecurity']).toEqual('61-65 of 65');
                    expect(api.comp.getFormattedValue).toHaveBeenCalledWith(61, 65, 65);
                });
            }));
        });
    });
});
//# sourceMappingURL=pagination_range_spec.js.map