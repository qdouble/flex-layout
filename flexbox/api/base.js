import { applyCssPrefixes } from '../../utils/auto-prefixer';
/** Abstract base class for the Layout API styling directives. */
export var BaseFxDirective = (function () {
    function BaseFxDirective(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    /** Applies styles given via string pair or object map to the directive element. */
    BaseFxDirective.prototype._applyStyleToElement = function (style, value) {
        var styles = {};
        var element = this._elementRef.nativeElement;
        if (typeof style === 'string') {
            styles[style] = value;
            style = styles;
        }
        styles = applyCssPrefixes(style);
        // Iterate all properties in hashMap and set styles
        for (var key in styles) {
            this._renderer.setElementStyle(element, key, styles[key]);
        }
    };
    return BaseFxDirective;
}());

//# sourceMappingURL=base.js.map
