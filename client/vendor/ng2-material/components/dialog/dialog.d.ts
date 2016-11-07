/// <reference types="core-js" />
import { AfterContentInit, EventEmitter, OnDestroy } from '@angular/core';
import { Overlay, OverlayState } from '@angular/material';
export declare class MdDialog implements AfterContentInit, OnDestroy {
    private overlay;
    constructor(overlay: Overlay);
    onShow: EventEmitter<MdDialog>;
    onClose: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    private portal;
    private actions;
    private active;
    config: OverlayState;
    private overlayRef;
    ngAfterContentInit(): any;
    ngOnDestroy(): any;
    show(): Promise<MdDialog>;
    close(result?: any, cancel?: boolean): Promise<MdDialog>;
    private onDocumentKeypress(event);
}
