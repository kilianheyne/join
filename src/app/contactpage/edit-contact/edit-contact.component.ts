import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteButtonComponent } from "../../general/white-button/white-button.component";
import { BlackButtonComponent } from '../../general/black-button/black-button.component';
import { InputComponent } from "../../general/input/input.component";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-edit-contact',
  imports: [CommonModule, WhiteButtonComponent, BlackButtonComponent, InputComponent],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss',
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
export class EditContactComponent {

  firebaseService = inject(FirebaseService)
  isEdited = false;
  selectedContactIndex: number | null = null;
  contactId?: string = '';
  editedContact = {
    name: '',
    email: '',
    phone: ''
  };
  
  @Input() isVisible = false;

  closeForm() {
    this.cancelEdit();
    this.isVisible = false;
  }

  editContact(index: number) {
    this.isEdited = true;
    this.selectedContactIndex = index;
    this.contactId = this.firebaseService.contactsList[index].id;
    this.editedContact = {
      name: this.firebaseService.contactsList[index].name,
      phone: this.firebaseService.contactsList[index].phone,
      email: this.firebaseService.contactsList[index].email
    };
  }

  saveEdit() {
    if (this.contactId) {
      this.firebaseService.updateContactInDatabase(this.contactId, this.editedContact);
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.isEdited = false;
    this.selectedContactIndex = null;
    this.contactId = '';
  }

  getContactInitials(fullName: string) {
    const names = fullName.trim().split(' ');

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    const firstInitial = names[0].charAt(0).toUpperCase();
    const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  }
}
