import { Component, OnInit } from '@angular/core'
import { MdDialog, MdDialogRef } from '@angular/material'

import { UserService } from './user.service'

@Component({
  selector: 'user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // users: {email: string, password: string, roles: string[]}[] = []
  users: any[]

  constructor(
    private dialog: MdDialog,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.findUsers()
  }

  findUsers() {
    this.userService.findUsers().subscribe(users => {
      this.users = users
    })
  }

  addUser() {
    let newUser = {
      roles: []
    }
    this.openUserDialog(newUser, 'new')
      .subscribe(user => {
        if (!user) return
        this.userService.createUser(user)
          .subscribe(res => {
            console.log('add user', res),
            this.findUsers()
          })
      })
  }


  removeUser(id) {
    this.userService.removeUser(id).subscribe(res => {
      console.log('remove user', res)
      this.findUsers()
    })
  }

  updateUser(user) {
    this.openUserDialog(user, 'update')
      .subscribe(user => {
        if (!user) return
        this.userService.updateUser(user._id, user)
          .subscribe(res => {
            console.log('update user', res),
            this.findUsers()
          })
      })
  }

  openUserDialog(user, mode) {
    let dialogRef = this.dialog.open(DialogAddUserComponent, {
      width: '500px',
      height: '300px'
    })
    dialogRef.componentInstance.user = JSON.parse(JSON.stringify(user))
    dialogRef.componentInstance.mode = mode

    return dialogRef.afterClosed()
  }
}


@Component({
  selector: 'dialog-user',
  templateUrl: './dialog/addUser.html',
  styleUrls: ['./dialog/addUser.scss']
})
export class DialogAddUserComponent {
  user: any
  mode: string
  roles: string[]

  constructor(public dialogRef: MdDialogRef<DialogAddUserComponent>) {
    this.roles = ['ADMIN', 'BUSINESS', 'OPERATION']
  }

}
