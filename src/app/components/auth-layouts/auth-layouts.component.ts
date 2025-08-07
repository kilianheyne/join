import { Router, RouterModule, NavigationEnd } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { BlackButtonComponent } from "../../components/general/black-button/black-button.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-auth-layouts',
  imports: [RouterModule, BlackButtonComponent, CommonModule, RouterLink],
  templateUrl: './auth-layouts.component.html',
  styleUrl: './auth-layouts.component.scss'
})
export class AuthLayoutsComponent implements OnInit {
  showSignUp = false;
  showAnimation = true;
  animateLogo = false;

  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.checkSignupPage();
    this.assignAnimationVariableValues();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
      this.checkSignupPage();
    });
    this.handleAnimationLogo();
  }

  checkSignupPage() {
    if (this.currentUrl == '/signup') {
      this.showSignUp = true;
    } else {
      this.showSignUp = false;
    }
  }

  assignAnimationVariableValues() {
    if (this.currentUrl == '/signup') {
      this.showAnimation = false;
      this.animateLogo = true;
    }
  }

  handleAnimationLogo() {
    if (this.currentUrl != '/signup') {
      // Starte Animation nach kleiner Verzögerung
      setTimeout(() => {
        this.animateLogo = true;
      }, 100); // minimale Verzögerung für sauberen Start

      // Beende Animation nach 1 Sekunde
      setTimeout(() => {
        this.showAnimation = false;
      }, 1100);
    }
  }
}
