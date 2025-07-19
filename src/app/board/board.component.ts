import { Component, HostListener } from '@angular/core';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { TaskCardComponent } from "./task-card/task-card.component";
import { TaskComponent } from './task/task.component';
import { Task } from '../interfaces/task';
import { FirebaseService } from '../services/firebase.service';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-board',
  imports: [TaskComponent, BlackButtonComponent, TaskCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  isTaskVisible = false;
  showTitle:boolean = false;
  buttonPadding = '8px 16px';

  tasks: Task[] = [];
  categories: Category[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.checkScreenSize();
    this.tasks = this.firebaseService.tasksList;
    this.categories = this.firebaseService.categoriesList;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.showTitle = window.innerWidth > 640;
    if (window.innerWidth > 640) {
      this.showTitle = true;
    } else {
      this.showTitle = false;
      this.buttonPadding = '8px';
    }
  }

  showTaskDetails() {
    this.isTaskVisible = true;
  }

  onTaskClosed() {
    this.isTaskVisible = false;
  }

  getTaskByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }
}
