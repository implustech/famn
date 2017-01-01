import { NgModule, ApplicationRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { MaterialModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'



/**
 * Import toplevel component/providers/directives/pipes
 */
import { ModComponent } from './module.component'
import { FooterComponent } from '../shared/footer/footer.component'
import { HomeComponent } from './home/home.component'

import { ModuleService, NavigationService, VersionService } from '../shared/index'
import { ROUTES } from './module.routes'

const APP_PROVIDERS = [
  ModuleService,
  NavigationService,
  VersionService,
]

@NgModule({
  declarations: [
    ModComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    HttpModule,
    CommonModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forChild(ROUTES),
  ],
  providers: [
    ...APP_PROVIDERS,
    // SocketService,
    // AuthGuard
  ]
})

export class ModModule {
  constructor() { }
}
