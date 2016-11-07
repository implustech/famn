import { Injectable } from '@angular/core'
// import { Observable } from 'rxjs/Observable'
import { SocketService } from '../app.service'


@Injectable()
export class SignupService {
  // public item$: Observable<any>
  // private _observable
  private _socket

  constructor(private _socketService: SocketService) {
    // get featheres service
    this._socket = _socketService.getService('users')

    // this.item$ is a public observable for components to subscribe
    // this.item$ = new Observable(observable => this._observable = observable)
  }

  signup(user: any) {
    return this._socket.create({
      email: user.email,
      password: user.password
    })
  }
}
