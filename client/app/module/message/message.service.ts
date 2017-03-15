import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { SocketService } from '../../app.service'
import 'rxjs/add/observable/fromPromise'


@Injectable()
export class MessageService {
  public resource$: Observable<any>
  private _observable
  private socketMessagesService

  constructor(private _socketService: SocketService) {
    this.socketMessagesService = _socketService.getService('messages')

    // this.item$ is a public observable for components to subscribe
    this.resource$ = new Observable(observable => this._observable = observable)

    this.socketMessagesService.on('created', res => {
      this._observable.next({
        type: 'created',
        messages: res
      })
    })
  }

  findMessages() {
    this.socketMessagesService.find({
      query: {
        $sort: {createdAt: -1}
      }
    }).then(res => {
      this._observable.next({
        type: 'find',
        messages: res.data
      })
    })
  }

  createMessage(data) {
    Observable.fromPromise(this.socketMessagesService.create(data))
      .catch(this.handleError)
  }


  handleError(err: Response | any) {
    err = err instanceof Response ? err.json() : err.toString()
    console.error(err)
    return Observable.throw(err)
  }

  off() {
    this.socketMessagesService.removeAllListeners('created')
  }

}
