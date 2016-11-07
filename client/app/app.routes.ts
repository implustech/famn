import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { PageNotFoundComponent } from './404/404.component'
import ModModule from './module'


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
    path: 'module', loadChildren: () => ModModule
    // loadChildren: () => System.import('./module')
    //   .then((comp: any) => comp.default)
    // canActivate: [AuthGuard]
  },
  {
    path: '404-page',
    component: PageNotFoundComponent,
    // loadChildren: () => System.import('./+404')
    //   .then((comp: any) => comp.default)
  },
  { path: '**', redirectTo: '/404-page' }
]
