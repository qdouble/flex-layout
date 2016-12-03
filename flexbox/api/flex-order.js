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
 * 'flex-order' flexbox styling directive
 * Configures the positional ordering of the element in a sorted layout container
 * @see https://css-tricks.com/almanac/properties/o/order/
 */
export var FlexOrderDirective = (function (_super) {
    __extends(FlexOrderDirective, _super);
    function FlexOrderDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexOrderDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && changes[activated.activatedInputKey] != null;
        if (changes['order'] != null || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexOrderDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'order', '1');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    FlexOrderDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexOrderDirective.prototype._updateWithValue = function (value) {
        value = value || this.order || '1';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexOrderDirective.prototype._buildCSS = function (value) {
        value = parseInt(value, 10);
        return { order: isNaN(value) ? 0 : value };
    };
    __decorate([
        Input('fx-flex-order'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "order", void 0);
    __decorate([
        Input('fx-flex-order.xs'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderXs", void 0);
    __decorate([
        Input('fx-flex-order.gt-xs'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderGtXs", void 0);
    __decorate([
        Input('fx-flex-order.sm'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderSm", void 0);
    __decorate([
        Input('fx-flex-order.gt-sm'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderGtSm", void 0);
    __decorate([
        Input('fx-flex-order.md'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderMd", void 0);
    __decorate([
        Input('fx-flex-order.gt-md'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderGtMd", void 0);
    __decorate([
        Input('fx-flex-order.lg'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderLg", void 0);
    __decorate([
        Input('fx-flex-order.gt-lg'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderGtLg", void 0);
    __decorate([
        Input('fx-flex-order.xl'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderXl", void 0);
    FlexOrderDirective = __decorate([
        Directive({ selector: '[fx-flex-order]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], FlexOrderDirective);
    return FlexOrderDirective;
}(BaseFxDirective));

//# sourceMappingURL=flex-order.js.map
