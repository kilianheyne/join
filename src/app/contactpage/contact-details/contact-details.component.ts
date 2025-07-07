import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  @Input() contact: any;

  @Input() isVisible: boolean = false;

}
