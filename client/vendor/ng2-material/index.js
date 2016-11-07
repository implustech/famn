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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var content_1 = require('./components/content/content');
var index_1 = require('./components/data-table/index');
var divider_1 = require('./components/divider/divider');
var index_2 = require('./components/pagination/index');
var peekaboo_1 = require('./components/peekaboo/peekaboo');
var subheader_1 = require('./components/subheader/subheader');
var media_1 = require('./core/util/media');
var viewport_1 = require('./core/util/viewport');
var dialog_module_1 = require('./components/dialog/dialog.module');
var backdrop_1 = require('./components/backdrop/backdrop');
var util_module_1 = require('./core/util/util.module');
__export(require('./components/backdrop/backdrop'));
__export(require('./components/content/content'));
__export(require('./components/data-table/index'));
__export(require('./components/dialog/index'));
__export(require('./components/divider/divider'));
__export(require('./components/pagination/index'));
__export(require('./components/peekaboo/peekaboo'));
__export(require('./components/subheader/subheader'));
__export(require('./core/util/media'));
__export(require('./core/util/viewport'));
__export(require('./core/util/animate'));
exports.MATERIAL_NODE_PROVIDERS = [
    { provide: viewport_1.ViewportHelper, useClass: viewport_1.NodeViewportHelper },
    media_1.Media
];
exports.MATERIAL_BROWSER_PROVIDERS = exports.MATERIAL_NODE_PROVIDERS.concat([
    { provide: viewport_1.ViewportHelper, useClass: viewport_1.BrowserViewportHelper },
]);
var MATERIAL_MODULES = [
    backdrop_1.MdBackdropModule,
    content_1.MdContentModule,
    index_1.MdDataTableModule,
    dialog_module_1.MdDialogModule,
    divider_1.MdDividerModule,
    index_2.MdPaginationModule,
    peekaboo_1.MdPeekabooModule,
    subheader_1.MdSubheaderModule,
    util_module_1.MdServicesModule
];
var Ng2MaterialNodeModule = (function () {
    function Ng2MaterialNodeModule() {
    }
    Ng2MaterialNodeModule.forRoot = function () {
        return {
            ngModule: Ng2MaterialNodeModule,
            providers: exports.MATERIAL_NODE_PROVIDERS
        };
    };
    Ng2MaterialNodeModule = __decorate([
        core_1.NgModule({
            exports: MATERIAL_MODULES,
            imports: MATERIAL_MODULES
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2MaterialNodeModule);
    return Ng2MaterialNodeModule;
}());
exports.Ng2MaterialNodeModule = Ng2MaterialNodeModule;
var Ng2MaterialModule = (function () {
    function Ng2MaterialModule() {
    }
    Ng2MaterialModule.forRoot = function () {
        return {
            ngModule: Ng2MaterialModule,
            providers: exports.MATERIAL_BROWSER_PROVIDERS
        };
    };
    Ng2MaterialModule = __decorate([
        core_1.NgModule({
            exports: MATERIAL_MODULES,
            imports: MATERIAL_MODULES
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2MaterialModule);
    return Ng2MaterialModule;
}());
exports.Ng2MaterialModule = Ng2MaterialModule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ng2MaterialModule;
//# sourceMappingURL=index.js.map