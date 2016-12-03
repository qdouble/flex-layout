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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseFxDirective } from './base';
export var LAYOUT_VALUES = ['row', 'column', 'row-reverse', 'column-reverse'];
/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
export var LayoutDirective = (function (_super) {
    __extends(LayoutDirective, _super);
    /**
     *
     */
    function LayoutDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        /**
         * Create Observable for nested/child 'flex' directives. This allows
         * child flex directives to subscribe/listen for flexbox direction changes.
         */
        this._announcer = new BehaviorSubject(this.layout);
        /**
         * Publish observer to enabled nested, dependent directives to listen
         * to parent "layout" direction changes
         */
        this.layout$ = this._announcer.asObservable();
        /**
         * Default layout property with default direction value
         */
        this.layout = 'row';
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-layout')
     * Then conditionally override with the mq-activated Input's current value
     */
    LayoutDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && changes[activated.activatedInputKey] != null;
        if (changes['layout'] != null || activationChange) {
            this._updateWithDirection();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'layout', 'row');
        this._updateWithDirection();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    LayoutDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithDirection(changes.current.value);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Validate the direction value and then update the host's inline flexbox styles
     *
     * @todo - update all child containers to have "box-sizing: border-box"
     *         This way any padding or border specified on the child elements are
     *         laid out and drawn inside that element's specified width and height.
     *
     */
    LayoutDirective.prototype._updateWithDirection = function (direction) {
        direction = direction || this.layout || 'row';
        if (this._mqActivation) {
            direction = this._mqActivation.activatedInput;
        }
        direction = this._validateValue(direction);
        // Update styles and announce to subscribers the *new* direction
        this._applyStyleToElement(this._buildCSS(direction));
        this._announcer.next(direction);
    };
    /**
     * Build the CSS that should be assigned to the element instance
     * BUG:
     *
     *   1) min-height on a column flex container won’t apply to its flex item children in IE 10-11.
     *      Use height instead if possible; height : <xxx>vh;
     */
    LayoutDirective.prototype._buildCSS = function (value) {
        return { 'display': 'flex', 'box-sizing': 'border-box', 'flex-direction': value };
    };
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    LayoutDirective.prototype._validateValue = function (value) {
        value = value ? value.toLowerCase() : '';
        return LAYOUT_VALUES.find(function (x) { return x === value; }) ? value : LAYOUT_VALUES[0]; // "row"
    };
    __decorate([
        Input('fx-layout'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layout", void 0);
    __decorate([
        Input('fx-layout.xs'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutXs", void 0);
    __decorate([
        Input('fx-layout.gt-xs'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutGtXs", void 0);
    __decorate([
        Input('fx-layout.sm'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutSm", void 0);
    __decorate([
        Input('fx-layout.gt-sm'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutGtSm", void 0);
    __decorate([
        Input('fx-layout.md'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutMd", void 0);
    __decorate([
        Input('fx-layout.gt-md'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutGtMd", void 0);
    __decorate([
        Input('fx-layout.lg'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutLg", void 0);
    __decorate([
        Input('fx-layout.gt-lg'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutGtLg", void 0);
    __decorate([
        Input('fx-layout.xl'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutXl", void 0);
    LayoutDirective = __decorate([
        Directive({ selector: '[fx-layout], [fx-layout.md]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], LayoutDirective);
    return LayoutDirective;
}(BaseFxDirective));
// ************************************************************
// Private static variables
// ************************************************************
var ROW = LAYOUT_VALUES[0], COLUMN = LAYOUT_VALUES[1], ROW_REVERSE = LAYOUT_VALUES[2], COLUMN_REVERSE = LAYOUT_VALUES[3];

//# sourceMappingURL=layout.js.map
