import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar-mobile',
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss'
})
export class SidebarMobileComponent {
  userLoggedIn: boolean = false;
  isGuestUser: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkUserLogin();
    this.isGuestUser = this.authService.isGuestUser();
  }

  checkUserLogin() {
    if (this.authService.checkLocalStorageExist(this.authService.timestampName)) {
      this.userLoggedIn = true;
    }
  }
}
