import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { MaterialModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'


import { UserComponent, DialogAddUserComponent } from './user.component'
import { UserService } from './user.service'

import { ROUTES } from './user.routes'


@NgModule({
  declarations: [
    UserComponent,
    DialogAddUserComponent,
  ],
  entryComponents: [
    DialogAddUserComponent,
  ],
  providers: [
    UserService
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forChild(ROUTES),
  ],
})
export class UserModule {
  constructor() { }
}
