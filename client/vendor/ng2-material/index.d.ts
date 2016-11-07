import { ModuleWithProviders } from '@angular/core';
export * from './components/backdrop/backdrop';
export * from './components/content/content';
export * from './components/data-table/index';
export * from './components/dialog/index';
export * from './components/divider/divider';
export * from './components/pagination/index';
export * from './components/peekaboo/peekaboo';
export * from './components/subheader/subheader';
export * from './core/util/media';
export * from './core/util/viewport';
export * from './core/util/animate';
export declare const MATERIAL_NODE_PROVIDERS: any[];
export declare const MATERIAL_BROWSER_PROVIDERS: any[];
export declare class Ng2MaterialNodeModule {
    static forRoot(): ModuleWithProviders;
}
export declare class Ng2MaterialModule {
    static forRoot(): ModuleWithProviders;
}
export default Ng2MaterialModule;
