import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
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
  isEditVisible: boolean = false;

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

  constructor(private eRef: ElementRef) {}

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

  getBgColorForCircle(name: string) {
    let cache = 0;
    for (let i = 0; i < name.length; i++){
      cache = name.charCodeAt(i) + ((cache << 5) - cache);
    }
    const index = Math.abs(cache) % this.backgroundColors.length;
    return this.backgroundColors[index];
  }

  changeEditMenuMobile() {
    this.isEditVisible = !this.isEditVisible;
  }

  closeEditMenuMobile() {
    if (this.isEditVisible) {
      this.isEditVisible = !this.isEditVisible;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isEditVisible && !this.eRef.nativeElement.contains(event.target)) {
      this.changeEditMenuMobile();
    }
  }
}
