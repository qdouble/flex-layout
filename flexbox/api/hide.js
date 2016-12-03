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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ElementRef, Input, Renderer, Self, Optional } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseFxDirective } from './base';
import { ShowDirective } from "./show";
/**
 * 'show' Layout API directive
 *
 */
export var HideDirective = (function (_super) {
    __extends(HideDirective, _super);
    /**
     *
     */
    function HideDirective(_mqa, _showDirective, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this._showDirective = _showDirective;
        this.elRef = elRef;
        this.renderer = renderer;
        /**
         * Original dom Elements CSS display style
         */
        this._display = 'flex';
        /**
         * Default layout property with default visible === true
         */
        this.hide = true;
    }
    Object.defineProperty(HideDirective.prototype, "usesShowAPI", {
        /**
         * Does the current element also use the fx-show API ?
         */
        get: function () {
            return !!this._showDirective;
        },
        enumerable: true,
        configurable: true
    });
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-hide')
     * Then conditionally override with the mq-activated Input's current value
     */
    HideDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && changes[activated.activatedInputKey] != null;
        if (changes['hide'] != null || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    HideDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'hide', true);
        this._updateWithValue();
    };
    /** Special mql callback used by MediaQueryActivation when a mql event occurs */
    HideDirective.prototype.onMediaQueryChanges = function (changes) {
        var _this = this;
        setTimeout(function () { return _this._updateWithValue(changes.current.value); }, 1);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Validate the visibility value and then update the host's inline display style
     */
    HideDirective.prototype._updateWithValue = function (value) {
        value = value || this.hide || true;
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        var shouldHide = this._validateTruthy(value);
        if (shouldHide || !this.usesShowAPI) {
            this._applyStyleToElement(this._buildCSS(shouldHide));
        }
    };
    /**
     * Build the CSS that should be assigned to the element instance
     */
    HideDirective.prototype._buildCSS = function (value) {
        return { 'display': value ? 'none' : this._display };
    };
    /**
     * Validate the value to NOT be FALSY
     */
    HideDirective.prototype._validateTruthy = function (value) {
        return FALSY.indexOf(value) === -1;
    };
    __decorate([
        Input('fx-hide'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hide", void 0);
    __decorate([
        Input('fx-hide.xs'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideXs", void 0);
    __decorate([
        Input('fx-hide.gt-xs'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideGtXs", void 0);
    __decorate([
        Input('fx-hide.sm'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideSm", void 0);
    __decorate([
        Input('fx-hide.gt-sm'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideGtSm", void 0);
    __decorate([
        Input('fx-hide.md'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideMd", void 0);
    __decorate([
        Input('fx-hide.gt-md'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideGtMd", void 0);
    __decorate([
        Input('fx-hide.lg'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideLg", void 0);
    __decorate([
        Input('fx-hide.gt-lg'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideGtLg", void 0);
    __decorate([
        Input('fx-hide.xl'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideXl", void 0);
    HideDirective = __decorate([
        Directive({ selector: '[fx-hide]' }),
        __param(1, Optional()),
        __param(1, Self()), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ShowDirective, ElementRef, Renderer])
    ], HideDirective);
    return HideDirective;
}(BaseFxDirective));
var FALSY = ['false', false, 0];

//# sourceMappingURL=hide.js.map
