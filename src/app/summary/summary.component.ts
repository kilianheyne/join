import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Task } from '../interfaces/task';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  toDoCount: number = 0;
  doneCount: number = 0;
  urgentCount: number = 0;
  taskCount: number = 0;
  inProgressCount: number = 0;
  awaitingFeedbackCount: number = 0;
  nextDeadline: string | null = null; 

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadTaskSummary();
  }

  loadTaskSummary() {
    this.firebaseService.tasksList$.subscribe((tasks: Task[]) => {
      this.toDoCount = tasks.filter(task => task.status === 'to-do').length;
      this.doneCount = tasks.filter(task => task.status === 'done').length;
      this.urgentCount = tasks.filter(task => task.priority === 'Cswm909cWSJhKcu5vB14').length;
      this.taskCount = tasks.length;
      this.inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
      this.awaitingFeedbackCount = tasks.filter(task => task.status === 'await-feedback').length;

      const urgentTasks = tasks
        .filter(task =>
          task.priority === 'Cswm909cWSJhKcu5vB14' &&
          task.date instanceof Date &&
          !isNaN(task.date.getTime())
        )
        .sort((a, b) => a.date.getTime() - b.date.getTime());

        if (urgentTasks.length > 0) {
          const nextDate = urgentTasks[0].date;
          this.nextDeadline = nextDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        } else {
          this.nextDeadline = null;
        }
    });
  }
}
