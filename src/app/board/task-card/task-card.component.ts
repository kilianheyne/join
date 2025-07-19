import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from '../../interfaces/task';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() categories!: Category[];

  categoryData: Category | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('task:', this.task);
    console.log('categories:', this.categories);

    if (changes['categories'] || changes['task']) {
      this.categoryData = this.categories.find(c => c.id === this.task.category);

      if (!this.categoryData) {
        console.warn(`Kategorie mit ID ${this.task.category} nicht gefunden!`);
      }
    }
  }
}
