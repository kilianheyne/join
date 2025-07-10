import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { getContactInitials } from '../../utils/helpers';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  firebaseService = inject(FirebaseService)
  contactId?: string = '';
  
  @Input() contact: any;

  @Input() isVisible: boolean = false;

  @Output() openEditContactForm = new EventEmitter();

  @Output() contactDeleted = new EventEmitter();

  openEditForm() {
    this.openEditContactForm.emit();
  }

  getContactInitials(fullName: string) {
    return getContactInitials(fullName);
  }

  deleteContact(contactId: string) {
    if (contactId) {
      this.firebaseService.deleteContactFromDatabase(contactId);
      this.contactDeleted.emit();
    }
  }
}
