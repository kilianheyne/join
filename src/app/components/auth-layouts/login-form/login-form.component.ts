import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { BlackButtonComponent } from "../../../components/general/black-button/black-button.component";
import { WhiteButtonComponent } from "../../../components/general/white-button/white-button.component";
import { TrimOnBlurDirective } from '../../../directives/trim-on-blur.directive';
import { FirebaseService } from '../../../services/firebase.service';
import CryptoJS from 'crypto-js';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Contact } from '../../../interfaces/contact';
import { FormStateService } from '../../../services/form-state.service';

@Component({
  selector: 'app-login-form',
  imports: [BlackButtonComponent, WhiteButtonComponent, CommonModule, FormsModule, TrimOnBlurDirective],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  showPassword: boolean = false;
  inputInFocus: boolean = false;
  infoIsWrong: boolean = false;
  removeSaveData: boolean = false;

  loginFormData: {
    email: string,
    password: string
  } = {
      email: '',
      password: '',
    }

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router,
    private formStateService: FormStateService
  ) { }

  ngOnInit(): void {
    if (this.formStateService.savedLoginFormData) {
      this.loginFormData = this.formStateService.savedLoginFormData;
    }
  }

  async loginUser(loginForm: NgForm) {
    if (loginForm.valid && loginForm.submitted) {
      this.checkUserAuth(loginForm);
    }
  }

  async checkUserAuth(loginForm: NgForm) {
    const userInfo = await this.firebaseService.getContactByEmail(this.loginFormData.email);
    if (userInfo === null) {
      loginForm.resetForm();
      this.infoIsWrong = true;
    } else {
      const hashPassword = CryptoJS.MD5(this.loginFormData.password).toString();
      if (hashPassword === userInfo.password) {
        this.redirectUserToPanel(userInfo);
      } else {
        this.loginFormData.password = '';
        this.infoIsWrong = true;
      }
    }
  }

  redirectUserToPanel(userInfo: Contact) {
    this.authService.setTimestamp(this.authService.timestampName);
    this.authService.saveInLocalStorage(this.authService.contactInfoName, JSON.stringify({
      'name': userInfo.name,
      'email': userInfo.email,
      'avatar': userInfo.avatar,
      'color': userInfo.color,
    }));
    this.authService.saveInLocalStorage(this.authService.guestCheckName, 'false');
    this.removeSaveData = true;
    this.router.navigate(['/summary']);
  }

  loginAsGuest() {
    this.authService.removeFromLocalStorage(this.authService.contactInfoName);
    this.authService.setTimestamp(this.authService.timestampName);
    this.authService.saveInLocalStorage(this.authService.guestCheckName, 'true');
    this.removeSaveData = true;
    this.router.navigate(['/summary']);
  }

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

  ngOnDestroy(): void {
    this.formStateService.savedLoginFormData = this.loginFormData;
    if (this.removeSaveData) {
      this.formStateService.savedLoginFormData = null;
    }
  }
}
