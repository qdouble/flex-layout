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
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
export var FlexAlignDirective = (function (_super) {
    __extends(FlexAlignDirective, _super);
    function FlexAlignDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this.align = 'stretch'; // default
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexAlignDirective.prototype.ngOnChanges = function (changes) {
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
    FlexAlignDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'align', 'stretch');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    FlexAlignDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexAlignDirective.prototype._updateWithValue = function (value) {
        value = value || this.align || 'stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexAlignDirective.prototype._buildCSS = function (align) {
        var css = {};
        // Cross-axis
        switch (align) {
            case 'start':
                css['align-self'] = 'flex-start';
                break;
            case 'baseline':
                css['align-self'] = 'baseline';
                break;
            case 'center':
                css['align-self'] = 'center';
                break;
            case 'end':
                css['align-self'] = 'flex-end';
                break;
            default:
                css['align-self'] = 'stretch';
                break; // default
        }
        return css;
    };
    __decorate([
        Input('fx-flex-align'), 
        __metadata('design:type', String)
    ], FlexAlignDirective.prototype, "align", void 0);
    __decorate([
        // default
        Input('fx-flex-align.xs'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignXs", void 0);
    __decorate([
        Input('fx-flex-align.gt-xs'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignGtXs", void 0);
    __decorate([
        Input('fx-flex-align.sm'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignSm", void 0);
    __decorate([
        Input('fx-flex-align.gt-sm'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignGtSm", void 0);
    __decorate([
        Input('fx-flex-align.md'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignMd", void 0);
    __decorate([
        Input('fx-flex-align.gt-md'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignGtMd", void 0);
    __decorate([
        Input('fx-flex-align.lg'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignLg", void 0);
    __decorate([
        Input('fx-flex-align.gt-lg'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignGtLg", void 0);
    __decorate([
        Input('fx-flex-align.xl'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignXl", void 0);
    FlexAlignDirective = __decorate([
        Directive({ selector: '[fx-flex-align]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], FlexAlignDirective);
    return FlexAlignDirective;
}(BaseFxDirective));

//# sourceMappingURL=flex-align.js.map
