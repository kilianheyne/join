import { Component } from '@angular/core';
import { BlackButtonComponent } from "../general/black-button/black-button.component";
import { InputComponent } from "../general/input/input.component";

@Component({
  selector: 'app-board',
  imports: [BlackButtonComponent, InputComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

}
