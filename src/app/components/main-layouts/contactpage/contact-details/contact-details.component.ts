import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { FirebaseService } from '../../../../services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  firebaseService = inject(FirebaseService)
  contactId?: string = '';
  isEditVisible: boolean = false;

  editedContact = {
    name: '',
    email: '',
    phone: ''
  };

  @Input() contact: any;

  @Input() isVisible: boolean = false;

  @Output() openEditContactForm = new EventEmitter();

  @Output() contactDeleted = new EventEmitter();

  constructor(private eRef: ElementRef) { }

  openEditForm() {
    this.openEditContactForm.emit();
  }

  deleteContact(contactId: string) {
    if (contactId) {
      this.firebaseService.deleteDataFromDatabase('contacts', contactId);
      this.contactDeleted.emit();
    }
  }

  changeEditMenuMobile() {
    this.isEditVisible = !this.isEditVisible;
  }

  closeEditMenuMobile() {
    if (this.isEditVisible) {
      this.isEditVisible = !this.isEditVisible;
    }
  }

  getFontSize(name: string): string {
  const length = name.length;
  if (length > 30) return '20px';
  if (length > 20) return '30px';
  if (length > 10) return '35px';
  return '47px';
}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isEditVisible && !this.eRef.nativeElement.contains(event.target)) {
      this.changeEditMenuMobile();
    }
  }
}
