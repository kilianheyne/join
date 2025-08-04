import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
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
