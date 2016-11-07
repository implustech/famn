import { NgZone } from "@angular/core";
import { ViewportHelper } from "./viewport";
import { Observable } from "rxjs/Observable";
export declare const MEDIA: any;
export declare const MEDIA_PRIORITY: any;
export declare class MediaListener {
    query: string;
    private zone;
    private mql;
    private media;
    onMatched: Observable<MediaQueryList>;
    readonly matches: boolean;
    private _destroyed;
    private _listener;
    constructor(query: string, zone: NgZone, mql: MediaQueryList, media: Media);
    destroy(): void;
}
export interface IMediaQueryCache {
    references: number;
    mql: MediaQueryList;
}
export declare class Media {
    viewport: ViewportHelper;
    private zone;
    cache: {
        [query: string]: IMediaQueryCache;
    };
    constructor(viewport: ViewportHelper, zone: NgZone);
    listen(query: string): MediaListener;
    unregisterListener(listener: MediaListener): void;
    hasMedia(size: string): boolean;
    static getQuery(size: string): string;
}
