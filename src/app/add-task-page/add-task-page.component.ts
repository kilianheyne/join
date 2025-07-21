import { Component, ViewChild } from '@angular/core';
import { AddTaskNotificationComponent } from "../general/add-task-notification/add-task-notification.component";
import { showAddTaskNotification } from '../utils/helpers';
import { TaskFormComponent } from "./task-form/task-form.component";

@Component({
  selector: 'app-add-task-page',
  imports: [AddTaskNotificationComponent, TaskFormComponent],
  templateUrl: './add-task-page.component.html',
  styleUrl: './add-task-page.component.scss',
  
})
export class AddTaskPageComponent {
  // @ViewChild('taskForm') private taskForm!: TaskFormComponent;

  @ViewChild('addTaskNotification') private addTaskNotification!: AddTaskNotificationComponent;

  showAddTaskNotification() {
    showAddTaskNotification(this.addTaskNotification);
  }

  closeContactList() {
    // this.taskForm.isContactListOpen = false;
  }
}
