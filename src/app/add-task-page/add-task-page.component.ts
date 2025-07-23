import { Component, ViewChild } from '@angular/core';
import { AddTaskNotificationComponent } from "../general/add-task-notification/add-task-notification.component";
import { showAddTaskNotification } from '../utils/helpers';
import { TaskFormComponent } from "./task-form/task-form.component";
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-add-task-page',
  imports: [AddTaskNotificationComponent, TaskFormComponent],
  templateUrl: './add-task-page.component.html',
  styleUrl: './add-task-page.component.scss',
  providers: [DataService]
})
export class AddTaskPageComponent {
  @ViewChild('taskForm') private taskForm!: TaskFormComponent;

  @ViewChild('addTaskNotification') private addTaskNotification!: AddTaskNotificationComponent;

  showAddTaskNotification() {
    showAddTaskNotification(this.addTaskNotification);
  }

  closeAllFormList() {
    this.taskForm.isContactListOpen = false;
    this.taskForm.isCategoryListOpen = false;
  }
}
