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
var ViewportHelper = (function () {
    function ViewportHelper() {
    }
    ViewportHelper = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ViewportHelper);
    return ViewportHelper;
}());
exports.ViewportHelper = ViewportHelper;
var BrowserViewportHelper = (function (_super) {
    __extends(BrowserViewportHelper, _super);
    function BrowserViewportHelper() {
        _super.apply(this, arguments);
    }
    BrowserViewportHelper.prototype.getDocumentNativeElement = function () {
        return window.document;
    };
    BrowserViewportHelper.prototype.requestFrame = function (fn) {
        return window.requestAnimationFrame(fn);
    };
    BrowserViewportHelper.prototype.matchMedia = function (query) {
        return window.matchMedia(query);
    };
    BrowserViewportHelper.prototype.scrollTop = function () {
        return window.pageYOffset || document.documentElement.scrollTop;
    };
    return BrowserViewportHelper;
}(ViewportHelper));
exports.BrowserViewportHelper = BrowserViewportHelper;
var NodeViewportMediaMatch = (function () {
    function NodeViewportMediaMatch(matches, media) {
        if (matches === void 0) { matches = false; }
        if (media === void 0) { media = ''; }
        this.matches = matches;
        this.media = media;
    }
    NodeViewportMediaMatch.prototype.addListener = function (listener) {
    };
    NodeViewportMediaMatch.prototype.removeListener = function (listener) {
    };
    return NodeViewportMediaMatch;
}());
exports.NodeViewportMediaMatch = NodeViewportMediaMatch;
var NodeViewportHelper = (function (_super) {
    __extends(NodeViewportHelper, _super);
    function NodeViewportHelper() {
        _super.apply(this, arguments);
    }
    NodeViewportHelper.prototype.getDocumentNativeElement = function () {
        return {};
    };
    NodeViewportHelper.prototype.requestFrame = function (fn) {
        return process.nextTick(fn);
    };
    NodeViewportHelper.prototype.matchMedia = function (query) {
        return new NodeViewportMediaMatch(false, query);
    };
    NodeViewportHelper.prototype.scrollTop = function () {
        return 0;
    };
    return NodeViewportHelper;
}(ViewportHelper));
exports.NodeViewportHelper = NodeViewportHelper;
//# sourceMappingURL=viewport.js.map