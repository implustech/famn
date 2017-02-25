import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from './login.service'

@Component({
  selector: 'login-cmp',
  providers: [LoginService],
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public user: any = {}
  public showLogin: boolean = false

  constructor(private _router: Router, private _loginService: LoginService) {}

  ngOnInit() {
    this._loginService.loginToken()
      .then(res => {
        this._router.navigate(['/module'])
      })
      .catch(err => {
        // No token in localStorage, should go local authentication way
        this.showLogin = true
      })
  }

  onSubmit() {
    this._loginService.loginLocal(this.user)
      .then(res => {
        this._router.navigate(['/module'])
      })
      .catch(err => {
        console.log(err)
      })
  }
}
