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
    util_1.componentSanityCheck('MdPaginationItemsPerPage', 'md-pagination-items-per-page', "<md-pagination-items-per-page></md-pagination-items-per-page>");
    describe('MdPaginationItemsPerPage', function () {
        var TestComponent = (function () {
            function TestComponent() {
                this.page1 = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                this.page2 = {
                    currentPage: 2,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                this.defaultItemsPerPageOptions = [10, 50, 100];
            }
            TestComponent = __decorate([
                core_1.Component({
                    selector: 'test-app',
                    template: "<md-pagination-items-per-page></md-pagination-items-per-page>"
                }), 
                __metadata('design:paramtypes', [])
            ], TestComponent);
            return TestComponent;
        }());
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    index_1.MdPaginationItemsPerPage,
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
                var fixture = testing_1.TestBed.createComponent(TestComponent);
                var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination-items-per-page'));
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
                return setup("<md-pagination-items-per-page [model]=\"page2\"></md-pagination-items-per-page>").then(function (api) {
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
                return setup("<md-pagination-items-per-page name=\"book\"></md-pagination-items-per-page>").then(function (api) {
                    expect(api.comp.name).toEqual('book');
                });
            }));
            it('should have a default prepended string', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.itemsPerPageBefore).toEqual('Rows per page:');
                });
            }));
            it('should accept a custom prepended string', testing_1.async(function () {
                return setup("<md-pagination-items-per-page items-per-page-before=\"Items per page:\"></md-pagination-items-per-page>").then(function (api) {
                    expect(api.comp.itemsPerPageBefore).toEqual('Items per page:');
                });
            }));
            it('should not have a default appended string', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.itemsPerPageAfter).toBeUndefined();
                });
            }));
            it('should accept a custom appended string', testing_1.async(function () {
                return setup("<md-pagination-items-per-page items-per-page-after=\" - \"></md-pagination-items-per-page>").then(function (api) {
                    expect(api.comp.itemsPerPageAfter).toEqual(' - ');
                });
            }));
            it('should have a empty list of options for items per page', testing_1.async(function () {
                return setup().then(function (api) {
                    expect(api.comp.itemsPerPageOptions).toEqual([]);
                });
            }));
            it('should accept a custom list of options for items per page', testing_1.async(function () {
                return setup("<md-pagination-items-per-page [items-per-page-options]=\"defaultItemsPerPageOptions\"></md-pagination-items-per-page>").then(function (api) {
                    expect(api.comp.itemsPerPageOptions).not.toContain(5);
                    expect(api.comp.itemsPerPageOptions).toContain(10);
                    expect(api.comp.itemsPerPageOptions).toContain(50);
                    expect(api.comp.itemsPerPageOptions).toContain(100);
                });
            }));
        });
        describe('construct', function () {
            var updatedPagination = {
                currentPage: 1,
                itemsPerPage: 30,
                totalItems: 65
            };
            it('should listen PaginationService', testing_1.async(function () {
                return setup().then(function (api) {
                    var service = testing_1.TestBed.get(index_1.PaginationService);
                    service.onChange.subscribe(function (event) {
                        expect(api.comp.model).toEqual(updatedPagination);
                    });
                    service.change('default', updatedPagination);
                });
            }));
            it('should listen PaginationService only for his reference name', testing_1.async(function () {
                return setup("<md-pagination-items-per-page name=\"book\"></md-pagination-items-per-page>").then(function (api) {
                    var service = testing_1.TestBed.get(index_1.PaginationService);
                    service.onChange.subscribe(function () {
                        expect(api.comp.model.currentPage).toEqual(0);
                        expect(api.comp.model.itemsPerPage).toEqual(0);
                        expect(api.comp.model.totalItems).toEqual(0);
                    });
                    service.change('default', updatedPagination);
                });
            }));
        });
        describe('changePaginationLength', function () {
            it('should dispatch page change to the service and reset to first page', testing_1.async(function () {
                return setup("<md-pagination-items-per-page [model]=\"page2\"></md-pagination-items-per-page>").then(function (api) {
                    var service = testing_1.TestBed.get(index_1.PaginationService);
                    spyOn(service, 'change');
                    api.comp.changePaginationLength(50);
                    expect(service.change).toHaveBeenCalledWith('default', {
                        currentPage: 1,
                        itemsPerPage: 50,
                        totalItems: 65
                    });
                });
            }));
        });
    });
});
//# sourceMappingURL=pagination_items_per_page_spec.js.map