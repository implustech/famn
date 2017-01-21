import { Component, OnInit } from '@angular/core'
import { SocketService } from '../../app.service'
import { MdSnackBar } from '@angular/material'

@Component({
  selector: 'setting-password-cmp',
  templateUrl: 'password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  private usersService
  private user
  private password
  private confirmPassword
  private isPasswordDiff = false

  constructor(
    private socketService: SocketService,
    private snackBar: MdSnackBar

  ) {
    this.usersService = socketService.getService('users')
    this.user = socketService.getUser()
  }

  ngOnInit() { }

  onSubmit() {
    if (this.password && this.password !== this.confirmPassword) this.isPasswordDiff = true
    else {
      this.usersService.patch(this.user._id, {
        password: this.password
      })
        .then(res => {
          this.snackBar.open('Password has been updated', '', {
            duration: 800
          })
          this.isPasswordDiff = false
          this.password = ''
          this.confirmPassword = ''
        })
        .catch(err => {
          console.error(err)
        })
    }

  }
}
