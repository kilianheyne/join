import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EditContactComponent } from "../edit-contact/edit-contact.component";
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-contact-details',
  imports: [EditContactComponent],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  firebaseService = inject(FirebaseService)
  isEdited = false;
  selectedContactIndex: number | null = null;
  contactId?: string = '';
  editedContact = {
    name: '',
    email: '',
    phone: ''    
  };
  
  @Input() contact: any;

  @Input() isVisible: boolean = false;

  @Output() openEditContactForm = new EventEmitter();

  @Output() contactDeleted = new EventEmitter();

  openEditForm() {
    this.openEditContactForm.emit();
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

  deleteContact(contactId: string) {
    if (contactId) {
      this.firebaseService.deleteContactFromDatabase(contactId);
      this.contactDeleted.emit();
    }
  }
}
