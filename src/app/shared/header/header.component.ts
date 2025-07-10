import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  //#region attributes
  showMenu: boolean = false; //toggleFlag for (click) at user -> opens user-menu
  isMobile: boolean = false; //toggleFlag, adds "Help" to user-menu


  //#endregion

  //#region methods
  toggleMenu(): void { //simple toggle-function to change the state of showMenu
    this.showMenu = !this.showMenu;
  }

  ngOnInit(): void { //checks, if the user-menu should show "help" or not "onload"
    this.checkIfMobile();
  }

  checkIfMobile(): void { //changes state of isMobile depending on the current screen-size -> limit is 820px in width,, smaller than 820px shows help in user-menu
    this.isMobile = window.innerWidth <= 820;
  }

  @HostListener('window:resize') onResize() { //changes state of isMobile dynamically 
    this.checkIfMobile();
  }

  //#endregion
}
