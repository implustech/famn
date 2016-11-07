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
var media_1 = require('../../core/util/media');
var viewport_1 = require('../../core/util/viewport');
var MdPeekaboo = (function () {
    function MdPeekaboo(media, element, viewport, zone) {
        var _this = this;
        this.media = media;
        this.element = element;
        this.viewport = viewport;
        this.zone = zone;
        this.break = 100;
        this._active = false;
        this._breakXs = -1;
        this._breakSm = -1;
        this._breakMd = -1;
        this._breakLg = -1;
        this._breakXl = -1;
        this._breakpoint = null;
        this._scroller = null;
        this._mediaListeners = [];
        this._windowScroll = this.evaluate.bind(this);
        MdPeekaboo.SIZES.forEach(function (size) {
            _this._watchMediaQuery(size);
            if (_this.media.hasMedia(size)) {
                _this._breakpoint = size;
            }
        });
        this.evaluate();
    }
    MdPeekaboo.MakeNumber = function (value) {
        return typeof value === 'string' ? parseInt(value, 10) : value;
    };
    Object.defineProperty(MdPeekaboo.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdPeekaboo.prototype, "breakXs", {
        get: function () {
            return this._breakXs;
        },
        set: function (value) {
            this._breakXs = MdPeekaboo.MakeNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdPeekaboo.prototype, "breakSm", {
        get: function () {
            return this._breakSm;
        },
        set: function (value) {
            this._breakSm = MdPeekaboo.MakeNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdPeekaboo.prototype, "breakMd", {
        get: function () {
            return this._breakMd;
        },
        set: function (value) {
            this._breakMd = MdPeekaboo.MakeNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdPeekaboo.prototype, "breakLg", {
        get: function () {
            return this._breakLg;
        },
        set: function (value) {
            this._breakLg = MdPeekaboo.MakeNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdPeekaboo.prototype, "breakXl", {
        get: function () {
            return this._breakXl;
        },
        set: function (value) {
            this._breakXl = MdPeekaboo.MakeNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdPeekaboo.prototype, "breakpoint", {
        get: function () {
            return this._breakpoint;
        },
        set: function (size) {
            this._breakpoint = size;
            this.evaluate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdPeekaboo.prototype, "scroller", {
        get: function () {
            return this._scroller;
        },
        set: function (scroll) {
            if (this._scroller) {
                this._scroller.removeEventListener('scroll', this._windowScroll);
            }
            this._scroller = scroll;
            if (this._scroller) {
                this._scroller.addEventListener('scroll', this._windowScroll, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdPeekaboo.prototype, "top", {
        get: function () {
            return this._scroller ? this._scroller.scrollTop : this.viewport.scrollTop();
        },
        enumerable: true,
        configurable: true
    });
    MdPeekaboo.prototype.ngOnDestroy = function () {
        this._mediaListeners.forEach(function (l) {
            l.destroy();
        });
        this._mediaListeners = [];
    };
    MdPeekaboo.prototype._watchMediaQuery = function (size) {
        var _this = this;
        var l = this.media.listen(media_1.Media.getQuery(size));
        l.onMatched.subscribe(function (mql) {
            _this.breakpoint = size;
        });
        this._mediaListeners.push(l);
    };
    MdPeekaboo.prototype.evaluate = function () {
        var _this = this;
        var top = this.top;
        var bp = this.break;
        switch (this._breakpoint) {
            case 'xl':
                if (this._breakXl !== -1) {
                    bp = this._breakXl;
                    break;
                }
            case 'lg':
                if (this._breakLg !== -1) {
                    bp = this._breakLg;
                    break;
                }
            case 'md':
                if (this._breakMd !== -1) {
                    bp = this._breakMd;
                    break;
                }
            case 'sm':
                if (this._breakSm !== -1) {
                    bp = this._breakSm;
                    break;
                }
            case 'xs':
                if (this._breakXs !== -1) {
                    bp = this._breakXs;
                    break;
                }
        }
        if (top >= bp && !this._active) {
            this.zone.run(function () {
                _this._active = true;
            });
        }
        else if (top < bp && this._active) {
            this.zone.run(function () {
                _this._active = false;
            });
        }
        return bp;
    };
    MdPeekaboo.SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MdPeekaboo.prototype, "break", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdPeekaboo.prototype, "breakAction", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdPeekaboo.prototype, "breakXs", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdPeekaboo.prototype, "breakSm", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdPeekaboo.prototype, "breakMd", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdPeekaboo.prototype, "breakLg", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdPeekaboo.prototype, "breakXl", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], MdPeekaboo.prototype, "scroller", null);
    MdPeekaboo = __decorate([
        core_1.Directive({
            selector: '[md-peekaboo]',
            exportAs: 'mdPeekaboo',
            host: {
                '[class.md-peekaboo-active]': 'active',
                '[attr.breakAction]': 'breakAction',
                '(window:scroll)': '_windowScroll($event)'
            }
        }), 
        __metadata('design:paramtypes', [media_1.Media, core_1.ElementRef, viewport_1.ViewportHelper, core_1.NgZone])
    ], MdPeekaboo);
    return MdPeekaboo;
}());
exports.MdPeekaboo = MdPeekaboo;
var MdPeekabooModule = (function () {
    function MdPeekabooModule() {
    }
    MdPeekabooModule = __decorate([
        core_1.NgModule({
            declarations: [MdPeekaboo],
            exports: [MdPeekaboo]
        }), 
        __metadata('design:paramtypes', [])
    ], MdPeekabooModule);
    return MdPeekabooModule;
}());
exports.MdPeekabooModule = MdPeekabooModule;
//# sourceMappingURL=peekaboo.js.map