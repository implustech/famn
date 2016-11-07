import { Component } from '@angular/core'
import {TodoComponent, StatsComponent} from '../../../widgets'


@Component({
  selector: 'dashboard-module',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
  constructor() { }

  ngOnInit() {
    console.log('This is dashboard module')
  }
}
