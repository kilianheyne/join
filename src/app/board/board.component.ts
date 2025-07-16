import { Component, HostListener } from '@angular/core';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { TaskCardComponent } from "./task-card/task-card.component";
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-board',
  imports: [TaskComponent, BlackButtonComponent, TaskCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  isTaskVisible = false;
  showTitle:boolean = false;
  buttonPadding = '8px 16px';

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.showTitle = window.innerWidth > 640;
    if (window.innerWidth > 640) {
      this.showTitle = true;
    } else {
      this.showTitle = false;
      this.buttonPadding = '8px';
    }
  }

  showTaskDetails() {
    const overlay = document.getElementById('taskOverlay');
    if (overlay) overlay.style.display = 'flex';
  }
}
