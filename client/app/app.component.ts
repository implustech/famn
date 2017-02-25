import { Component, ViewEncapsulation  } from '@angular/core'

// import { AppStore } from './app.store'
@Component({
  selector: 'famn-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  // constructor(public appStore: AppStore) {
  public _isDev: boolean = ENV === 'development' ? true : false
  constructor() {
    console.log('welcome to FAMN')
  }
}
