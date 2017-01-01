import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SignupService } from './signup.service'


/**
 * This class represents the lazy loaded SignupComponent.
 */
@Component({
  selector: 'signup-cmp',
  providers: [SignupService],
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  private userModel = {}

  constructor(private router: Router, private signupService: SignupService) {}
  onSubmit() {
    this.signupService.signup(this.userModel).then(res => {
      if (res) this.router.navigate(['/'])
    })
  }
}
