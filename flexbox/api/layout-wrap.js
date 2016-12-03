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
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseFxDirective } from './base';
/**
 * 'layout-wrap' flexbox styling directive
 * Defines wrapping of child elements in layout container
 * Optional values: reverse, wrap-reverse, none, nowrap, wrap (default)]
 * @see https://css-tricks.com/almanac/properties/f/flex-wrap/
 */
export var LayoutWrapDirective = (function (_super) {
    __extends(LayoutWrapDirective, _super);
    function LayoutWrapDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this.wrap = 'wrap';
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutWrapDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && changes[activated.activatedInputKey] != null;
        if (changes['wrap'] != null || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutWrapDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'wrap', 'wrap');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    LayoutWrapDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    LayoutWrapDirective.prototype.ngOnDestroy = function () { };
    // *********************************************
    // Protected methods
    // *********************************************
    LayoutWrapDirective.prototype._updateWithValue = function (value) {
        value = value || this.wrap || 'wrap';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        value = this._validateValue(value);
        this._applyStyleToElement(this._buildCSS(value));
    };
    /**
     * Build the CSS that should be assigned to the element instance
     */
    LayoutWrapDirective.prototype._buildCSS = function (value) {
        return { 'flex-wrap': value };
    };
    /**
     * Convert layout-wrap="<value>" to expected flex-wrap style
     */
    LayoutWrapDirective.prototype._validateValue = function (value) {
        switch (value.toLowerCase()) {
            case 'reverse':
            case 'wrap-reverse':
                value = 'wrap-reverse';
                break;
            case 'no':
            case 'none':
            case 'nowrap':
                value = 'nowrap';
                break;
            // All other values fallback to "wrap"
            default:
                value = 'wrap';
                break;
        }
        return value;
    };
    __decorate([
        Input('fx-layout-wrap'), 
        __metadata('design:type', String)
    ], LayoutWrapDirective.prototype, "wrap", void 0);
    __decorate([
        Input('fx-layout-wrap.xs'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapXs", void 0);
    __decorate([
        Input('fx-layout-wrap.gt-xs'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapGtXs", void 0);
    __decorate([
        Input('fx-layout-wrap.sm'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapSm", void 0);
    __decorate([
        Input('fx-layout-wrap.gt-sm'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapGtSm", void 0);
    __decorate([
        Input('fx-layout-wrap.md'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapMd", void 0);
    __decorate([
        Input('fx-layout-wrap.gt-md'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapGtMd", void 0);
    __decorate([
        Input('fx-layout-wrap.lg'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapLg", void 0);
    __decorate([
        Input('fx-layout-wrap.gt-lg'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapGtLg", void 0);
    __decorate([
        Input('fx-layout-wrap.xl'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapXl", void 0);
    LayoutWrapDirective = __decorate([
        Directive({ selector: '[fx-layout-wrap]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], LayoutWrapDirective);
    return LayoutWrapDirective;
}(BaseFxDirective));

//# sourceMappingURL=layout-wrap.js.map
