import { Component, HostListener } from '@angular/core';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { TaskCardComponent } from "./task-card/task-card.component";
import { TaskComponent } from './task/task.component';
import { Task } from '../interfaces/task';
import { FirebaseService } from '../services/firebase.service';
import { Category } from '../interfaces/category';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Contact } from '../interfaces/contact';
import { Priority } from '../interfaces/priority';

@Component({
  selector: 'app-board',
  imports: [TaskComponent, BlackButtonComponent, TaskCardComponent, DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  isTaskVisible = false;
  selectedTask!: Task;
  showTitle:boolean = false;
  buttonPadding = '8px 16px';

  tasks: Task[] = [];
  categories: Category[] = [];
  contacts: Contact[] = [];
  priorities: Priority[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.checkScreenSize();
    this.tasks = this.firebaseService.tasksList;
    this.categories = this.firebaseService.categoriesList;
    this.contacts = this.firebaseService.contactsList;
    this.priorities = this.firebaseService.prioritiesList;
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

  showTaskDetails(task: Task) {
    this.selectedTask = task;
    this.isTaskVisible = true;
  }

  onTaskClosed() {
    this.isTaskVisible = false;
  }

  getTaskByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  onTaskDrop(event: CdkDragDrop<Task[]>, targetStatus: 'to-do' | 'in-progress' | 'await-feedback' | 'done') {
    const task = event.item.data as Task;
    if (!task.id) { // task-interface nutzt id? - verhindert Probleme mit updateDataInDatabase
      console.error('Task ID fehlt, kann nicht gespeichert werden.');
      return;
    }
    if (task.status !== targetStatus) {
      task.status = targetStatus;
      this.firebaseService.updateDataInDatabase('tasks', task.id, { status: targetStatus });
    }
    this.tasks = [...this.tasks]; // lokale Liste wird neu gerendert
  }
}
