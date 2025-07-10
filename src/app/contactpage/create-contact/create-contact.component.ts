import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteButtonComponent } from "../../general/white-button/white-button.component";
import { BlackButtonComponent } from '../../general/black-button/black-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { Contact } from '../../shared/interfaces/contact';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-create-contact',
  imports: [CommonModule, FormsModule, WhiteButtonComponent, BlackButtonComponent],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.scss',
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('600ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CreateContactComponent {
  firebaseService = inject(FirebaseService)

  @Input() isVisible = false;

  @Output() contactCreated = new EventEmitter();

  contactFormData: Contact = {
    name: '',
    email: '',
    phone: '',
  }

  createContact(createContactForm: NgForm) {
    if (createContactForm.valid && createContactForm.submitted) {
      this.firebaseService.addContactToDatabase(this.contactFormData);
      createContactForm.resetForm();
      this.closeForm();
      this.contactCreated.emit();
    }
  }

  cancelForm(createContactForm: NgForm) {
    createContactForm.resetForm();
    this.closeForm();
  }

  closeForm() {
    this.isVisible = false;
  }
}
