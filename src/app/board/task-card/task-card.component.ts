import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from '../../interfaces/task';
import { Category } from '../../interfaces/category';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() categories!: Category[];
  @Input() contacts!: Contact[];

  categoryData: Category | undefined;

  assignedContacts: Contact[] = [];
  remainingUsers: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] || changes['task']) {
      this.categoryData = this.categories.find(c => c.id === this.task.category);

      if (!this.categoryData) {
        console.warn(`Kategorie mit ID ${this.task.category} nicht gefunden!`);
      }
    }
    if (changes['contacts'] || changes['task']) {
      if (this.contacts && this.task?.users) {
        const matchedContacts = this.task.users
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
  }
}
