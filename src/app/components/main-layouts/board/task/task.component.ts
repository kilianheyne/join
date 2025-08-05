import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../../../services/firebase.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Task } from '../../../../interfaces/task';
import { Category } from '../../../../interfaces/category';
import { Contact } from '../../../../interfaces/contact';
import { Priority } from '../../../../interfaces/priority';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../../add-task-page/task-form/task-form.component';

@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule, TaskFormComponent],
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

  firebaseService = inject(FirebaseService)

  @Output() closed = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter();
  @Output() subtaskChanged = new EventEmitter<void>();

  @Input() isVisible = false;
  @Input() task!: Task;
  @Input() categories!: Category[];
  @Input() contacts!: Contact[];
  @Input() priorities!: Priority[];

  @ViewChild('taskForm') private taskForm!: TaskFormComponent;

  priorityData: Priority | undefined;
  categoryData: Category | undefined;

  assignedContacts: Contact[] = [];
  taskId?: string = '';
  remainingUsers: number = 0;

  showEditPage = false

  closeTask() {
    this.isVisible = false;
    setTimeout(() => {
      this.closed.emit();
    }, 300);
  }

  deleteTask(taskId: string) {
    if (taskId) {
      this.firebaseService.deleteDataFromDatabase('tasks', taskId);
      this.taskDeleted.emit();
    }
  }

  toggleSubtask(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const isDone = input.checked;
    this.task.subtasks[index].done = isDone;
    if (this.task.id) {
      this.firebaseService.updateDataInDatabase('tasks', this.task.id, { subtasks: this.task.subtasks });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] || changes['task']) {
      this.setCategoryData();
    }
    if (changes['contacts'] || changes['task']) {
      this.setAssignedContacts();
    }
    if (changes['priorities'] || changes['task']) {
      this.setPriorityData();
    }
  }

  closeAllFormList() {
    this.taskForm.isContactListOpen = false;
    this.taskForm.isCategoryListOpen = false;
    this.taskForm.closeAllSubtaskEdit();
  }

  returnToDetailPage(taskData: Task) {
    this.task = taskData;
    this.showEditPage = false;
    this.setCategoryData();
    this.setAssignedContacts();
    this.setPriorityData();
  }

  private setCategoryData(): void {
    this.categoryData = this.categories.find(c => c.id === this.task.category);
  }

  private setAssignedContacts(): void {
    if (this.contacts && this.task?.users) {
      const matchedContacts = this.task.users
        .filter((userId): userId is string => typeof userId === 'string')
        .map((userId: string) => this.contacts.find(c => c.id === userId))
        .filter(Boolean) as Contact[];
      if (matchedContacts.length > 3) {
        this.assignedContacts = matchedContacts.slice(0, 3);
        this.remainingUsers = matchedContacts.length - 3;
      } else {
        this.assignedContacts = matchedContacts;
        this.remainingUsers = 0;
      }
    }
  }

  private setPriorityData(): void {
    this.priorityData = this.priorities.find(p => p.id === this.task.priority);
  }
}
