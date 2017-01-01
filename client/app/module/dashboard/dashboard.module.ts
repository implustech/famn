import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

/**
 * Import @angular/material, ng2-material
 */
import { MaterialModule } from '@angular/material'
// import { Ng2MaterialModule } from '../../../vendor/ng2-material'
import { Ng2MaterialModule } from 'ng2-material'

import { DashboardComponent } from './dashboard.component'
import { TodoComponent } from '../../widgets/todo'

import { ROUTES } from './dashboard.routes'


@NgModule({
  declarations: [
    DashboardComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot(),
    Ng2MaterialModule.forRoot(),
    RouterModule.forChild(ROUTES),
  ]
})
export default class DashboardModule {
  constructor() { }
}
