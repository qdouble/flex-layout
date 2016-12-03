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
import { Directive, ElementRef, Input, Renderer, Self, Optional, Inject, forwardRef } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseFxDirective } from './base';
import { HideDirective } from "./hide";
var FALSY = ['false', false, 0];
/**
 * 'show' Layout API directive
 *
 */
export var ShowDirective = (function (_super) {
    __extends(ShowDirective, _super);
    /**
     *
     */
    function ShowDirective(_mqa, _hideDirective, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this._hideDirective = _hideDirective;
        this.elRef = elRef;
        this.renderer = renderer;
        /**
         * Original dom Elements CSS display style
         */
        this._display = 'flex';
        /**
         * Default layout property with default visible === true
         */
        this.show = true;
    }
    Object.defineProperty(ShowDirective.prototype, "usesHideAPI", {
        /**
          * Does the current element also use the fx-show API ?
          */
        get: function () {
            return !!this._hideDirective;
        },
        enumerable: true,
        configurable: true
    });
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-show')
     * Then conditionally override with the mq-activated Input's current value
     */
    ShowDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && changes[activated.activatedInputKey] != null;
        if (changes['show'] != null || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ShowDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'show', true);
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    ShowDirective.prototype.onMediaQueryChanges = function (changes) {
        var _this = this;
        setTimeout(function () { return _this._updateWithValue(changes.current.value); }, 1);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /** Validate the visibility value and then update the host's inline display style */
    ShowDirective.prototype._updateWithValue = function (value) {
        value = value || this.show || true;
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        var shouldShow = this._validateTruthy(value);
        if (shouldShow || !this.usesHideAPI) {
            this._applyStyleToElement(this._buildCSS(shouldShow));
        }
    };
    /** Build the CSS that should be assigned to the element instance */
    ShowDirective.prototype._buildCSS = function (show) {
        return { 'display': show ? this._display : 'none' };
    };
    /**  Validate the to be not FALSY */
    ShowDirective.prototype._validateTruthy = function (show) {
        return (FALSY.indexOf(show) == -1);
    };
    __decorate([
        Input('fx-show'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "show", void 0);
    __decorate([
        Input('fx-show.xs'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showXs", void 0);
    __decorate([
        Input('fx-show.gt-xs'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showGtXs", void 0);
    __decorate([
        Input('fx-show.sm'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showSm", void 0);
    __decorate([
        Input('fx-show.gt-sm'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showGtSm", void 0);
    __decorate([
        Input('fx-show.md'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showMd", void 0);
    __decorate([
        Input('fx-show.gt-md'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showGtMd", void 0);
    __decorate([
        Input('fx-show.lg'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showLg", void 0);
    __decorate([
        Input('fx-show.gt-lg'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showGtLg", void 0);
    __decorate([
        Input('fx-show.xl'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showXl", void 0);
    ShowDirective = __decorate([
        Directive({ selector: '[fx-show]' }),
        __param(1, Inject(forwardRef(function () { return HideDirective; }))),
        __param(1, Optional()),
        __param(1, Self()), 
        __metadata('design:paramtypes', [MediaQueryAdapter, Object, ElementRef, Renderer])
    ], ShowDirective);
    return ShowDirective;
}(BaseFxDirective));

//# sourceMappingURL=show.js.map
