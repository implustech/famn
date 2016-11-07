"use strict";
var testing_1 = require('@angular/core/testing');
var util_1 = require('../../platform/testing/util');
var backdrop_1 = require('./backdrop');
var util_module_1 = require('../../core/util/util.module');
describe('Backdrop', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [backdrop_1.MdBackdrop],
            imports: [util_module_1.MdServicesModule],
            providers: []
        });
    });
    function setup(show, transitionAddClass) {
        if (show === void 0) { show = false; }
        if (transitionAddClass === void 0) { transitionAddClass = true; }
        var result = null;
        return testing_1.TestBed.compileComponents()
            .then(function () {
            var fixture = testing_1.TestBed.createComponent(backdrop_1.MdBackdrop);
            var debug = fixture.debugElement;
            var backdrop = fixture.componentInstance;
            backdrop.transitionAddClass = transitionAddClass;
            fixture.detectChanges();
            result = {
                fixture: fixture,
                debug: debug,
                backdrop: backdrop
            };
            if (show) {
                return backdrop.show();
            }
        })
            .then(function () { return result; })
            .catch(function (error) { return console.error.bind(console); });
    }
    describe('md-backdrop', function () {
        describe('transitionClass', function () {
            it('should be added to classList when shown', testing_1.async(function () {
                return setup(true).then(function (api) {
                    util_1.promiseWait().then(function () {
                        api.fixture.detectChanges();
                        var el = api.debug.nativeElement;
                        expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
                    });
                });
            }));
            it('should be removed from classList when hidden', testing_1.async(function () {
                return setup(true).then(function (api) {
                    return util_1.promiseWait().then(function () {
                        var el = api.debug.nativeElement;
                        expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
                        return api.backdrop
                            .hide()
                            .then(function () { return util_1.promiseWait(); })
                            .then(function () {
                            expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                        });
                    });
                });
            }));
        });
        describe('transitionAddClass=false', function () {
            it('should remove transitionClass when shown', testing_1.async(function () {
                return setup(false, false).then(function (api) {
                    var el = api.debug.nativeElement;
                    expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                    el.classList.contains(api.backdrop.transitionClass);
                    return api.backdrop.show().then(function () {
                        expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                    });
                });
            }));
            it('should add transitionClass when hidden', testing_1.async(function () {
                return setup(true, false).then(function (api) {
                    var el = api.debug.nativeElement;
                    expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                    return api.backdrop.hide().then(function () {
                        expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
                    });
                });
            }));
        });
        describe('clickClose', function () {
            it('should be hidden by a click when true', testing_1.async(function () {
                return setup(true).then(function (api) {
                    var triggered = false;
                    api.backdrop.clickClose = true;
                    api.backdrop.hide = function () {
                        triggered = true;
                        return Promise.resolve();
                    };
                    api.debug.nativeElement.click();
                    expect(triggered).toBe(true);
                })
                    .catch(function (error) { return console.error.bind(console); });
            }));
            it('should not be hidden when clickClose is false', testing_1.async(function () {
                return setup(true).then(function (api) {
                    var triggered = false;
                    api.backdrop.clickClose = false;
                    api.backdrop.hide = function () {
                        triggered = true;
                        return Promise.resolve();
                    };
                    api.debug.nativeElement.click();
                    expect(triggered).toBe(false);
                })
                    .catch(function (error) { return console.error.bind(console); });
            }));
            it('should not be clickable during transition animation', testing_1.async(function () {
                return setup().then(function (api) {
                    var triggered = false;
                    api.backdrop.clickClose = true;
                    api.backdrop.hide = function () {
                        triggered = true;
                        return Promise.resolve();
                    };
                    var promise = api.backdrop.show();
                    api.debug.nativeElement.click();
                    expect(triggered).toBe(false);
                    return promise.then(function () {
                        expect(triggered).toBe(false);
                        api.debug.nativeElement.click();
                        expect(triggered).toBe(true);
                    });
                })
                    .catch(function (error) { return console.error.bind(console); });
            }));
        });
        describe('show', function () {
            it('emit events before and after being shown', function () {
                return setup().then(function (api) {
                    var changes = [];
                    expect(api.backdrop.visible).toBe(false);
                    api.backdrop.onShowing.subscribe(function () { return changes.push('showing'); });
                    api.backdrop.onShown.subscribe(function () { return changes.push('shown'); });
                    return api.backdrop
                        .show()
                        .then(function () { return util_1.promiseWait(); })
                        .then(function () {
                        expect(changes.length).toBe(2);
                        expect(changes[0]).toBe('showing');
                        expect(changes[1]).toBe('shown');
                    });
                });
            });
            it('does not emit events events if already shown', testing_1.async(function () {
                return setup(true).then(function (api) {
                    var changes = 0;
                    api.backdrop.onShowing.subscribe(function () { return changes++; });
                    api.backdrop.onShown.subscribe(function () { return changes++; });
                    return api.backdrop
                        .show()
                        .then(function () { return util_1.promiseWait(); })
                        .then(function () {
                        expect(changes).toBe(0);
                    });
                })
                    .catch(function (error) { return console.error.bind(console); });
            }));
        });
        describe('hide', function () {
            it('hide emits events before and after being hidden', testing_1.async(function () {
                return setup(true).then(function (api) {
                    var changes = [];
                    api.backdrop.onHiding.subscribe(function () { return changes.push('hiding'); });
                    api.backdrop.onHidden.subscribe(function () { return changes.push('hidden'); });
                    return api.backdrop
                        .hide()
                        .then(function () { return util_1.promiseWait(); })
                        .then(function () {
                        expect(changes.length).toBe(2);
                        expect(changes[0]).toBe('hiding');
                        expect(changes[1]).toBe('hidden');
                    });
                })
                    .catch(function (error) { return console.error.bind(console); });
            }));
            it('does not emit events events if already hidden', testing_1.async(function () {
                return setup().then(function (api) {
                    var changes = 0;
                    expect(api.backdrop.visible).toBe(false);
                    api.backdrop.onHiding.subscribe(function () { return changes++; });
                    api.backdrop.onHidden.subscribe(function () { return changes++; });
                    return api.backdrop
                        .hide()
                        .then(function () { return util_1.promiseWait(); })
                        .then(function () {
                        expect(changes).toBe(0);
                    });
                })
                    .catch(function (error) { return console.error.bind(console); });
            }));
        });
    });
});
//# sourceMappingURL=backdrop_spec.js.map