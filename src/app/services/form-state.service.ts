import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormStateService {
    savedLoginFormData: any = null;
    savedSignupFormData: any = null;
    savedPassword: any = null;
    savedPasswordConfirmation: any = null;
}