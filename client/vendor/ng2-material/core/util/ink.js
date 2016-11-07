"use strict";
var animate_1 = require("./animate");
var Ink = (function () {
    function Ink() {
    }
    Ink.canApply = function (element) {
        return !element.hasAttribute('md-no-ink');
    };
    Ink.getSize = function (fit, width, height) {
        return fit
            ? Math.max(width, height)
            : Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    };
    Ink.ripple = function (element, left, top) {
        var fit = !!element.getAttribute('md-fab');
        var container = element.querySelector('.md-ripple-container');
        if (!container) {
            container = document.createElement('div');
            container.classList.add('md-ripple-container');
            element.appendChild(container);
        }
        var ripple = document.createElement('div');
        ripple.classList.add('md-ripple');
        var getInitialStyles = function () {
            var color = window.getComputedStyle(element).color || 'rgb(0,0,0)';
            var size = Ink.getSize(fit, element.clientWidth, element.clientHeight);
            return {
                'background-color': color,
                left: left + "px",
                top: top + "px",
                width: size + "px",
                height: size + "px"
            };
        };
        return animate_1.Animate.setStyles(ripple, getInitialStyles())
            .then(function () { return container.appendChild(ripple); })
            .then(function () { return ripple.classList.add('md-ripple-placed'); })
            .then(function () { return animate_1.Animate.wait(); })
            .then(function () { return ripple.classList.add('md-ripple-scaled'); })
            .then(function () { return ripple.classList.add('md-ripple-active'); })
            .then(function () { return animate_1.Animate.wait(450); })
            .then(function () { return ripple.classList.remove('md-ripple-active'); })
            .then(function () { return animate_1.Animate.wait(650); })
            .then(function () { return container.removeChild(ripple); });
    };
    Ink.rippleEvent = function (element, event) {
        var rippleX = event.offsetX;
        var rippleY = event.offsetY;
        if (element !== event.srcElement) {
            var rect = element.getBoundingClientRect();
            rippleX = event.clientX - rect.left;
            rippleY = event.clientY - rect.top;
        }
        return Ink.ripple(element, rippleX, rippleY);
    };
    return Ink;
}());
exports.Ink = Ink;
//# sourceMappingURL=ink.js.map