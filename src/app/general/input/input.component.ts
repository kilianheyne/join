import { Component, Input, ViewChild, ElementRef } from '@angular/core';

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

  @ViewChild('inputElement') inputRef!: ElementRef<HTMLInputElement>;

  get value(): string {
    return this.inputRef.nativeElement.value;
  }
}
