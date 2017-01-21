import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProfileComponent } from './profile.component'
import { PasswordComponent } from './password.component'

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'password', component: PasswordComponent },
    ]
  },
]
