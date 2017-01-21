import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { MaterialModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'



import { ProfileComponent }   from './profile.component'
import { PasswordComponent }   from './password.component'
import { routes } from './setting.routes'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
  ],
  exports: [],
  declarations: [
    ProfileComponent,
    PasswordComponent
  ],
  providers: [],
})
export class SettingModule { }
