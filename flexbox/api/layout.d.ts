import { ElementRef, OnChanges, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseFxDirective } from './base';
export declare const LAYOUT_VALUES: string[];
/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
export declare class LayoutDirective extends BaseFxDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    /**
     * Create Observable for nested/child 'flex' directives. This allows
     * child flex directives to subscribe/listen for flexbox direction changes.
     */
    private _announcer;
    /**
     * Publish observer to enabled nested, dependent directives to listen
     * to parent "layout" direction changes
     */
    layout$: Observable<string>;
    /**
     * Default layout property with default direction value
     */
    layout: string;
    layoutXs: any;
    layoutGtXs: any;
    layoutSm: any;
    layoutGtSm: any;
    layoutMd: any;
    layoutGtMd: any;
    layoutLg: any;
    layoutGtLg: any;
    layoutXl: any;
    /**
     *
     */
    constructor(_mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-layout')
     * Then conditionally override with the mq-activated Input's current value
     */
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
    /**
     * Validate the direction value and then update the host's inline flexbox styles
     *
     * @todo - update all child containers to have "box-sizing: border-box"
     *         This way any padding or border specified on the child elements are
     *         laid out and drawn inside that element's specified width and height.
     *
     */
    _updateWithDirection(direction?: string): void;
    /**
     * Build the CSS that should be assigned to the element instance
     * BUG:
     *
     *   1) min-height on a column flex container won’t apply to its flex item children in IE 10-11.
     *      Use height instead if possible; height : <xxx>vh;
     */
    _buildCSS(value: any): {
        'display': string;
        'box-sizing': string;
        'flex-direction': any;
    };
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    _validateValue(value: any): any;
}
