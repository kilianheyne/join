import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from "../../add-task-page/task-form/task-form.component";
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
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
export class AddTaskComponent {
  @ViewChild('taskForm') private taskForm!: TaskFormComponent;
  
  @Input() isVisible = false;

  closeForm() {
    this.isVisible = false;
  }

  closeAllFormList() {
    this.taskForm.isContactListOpen = false;
    this.taskForm.isCategoryListOpen = false;
  }
}
