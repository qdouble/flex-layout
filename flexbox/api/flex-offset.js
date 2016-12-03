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
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
export var FlexOffsetDirective = (function (_super) {
    __extends(FlexOffsetDirective, _super);
    function FlexOffsetDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexOffsetDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && changes[activated.activatedInputKey] != null;
        if (changes['offset'] != null || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexOffsetDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'offset', 0);
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    FlexOffsetDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexOffsetDirective.prototype._updateWithValue = function (value) {
        value = value || this.offset || 0;
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexOffsetDirective.prototype._buildCSS = function (offset) {
        var isPercent = String(offset).indexOf('%') > -1;
        var isPx = String(offset).indexOf('px') > -1;
        if (!isPx && !isPercent && !isNaN(offset))
            offset = offset + '%';
        return { 'margin-left': "" + offset };
    };
    __decorate([
        Input('fx-flex-offset'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offset", void 0);
    __decorate([
        Input('fx-flex-offset.xs'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetXs", void 0);
    __decorate([
        Input('fx-flex-offset.gt-xs'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetGtXs", void 0);
    __decorate([
        Input('fx-flex-offset.sm'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetSm", void 0);
    __decorate([
        Input('fx-flex-offset.gt-sm'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetGtSm", void 0);
    __decorate([
        Input('fx-flex-offset.md'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetMd", void 0);
    __decorate([
        Input('fx-flex-offset.gt-md'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetGtMd", void 0);
    __decorate([
        Input('fx-flex-offset.lg'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetLg", void 0);
    __decorate([
        Input('fx-flex-offset.gt-lg'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetGtLg", void 0);
    __decorate([
        Input('fx-flex-offset.xl'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetXl", void 0);
    FlexOffsetDirective = __decorate([
        Directive({ selector: '[fx-flex-offset]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], FlexOffsetDirective);
    return FlexOffsetDirective;
}(BaseFxDirective));

//# sourceMappingURL=flex-offset.js.map
