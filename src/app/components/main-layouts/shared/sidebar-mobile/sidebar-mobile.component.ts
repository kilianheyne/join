import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-mobile',
  imports: [RouterLink, RouterModule, CdkDragPlaceholder, CommonModule],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss'
})
export class SidebarMobileComponent {

  isLoggedIn: boolean = false;
}
