import { Component, HostListener, NgZone, ViewChild } from '@angular/core';
import { BlackButtonComponent } from "../../general/black-button/black-button.component";
import { TaskCardComponent } from "./task-card/task-card.component";
import { TaskComponent } from './task/task.component';
import { Task, TaskStatus } from '../../../interfaces/task';
import { FirebaseService } from '../../../services/firebase.service';
import { Category } from '../../../interfaces/category';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Contact } from '../../../interfaces/contact';
import { Priority } from '../../../interfaces/priority';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from "./add-task/add-task.component";
import { DataService } from '../../../services/data-service.service';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MoveTaskSheetComponent } from './move-task-sheet/move-task-sheet.component';
import { AuthService } from '../../../services/auth.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [CommonModule, TaskComponent, BlackButtonComponent, TaskCardComponent, DragDropModule, AddTaskComponent, ReactiveFormsModule, MatBottomSheetModule, MatIconModule, MatButtonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [DataService]
})
export class BoardComponent {
  // #region attributes
  @ViewChild('addTaskOverlay') private addTaskOverlay!: AddTaskComponent;

  showTitle: boolean = false;
  buttonPadding = '8px 16px';
  selectedTask: Task | null = null;
  isTaskDetailsVisible = false;
  isOverlayActive: boolean = false;
  searchControl = new FormControl('');
  TaskStatus = TaskStatus;
  isMobile: boolean = false;
  isDragging: boolean = false;

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  contacts: Contact[] = [];
  priorities: Priority[] = [];
  sub!: Subscription;
  // #endregion

  constructor(
    private firebaseService: FirebaseService,
    private dataService: DataService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private ngZone: NgZone,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkScreenSize();
    this.tasks = this.firebaseService.tasksList;
    this.filteredTasks = this.tasks;
    this.categories = this.firebaseService.categoriesList;
    this.contacts = this.firebaseService.contactsList;
    this.priorities = this.firebaseService.prioritiesList;
    this.initSearchFilter();
    this.authService.checkAuthenticationValid();
    this.sub = interval(1000).subscribe(() => {
      this.authService.checkAuthenticationValid();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    this.showTitle = width > 640;
    this.buttonPadding = this.showTitle ? '8px 16px' : '8px';
    this.isMobile = width <= 820;
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

  getTaskByStatus(status: string): Task[] {
    return this.filteredTasks.filter(task => task.status === status);
  }

  onTaskDrop(event: CdkDragDrop<Task[]>, targetStatus: TaskStatus) {
    const task = event.item.data as Task;
    const isSameList = event.previousContainer === event.container;
    if (!task.id) { // task-interface nutzt id? - verhindert Probleme mit updateDataInDatabase
      return;
    }
    if (isSameList) {
      this.handleSameListDrop(event);
    } else {
      this.handleCrossListDrop(event, task, targetStatus);
    }
    this.refreshTaskList();
  }

  private handleSameListDrop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  private handleCrossListDrop(event: CdkDragDrop<Task[]>, task: Task, targetStatus: TaskStatus) {
    const previousList = event.previousContainer.data;
    const currentList = event.container.data;
    previousList.splice(event.previousIndex, 1);
    task.status = targetStatus;
    currentList.splice(event.currentIndex, 0, task);
    this.firebaseService.updateDataInDatabase('tasks', task.id!, { status: targetStatus })
  }

  private refreshTaskList() {
    this.tasks = [...this.tasks];
  }

  private longPressTimer: any;
  private isLongPress = false;

  handleMouseDown(task: Task): void {
    if (this.isMobile) {
      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.openTaskDetails(task);
      }, 700);
    }
  }

  handleMouseUp(): void {
    clearTimeout(this.longPressTimer);
  }

  handleClick(task: Task): void {
    if (!this.isMobile) {
      this.openTaskDetails(task);
    } else if (!this.isLongPress) {
      // Ignore short tap
    }
    this.isLongPress = false;
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

  handleAddTaskClick(status: TaskStatus = TaskStatus.ToDo) {
    if (this.isMobile) {
      this.openAddTaskPageWithStatus(status);
    } else {
      this.openAddTaskOverlay(status);
    }
  }

  openMoveTaskMenu(task: Task): void {
    const ref = this.bottomSheet.open(MoveTaskSheetComponent, { data: { task } });

    ref.afterDismissed().subscribe((newStatus: TaskStatus) => {
      if (newStatus && task.id) {
        task.status = newStatus;
        this.ngZone.run(() => {
          this.firebaseService.updateDataInDatabase('tasks', task.id!, { status: newStatus });
          this.refreshTaskList();
        })
      }
    });
  }

  onDragStart(): void {
    this.isDragging = true;
  }

  onDragEnd(): void {
    this.isDragging = false;
  }
}
