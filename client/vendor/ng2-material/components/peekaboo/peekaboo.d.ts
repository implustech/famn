import { OnDestroy, ElementRef, NgZone } from '@angular/core';
import { Media } from '../../core/util/media';
import { ViewportHelper } from '../../core/util/viewport';
export declare type BreakAction = 'hide' | 'show';
export declare class MdPeekaboo implements OnDestroy {
    media: Media;
    private element;
    viewport: ViewportHelper;
    private zone;
    static SIZES: string[];
    break: number;
    breakAction: BreakAction;
    static MakeNumber(value: any): number;
    private _active;
    readonly active: boolean;
    private _breakXs;
    breakXs: number;
    private _breakSm;
    breakSm: number;
    private _breakMd;
    breakMd: number;
    private _breakLg;
    breakLg: number;
    private _breakXl;
    breakXl: number;
    private _breakpoint;
    breakpoint: string;
    private _scroller;
    scroller: any;
    readonly top: number;
    private _mediaListeners;
    constructor(media: Media, element: ElementRef, viewport: ViewportHelper, zone: NgZone);
    ngOnDestroy(): any;
    private _watchMediaQuery(size);
    private _windowScroll;
    evaluate(): number;
}
export declare class MdPeekabooModule {
}
