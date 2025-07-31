import { Component } from '@angular/core';
import { BlackButtonComponent } from "../../general/black-button/black-button.component";
import { WhiteButtonComponent } from "../../general/white-button/white-button.component";

@Component({
  selector: 'app-login-form',
  imports: [BlackButtonComponent, BlackButtonComponent, WhiteButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  showPassword: boolean = false;
  inputInFocus: boolean = false;

  togglePassword() {
    if (this.inputInFocus) {
      this.showPassword = !this.showPassword;
    }
  }

}
