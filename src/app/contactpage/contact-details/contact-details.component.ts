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

  backgroundColors: string[] = [
    '#0038FF', '#00BEE8', '#1FD7C1', '#6E52FF', '#9327FF',
    '#C3FF2B', '#FC71FF', '#FF4646', '#FF5EB3', '#FF745E',
    '#FF7A00', '#FFA35E', '#FFBB2B', '#FFC701', '#FFE62B'
  ];
  
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

  getBgColorForCircle(name: string) {
    let cache = 0;
    for (let i = 0; i < name.length; i++){
      cache = name.charCodeAt(i) + ((cache << 5) - cache);
    }
    const index = Math.abs(cache) % this.backgroundColors.length;
    return this.backgroundColors[index];
  }
}
