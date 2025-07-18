import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task; 
}
