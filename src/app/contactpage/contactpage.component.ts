import { Component, inject, ViewChild } from '@angular/core';
import { CreateContactComponent } from "./create-contact/create-contact.component";
import { Contact } from '../shared/interfaces/contact';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { CommonModule } from '@angular/common';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { FirebaseService } from '../shared/services/firebase.service';
import { ContactPageNotificationComponent } from "../general/contact-page-notification/contact-page-notification.component";
import { getContactInitials, showContactNotification } from '../utils/helpers';

@Component({
  selector: 'app-contactpage',
  imports: [ContactDetailsComponent, CreateContactComponent, CommonModule, BlackButtonComponent, EditContactComponent, ContactPageNotificationComponent],
  templateUrl: './contactpage.component.html',
  styleUrl: './contactpage.component.scss'
})

export class ContactpageComponent {

  // #region attributes
  firebaseService = inject(FirebaseService);

  @ViewChild('createContact') private createContact!: CreateContactComponent;

  @ViewChild('editContact') private editContact!: EditContactComponent;

  @ViewChild('contactPageNotification') private contactPageNotification!: ContactPageNotificationComponent;

  isDetailsVisible = false;
  selectedContact: any = {
    id: '',
    name: '',
    email: '',
    phone: ''
  };
  isOverlayActive: boolean = false;
  isEditVisible: boolean = false;

  backgroundColors: string[] = [
    '#0038FF', '#00BEE8', '#1FD7C1', '#6E52FF', '#9327FF',
    '#C3FF2B', '#FC71FF', '#FF4646', '#FF5EB3', '#FF745E',
    '#FF7A00', '#FFA35E', '#FFBB2B', '#FFC701', '#FFE62B'
  ]
  // #endregion

  // #region methods
  openCreateContactForm() {
    this.createContact.isVisible = true;
  }

  openEditContactForm(contactId: string) {    
    this.editContact.openForm(contactId)
  }

  showContactDetails(contact: any) {
    this.selectedContact = contact;
    this.isDetailsVisible = true;
  }

  closeOverlay() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }

  openEditMenuMobile() {
    this.isEditVisible = !this.isEditVisible;
  }

  getContactInitials(fullName: string) {
    return getContactInitials(fullName);
  }

  getBgColorForCircle(name: string) {
    let cache = 0;
    for (let i = 0; i < name.length; i++) {
      cache = name.charCodeAt(i) + ((cache << 5) - cache);
    }
    const index = Math.abs(cache) % this.backgroundColors.length;
    return this.backgroundColors[index];
  }

  get uniqueInitials(): string[] {
    const initialsSet = new Set<string>();
    for (const contact of this.firebaseService.contactsList) {
      const initial = contact.name.charAt(0).toUpperCase();
      initialsSet.add(initial);
    }

    return Array.from(initialsSet).sort((a, b) =>
      a.localeCompare(b, 'de', { sensitivity: 'base' })
    );
  }

  getContactsByInitial(initial: string): Contact[] {
    return this.firebaseService.contactsList.filter(contact =>
      contact.name.charAt(0).toUpperCase() === initial
    );
  }

  onContactCreated(contact: Contact) {
    const found = this.firebaseService.contactsList.find(newContact => newContact.id === contact.id);
    if (found) {
      this.selectedContact = found;
    } else {
      this.selectedContact = contact;
    }
    this.isDetailsVisible = true;
    this.showCreateContactNotification();
  }

  showCreateContactNotification() {
    showContactNotification(this.contactPageNotification, 'Contact successfully created');
  }

  showUpdateContactNotification() {
    showContactNotification(this.contactPageNotification, 'Contact successfully updated');
  }

  showDeleteContactNotification() {
    this.isDetailsVisible = false;
    showContactNotification(this.contactPageNotification, 'Contact successfully deleted');
  }

  // #endregion
}
