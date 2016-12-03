import { ElementRef, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseFxDirective } from './base';
import { LayoutDirective } from './layout';
/**
 * 'layout-align' flexbox styling directive
 *  Defines positioning of child elements along main and cross axis in a layout container
 *  Optional values: {main-axis} values or {main-axis cross-axis} value pairs
 *
 *  @see https://css-tricks.com/almanac/properties/j/justify-content/
 *  @see https://css-tricks.com/almanac/properties/a/align-items/
 *  @see https://css-tricks.com/almanac/properties/a/align-content/
 */
export declare class LayoutAlignDirective extends BaseFxDirective implements OnInit, OnChanges, OnMediaQueryChanges, OnDestroy {
    container: LayoutDirective;
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    private _layout;
    private _layoutWatcher;
    align: string;
    alignXs: any;
    alignGtXs: any;
    alignSm: any;
    alignGtSm: any;
    alignMd: any;
    alignGtMd: any;
    alignLg: any;
    alignGtLg: any;
    alignXl: any;
    constructor(container: LayoutDirective, _mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
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
    /**
     *
     */
    _updateWithValue(value?: string): void;
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    _onLayoutChange(direction: any): void;
    _buildCSS(align: any): {};
    /**
     * Update container element to 'stretch' as needed...
     */
    _allowStretching(align: any, layout: any): void;
}
