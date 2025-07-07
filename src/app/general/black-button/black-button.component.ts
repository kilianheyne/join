import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-black-button',
  imports: [CommonModule],
  templateUrl: './black-button.component.html',
  styleUrl: './black-button.component.scss'
})
export class BlackButtonComponent {
  @Input() title: string = '';

  @Input() icon?: string;

  @Input() type: string = 'button'
}
