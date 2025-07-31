import { CommonModule } from "@angular/common";
import { Component, Output, EventEmitter } from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { BlackButtonComponent } from "../../general/black-button/black-button.component";


export function fullNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.trim();
  const isValid = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/.test(value);
  return isValid ? null : { fullName: true };
}

export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.trim();
  const isValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value);
  return isValid ? null : { strictEmail: true };
}


@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [BlackButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, fullNameValidator]],
      email: ['', [Validators.required, strictEmailValidator]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });

  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  @Output() goBack = new EventEmitter<void>();


  showPassword: boolean = false;
  inputInFocus: boolean = false;

  showConPassword:boolean = false;
  conInputInFocus:boolean = false;
  

  triggerGoBack() {
    this.goBack.emit();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted', this.signupForm.value);
      this.triggerGoBack();
    } else {
      console.log('Form is invalid');
    }
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
