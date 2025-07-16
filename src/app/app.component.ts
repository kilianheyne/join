import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { ContactpageComponent } from "./contactpage/contactpage.component";
import { SidebarMobileComponent } from "./shared/sidebar-mobile/sidebar-mobile.component";
import { FirebaseService } from './shared/services/firebase.service';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  imports: [TaskComponent, RouterOutlet, ContactpageComponent, HeaderComponent, SidebarComponent, SidebarMobileComponent],
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
