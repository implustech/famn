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
        path: 'setting',
        loadChildren: './setting/setting.module#SettingModule'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/index#DashboardModule'
      },
      {
        path: 'message',
        loadChildren: './message/index#MessageModule'
      },
      {
        path: 'user',
        loadChildren: './user/index#UserModule'
      }
    ]
  },
]
