import { ElementRef, OnChanges, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseFxDirective } from './base';
/**
 * 'show' Layout API directive
 *
 */
export declare class ShowDirective extends BaseFxDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    private _hideDirective;
    protected elRef: ElementRef;
    protected renderer: Renderer;
    /**
     * Original dom Elements CSS display style
     */
    private _display;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    /**
     * Default layout property with default visible === true
     */
    show: boolean;
    showXs: any;
    showGtXs: any;
    showSm: any;
    showGtSm: any;
    showMd: any;
    showGtMd: any;
    showLg: any;
    showGtLg: any;
    showXl: any;
    /**
     *
     */
    constructor(_mqa: MediaQueryAdapter, _hideDirective: any, elRef: ElementRef, renderer: Renderer);
    /**
      * Does the current element also use the fx-show API ?
      */
    protected readonly usesHideAPI: boolean;
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-show')
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
    /** Validate the visibility value and then update the host's inline display style */
    _updateWithValue(value?: string | number | boolean): void;
    /** Build the CSS that should be assigned to the element instance */
    _buildCSS(show: any): {
        'display': string;
    };
    /**  Validate the to be not FALSY */
    _validateTruthy(show: any): boolean;
}
