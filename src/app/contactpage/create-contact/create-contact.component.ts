import { Component, Input } from '@angular/core';
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

  closeForm() {
    this.isVisible = false;
  }
}
