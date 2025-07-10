import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteButtonComponent } from "../../general/white-button/white-button.component";
import { BlackButtonComponent } from '../../general/black-button/black-button.component';
import { InputComponent } from "../../general/input/input.component";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-create-contact',
  imports: [CommonModule, WhiteButtonComponent, BlackButtonComponent, InputComponent],
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
  @Input() isVisible = false;

  @ViewChild('nameInput') nameInput!: InputComponent;
  @ViewChild('emailInput') emailInput!: InputComponent;
  @ViewChild('phoneInput') phoneInput!: InputComponent;

  @Output() contactCreated = new EventEmitter<any>();

  createContact() {
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const phone = this.phoneInput.value;

    const newContact = {name, email, phone};
    this.contactCreated.emit(newContact);
    this.closeForm();
  }

  closeForm() {
    this.isVisible = false;
  }
}
