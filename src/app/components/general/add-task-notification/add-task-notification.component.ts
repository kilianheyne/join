import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-add-task-notification',
  imports: [CommonModule],
  templateUrl: './add-task-notification.component.html',
  styleUrl: './add-task-notification.component.scss',
  animations: [
    trigger('slideInFromBottom', [
      transition(':enter', [
        style({ transform: 'translateY(2000%)', opacity: 0 }),
        animate('300ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in',
          style({ transform: 'translateY(2000%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AddTaskNotificationComponent {
  @Input() isVisible = false;

  @Input() notificationText?: string = 'Task added to the board';
}
