import { Component } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Task } from '../../../interfaces/task';
import { Timestamp } from '@angular/fire/firestore';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-summary',
  imports: [RouterLink, RouterModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  // #region attributes
  toDoCount: number = 0;
  doneCount: number = 0;
  urgentCount: number = 0;
  taskCount: number = 0;
  inProgressCount: number = 0;
  awaitingFeedbackCount: number = 0;
  nextDeadline: string | null = null;
  showGreeting: boolean = false;
  greetingMessage: string = '';
  // #endregion

  constructor(private firebaseService: FirebaseService) { }

  // #region methods
  ngOnInit(): void {
    this.loadTaskSummary();
    this.handleMobileGreeting();
    this.greetingMessage = this.getGreeting();
  }

  loadTaskSummary() {
    this.firebaseService.tasksList$.subscribe((tasks: Task[]) => {
      this.loadTaskCounts(tasks);
      this.checkUrgentDeadline(tasks);
    });
  }

  private loadTaskCounts(tasks: Task[]): void {
    this.toDoCount = tasks.filter(task => task.status === 'to-do').length;
    this.doneCount = tasks.filter(task => task.status === 'done').length;
    this.urgentCount = tasks.filter(task => task.priority === 'Cswm909cWSJhKcu5vB14').length;
    this.taskCount = tasks.length;
    this.inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
    this.awaitingFeedbackCount = tasks.filter(task => task.status === 'await-feedback').length;
  }

  private checkUrgentDeadline(tasks: Task[]): void {
    const urgentTasks = this.getFirstDeadline(tasks);

    if (urgentTasks.length > 0) {
      const nextDate = urgentTasks[0].date;
      this.nextDeadline = this.formatDate(nextDate);
    } else {
      this.nextDeadline = null;
    }
  }

  private getFirstDeadline(tasks: Task[]): Task[] {
    return tasks
      .filter(task =>
        task.priority === 'Cswm909cWSJhKcu5vB14' &&
        task.date instanceof Date &&
        !isNaN(task.date.getTime())
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private handleMobileGreeting(): void {
    const greeted = localStorage.getItem('greetingSeen');

    if (!greeted && window.innerWidth < 980) {
      this.showGreeting = true;
      setTimeout(() => {
        this.showGreeting = false;
      }, 1500);
      localStorage.setItem('greetingSeen', 'true');
    }
  }

  private getGreeting(): string {
    const currentHour = new Date().getHours();
    if (currentHour < 11) {
      return 'Good morning';
    } else if (currentHour < 14) {
      return 'Hello';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }
}