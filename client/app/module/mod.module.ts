import { NgModule, ApplicationRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

/**
 * Import ng2-material
 */
import { MaterialModule } from '@angular/material'
import { Ng2MaterialModule } from '../../vendor/ng2-material'


/**
 * Import toplevel component/providers/directives/pipes
 */
import { ModComponent } from './mod.component'
import { FooterComponent } from '../shared/footer/footer.component'
import { HomeComponent } from './home/home.component'

import { ModuleService, NavigationService, VersionService } from '../shared/index'
// import { SocketService, AuthGuard } from './app.service'
import { ROUTES } from './mod.routes'

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
    Ng2MaterialModule.forRoot(),
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
