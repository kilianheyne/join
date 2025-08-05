import { CommonModule } from "@angular/common";
import { Component, Output, EventEmitter, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { BlackButtonComponent } from "../../../../components/general/black-button/black-button.component";
import { TrimOnBlurDirective } from '../../../../directives/trim-on-blur.directive';
import { Contact } from "../../../../interfaces/contact";
import { Router, RouterLink, RouterModule } from '@angular/router';
import { getBgColorForCircle, getContactInitials } from "../../../../utils/helpers";
import { FirebaseService } from "../../../../services/firebase.service";
import { getDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [BlackButtonComponent, CommonModule, FormsModule, TrimOnBlurDirective, RouterLink, RouterModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  passwordData = '';
  confirmPasswordData = '';
  privacyPolicyData: boolean = false;
  signupFormData: Contact = {
    name: '',
    email: '',
    password: '',
  }

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) { }

  @Output() goBack = new EventEmitter<void>();

  showPassword: boolean = false;
  inputInFocus: boolean = false;

  showConPassword: boolean = false;
  conInputInFocus: boolean = false;

  triggerGoBack() {
    this.goBack.emit();
  }

  checkPasswordMatch() {
    return this.passwordData === this.confirmPasswordData
  }

  getContactInitials(fullName: string) {
    return getContactInitials(fullName);
  }

  getBgColorForCircle(name: string) {
    return getBgColorForCircle(name);
  }

  signupUser(signupForm: NgForm) {
    if (signupForm.valid && signupForm.submitted && this.checkPasswordMatch()) {
      this.signupFormData.color = this.getBgColorForCircle(this.signupFormData.name);
      this.signupFormData.avatar = this.getContactInitials(this.signupFormData.name);
      if (this.passwordData) {
        this.signupFormData.password = CryptoJS.MD5(this.passwordData).toString();
      }

      this.firebaseService.addDataToDatabase<Contact>('contacts', this.signupFormData).then(async (docRef) => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.redirectUserToPanel();
        }
      });
    }
  }

  redirectUserToPanel() {
    this.authService.setTimestamp(this.authService.timestampName);
    this.authService.saveInLocalStorage(this.authService.contactInfoName, JSON.stringify({
      'name': this.signupFormData.name,
      'email': this.signupFormData.email,
      'avatar': this.signupFormData.avatar,
      'color': this.signupFormData.color,
    }));
    this.authService.saveInLocalStorage(this.authService.guestCheckName, 'false');
    this.router.navigate(['/summary']);
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
