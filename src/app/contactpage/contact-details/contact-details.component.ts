import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditContactComponent } from "../edit-contact/edit-contact.component";

@Component({
  selector: 'app-contact-details',
  imports: [EditContactComponent],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  @Input() contact: any;

  @Input() isVisible: boolean = false;

  @Output() openEditContactForm = new EventEmitter();

  openEditForm() {
    this.openEditContactForm.emit();
  }
  
}
