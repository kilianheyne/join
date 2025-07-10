import { Component, inject, ViewChild } from '@angular/core';
import { CreateContactComponent } from "./create-contact/create-contact.component";
import { Contacts } from '../shared/interfaces/contacts';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { CommonModule } from '@angular/common';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-contactpage',
  imports: [ContactDetailsComponent, CreateContactComponent, CommonModule, BlackButtonComponent, EditContactComponent],
  templateUrl: './contactpage.component.html',
  styleUrl: './contactpage.component.scss'
})

export class ContactpageComponent {

  // #region attributes
  firebaseService = inject(FirebaseService);

  @ViewChild('createContact') private createContact!: CreateContactComponent;

  @ViewChild('editContact') private editContact!: EditContactComponent;

  isDetailsVisible = false;
  selectedContact: any = null;
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

  openEditContactFormINFather() {
    this.editContact.isVisible = true;
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
    const names = fullName.trim().split(' ');

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    const firstInitial = names[0].charAt(0).toUpperCase();
    const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  }

  getBgColorForCircle(name: string) {
    let cache = 0;
    for (let i = 0; i < name.length; i++) {
      cache = name.charCodeAt(i) + ((cache << 5) - cache);
    }
    const index = Math.abs(cache) % this.backgroundColors.length;
    return this.backgroundColors[index];
  }

  sortContactList(): void {
    this.firebaseService.contactsList.sort((a, b) =>
      a.name.localeCompare(b.name, 'de', { sensitivity: 'base' })
    );
  }

  addNewContact(newContact: Contacts): void {
    this.firebaseService.addContactToDatabase(newContact);
    this.sortContactList();
  }

  handleContactDeleted() {
    this.isDetailsVisible = false;
    this.isOverlayActive = false;
    this.selectedContact = null;
    this.sortContactList();
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


  getContactsByInitial(initial: string): Contacts[] {
    return this.firebaseService.contactsList.filter(contact =>
      contact.name.charAt(0).toUpperCase() === initial
    );
  }

  // #endregion
}
