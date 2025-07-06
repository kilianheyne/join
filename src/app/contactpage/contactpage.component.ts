import { Component, ViewChild } from '@angular/core';
import { CreateContactComponent } from "./create-contact/create-contact.component";

@Component({
  selector: 'app-contactpage',
  imports: [CreateContactComponent],
  templateUrl: './contactpage.component.html',
  styleUrl: './contactpage.component.scss'
})
export class ContactpageComponent {
  @ViewChild('createContact') private createContact!: CreateContactComponent;

  openCreateContactForm() {
    this.createContact.isVisible = true;
  }
}
