import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'page-not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})

export class PageNotFoundComponent {
  constructor(private _router: Router) { }
  gotoHome() {
    this._router.navigate(['/module', 'home'])
  }
}
