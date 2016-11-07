"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
require('rxjs/add/operator/filter');
var pagination_service_1 = require('./pagination_service');
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
var AbstractPaginationSubComponent = (function () {
    function AbstractPaginationSubComponent(service) {
        this.service = service;
        this.name = 'default';
        this.model = {
            currentPage: 0,
            itemsPerPage: 0,
            totalItems: 0
        };
    }
    AbstractPaginationSubComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.name) {
            this.name = 'default';
        }
        this.service.onChange
            .filter(function (event) { return isPresent(event) && isPresent(event.name); })
            .filter(function (event) { return event.target === _this.name; })
            .subscribe(function (event) {
            _this.model = event.pagination;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AbstractPaginationSubComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AbstractPaginationSubComponent.prototype, "model", void 0);
    return AbstractPaginationSubComponent;
}());
exports.AbstractPaginationSubComponent = AbstractPaginationSubComponent;
var MdPaginationRange = (function (_super) {
    __extends(MdPaginationRange, _super);
    function MdPaginationRange(service, sanitizationService) {
        _super.call(this, service);
        this.service = service;
        this.sanitizationService = sanitizationService;
        this.mdPaginationRange = true;
        this.name = 'default';
        this.model = {
            currentPage: 0,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.value = '';
    }
    Object.defineProperty(MdPaginationRange.prototype, "html", {
        get: function () {
            return this.getRange();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdPaginationRange.prototype, "computedRangeFormat", {
        get: function () {
            if (this.rangeFormat)
                return this.rangeFormat;
            return '{start}-{end} of {total}';
        },
        enumerable: true,
        configurable: true
    });
    MdPaginationRange.prototype.getFormattedValue = function (rangeStart, rangeStop, totalItems) {
        var result = this.computedRangeFormat;
        result = result.replace(/\{start\}/gi, rangeStart.toString());
        result = result.replace(/\{end\}/gi, rangeStop.toString());
        result = result.replace(/\{total\}/gi, totalItems.toString());
        return result;
    };
    MdPaginationRange.prototype.getRange = function () {
        if (isPresent(this.model)) {
            var rangeStart = (this.model.currentPage - 1) * this.model.itemsPerPage + 1;
            var rest = this.model.totalItems - rangeStart, rangeStop = rest < this.model.itemsPerPage ? this.model.totalItems : rangeStart + this.model.itemsPerPage - 1;
            return this.sanitizationService.bypassSecurityTrustHtml(this.getFormattedValue(rangeStart, rangeStop, this.model.totalItems));
        }
        return;
    };
    __decorate([
        core_1.HostBinding('class.md-pagination-range'), 
        __metadata('design:type', Boolean)
    ], MdPaginationRange.prototype, "mdPaginationRange", void 0);
    __decorate([
        core_1.HostBinding('innerHTML'), 
        __metadata('design:type', Object)
    ], MdPaginationRange.prototype, "html", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdPaginationRange.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdPaginationRange.prototype, "model", void 0);
    __decorate([
        core_1.Input('range-format'), 
        __metadata('design:type', String)
    ], MdPaginationRange.prototype, "rangeFormat", void 0);
    MdPaginationRange = __decorate([
        core_1.Component({
            selector: 'md-pagination-range',
            template: '',
        }), 
        __metadata('design:paramtypes', [pagination_service_1.PaginationService, platform_browser_1.DomSanitizer])
    ], MdPaginationRange);
    return MdPaginationRange;
}(AbstractPaginationSubComponent));
exports.MdPaginationRange = MdPaginationRange;
var MdPaginationControls = (function (_super) {
    __extends(MdPaginationControls, _super);
    function MdPaginationControls(service) {
        _super.call(this, service);
        this.service = service;
        this.mdPaginationControls = true;
        this.name = 'default';
        this.model = {
            currentPage: 0,
            itemsPerPage: 0,
            totalItems: 0
        };
    }
    MdPaginationControls.prototype.isFirstPage = function () {
        return isPresent(this.model) && this.model.currentPage == 1;
    };
    MdPaginationControls.prototype.isLastPage = function () {
        return isPresent(this.model) && this.model.totalItems <= this.model.currentPage * this.model.itemsPerPage;
    };
    MdPaginationControls.prototype.previousPage = function () {
        if (isPresent(this.model)) {
            this.changePage(this.model.currentPage - 1);
        }
    };
    MdPaginationControls.prototype.nextPage = function () {
        if (isPresent(this.model)) {
            this.changePage(this.model.currentPage + 1);
        }
    };
    MdPaginationControls.prototype.changePage = function (newPage) {
        var model = JSON.parse(JSON.stringify(this.model));
        model.currentPage = newPage;
        this.service.change(this.name, model);
    };
    __decorate([
        core_1.HostBinding('class.md-pagination-controls'), 
        __metadata('design:type', Boolean)
    ], MdPaginationControls.prototype, "mdPaginationControls", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdPaginationControls.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdPaginationControls.prototype, "model", void 0);
    MdPaginationControls = __decorate([
        core_1.Component({
            selector: 'md-pagination-controls',
            template: "\n      <span [class.md-pagination-control-active]=\"!isFirstPage()\" class=\"md-pagination-control md-pagination-control-previous\">\n        <button (click)=\"previousPage()\" class=\"material-icons\">keyboard_arrow_left</button>\n      </span>\n      <span [class.md-pagination-control-active]=\"!isLastPage()\" class=\"md-pagination-control md-pagination-control-next\">\n        <button (click)=\"nextPage()\" class=\"material-icons\">keyboard_arrow_right</button>\n      </span>\n    "
        }), 
        __metadata('design:paramtypes', [pagination_service_1.PaginationService])
    ], MdPaginationControls);
    return MdPaginationControls;
}(AbstractPaginationSubComponent));
exports.MdPaginationControls = MdPaginationControls;
var MdPaginationItemsPerPage = (function (_super) {
    __extends(MdPaginationItemsPerPage, _super);
    function MdPaginationItemsPerPage(service) {
        _super.call(this, service);
        this.service = service;
        this.mdPaginationItemsPerPage = true;
        this.name = 'default';
        this.model = {
            currentPage: 0,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.itemsPerPageBefore = 'Rows per page:';
        this.itemsPerPageOptions = [];
    }
    Object.defineProperty(MdPaginationItemsPerPage.prototype, "hidden", {
        get: function () {
            return !this.itemsPerPageOptions || !this.itemsPerPageOptions.length;
        },
        enumerable: true,
        configurable: true
    });
    ;
    MdPaginationItemsPerPage.prototype.changePaginationLength = function (value) {
        var model = JSON.parse(JSON.stringify(this.model));
        model.currentPage = 1;
        model.itemsPerPage = parseInt(value);
        this.service.change(this.name, model);
    };
    __decorate([
        core_1.HostBinding('class.md-pagination-items-per-page'), 
        __metadata('design:type', Boolean)
    ], MdPaginationItemsPerPage.prototype, "mdPaginationItemsPerPage", void 0);
    __decorate([
        core_1.HostBinding(), 
        __metadata('design:type', Object)
    ], MdPaginationItemsPerPage.prototype, "hidden", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdPaginationItemsPerPage.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdPaginationItemsPerPage.prototype, "model", void 0);
    __decorate([
        core_1.Input('items-per-page-before'), 
        __metadata('design:type', String)
    ], MdPaginationItemsPerPage.prototype, "itemsPerPageBefore", void 0);
    __decorate([
        core_1.Input('items-per-page-after'), 
        __metadata('design:type', String)
    ], MdPaginationItemsPerPage.prototype, "itemsPerPageAfter", void 0);
    __decorate([
        core_1.Input('items-per-page-options'), 
        __metadata('design:type', Array)
    ], MdPaginationItemsPerPage.prototype, "itemsPerPageOptions", void 0);
    MdPaginationItemsPerPage = __decorate([
        core_1.Component({
            selector: 'md-pagination-items-per-page',
            template: "\n   <span *ngIf=\"itemsPerPageBefore\" class=\"md-pagination-items-per-page-label md-pagination-items-per-page-before\">{{itemsPerPageBefore}}</span>\n   <select [(ngModel)]=\"model.itemsPerPage\" (ngModelChange)=\"changePaginationLength($event)\" class=\"md-pagination-length-select\">\n      <option *ngFor=\"let length of itemsPerPageOptions\" [value]=\"length\">\n        {{length}}\n      </option>\n    </select>\n    <span *ngIf=\"itemsPerPageAfter\" class=\"md-pagination-items-per-page-label md-pagination-items-per-page-after\">{{itemsPerPageAfter}}</span>\n  "
        }), 
        __metadata('design:paramtypes', [pagination_service_1.PaginationService])
    ], MdPaginationItemsPerPage);
    return MdPaginationItemsPerPage;
}(AbstractPaginationSubComponent));
exports.MdPaginationItemsPerPage = MdPaginationItemsPerPage;
var MdPagination = (function () {
    function MdPagination(service, element) {
        var _this = this;
        this.service = service;
        this.element = element;
        this.mdPagination = true;
        this.name = 'default';
        this.model = {
            currentPage: 0,
            itemsPerPage: 0,
            totalItems: 0
        };
        this.range = true;
        this.controls = true;
        this.itemsPerPage = true;
        this.onPaginationChange = new core_1.EventEmitter(false);
        this.defaultDisplay = true;
        this.service.onChange
            .filter(function (event) { return isPresent(event) && isPresent(event.name); })
            .filter(function (event) {
            return event.target === _this.name;
        })
            .subscribe(function (event) { return _this.onPaginationChange.emit(event); });
    }
    MdPagination.prototype.ngAfterContentInit = function () {
        this.defaultDisplay = this.element.nativeElement.childElementCount === 0;
    };
    MdPagination.prototype.ngAfterViewInit = function () {
        this.service.change(this.name, this.model);
    };
    __decorate([
        core_1.HostBinding('class.md-pagination'), 
        __metadata('design:type', Boolean)
    ], MdPagination.prototype, "mdPagination", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdPagination.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdPagination.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MdPagination.prototype, "range", void 0);
    __decorate([
        core_1.Input('range-format'), 
        __metadata('design:type', String)
    ], MdPagination.prototype, "rangeFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MdPagination.prototype, "controls", void 0);
    __decorate([
        core_1.Input('items-per-page'), 
        __metadata('design:type', Boolean)
    ], MdPagination.prototype, "itemsPerPage", void 0);
    __decorate([
        core_1.Input('items-per-page-before'), 
        __metadata('design:type', String)
    ], MdPagination.prototype, "itemsPerPageBefore", void 0);
    __decorate([
        core_1.Input('items-per-page-after'), 
        __metadata('design:type', String)
    ], MdPagination.prototype, "itemsPerPageAfter", void 0);
    __decorate([
        core_1.Input('items-per-page-options'), 
        __metadata('design:type', Array)
    ], MdPagination.prototype, "itemsPerPageOptions", void 0);
    __decorate([
        core_1.Output('on-pagination-change'), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdPagination.prototype, "onPaginationChange", void 0);
    MdPagination = __decorate([
        core_1.Component({
            selector: 'md-pagination',
            template: "\n    <ng-content></ng-content>\n    <md-pagination-items-per-page\n      *ngIf=\"defaultDisplay && itemsPerPage\"\n      [name]=\"name\"\n      [model]=\"model\"\n      [items-per-page-before]=\"itemsPerPageBefore\"\n      [items-per-page-after]=\"itemsPerPageAfter\"\n      [items-per-page-options]=\"itemsPerPageOptions\"></md-pagination-items-per-page>\n    <md-pagination-range\n      *ngIf=\"defaultDisplay && range\"\n      [name]=\"name\"\n      [model]=\"model\"\n      [range-format]=\"rangeFormat\"></md-pagination-range>\n    <md-pagination-controls\n      *ngIf=\"defaultDisplay && controls\"\n      [name]=\"name\"\n      [model]=\"model\"></md-pagination-controls>\n  "
        }), 
        __metadata('design:paramtypes', [pagination_service_1.PaginationService, core_1.ElementRef])
    ], MdPagination);
    return MdPagination;
}());
exports.MdPagination = MdPagination;
var PAGINATION_DIRECTIVES = [
    MdPagination,
    MdPaginationControls,
    MdPaginationItemsPerPage,
    MdPaginationRange
];
var MdPaginationModule = (function () {
    function MdPaginationModule() {
    }
    MdPaginationModule = __decorate([
        core_1.NgModule({
            declarations: PAGINATION_DIRECTIVES,
            exports: PAGINATION_DIRECTIVES,
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            providers: [pagination_service_1.PaginationService]
        }), 
        __metadata('design:paramtypes', [])
    ], MdPaginationModule);
    return MdPaginationModule;
}());
exports.MdPaginationModule = MdPaginationModule;
//# sourceMappingURL=pagination.js.map