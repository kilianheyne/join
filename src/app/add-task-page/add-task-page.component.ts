import { Component, inject } from '@angular/core';
import { TrimOnBlurDirective } from '../directives/trim-on-blur.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '../utils/custom-date-formats';
import { FirebaseService } from '../services/firebase.service';
import { Contact } from '../interfaces/contact';
import { Priority } from '../interfaces/priority';
import { PriorityModel } from '../models/priority.model';
import { trigger, style, animate, transition } from '@angular/animations';
import { Category } from '../interfaces/category';
import { CategoryModel } from '../models/category.model';
import { Subtask } from '../interfaces/subtask';

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
  styleUrl: './add-task-page.component.scss',
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }), // starting state
        animate('200ms ease-out',
          style({ height: '*', opacity: 1 })) // final state
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class AddTaskPageComponent {
  firebaseService = inject(FirebaseService);

  isContactListOpen = false;
  isCategoryListOpen = false;
  categoryTitle = '';
  searchContactInput: string = '';
  contactList: Contact[] = [];
  subtaskTitle = '';
  subtasks: Subtask[] = [];

  taskData: {
    title: string,
    description: string,
    date: moment.Moment | null,
    category: string
  } = {
      title: '',
      description: '',
      date: null,
      category: ''
    }

  constructor() {
    this.firebaseService.contactsList$.subscribe(contacts => {
      for (const [i, contact] of contacts.entries()) {
        this.contactList.push(contact)
        this.contactList[i].checked = false;
      }
    });
  }

  getContacts(): Contact[] {
    return this.contactList.filter(
      contact => contact.name.toLowerCase().includes(
        this.searchContactInput.toLowerCase()
      )
    );
  }

  getSelectedContacts(): Contact[] {
    return this.contactList.filter(
      contact => contact.checked === true
    );
  }

  getPriorities(): Priority[] {
    return this.firebaseService.prioritiesList.slice().sort(PriorityModel.sort);
  }

  getCategories(): Category[] {
    return this.firebaseService.categoriesList.slice().sort(CategoryModel.sort);
  }

  addSubtask() {
    this.subtasks.push({
      'title': this.subtaskTitle,
      'done': false,
      'edit': false
    });
    this.subtaskTitle = '';
  }

  deleteSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }

  sumbitForm() {
    console.log(this.taskData.date ? this.taskData.date.format('DD-MM-YYYY') : '');
  }

}
