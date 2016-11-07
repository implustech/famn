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
var dialog_1 = require('./dialog');
var MdDialogActions = (function () {
    function MdDialogActions() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdDialogActions.prototype, "cancel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdDialogActions.prototype, "ok", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', dialog_1.MdDialog)
    ], MdDialogActions.prototype, "dialog", void 0);
    MdDialogActions = __decorate([
        core_1.Component({
            selector: 'md-dialog-actions',
            template: "\n  <button *ngIf=\"cancel\" md-button type=\"button\" (click)=\"dialog.close(false)\">\n    <span>{{ cancel }}</span>\n  </button>\n  <button *ngIf=\"ok\" md-button class=\"md-primary\" type=\"button\" (click)=\"dialog.close(true)\">\n    <span>{{ ok }}</span>\n  </button> \n  <ng-content></ng-content>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], MdDialogActions);
    return MdDialogActions;
}());
exports.MdDialogActions = MdDialogActions;
//# sourceMappingURL=dialog-actions.js.map