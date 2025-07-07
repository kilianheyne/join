import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() placeHolder: string = '';

  @Input() inputId: string = '';

  @Input() type: string = 'text';

  @Input() value: string = '';
}
