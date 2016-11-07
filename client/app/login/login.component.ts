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
  constructor(private router: Router, private loginService: LoginService) {}
  user: any = {}

  // ngOnInit() {
  ngOnInit() {
    this.loginService.loginToken()
      .then(res => {
        this.router.navigate(['/module', 'home'])
      })
      .catch(err => {
        // No token in localStorage, should go local authentication way
      })

  }

  onSubmit() {
    this.loginService.loginLocal(this.user)
      .then(res => {
        this.router.navigate(['/module', 'home'])
      })
      .catch(err => {
        console.log(err)
      })
  }
}
