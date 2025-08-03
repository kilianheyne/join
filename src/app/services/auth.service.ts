import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timestampName = 'joinAuthTimestamp';
  contactInfoName = 'joinContactInfo';
  guestCheckName = 'joinIsGuest';

  constructor(private router: Router) {

  }

  checkAuthenticationValid() {
    if (!this.isTimestampValid(this.timestampName)) {
      this.logout();
    }
  }

  isTimestampValid(key: string): boolean {
    const value = localStorage.getItem(key);
    if (!value) return false;

    const expiry = parseInt(value, 10);
    if (isNaN(expiry)) return false;

    return Date.now() <= expiry;
  }

  setTimestamp(key: string, minutesValid: number = 30): void {
    const expiry = Date.now() + minutesValid * 60 * 1000;
    this.saveInLocalStorage(key, expiry.toString());
  }

  checkLocalStorageExist(key: string): boolean {
    const value = localStorage.getItem(key);
    if (value) return true;

    return false;
  }

  getUserInfoFromLocalStorage(): Contact | undefined {
    const userInfoAsJson = localStorage.getItem(this.contactInfoName);
    if (userInfoAsJson) {
      return JSON.parse(userInfoAsJson)
    }

    return undefined;
  }

  getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  saveInLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  isGuestUser() {
    if (this.getFromLocalStorage(this.guestCheckName) === 'true') {
      return true;
    }

    return false;
  }

  logout() {
    this.removeFromLocalStorage(this.timestampName);
    this.removeFromLocalStorage(this.contactInfoName);
    this.removeFromLocalStorage(this.guestCheckName);
    this.router.navigate(['/login']);
  }
}
