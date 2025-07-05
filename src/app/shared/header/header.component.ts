import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-header',
  imports: [SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
