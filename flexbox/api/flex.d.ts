import { ElementRef, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseFxDirective } from './base';
import { LayoutDirective } from './layout';
import { LayoutWrapDirective } from './layout-wrap';
/** Built-in aliases for different flex-basis values. */
export declare type FlexBasisAlias = 'grow' | 'initial' | 'auto' | 'none' | 'nogrow' | 'noshrink';
/**
 * Directive to control the size of a flex item using flex-basis, flex-grow, and flex-shrink.
 * Correspondds to the css `flex` shorthand property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export declare class FlexDirective extends BaseFxDirective implements OnInit, OnChanges, OnMediaQueryChanges, OnDestroy {
    private _mediaQueryAdapter;
    private _container;
    private _wrap;
    /** MediaQuery Activation Tracker */
    private _mqActivation;
    /** The flex-direction of this element's flex container. Defaults to 'row'. */
    private _layout;
    /**
     * Subscription to the parent flex container's layout changes.
     * Stored so we can unsubscribe when this directive is destroyed.
     */
    private _layoutWatcher;
    flex: string;
    shrink: number;
    grow: number;
    flexXs: any;
    flexGtXs: any;
    flexSm: any;
    flexGtSm: any;
    flexMd: any;
    flexGtMd: any;
    flexLg: any;
    flexGtLg: any;
    flexXl: any;
    constructor(elRef: ElementRef, renderer: Renderer, _mediaQueryAdapter: MediaQueryAdapter, _container: LayoutDirective, _wrap: LayoutWrapDirective);
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
    ngOnDestroy(): void;
    /**
     * Caches the parent container's 'flex-direction' and updates the element's style.
     * Used as a handler for layout change events from the parent flex container.
     */
    _onLayoutChange(direction?: string): void;
    _updateStyle(value?: string): void;
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    _validateValue(grow: number, shrink: number, basis: string | number | FlexBasisAlias): any;
}
