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
var viewport_1 = require('./viewport');
var core_1 = require('@angular/core');
var media_1 = require('./media');
var animate_1 = require('./animate');
var MdServicesModule = (function () {
    function MdServicesModule() {
    }
    MdServicesModule = __decorate([
        core_1.NgModule({
            providers: [
                { provide: viewport_1.ViewportHelper, useClass: viewport_1.BrowserViewportHelper },
                media_1.Media,
                animate_1.Animate
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MdServicesModule);
    return MdServicesModule;
}());
exports.MdServicesModule = MdServicesModule;
//# sourceMappingURL=util.module.js.map