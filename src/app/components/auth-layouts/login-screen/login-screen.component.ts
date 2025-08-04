import { Component, OnInit } from '@angular/core';
import { BlackButtonComponent } from "../../../components/general/black-button/black-button.component";
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-screen',
  imports: [BlackButtonComponent, LoginFormComponent, SignUpFormComponent, CommonModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit {
  showSignUp = false;
  showAnimation = true;
  animateLogo = false;

  ngOnInit() {
    // Starte Animation nach kleiner Verzögerung
    setTimeout(() => {
      this.animateLogo = true;
    }, 100); // minimale Verzögerung für sauberen Start

    // Beende Animation nach 1 Sekunde
    setTimeout(() => {
      this.showAnimation = false;
    }, 1100);
  }

  toggleForm() {
    this.showSignUp = !this.showSignUp;
  }
}
