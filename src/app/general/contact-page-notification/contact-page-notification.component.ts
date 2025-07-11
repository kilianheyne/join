import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-contact-page-notification',
  imports: [CommonModule],
  templateUrl: './contact-page-notification.component.html',
  styleUrl: './contact-page-notification.component.scss',
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ContactPageNotificationComponent {
  @Input() isVisible = false;

  @Input() notificationText = '';
}
