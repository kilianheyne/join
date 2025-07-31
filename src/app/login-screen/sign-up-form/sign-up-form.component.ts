
import { BlackButtonComponent } from "../../general/black-button/black-button.component";
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [BlackButtonComponent],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  @Output() goBack = new EventEmitter<void>();

  showPassword: boolean = false;
  inputInFocus: boolean = false;

  showConPassword:boolean = false;
  conInputInFocus:boolean = false;
  
  triggerGoBack() {
    this.goBack.emit();
  }

  hidePassword() {
    this.showPassword = false;
    this.inputInFocus = false;
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }

  hideConPassword() {
    this.showConPassword = false;
    this.conInputInFocus = false;
  }

  toggleConPassword(event: MouseEvent) {
    event.preventDefault();
    this.showConPassword = !this.showConPassword;
  }
}
