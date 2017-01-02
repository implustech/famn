import { ModComponent } from './module.component'
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
        loadChildren: './dashboard/index#DashboardModule'
      },
      {
        path: 'message',
        loadChildren: './message/index#MessageModule'
      }
    ]
  },
]
