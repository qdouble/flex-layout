import { ElementRef, Renderer } from '@angular/core';
import { BaseFxDirective } from './base';
/**
 * 'fx-flex-fill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: [fx-flexFill] is NOT responsive fx-flex
 */
export declare class FlexFillDirective extends BaseFxDirective {
    elRef: ElementRef;
    renderer: Renderer;
    constructor(elRef: ElementRef, renderer: Renderer);
}
