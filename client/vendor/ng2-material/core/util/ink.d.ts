/// <reference types="core-js" />
export declare abstract class Ink {
    static canApply(element: HTMLElement): boolean;
    static getSize(fit: boolean, width: number, height: number): number;
    static ripple(element: HTMLElement, left: number, top: number): Promise<any>;
    static rippleEvent(element: HTMLElement, event: MouseEvent): Promise<any>;
}
