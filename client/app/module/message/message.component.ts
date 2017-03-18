import { Component, OnInit, OnDestroy } from '@angular/core'
import { MessageService } from './message.service'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { GridOptions } from 'ag-grid/main'

@Component({
  selector: 'message',
  templateUrl: 'message.component.html',
  providers: [MessageService]
})

export class MessageComponent implements OnInit, OnDestroy {
  private message$: Observable<any>
  private messageSubscription: any
  public gridOptions: GridOptions
  public columnDefs: any[]
  public messages = []
  public email: string
  public message: string

  constructor(private _store: Store<any>,
    private messageService: MessageService) {

    this.message$ = this._store.select('message')

    this.messageSubscription = this.message$.subscribe((messages: any[]) => {
        this.messages = messages
        this.createDataSource()
      })

    this.messageService.resource$.subscribe(res => {
      switch (res.type) {
        case 'find':
          this._store.dispatch({
            type: 'MESSAGE_INIT',
            payload: res.messages
          })
          break
        case 'created':
          // this._store.dispatch({
          //   type: 'MESSAGE_UPDATE',
          //   payload: res.messages
          // })
          this.messageService.findMessages()
          break
        default:
          break
      }
    })

    // ag-grid initialization
    this.gridOptions = <GridOptions>{}
    this.columnDefs = this.createColumnDefs()
    this.email = 'anonymous'
    this.message = ''
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe()
    this.messageService.off()
  }

  onGridReady() {
    this.gridOptions.api.sizeColumnsToFit()
    this.messageService.findMessages()
  }

  createColumnDefs() {
    return [
      {
        headerName: 'Email',
        field: 'email'
      },
      {
        headerName: 'Message',
        field: 'message'
      },
      {
        headerName: 'Created Time',
        field: 'createdAt'
      },
      {
        headerName: 'Updated Time',
        field: 'updatedAt'
      }
    ]
  }


  createDataSource() {
    if (!this.gridOptions) return
    let dataSource = {
      rowCount: -1,
      getRows: params => {
        let rowsThisPage = this.messages.slice(params.startRow, params.endRow)
        let lastRow = -1
        if (this.messages.length <= params.endRow) {
          lastRow = this.messages.length
        }
        params.successCallback(rowsThisPage, this.messages.length)
      }
    }

    this.gridOptions.api.setDatasource(dataSource)
  }

  createMessage() {
    this.messageService.createMessage({
      email: this.email,
      message: this.message
    })

  }
}
