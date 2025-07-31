import { Component } from '@angular/core';
import { AddTaskComponent } from "../board/add-task/add-task.component";
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-screen',
  imports: [AddTaskComponent, BlackButtonComponent, LoginFormComponent, SignUpFormComponent, CommonModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent {
  showSignUp = false;

  toggleForm() {
    this.showSignUp = !this.showSignUp;
  }
}
