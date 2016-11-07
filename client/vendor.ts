// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser'
import '@angular/platform-browser-dynamic'
import '@angular/core'
import '@angular/compiler'
import '@angular/common'
import '@angular/forms'
import '@angular/http'
import '@angular/router'

// AngularClass

import '@angularclass/form-validators'
import '@angularclass/hmr'

// RxJS
import 'rxjs/Observable'
import 'rxjs/Subscription'
import 'rxjs/Subject'
import 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

// ngrx

// Custom
// import './assets/extra/jqvmap/jquery.vmap.js'
// import './assets/extra/jqvmap/jqvmap.css'
import 'perfect-scrollbar/dist/js/perfect-scrollbar.jquery.min.js'
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css'


if ('production' === ENV) {
  // Production


} else {
  // Development

}
