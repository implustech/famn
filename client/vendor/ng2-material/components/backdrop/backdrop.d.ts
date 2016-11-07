/// <reference types="core-js" />
import { ElementRef, EventEmitter } from '@angular/core';
import { ViewportHelper } from '../../core/util/viewport';
export declare class MdBackdrop {
    element: ElementRef;
    viewport: ViewportHelper;
    clickClose: boolean;
    hideScroll: boolean;
    onHiding: EventEmitter<MdBackdrop>;
    onHidden: EventEmitter<MdBackdrop>;
    onShowing: EventEmitter<MdBackdrop>;
    onShown: EventEmitter<MdBackdrop>;
    constructor(element: ElementRef, viewport: ViewportHelper);
    transitionClass: string;
    transitionAddClass: boolean;
    visible: boolean;
    protected _visible: boolean;
    private _transitioning;
    private _previousOverflow;
    private _body;
    onClick(): void;
    hide(): Promise<any>;
    show(): Promise<any>;
    toggle(visible?: boolean): any;
}
export declare class MdBackdropModule {
}
