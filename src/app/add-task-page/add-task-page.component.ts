import { Component } from '@angular/core';
import { TrimOnBlurDirective } from '../directives/trim-on-blur.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '../utils/custom-date-formats';

@Component({
  selector: 'app-add-task-page',
  imports: [
    CommonModule,
    FormsModule,
    TrimOnBlurDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  templateUrl: './add-task-page.component.html',
  styleUrl: './add-task-page.component.scss'
})
export class AddTaskPageComponent {

  createTaskData : {
    title: string,
    description: string,
    date: moment.Moment | null
  } = {
    title: '',
    description: '',
    date: null
  }

  sumbitForm() {
    console.log(this.createTaskData.date ? this.createTaskData.date.format('DD-MM-YYYY') : '');
  }

}
