import { Component, ViewChild } from '@angular/core';
import { AddTaskNotificationComponent } from "../../general/add-task-notification/add-task-notification.component";
import { showAddTaskNotification } from '../../../utils/helpers';
import { TaskFormComponent } from "./task-form/task-form.component";
import { DataService } from '../../../services/data-service.service';
import { Router } from '@angular/router';
import { TaskStatus } from '../../../interfaces/task';
import { AuthService } from '../../../services/auth.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task-page',
  imports: [AddTaskNotificationComponent, TaskFormComponent],
  templateUrl: './add-task-page.component.html',
  styleUrl: './add-task-page.component.scss'
})
export class AddTaskPageComponent {
  @ViewChild('taskForm') private taskForm!: TaskFormComponent;

  @ViewChild('addTaskNotification') private addTaskNotification!: AddTaskNotificationComponent;

  status: TaskStatus = TaskStatus.ToDo;
  sub!: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.status = nav?.extras.state?.['status'] ?? null;
  }

  ngOnInit() {
    this.dataService.setValue(this.status);
    this.authService.checkAuthenticationValid();
    this.sub = interval(1000).subscribe(() => {
      this.authService.checkAuthenticationValid();
    });
  }

  showAddTaskNotification() {
    showAddTaskNotification(this.addTaskNotification);
  }

  closeAllFormList() {
    this.taskForm.isContactListOpen = false;
    this.taskForm.isCategoryListOpen = false;
    this.taskForm.closeAllSubtaskEdit();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
