import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //#region attributes
  showMenu: boolean = false; //toggleFlag for (click) at user -> opens user-menu
  isMobile: boolean = false; //toggleFlag, adds "Help" to user-menu


  //#endregion

  //#region methods
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }


  //#endregion
}
