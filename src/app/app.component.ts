import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { SidebarMobileComponent } from "./shared/sidebar-mobile/sidebar-mobile.component";
import { FirebaseService } from './services/firebase.service';
import { HelpPageComponent } from "./help-page/help-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, SidebarMobileComponent, HelpPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'join';

  firebase = inject(FirebaseService);

  constructor() {
    this.firebase;
  }
}
