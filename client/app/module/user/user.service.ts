import { Injectable } from '@angular/core'
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/fromPromise'


import { SocketService } from '../../app.service'

@Injectable()
export class UserService {
  private socketUsersService

  constructor(
    private socketService: SocketService
  ) {
    this.socketUsersService = socketService.getService('users')
  }

  findUsers() {
    return Observable.fromPromise(this.socketUsersService.find())
      .map(res => res.data)
      .catch(this.handleError)
  }

  createUser(data) {
    return Observable.fromPromise(this.socketUsersService.create(data))
      .catch(this.handleError)
  }

  updateUser(id, data) {
    return Observable.fromPromise(this.socketUsersService.update(id, data))
      .catch(this.handleError)
  }


  removeUser(id) {
    return Observable.fromPromise(this.socketUsersService.remove(id))
      .catch(this.handleError)
  }

  handleError(err: Response | any) {
    err = err instanceof Response ? err.json() : err.toString()
    console.error(err)
    return Observable.throw(err)
  }
}
