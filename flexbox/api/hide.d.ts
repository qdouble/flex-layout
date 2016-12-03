import { ElementRef, OnChanges, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseFxDirective } from './base';
import { ShowDirective } from "./show";
/**
 * 'show' Layout API directive
 *
 */
export declare class HideDirective extends BaseFxDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    private _showDirective;
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
    hide: boolean;
    hideXs: any;
    hideGtXs: any;
    hideSm: any;
    hideGtSm: any;
    hideMd: any;
    hideGtMd: any;
    hideLg: any;
    hideGtLg: any;
    hideXl: any;
    /**
     *
     */
    constructor(_mqa: MediaQueryAdapter, _showDirective: ShowDirective, elRef: ElementRef, renderer: Renderer);
    /**
     * Does the current element also use the fx-show API ?
     */
    protected readonly usesShowAPI: boolean;
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-hide')
     * Then conditionally override with the mq-activated Input's current value
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ngOnInit(): void;
    /** Special mql callback used by MediaQueryActivation when a mql event occurs */
    onMediaQueryChanges(changes: MediaQueryChanges): void;
    /**
     * Validate the visibility value and then update the host's inline display style
     */
    _updateWithValue(value?: string | number | boolean): void;
    /**
     * Build the CSS that should be assigned to the element instance
     */
    _buildCSS(value: any): {
        'display': string;
    };
    /**
     * Validate the value to NOT be FALSY
     */
    _validateTruthy(value: any): boolean;
}
