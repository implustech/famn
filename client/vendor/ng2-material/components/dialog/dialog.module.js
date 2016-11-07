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
var dialog_1 = require('./dialog');
var dialog_portal_1 = require('./dialog-portal');
var dialog_actions_1 = require('./dialog-actions');
var dialog_title_1 = require('./dialog-title');
var material_1 = require('@angular/material');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var DIALOG_DIRECTIVES = [
    dialog_1.MdDialog, dialog_title_1.MdDialogTitle, dialog_actions_1.MdDialogActions, dialog_portal_1.MdDialogPortal
];
var MdDialogModule = (function () {
    function MdDialogModule() {
    }
    MdDialogModule = __decorate([
        core_1.NgModule({
            declarations: DIALOG_DIRECTIVES,
            exports: DIALOG_DIRECTIVES,
            imports: [
                common_1.CommonModule,
                material_1.MdCoreModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MdDialogModule);
    return MdDialogModule;
}());
exports.MdDialogModule = MdDialogModule;
//# sourceMappingURL=dialog.module.js.map