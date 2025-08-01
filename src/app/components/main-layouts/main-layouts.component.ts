import { Component } from '@angular/core';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarMobileComponent } from "./shared/sidebar-mobile/sidebar-mobile.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-main-layout-components',
  imports: [SidebarComponent, HeaderComponent, SidebarMobileComponent, RouterModule],
  templateUrl: './main-layouts.component.html',
  styleUrl: './main-layouts.component.scss'
})
export class MainLayoutsComponent {

}
