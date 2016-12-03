import { ElementRef, OnChanges, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseFxDirective } from './base';
/**
 * 'flex-order' flexbox styling directive
 * Configures the positional ordering of the element in a sorted layout container
 * @see https://css-tricks.com/almanac/properties/o/order/
 */
export declare class FlexOrderDirective extends BaseFxDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    order: any;
    orderXs: any;
    orderGtXs: any;
    orderSm: any;
    orderGtSm: any;
    orderMd: any;
    orderGtMd: any;
    orderLg: any;
    orderGtLg: any;
    orderXl: any;
    constructor(_mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
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
    _updateWithValue(value?: string): void;
    _buildCSS(value: any): {
        order: any;
    };
}
