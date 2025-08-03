import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  //#region attributes
  showMenu: boolean = false; //toggleFlag for (click) at user -> opens user-menu
  isMobile: boolean = false; //toggleFlag, adds "Help" to user-menu
  userLoggedIn: boolean = false;
  userAvatar?: string = '';
  //#endregion

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void { //checks, if the user-menu should show "help" or not "onload"
    this.checkIfMobile();
    this.checkUserLogin();
  }

  checkUserLogin() {
    if (this.authService.checkLocalStorageExist(this.authService.timestampName)) {
      this.userLoggedIn = true;
      if (this.authService.getFromLocalStorage(this.authService.guestCheckName) === 'true') {
        this.userAvatar = "G";
      }
      if (this.authService.getFromLocalStorage(this.authService.guestCheckName) === 'false') {
        const userInfo = this.authService.getUserInfoFromLocalStorage();
        if (userInfo) {
          this.userAvatar = userInfo.avatar;
        }
      }
    }
  }

  logoutUser() {
    this.authService.logout();
  }

  //#region methods
  toggleMenu(): void { //simple toggle-function to change the state of showMenu
    this.showMenu = !this.showMenu;
  }

  checkIfMobile(): void { //changes state of isMobile depending on the current screen-size -> limit is 820px in width,, smaller than 820px shows help in user-menu
    this.isMobile = window.innerWidth <= 820;
  }

  @HostListener('window:resize') onResize() { //changes state of isMobile dynamically 
    this.checkIfMobile();
  }
  //#endregion
}
