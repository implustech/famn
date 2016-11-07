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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
require('rxjs/add/operator/share');
require('rxjs/add/operator/map');
var data_table_1 = require('./data_table');
var AbstractMdDataTableSelectableRow = (function () {
    function AbstractMdDataTableSelectableRow(table, _element) {
        this.table = table;
        this._element = _element;
        this.onChange = new core_1.EventEmitter(false);
        this.isActive = false;
        this.onChange.share();
    }
    AbstractMdDataTableSelectableRow.prototype.change = function (event) {
        if (event.target.classList.contains('md-checkbox-inner-container')) {
            event.preventDefault();
        }
        this.isActive = !this.isActive;
        var changeEvent = {
            name: 'selectable_row_change',
            target: this,
            isActive: this.isActive,
            selectableValue: this.selectableValue
        };
        this.onChange.emit(changeEvent);
    };
    AbstractMdDataTableSelectableRow.prototype.ngAfterContentInit = function () { };
    __decorate([
        core_1.Input('selectable-value'), 
        __metadata('design:type', String)
    ], AbstractMdDataTableSelectableRow.prototype, "selectableValue", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AbstractMdDataTableSelectableRow.prototype, "onChange", void 0);
    AbstractMdDataTableSelectableRow = __decorate([
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return data_table_1.MdDataTable; }))), 
        __metadata('design:paramtypes', [data_table_1.MdDataTable, core_1.ElementRef])
    ], AbstractMdDataTableSelectableRow);
    return AbstractMdDataTableSelectableRow;
}());
exports.AbstractMdDataTableSelectableRow = AbstractMdDataTableSelectableRow;
var MdDataTableHeaderSelectableRow = (function (_super) {
    __extends(MdDataTableHeaderSelectableRow, _super);
    function MdDataTableHeaderSelectableRow(table, _element) {
        _super.call(this, table, _element);
        this.table = table;
        this._element = _element;
    }
    MdDataTableHeaderSelectableRow.prototype._bindListener = function () {
        var _this = this;
        this.table.onSelectableChange
            .map(function (event) { return event.allSelected; })
            .subscribe(function (newActiveStatus) { return _this.isActive = newActiveStatus; });
    };
    MdDataTableHeaderSelectableRow.prototype.ngAfterContentInit = function () {
        if (!!this.table) {
            this._bindListener();
        }
    };
    MdDataTableHeaderSelectableRow = __decorate([
        core_1.Component({
            selector: 'tr[md-data-table-header-selectable-row]',
            template: "\n        <th class=\"md-data-check-cell\">\n            <md-checkbox [checked]=\"isActive\"></md-checkbox>\n        </th>\n        <ng-content></ng-content>\n    ",
            host: {
                '[class.active]': 'isActive',
                '(click)': 'change($event)'
            }
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return data_table_1.MdDataTable; }))), 
        __metadata('design:paramtypes', [data_table_1.MdDataTable, core_1.ElementRef])
    ], MdDataTableHeaderSelectableRow);
    return MdDataTableHeaderSelectableRow;
}(AbstractMdDataTableSelectableRow));
exports.MdDataTableHeaderSelectableRow = MdDataTableHeaderSelectableRow;
var MdDataTableSelectableRow = (function (_super) {
    __extends(MdDataTableSelectableRow, _super);
    function MdDataTableSelectableRow(table, _element) {
        _super.call(this, table, _element);
        this.table = table;
        this._element = _element;
    }
    MdDataTableSelectableRow.prototype._getIndex = function (element) {
        return Array.prototype.indexOf.call(element.parentNode.children, element).toString();
    };
    MdDataTableSelectableRow.prototype._bindListener = function () {
        var _this = this;
        this.table.onSelectableChange
            .map(function (event) {
            return event.values !== undefined &&
                event.values.length &&
                (event.values.findIndex(function (value) { return value === _this.selectableValue; })) !== -1;
        })
            .subscribe(function (newActiveStatus) { return _this.isActive = newActiveStatus; });
    };
    MdDataTableSelectableRow.prototype.ngAfterContentInit = function () {
        var element = this._element.nativeElement;
        if (this.selectableValue === undefined) {
            this.selectableValue = this._getIndex(element);
        }
        if (!!this.table) {
            this._bindListener();
        }
    };
    MdDataTableSelectableRow = __decorate([
        core_1.Component({
            selector: 'tr[md-data-table-selectable-row]',
            template: "\n        <td class=\"md-data-check-cell\">\n          <md-checkbox [checked]=\"isActive\"></md-checkbox>\n        </td>\n        <ng-content></ng-content>\n    ",
            host: {
                '[class.active]': 'isActive',
                '(click)': 'change($event)'
            }
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return data_table_1.MdDataTable; }))), 
        __metadata('design:paramtypes', [data_table_1.MdDataTable, core_1.ElementRef])
    ], MdDataTableSelectableRow);
    return MdDataTableSelectableRow;
}(AbstractMdDataTableSelectableRow));
exports.MdDataTableSelectableRow = MdDataTableSelectableRow;
//# sourceMappingURL=data_table_selectable_tr.js.map