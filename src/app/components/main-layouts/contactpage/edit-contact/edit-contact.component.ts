import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteButtonComponent } from "../../../general/white-button/white-button.component";
import { BlackButtonComponent } from '../../../general/black-button/black-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { getBgColorForCircle, getContactInitials } from "../../../../utils/helpers"
import { trigger, style, animate, transition } from '@angular/animations';
import { FirebaseService } from '../../../../services/firebase.service';
import { Contact } from '../../../../interfaces/contact';
import { TrimOnBlurDirective } from '../../../../directives/trim-on-blur.directive';

@Component({
  selector: 'app-edit-contact',
  imports: [CommonModule, FormsModule, TrimOnBlurDirective, WhiteButtonComponent, BlackButtonComponent],
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

  contactFormData: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
  }

  @Input() isVisible = false;

  @Output() contactUpdated = new EventEmitter();

  @Output() contactDeleted = new EventEmitter();

  openForm(contactId: string) {
    const findData = this.firebaseService.contactsList.filter(contact => contact.id === contactId);

    if (findData.length > 0) {
      const selectedContact = findData[0];
      this.contactFormData = { ...selectedContact };
      this.isVisible = true;
    }
  }

  closeForm() {
    this.isVisible = false;
  }

  editContact(editContactForm: NgForm) {
    if (editContactForm.valid && editContactForm.submitted) {
      this.contactFormData.color = this.getBgColorForCircle(this.contactFormData.name);
      this.contactFormData.avatar = this.getContactInitials(this.contactFormData.name);

      this.firebaseService.updateDataInDatabase<Contact>('contacts', this.contactFormData.id ?? '', this.contactFormData);
      this.closeForm();
      this.contactUpdated.emit();
    }
  }

  getContactInitials(fullName: string) {
    return getContactInitials(fullName);
  }

  getBgColorForCircle(name: string) {
    return getBgColorForCircle(name);
  }

  deleteContact(contactId: string) {
    if (contactId) {
      this.firebaseService.deleteDataFromDatabase('contacts', contactId);
      this.closeForm();
      this.contactDeleted.emit();
    }
  }
}
