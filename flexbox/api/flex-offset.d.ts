import { ElementRef, OnChanges, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseFxDirective } from './base';
/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
export declare class FlexOffsetDirective extends BaseFxDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    offset: string | number;
    offsetXs: string | number;
    offsetGtXs: string | number;
    offsetSm: string | number;
    offsetGtSm: string | number;
    offsetMd: string | number;
    offsetGtMd: string | number;
    offsetLg: string | number;
    offsetGtLg: string | number;
    offsetXl: string | number;
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
    _updateWithValue(value?: string | number): void;
    _buildCSS(offset: any): {
        'margin-left': string;
    };
}
