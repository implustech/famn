import { Injectable } from '@angular/core'
// import { Observable } from 'rxjs/Observable'
import { SocketService } from '../app.service'


@Injectable()
export class SignupService {
  // public item$: Observable<any>
  // private _observable
  private userService

  constructor(private userServiceService: SocketService) {
    // get featheres service
    this.userService = userServiceService.getService('users')

    // this.item$ is a public observable for components to subscribe
    // this.item$ = new Observable(observable => this._observable = observable)
  }

  signup(user: any) {
    return this.userService.create({
      email: user.email,
      password: user.password
    })
  }
}
