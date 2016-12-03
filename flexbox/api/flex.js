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
import { Directive, ElementRef, Input, Optional, Renderer, SkipSelf } from '@angular/core';
import { extendObject } from '../../utils/object-extend';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseFxDirective } from './base';
import { LayoutDirective } from './layout';
import { LayoutWrapDirective } from './layout-wrap';
/**
 * Directive to control the size of a flex item using flex-basis, flex-grow, and flex-shrink.
 * Correspondds to the css `flex` shorthand property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export var FlexDirective = (function (_super) {
    __extends(FlexDirective, _super);
    // Explicitly @SkipSelf on LayoutDirective and LayoutWrapDirective because we want the
    // parent flex container for this flex item.
    function FlexDirective(elRef, renderer, _mediaQueryAdapter, _container, _wrap) {
        var _this = this;
        _super.call(this, elRef, renderer);
        this._mediaQueryAdapter = _mediaQueryAdapter;
        this._container = _container;
        this._wrap = _wrap;
        /** The flex-direction of this element's flex container. Defaults to 'row'. */
        this._layout = 'row';
        this.flex = '';
        this.shrink = 1;
        this.grow = 1;
        // If this flex item is inside of a flex container marked with
        if (_container) {
            // Subscribe to layout immediate parent direction changes
            this._layoutWatcher = _container.layout$.subscribe(function (direction) { return _this._onLayoutChange(direction); });
        }
    }
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && changes[activated.activatedInputKey] != null;
        if (changes['flex'] != null || activationChange) {
            this._onLayoutChange(this._layout);
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mediaQueryAdapter.attach(this, 'flex', '');
        this._onLayoutChange();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    FlexDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateStyle(changes.current.value);
    };
    FlexDirective.prototype.ngOnDestroy = function () {
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    /**
     * Caches the parent container's 'flex-direction' and updates the element's style.
     * Used as a handler for layout change events from the parent flex container.
     */
    FlexDirective.prototype._onLayoutChange = function (direction) {
        this._layout = direction || this._layout;
        this._updateStyle();
    };
    FlexDirective.prototype._updateStyle = function (value) {
        var flexBasis = value || this.flex || '';
        if (this._mqActivation) {
            flexBasis = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._validateValue(this.grow, this.shrink, flexBasis));
    };
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    FlexDirective.prototype._validateValue = function (grow, shrink, basis) {
        var css;
        var direction = (this._layout === 'column') || (this._layout == 'column-reverse') ?
            'column' :
            'row';
        // flex-basis allows you to specify the initial/starting main-axis size of the element,
        // before anything else is computed. It can either be a percentage or an absolute value.
        // It is, however, not the breaking point for flex-grow/shrink properties
        //
        // flex-grow can be seen as this:
        //   0: Do not stretch. Either size to element's content width, or obey 'flex-basis'.
        //   1: (Default value). Stretch; will be the same size to all other flex items on
        //       the same row since they have a default value of 1.
        //   ≥2 (integer n): Stretch. Will be n times the size of other elements
        //      with 'flex-grow: 1' on the same row.
        // Use `null` to clear existing styles.
        var clearStyles = {
            'max-width': null,
            'max-height': null,
            'min-width': null,
            'min-height': null
        };
        switch (basis || '') {
            case '':
                css = extendObject(clearStyles, { 'flex': '1' });
                break;
            case 'grow':
                css = extendObject(clearStyles, { 'flex': '1 1 100%' });
                break;
            case 'initial':
                css = extendObject(clearStyles, { 'flex': '0 1 auto' });
                break; // default
            case 'auto':
                css = extendObject(clearStyles, { 'flex': '1 1 auto' });
                break;
            case 'none':
                css = extendObject(clearStyles, { 'flex': '0 0 auto' });
                break;
            case 'nogrow':
                css = extendObject(clearStyles, { 'flex': '0 1 auto' });
                break;
            case 'noshrink':
                css = extendObject(clearStyles, { 'flex': '1 0 auto' });
                break;
            default:
                var isPercent = String(basis).indexOf('%') > -1;
                var isPx = String(basis).indexOf('px') > -1;
                // Defaults to percentage sizing unless `px` is explicitly set
                if (!isPx && !isPercent && !isNaN(basis))
                    basis = basis + '%';
                if (basis === '0px')
                    basis = '0%';
                // Set max-width = basis if using layout-wrap
                // @see https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrappifl-flex-items
                css = extendObject(clearStyles, {
                    'flex': grow + " " + shrink + " " + ((isPx || this._wrap) ? basis : '100%'),
                });
                break;
        }
        var max = (direction === 'row') ? 'max-width' : 'max-height';
        var min = (direction === 'row') ? 'min-width' : 'min-height';
        css[min] = (basis == '0%') ? 0 : null;
        css[max] = (basis == '0%') ? 0 : basis;
        return extendObject(css, { 'box-sizing': 'border-box' });
    };
    __decorate([
        Input('fx-flex'), 
        __metadata('design:type', String)
    ], FlexDirective.prototype, "flex", void 0);
    __decorate([
        Input('fx-shrink'), 
        __metadata('design:type', Number)
    ], FlexDirective.prototype, "shrink", void 0);
    __decorate([
        Input('fx-grow'), 
        __metadata('design:type', Number)
    ], FlexDirective.prototype, "grow", void 0);
    __decorate([
        Input('fx-flex.xs'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexXs", void 0);
    __decorate([
        Input('fx-flex.gt-xs'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexGtXs", void 0);
    __decorate([
        Input('fx-flex.sm'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexSm", void 0);
    __decorate([
        Input('fx-flex.gt-sm'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexGtSm", void 0);
    __decorate([
        Input('fx-flex.md'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexMd", void 0);
    __decorate([
        Input('fx-flex.gt-md'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexGtMd", void 0);
    __decorate([
        Input('fx-flex.lg'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexLg", void 0);
    __decorate([
        Input('fx-flex.gt-lg'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexGtLg", void 0);
    __decorate([
        Input('fx-flex.xl'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexXl", void 0);
    FlexDirective = __decorate([
        Directive({
            selector: '[fx-flex]',
        }),
        __param(3, Optional()),
        __param(3, SkipSelf()),
        __param(4, Optional()),
        __param(4, SkipSelf()), 
        __metadata('design:paramtypes', [ElementRef, Renderer, MediaQueryAdapter, LayoutDirective, LayoutWrapDirective])
    ], FlexDirective);
    return FlexDirective;
}(BaseFxDirective));

//# sourceMappingURL=flex.js.map
