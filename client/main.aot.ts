/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { decorateModuleRef } from './app/env'
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory'


/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModuleNgFactory)
    .then(decorateModuleRef)
    .catch(err => console.error(err))
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
