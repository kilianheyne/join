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

  firebaseService = inject(FirebaseService)
  
  @ViewChild('createContact') private createContact!: CreateContactComponent;

  @ViewChild('editContact') private editContact!: EditContactComponent;

  isDetailsVisible = false;
  selectedContact: any = null;
  isOverlayActive: boolean = false;
  isEditVisible:boolean = false;

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
}
