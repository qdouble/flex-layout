import { ElementRef, Renderer } from '@angular/core';
/**
 * Definition of a css style. Either a property name (e.g. "flex-basis") or an object
 * map of property name and value (e.g. {display: 'none', flex-order: 5}).
 */
export declare type StyleDefinition = string | {
    [property: string]: string | number;
};
/** Abstract base class for the Layout API styling directives. */
export declare abstract class BaseFxDirective {
    private _elementRef;
    private _renderer;
    constructor(_elementRef: ElementRef, _renderer: Renderer);
    /** Applies styles given via string pair or object map to the directive element. */
    protected _applyStyleToElement(style: StyleDefinition, value?: string | number): void;
}
