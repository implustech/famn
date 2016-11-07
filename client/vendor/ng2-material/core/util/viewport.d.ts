export interface ViewportMediaMatch {
    matches: boolean;
    media: string;
    addListener(listener: MediaQueryListListener): void;
    removeListener(listener: MediaQueryListListener): void;
}
export declare abstract class ViewportHelper {
    abstract matchMedia(query: string): ViewportMediaMatch;
    abstract scrollTop(): number;
    abstract getDocumentNativeElement(): any;
    abstract requestFrame(fn: (elapsed?: number) => any): any;
}
export declare class BrowserViewportHelper extends ViewportHelper {
    getDocumentNativeElement(): any;
    requestFrame(fn: (elapsed?: number) => any): number;
    matchMedia(query: string): ViewportMediaMatch;
    scrollTop(): number;
}
export declare class NodeViewportMediaMatch implements ViewportMediaMatch {
    matches: boolean;
    media: string;
    constructor(matches?: boolean, media?: string);
    addListener(listener: MediaQueryListListener): void;
    removeListener(listener: MediaQueryListListener): void;
}
export declare class NodeViewportHelper extends ViewportHelper {
    getDocumentNativeElement(): any;
    requestFrame(fn: (elapsed?: number) => any): void;
    matchMedia(query: string): ViewportMediaMatch;
    scrollTop(): number;
}
