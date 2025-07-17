import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../shared/services/firebase.service';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
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
export class TaskComponent {

  @Input() isVisible: boolean = false;

  @Output() closed = new EventEmitter<void>();

  
  isTaskVisible: boolean = false;

  ngOnChanges() {
    if (this.isVisible) {
      this.isTaskVisible = true;
    }
  }

  closeTaskDetails() {
    this.isVisible = false;
    setTimeout(() => {
      this.isTaskVisible = false;
      this.closed.emit();
    }, 300);
  }
}
