import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { SocketService } from '../../app.service'


@Injectable()
export class MessageService {
  public resource$: Observable<any>
  private _observable
  private _messageService

  constructor(private _socketService: SocketService) {
    this._messageService = _socketService.getService('messages')

    // this.item$ is a public observable for components to subscribe
    this.resource$ = new Observable(observable => this._observable = observable)

    this._messageService.on('created', res => {
      this._observable.next({
        type: 'created',
        messages: res
      })
    })
  }


  findOffers() {
    this._messageService.find().then(res => {
      this._observable.next({
        type: 'find',
        messages: res.data
      })
    })
  }

}
