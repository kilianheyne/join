import { Component, HostListener } from '@angular/core';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { TaskCardComponent } from "./task-card/task-card.component";

@Component({
  selector: 'app-board',
  imports: [BlackButtonComponent, TaskCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

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
}
