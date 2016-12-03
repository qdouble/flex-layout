import { ElementRef, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseFxDirective } from './base';
/**
 * 'layout-wrap' flexbox styling directive
 * Defines wrapping of child elements in layout container
 * Optional values: reverse, wrap-reverse, none, nowrap, wrap (default)]
 * @see https://css-tricks.com/almanac/properties/f/flex-wrap/
 */
export declare class LayoutWrapDirective extends BaseFxDirective implements OnInit, OnChanges, OnMediaQueryChanges, OnDestroy {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    wrap: string;
    wrapXs: any;
    wrapGtXs: any;
    wrapSm: any;
    wrapGtSm: any;
    wrapMd: any;
    wrapGtMd: any;
    wrapLg: any;
    wrapGtLg: any;
    wrapXl: any;
    constructor(_mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ngOnInit(): void;
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    onMediaQueryChanges(changes: MediaQueryChanges): void;
    ngOnDestroy(): void;
    _updateWithValue(value?: string): void;
    /**
     * Build the CSS that should be assigned to the element instance
     */
    _buildCSS(value: any): {
        'flex-wrap': any;
    };
    /**
     * Convert layout-wrap="<value>" to expected flex-wrap style
     */
    _validateValue(value: any): any;
}
