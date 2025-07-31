import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-help-page',
  imports: [RouterLink],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.scss'
})
export class HelpPageComponent {

  constructor(private location: Location) {

    }

  goBack(): void {
    this.location.back();
  }
}
