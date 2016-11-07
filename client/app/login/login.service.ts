import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { SocketService } from '../app.service'

interface User {
  email: String,
  password: String
}

@Injectable()
export class LoginService {
  // public resource$: Observable<any>
  // private _observable

  constructor(private _socketService: SocketService) {

    // this.item$ is a public observable for components to subscribe
    // this.resource$ = new Observable(observable => this._observable = observable)
  }


  // authentication from 'local' by email and password
  loginLocal(user: User) {
    let option = Object.assign({}, {type: 'local'}, user)
    return this._socketService.authenticate(option)
  }

  // authentical from the token in localStorage
  loginToken(): any {
    // return this._app.authenticate()
    return this._socketService.authenticate()
  }
}
