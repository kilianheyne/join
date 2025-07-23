import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { Task } from '../../interfaces/task';
import { Category } from '../../interfaces/category';
import { Contact } from '../../interfaces/contact';
import { Priority } from '../../interfaces/priority';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
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
export class TaskComponent{

  firebaseService = inject(FirebaseService)

  @Output() closed = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter();
  @Output() subtaskChanged = new EventEmitter<void>();

  @Input() isVisible = false;
  @Input() task!: Task;
  @Input() categories!: Category[];
  @Input() contacts!: Contact[];
  @Input() priorities!: Priority[];

  priorityData: Priority | undefined;
  categoryData: Category | undefined;

  assignedContacts: Contact[] = [];
  taskId?: string = '';

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
      this.firebaseService.updateDataInDatabase('tasks', this.task.id, {subtasks: this.task.subtasks});
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

  private setCategoryData(): void {
    this.categoryData = this.categories.find(c => c.id === this.task.category);
    if (!this.categoryData) {
      console.warn(`Kategorie mit ID ${this.task.category} nicht gefunden!`);
    }
  }

  private setAssignedContacts(): void {
    if (this.contacts && this.task?.users) {
      const matchedContacts = this.task.users
      .filter((userId): userId is string => typeof userId === 'string')
      .map((userId: string) => this.contacts.find(c => c.id === userId))
      .filter(Boolean) as Contact[];
        this.assignedContacts = matchedContacts;
    }
  }

  private setPriorityData(): void {
    console.log('Die priorityData enthält' + this.priorityData);
    this.priorityData = this.priorities.find(p => p.id === this.task.priority);
    if (this.priorityData) {
      console.warn(`Priority mit ID ${this.task.priority} nicht gefunden!`)
    }
  }
}
