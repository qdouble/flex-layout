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
import { Directive, ElementRef, Input, Optional, Renderer } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseFxDirective } from './base';
import { LAYOUT_VALUES, LayoutDirective } from './layout';
/**
 * 'layout-align' flexbox styling directive
 *  Defines positioning of child elements along main and cross axis in a layout container
 *  Optional values: {main-axis} values or {main-axis cross-axis} value pairs
 *
 *  @see https://css-tricks.com/almanac/properties/j/justify-content/
 *  @see https://css-tricks.com/almanac/properties/a/align-items/
 *  @see https://css-tricks.com/almanac/properties/a/align-content/
 */
export var LayoutAlignDirective = (function (_super) {
    __extends(LayoutAlignDirective, _super);
    function LayoutAlignDirective(container, _mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this.container = container;
        this._mqa = _mqa;
        this._layout = 'row'; // default flex-direction
        this.align = 'start stretch';
        if (container) {
            this._layoutWatcher = container.layout$.subscribe(this._onLayoutChange.bind(this));
        }
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutAlignDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && changes[activated.activatedInputKey] != null;
        if (changes['align'] != null || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutAlignDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'align', 'start stretch');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    LayoutAlignDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    LayoutAlignDirective.prototype.ngOnDestroy = function () {
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     *
     */
    LayoutAlignDirective.prototype._updateWithValue = function (value) {
        value = value || this.align || 'start stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    LayoutAlignDirective.prototype._onLayoutChange = function (direction) {
        var _this = this;
        this._layout = (direction || '').toLowerCase().replace('-reverse', '');
        if (!LAYOUT_VALUES.find(function (x) { return x === _this._layout; }))
            this._layout = 'row';
        var value = this.align || 'start stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._allowStretching(value, this._layout);
    };
    LayoutAlignDirective.prototype._buildCSS = function (align) {
        var css = {}, _a = align.split(' '), main_axis = _a[0], cross_axis = _a[1];
        css['justify-content'] = 'flex-start'; // default
        css['align-items'] = 'stretch'; // default
        css['align-content'] = 'stretch'; // default
        // Main axis
        switch (main_axis) {
            case 'center':
                css['justify-content'] = 'center';
                break;
            case 'space-around':
                css['justify-content'] = 'space-around';
                break;
            case 'space-between':
                css['justify-content'] = 'space-between';
                break;
            case 'end':
                css['justify-content'] = 'flex-end';
                break;
        }
        // Cross-axis
        switch (cross_axis) {
            case 'start':
                css['align-items'] = css['align-content'] = 'flex-start';
                break;
            case 'baseline':
                css['align-items'] = 'baseline';
                break;
            case 'center':
                css['align-items'] = css['align-content'] = 'center';
                break;
            case 'end':
                css['align-items'] = css['align-content'] = 'flex-end';
                break;
        }
        return css;
    };
    /**
     * Update container element to 'stretch' as needed...
     */
    LayoutAlignDirective.prototype._allowStretching = function (align, layout) {
        var _a = align.split(' '), cross_axis = _a[1];
        if (cross_axis == 'stretch') {
            // Use `null` values to remove style
            this._applyStyleToElement({
                'box-sizing': 'border-box',
                'max-width': (layout === 'column') ? '100%' : null,
                'max-height': (layout === 'row') ? '100%' : null
            });
        }
    };
    __decorate([
        Input('fx-layout-align'), 
        __metadata('design:type', String)
    ], LayoutAlignDirective.prototype, "align", void 0);
    __decorate([
        Input('fx-layout-align.xs'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignXs", void 0);
    __decorate([
        Input('fx-layout-align.gt-xs'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignGtXs", void 0);
    __decorate([
        Input('fx-layout-align.sm'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignSm", void 0);
    __decorate([
        Input('fx-layout-align.gt-sm'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignGtSm", void 0);
    __decorate([
        Input('fx-layout-align.md'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignMd", void 0);
    __decorate([
        Input('fx-layout-align.gt-md'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignGtMd", void 0);
    __decorate([
        Input('fx-layout-align.lg'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignLg", void 0);
    __decorate([
        Input('fx-layout-align.gt-lg'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignGtLg", void 0);
    __decorate([
        Input('fx-layout-align.xl'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignXl", void 0);
    LayoutAlignDirective = __decorate([
        Directive({ selector: '[fx-layout-align]' }),
        __param(0, Optional()), 
        __metadata('design:paramtypes', [LayoutDirective, MediaQueryAdapter, ElementRef, Renderer])
    ], LayoutAlignDirective);
    return LayoutAlignDirective;
}(BaseFxDirective));

//# sourceMappingURL=layout-align.js.map
