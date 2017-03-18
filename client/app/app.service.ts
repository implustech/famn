import * as feathers from 'feathers/client'
import * as socketio from 'feathers-socketio/client'
const io = require('socket.io-client')
const hooks = require('feathers-hooks')
import * as authentication from 'feathers-authentication-client'

import RxJS from 'rxjs'

import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { helpers } from '../config/helpers'

@Injectable()
export class SocketService {
  public socket: any
  public app: any

  constructor() {
    this.socket = io(helpers.getHost())
    this.app = feathers()
      .configure(socketio(this.socket))
      .configure(hooks())
      .configure(authentication({
        cookie: 'famn-jwt',
        storageKey: 'famn-jwt',
        storage: window.localStorage
      }))
  }

  getService(service) {
    return this.app.service(service)
  }

  authenticate(option?: any) {
    return this.app.authenticate(option)
  }

  logout() {
    // feathers-authentication-client will bind logout method to app
    // app.logout = app.passport.logout.bind(app.passport);
    return this.app.logout()
  }

  getUser() {
    return this.app.get('user')
  }

  getToken() {
    return this.app.get('token')
  }

  isLogin() {
    return this.getUser() ? true : false
  }
}



@Injectable()
/**
 * AuthGuard service is to provide client side router authorization
 */
export class AuthGuard implements CanActivate {
  constructor(private _socketService: SocketService, private _router: Router) { }

  canActivate() {
    // if (this._socketService.isLogin()) return true
    // this._router.navigate(['/'])
    // return false
    return this._socketService.isLogin() || this._socketService.authenticate()
      .then(res => this._socketService.app.passport.verifyJWT(res.accessToken))
      .then(payload => this._socketService.app.service('users').get(payload.userId))
      .then(user => this._socketService.app.set('user', user))
      .then(res => true)
      .catch(err => {
        this._router.navigate(['/login']
        )
      })
  }
}

