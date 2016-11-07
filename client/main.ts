/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { decorateModuleRef } from './app/env'
import { bootloader } from '@angularclass/hmr'
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app'

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err))
}

// needed for hmr
// in prod this is replace for document ready
if (process.env.ENV === 'development') bootloader(main)
else platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err))

