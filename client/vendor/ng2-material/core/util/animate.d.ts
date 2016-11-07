/// <reference types="core-js" />
export declare class Animate {
    static TRANSITION_EVENT: string;
    static enter(el: HTMLElement, cssClass: string): Promise<void>;
    static leave(el: HTMLElement, cssClass: string): Promise<void>;
    static getTransitionDuration(element: HTMLElement, includeDelay?: boolean): any;
    static setTransitionDuration(element: HTMLElement, delayMs: number): void;
    static whichTransitionEvent(): string;
    static setStyles(element: HTMLElement, styles: {
        [style: string]: string | number;
    }): Promise<void>;
    static wait(milliseconds?: number): Promise<void>;
}
