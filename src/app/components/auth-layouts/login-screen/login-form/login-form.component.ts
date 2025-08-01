import { Component } from '@angular/core';
import { BlackButtonComponent } from "../../../../components/general/black-button/black-button.component";
import { WhiteButtonComponent } from "../../../../components/general/white-button/white-button.component";

@Component({
  selector: 'app-login-form',
  imports: [BlackButtonComponent, WhiteButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  showPassword: boolean = false;
  inputInFocus: boolean = false;

  togglePassword(event: MouseEvent) {
    if (this.inputInFocus) {
      event.preventDefault();
      this.showPassword = !this.showPassword;
    }
  }

  hidePassword() {
    this.showPassword = false;
    this.inputInFocus = false;
  }
}
