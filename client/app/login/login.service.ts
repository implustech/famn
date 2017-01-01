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
  private _app

  constructor(private _socketService: SocketService) {
    this._app = this._socketService.app


    // this.item$ is a public observable for components to subscribe
    // this.resource$ = new Observable(observable => this._observable = observable)
  }


  // authentication from 'local' by email and password
  loginLocal(user: User) {
    let option = Object.assign({}, { strategy: 'local' }, user)
    return this.deriveUser(option)
  }

  // authentical from the token in localStorage
  loginToken(): any {
    return this.deriveUser({})
  }

  deriveUser(option: any): any {
    return this._socketService.authenticate(option)
      .then(res => {
        return this._app.passport.verifyJWT(res.accessToken)
      })
      .then(payload => {
        return this._app.service('users').get(payload.userId)
      })
      .then(user => {
        return this._app.set('user', user)
      })
  }
}
