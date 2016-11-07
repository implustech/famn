import { Component } from '@angular/core'
import { MessageService } from './message.service'

import { Store } from '@ngrx/store'




@Component({
  selector: 'message-module',
  templateUrl: 'message.component.html',
  providers: [MessageService]
})

export class MessageComponent {
  messages = []

  constructor(private _store: Store<any>,
    private _messageService: MessageService) {
    this._store.select('message')
      .subscribe((messages: any) => {
        // this.messages.push(...messages)
        this.messages = messages
      })

    this._messageService.resource$.subscribe(res => {
      switch (res.type) {
        case 'find':
          this._store.dispatch({
            type: 'MESSAGE_INIT',
            payload: res.messages
          })
          break
        case 'created':
          this._store.dispatch({
            type: 'MESSAGE_UPDATE',
            payload: res.messages
          })
          break
        default:
          break
      }
    })
  }

  ngOnInit() {
    this._messageService.findOffers()
  }
}
