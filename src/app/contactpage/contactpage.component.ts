import { Component, ViewChild } from '@angular/core';
import { CreateContactComponent } from "./create-contact/create-contact.component";
import { Contacts } from '../shared/interfaces/contacts';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { CommonModule } from '@angular/common';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { EditContactComponent } from './edit-contact/edit-contact.component';

@Component({
  selector: 'app-contactpage',
  imports: [ContactDetailsComponent, CreateContactComponent, CommonModule, BlackButtonComponent, EditContactComponent],
  templateUrl: './contactpage.component.html',
  styleUrl: './contactpage.component.scss'
})

export class ContactpageComponent {
  @ViewChild('createContact') private createContact!: CreateContactComponent;

  @ViewChild('editContact') private editContact!: EditContactComponent;

  isDetailsVisible = false;
  selectedContact: any = null;
  isOverlayActive: boolean = false;
  isEditVisible:boolean = false;

  contacts: Array<Contacts> = [
    {
      firstname: 'Liam',
      lastname: 'Walker',
      phone: '+1-202-555-0143',
      email: 'liam.walker@example.com'
    },
    {
      firstname: 'Sofia',
      lastname: 'Martinez',
      phone: '+44-7900-123456',
      email: 'sofia.martinez@example.co.uk'
    },
    {
      firstname: 'Noah',
      lastname: 'Kim',
      phone: '+49-151-12345678',
      email: 'noah.kim@example.de'
    },
    {
      firstname: 'Emily',
      lastname: 'Dubois',
      phone: '+33-6-12-34-56-78',
      email: 'emily.dubois@example.fr'
    },
    {
      firstname: 'Mateo',
      lastname: 'Silva',
      phone: '+34-612-345-678',
      email: 'mateo.silva@example.es'
    },
    {
      firstname: 'Ava',
      lastname: 'Nguyen',
      phone: '+61-412-345-678',
      email: 'ava.nguyen@example.com.au'
    },
    {
      firstname: 'Lucas',
      lastname: 'Schneider',
      phone: '+49-160-98765432',
      email: 'lucas.schneider@example.de'
    },
    {
      firstname: 'Isabella',
      lastname: 'Rossi',
      phone: '+39-320-123-4567',
      email: 'isabella.rossi@example.it'
    },
    {
      firstname: 'Oliver',
      lastname: 'Chen',
      phone: '+86-138-00138000',
      email: 'oliver.chen@example.cn'
    },
    {
      firstname: 'Chloe',
      lastname: 'Peterson',
      phone: '+1-303-555-0187',
      email: 'chloe.peterson@example.com'
    }
  ];

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
}
