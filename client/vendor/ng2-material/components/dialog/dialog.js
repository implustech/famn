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
var material_1 = require('@angular/material');
var animate_1 = require('../../core/util/animate');
var dialog_portal_1 = require('./dialog-portal');
var dialog_actions_1 = require('./dialog-actions');
var key_codes_1 = require('../../core/key_codes');
var MdDialog = (function () {
    function MdDialog(overlay) {
        this.overlay = overlay;
        this.onShow = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.active = false;
        this.config = new material_1.OverlayState();
        this.overlayRef = null;
        this.config.positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
    }
    MdDialog.prototype.ngAfterContentInit = function () {
        if (this.actions) {
            this.actions.dialog = this;
        }
    };
    MdDialog.prototype.ngOnDestroy = function () {
        return this.close();
    };
    MdDialog.prototype.show = function () {
        var _this = this;
        return this.close()
            .then(function () { return _this.overlay.create(_this.config); })
            .then(function (ref) {
            _this.overlayRef = ref;
            return ref.attach(_this.portal);
        })
            .then(function () { return animate_1.Animate.wait(); })
            .then(function () {
            _this.active = true;
            _this.onShow.emit(_this);
            return _this;
        });
    };
    MdDialog.prototype.close = function (result, cancel) {
        var _this = this;
        if (result === void 0) { result = true; }
        if (cancel === void 0) { cancel = false; }
        if (!this.overlayRef) {
            return Promise.resolve(this);
        }
        this.active = false;
        return animate_1.Animate.wait(100)
            .then(function () { return _this.overlayRef.detach(); })
            .then(function () {
            _this.overlayRef.dispose();
            _this.overlayRef = null;
            if (cancel) {
                _this.onCancel.emit(result);
            }
            else {
                _this.onClose.emit(result);
            }
            return _this;
        });
    };
    MdDialog.prototype.onDocumentKeypress = function (event) {
        if (event.keyCode == key_codes_1.KeyCodes.ESCAPE) {
            this.close();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdDialog.prototype, "onShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdDialog.prototype, "onClose", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdDialog.prototype, "onCancel", void 0);
    __decorate([
        core_1.ViewChild(dialog_portal_1.MdDialogPortal), 
        __metadata('design:type', dialog_portal_1.MdDialogPortal)
    ], MdDialog.prototype, "portal", void 0);
    __decorate([
        core_1.ContentChild(dialog_actions_1.MdDialogActions), 
        __metadata('design:type', dialog_actions_1.MdDialogActions)
    ], MdDialog.prototype, "actions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MdDialog.prototype, "config", void 0);
    MdDialog = __decorate([
        core_1.Component({
            selector: 'md-dialog',
            providers: [material_1.Overlay, material_1.OVERLAY_PROVIDERS],
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n<template mdDialogPortal>\n  <div class=\"md-dialog\" [class.md-active]=\"active\">\n    <ng-content select=\"md-dialog-title\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"md-dialog-actions\"></ng-content>\n  </div>\n</template>\n",
            host: {
                'tabindex': '0',
                '(body:keydown)': 'onDocumentKeypress($event)'
            }
        }), 
        __metadata('design:paramtypes', [material_1.Overlay])
    ], MdDialog);
    return MdDialog;
}());
exports.MdDialog = MdDialog;
//# sourceMappingURL=dialog.js.map