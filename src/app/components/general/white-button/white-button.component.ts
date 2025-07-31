import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-white-button',
  imports: [CommonModule],
  templateUrl: './white-button.component.html',
  styleUrl: './white-button.component.scss'
})
export class WhiteButtonComponent {
  @Input() title: string = '';

  @Input() icon?: string;

  @Input() type : string = 'button'

  @Input() padding: string = '16px'
}
