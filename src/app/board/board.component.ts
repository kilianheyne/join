import { Component, HostListener, ViewChild } from '@angular/core';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { TaskCardComponent } from "./task-card/task-card.component";
import { TaskComponent } from './task/task.component';
import { Task, TaskStatus } from '../interfaces/task';
import { FirebaseService } from '../services/firebase.service';
import { Category } from '../interfaces/category';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Contact } from '../interfaces/contact';
import { Priority } from '../interfaces/priority';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from "./add-task/add-task.component";
import { DataService } from '../services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  imports: [CommonModule, TaskComponent, BlackButtonComponent, TaskCardComponent, DragDropModule, AddTaskComponent, ReactiveFormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [DataService]
})
export class BoardComponent {
  @ViewChild('addTaskOverlay') private addTaskOverlay!: AddTaskComponent;

  showTitle: boolean = false;
  buttonPadding = '8px 16px';
  selectedTask: Task | null = null;
  isTaskDetailsVisible = false;
  isOverlayActive: boolean = false;
  searchControl = new FormControl('');
  TaskStatus = TaskStatus;
  isMobile: boolean = false;


  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  contacts: Contact[] = [];
  priorities: Priority[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkScreenSize();
    this.tasks = this.firebaseService.tasksList;
    this.filteredTasks = this.tasks;
    this.categories = this.firebaseService.categoriesList;
    this.contacts = this.firebaseService.contactsList;
    this.priorities = this.firebaseService.prioritiesList;
    this.initSearchFilter();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    // this.showTitle = window.innerWidth > 640;
    // if (window.innerWidth > 640) {
    //   this.showTitle = true;
    // } else {
    //   this.showTitle = false;
    //   this.buttonPadding = '8px';
    // }

    const width = window.innerWidth;
    this.showTitle = width > 640;
    this.buttonPadding = this.showTitle ? '8px 16px' : '8px';
    this.isMobile = width <= 820;
  }

  getTaskByStatus(status: string): Task[] {
    return this.filteredTasks.filter(task => task.status === status);
  }

  onTaskDrop(event: CdkDragDrop<Task[]>, targetStatus: TaskStatus) {
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

  handleTaskDeleted() {
    if (this.selectedTask?.id) {
      this.tasks = this.tasks.filter(task => task.id !== this.selectedTask!.id);
    }
    this.closeOverlay();
  }

  openAddTaskOverlay(status: TaskStatus = TaskStatus.ToDo) {
    this.addTaskOverlay.isVisible = true;
    this.dataService.setValue(status);
  }

  openAddTaskPageWithStatus(status: TaskStatus = TaskStatus.ToDo) {
    this.router.navigate(['/add-task'], {
      state: { status: status }
    });
  }

  private initSearchFilter(): void {
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

  handleAddTaskClick(status: TaskStatus = TaskStatus.ToDo) {
    if (this.isMobile) {
      this.openAddTaskPageWithStatus(status);
    } else {
      this.openAddTaskOverlay(status);
    }
  }
}
