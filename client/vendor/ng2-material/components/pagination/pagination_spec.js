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
    var service;
    util_1.componentSanityCheck('MdPagination', 'md-pagination', "<md-pagination></md-pagination>");
    describe('MdPagination', function () {
        var TestComponent = (function () {
            function TestComponent() {
                this.defaultModel = {
                    currentPage: 1,
                    itemsPerPage: 5,
                    totalItems: 24
                };
                this.defaultItemsPerPageOptions = [10, 50, 100];
            }
            TestComponent = __decorate([
                core_1.Component({
                    selector: 'test-app',
                    template: "<md-pagination></md-pagination>"
                }), 
                __metadata('design:paramtypes', [])
            ], TestComponent);
            return TestComponent;
        }());
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    index_1.MdPagination,
                    index_1.MdPaginationControls,
                    index_1.MdPaginationItemsPerPage,
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
            return testing_1.TestBed.compileComponents()
                .then(function () {
                service = testing_1.TestBed.get(index_1.PaginationService);
                spyOn(service, 'change');
                var fixture = testing_1.TestBed.createComponent(TestComponent);
                var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination'));
                var comp = debug.componentInstance;
                fixture.detectChanges();
                return {
                    fixture: fixture,
                    comp: comp,
                    debug: debug
                };
            })
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
                return setup("<md-pagination [model]=\"defaultModel\"></md-pagination>").then(function (api) {
                    expect(api.comp.model.currentPage).toEqual(1);
                    expect(api.comp.model.itemsPerPage).toEqual(5);
                    expect(api.comp.model.totalItems).toEqual(24);
                });
            }));
            it('should have a default name', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.name).toEqual('default');
                });
            }));
            it('should accept a custom name', testing_1.async(function () {
                return setup("<md-pagination name=\"book\"></md-pagination>").then(function (api) {
                    expect(api.comp.name).toEqual('book');
                });
            }));
            it('should display range by default', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.range).toBeTruthy();
                });
            }));
            it('should accept a custom display for range', testing_1.async(function () {
                return setup("<md-pagination [range]=\"false\"></md-pagination>").then(function (api) {
                    expect(api.comp.range).toBeFalsy();
                });
            }));
            it('should not have a default rangeFormat', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.rangeFormat).toBeUndefined();
                });
            }));
            it('should accept a custom rangeFormat', testing_1.async(function () {
                return setup("<md-pagination range-format=\"{start}/{total}\"></md-pagination>").then(function (api) {
                    expect(api.comp.rangeFormat).toEqual('{start}/{total}');
                });
            }));
            it('should display controls by default', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.controls).toBeTruthy();
                });
            }));
            it('should accept a custom display for controls', testing_1.async(function () {
                return setup("<md-pagination [controls]=\"false\"></md-pagination>").then(function (api) {
                    expect(api.comp.controls).toBeFalsy();
                });
            }));
            it('should display items per page options by default', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.itemsPerPage).toBeTruthy();
                });
            }));
            it('should accept a custom display for items per page', testing_1.async(function () {
                return setup("<md-pagination [items-per-page]=\"false\"></md-pagination>").then(function (api) {
                    expect(api.comp.itemsPerPage).toBeFalsy();
                });
            }));
            it('should not have a default prepended string to items per page', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.itemsPerPageBefore).toBeUndefined();
                });
            }));
            it('should accept a custom prepended string to items per page', testing_1.async(function () {
                return setup("<md-pagination items-per-page-before=\"page:\"></md-pagination>").then(function (api) {
                    expect(api.comp.itemsPerPageBefore).toEqual('page:');
                });
            }));
            it('should not have a default appended string to items per page', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.itemsPerPageAfter).toBeUndefined();
                });
            }));
            it('should accept a custom appended string to items per page', testing_1.async(function () {
                return setup("<md-pagination items-per-page-after=\" - \"></md-pagination>").then(function (api) {
                    expect(api.comp.itemsPerPageAfter).toEqual(' - ');
                });
            }));
            it('should not have a default list of options for items per page', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.itemsPerPageOptions).toBeUndefined();
                });
            }));
            it('should accept a custom list of options for items per page', testing_1.async(function () {
                return setup("<md-pagination [items-per-page-options]=\"defaultItemsPerPageOptions\"></md-pagination>").then(function (api) {
                    expect(api.comp.itemsPerPageOptions).not.toContain(5);
                    expect(api.comp.itemsPerPageOptions).toContain(10);
                    expect(api.comp.itemsPerPageOptions).toContain(50);
                    expect(api.comp.itemsPerPageOptions).toContain(100);
                });
            }));
        });
        describe('construct', function () {
            var service;
            var updatedPagination = {
                currentPage: 2,
                itemsPerPage: 30,
                totalItems: 65
            };
            it('should listen PaginationService', testing_1.async(function () {
                return setup().then(function (api) {
                    api.comp.onPaginationChange.subscribe(function (event) {
                        expect(event.name).toEqual('pagination_changed');
                        expect(event.target).toEqual('default');
                        expect(event.pagination).toEqual(updatedPagination);
                    });
                    service = testing_1.TestBed.get(index_1.PaginationService);
                    service.change('default', updatedPagination);
                });
            }));
            it('should listen PaginationService only for his reference name', testing_1.async(function () {
                setup("<md-pagination name=\"book\"></md-pagination>").then(function (api) {
                    var spy = jasmine.createSpy('spy');
                    api.comp.onPaginationChange.subscribe(spy);
                    service = testing_1.TestBed.get(index_1.PaginationService);
                    service.onChange.subscribe(function () {
                        expect(spy).not.toHaveBeenCalled();
                    });
                    service.change('default', updatedPagination);
                });
            }));
        });
        describe('ngAfterContentInit', function () {
            it('should init default components', testing_1.async(function () {
                return setup().then(function (api) {
                    var element = api.debug.nativeElement;
                    api.fixture.detectChanges();
                    expect(element.children.length).toEqual(3);
                });
            }));
            it('should accept custom components as children', testing_1.async(function () {
                return setup("<md-pagination><button></button></md-pagination>").then(function (api) {
                    var element = api.debug.nativeElement;
                    api.fixture.detectChanges();
                    expect(element.children.length).toEqual(1);
                });
            }));
        });
        describe('ngAfterViewInit', function () {
            var defaultModel = {
                currentPage: 1,
                itemsPerPage: 30,
                totalItems: 65
            };
            it('should dispatch his model after init', testing_1.async(function () {
                return setup("<md-pagination name=\"book\" [model]=\"defaultModel\"></md-pagination>").then(function (api) {
                    expect(service.change).toHaveBeenCalled();
                });
            }));
        });
    });
});
//# sourceMappingURL=pagination_spec.js.map