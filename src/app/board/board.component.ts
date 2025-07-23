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
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  imports: [CommonModule, TaskComponent, BlackButtonComponent, TaskCardComponent, DragDropModule, ReactiveFormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  showTitle:boolean = false;
  buttonPadding = '8px 16px';
  selectedTask: Task | null = null;
  isTaskDetailsVisible = false;
  isOverlayActive: boolean = false;
  searchControl = new FormControl('');

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  contacts: Contact[] = [];
  priorities: Priority[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.checkScreenSize();
    this.tasks = this.firebaseService.tasksList;
    this.filteredTasks = this.tasks;
    this.categories = this.firebaseService.categoriesList;
    this.contacts = this.firebaseService.contactsList;
    this.priorities = this.firebaseService.prioritiesList;

    this.searchControl.valueChanges.subscribe(term => {
      const search = term?.toLowerCase().trim() || '';
      if (!search) {
        this.filteredTasks = this.tasks;
      } else {
        this.filteredTasks = this.tasks.filter(task => 
          task.title?.toLowerCase().includes(search) ||
          task.description?.toLowerCase().includes(search)
        );
      }
    });
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

  getTaskByStatus(status: string): Task[] {
    return this.filteredTasks.filter(task => task.status === status);
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

  openTaskDetails(task: Task) {
    this.selectedTask = task;
    this.isTaskDetailsVisible = true;
  }

  closeOverlay() {
    this.isTaskDetailsVisible = false;
    this.selectedTask = null;
  }
}
