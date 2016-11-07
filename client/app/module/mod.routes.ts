import { ModComponent } from './mod.component'
import { HomeComponent } from './home/home.component'


export const ROUTES = [
  {
    path: '',
    component: ModComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        loadChildren: () => System.import('./dashboard')
          .then((comp: any) => comp.default)
      },
      {
        path: 'message',
        loadChildren: () => System.import('./message')
          .then((comp: any) => comp.default)
      }
    ]
  },
]
