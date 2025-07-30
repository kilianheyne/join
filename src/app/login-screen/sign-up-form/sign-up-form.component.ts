
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
   triggerGoBack() {
    this.goBack.emit();
  }
}
