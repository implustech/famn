import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { PageNotFoundComponent } from './404/404.component'
import { ModModule } from './module'
import { AuthGuard } from './app.service'


function loadModModule() {
  return ModModule
}

export const ROUTES = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'module',
    loadChildren: loadModModule,
    canActivate: [AuthGuard]
  },
  {
    path: '404-page',
    component: PageNotFoundComponent,
  },
  { path: '**', redirectTo: '/404-page' }
]
