import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from '../../interfaces/task';
import { Category } from '../../interfaces/category';
import { Contact } from '../../interfaces/contact';
import { Priority } from '../../interfaces/priority';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  // #region attributes
  @Input() task!: Task;
  @Input() categories!: Category[];
  @Input() contacts!: Contact[];
  @Input() priorities!: Priority[];

  categoryData: Category | undefined;

  assignedContacts: Contact[] = [];
  remainingUsers: number = 0;

  priorityData: Priority | undefined;

  completedSubtasks: number = 0;
  totalSubtasks: number = 0;
  progressPercent: number = 0;
  // #endregion
  // #region methods
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
    if (changes ['task']) {
      this.setProgress();
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
    console.log('Die priorityData enthält' + this.priorityData);
    this.priorityData = this.priorities.find(p => p.id === this.task.priority);
    if (!this.priorityData) {
      console.warn(`Priority mit ID ${this.task.priority} nicht gefunden!`)
    }
  }

  private setProgress(): void {
    if (this.task.subtasks && this.task.subtasks.length > 0) {
      this.totalSubtasks = this.task.subtasks.length;
      this.completedSubtasks = this.task.subtasks.filter(s => s.done).length;
      this.progressPercent = (this.completedSubtasks / this.totalSubtasks) * 100;
    } else {
      this.totalSubtasks = 0;
      this.completedSubtasks = 0;
      this.progressPercent = 0;
    }
  }
  // #endregion
}
