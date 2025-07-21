import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteButtonComponent } from "../../general/white-button/white-button.component";
import { BlackButtonComponent } from '../../general/black-button/black-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Contact } from '../../interfaces/contact';
import { FirebaseService } from '../../services/firebase.service';
import { getDoc, DocumentReference } from 'firebase/firestore';
import { TrimOnBlurDirective } from '../../directives/trim-on-blur.directive';
import { getBgColorForCircle, getContactInitials } from '../../utils/helpers';

@Component({
  selector: 'app-create-contact',
  imports: [CommonModule, FormsModule, TrimOnBlurDirective, WhiteButtonComponent, BlackButtonComponent],
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
      this.contactFormData.color = this.getBgColorForCircle(this.contactFormData.name);
      this.contactFormData.avatar = this.getContactInitials(this.contactFormData.name);

      this.firebaseService.addDataToDatabase<Contact>('contacts', this.contactFormData).then(async (docRef) => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const newContact = { id: docSnap.id, ...docSnap.data() };
          this.closeForm();
          createContactForm.resetForm();
          this.contactCreated.emit(newContact);
        }
      });
    }
  }

  getContactInitials(fullName: string) {
    return getContactInitials(fullName);
  }

  getBgColorForCircle(name: string) {
    return getBgColorForCircle(name);
  }

  cancelForm(createContactForm: NgForm) {
    createContactForm.resetForm();
    this.closeForm();
  }

  closeForm() {
    this.isVisible = false;
  }
}
