import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TrimOnBlurDirective } from '../../directives/trim-on-blur.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '../../utils/custom-date-formats';
import { FirebaseService } from '../../services/firebase.service';
import { Contact } from '../../interfaces/contact';
import { Priority } from '../../interfaces/priority';
import { PriorityModel } from '../../models/priority.model';
import { trigger, style, animate, transition } from '@angular/animations';
import { Category } from '../../interfaces/category';
import { CategoryModel } from '../../models/category.model';
import { Subtask } from '../../interfaces/subtask';
import { WhiteButtonComponent } from "../../general/white-button/white-button.component";
import { BlackButtonComponent } from "../../general/black-button/black-button.component";
import { Task, TaskStatus } from '../../interfaces/task';
import { getDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import moment from 'moment';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    FormsModule,
    TrimOnBlurDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    WhiteButtonComponent,
    BlackButtonComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
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
export class TaskFormComponent {
  @Input() bottomSectionBackground: string = 'white';

  firebaseService = inject(FirebaseService);

  isContactListOpen = false;
  isCategoryListOpen = false;
  categoryTitle = '';
  searchContactInput: string = '';
  contactList: Contact[] = [];
  subtaskTitle = '';
  subtasks: Subtask[] = [];
  minDate = moment().startOf('day');
  momentDate: moment.Moment | null = null;

  constructor(private router: Router, private dataService: DataService) {
    this.selectMediumPriorityAsDefault();
    this.assignCheckedValueToContacts();
  }

  taskData: Task = {
    title: '',
    description: '',
    date: new Date(),
    priority: '',
    category: '',
    users: [],
    subtasks: [],
    status: TaskStatus.ToDo,
  }

  ngOnInit() {
    const current = this.dataService.value();
    if (current) {
      this.taskData.status = current;
    }
  }

  @Output() taskAdded = new EventEmitter();

  @Output() formCancelled = new EventEmitter();

  selectMediumPriorityAsDefault() {
    this.firebaseService.prioritiesList$.subscribe(priorities => {
      const MediumPriority = priorities.filter(priority => priority.title === 'Medium');
      if (MediumPriority.length) {
        this.taskData.priority = MediumPriority[0].id
      }
    })
  }

  assignCheckedValueToContacts() {
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
    if (this.subtaskTitle.length > 0) {
      this.subtasks.push({
        'title': this.subtaskTitle,
        'done': false,
        'edit': false
      });
      this.subtaskTitle = '';
    }

  }

  deleteSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }

  submitForm(taskForm: NgForm) {
    if (taskForm.valid && taskForm.submitted) {
      this.taskData.users = this.getSelectedContacts().map(contact => contact.id);
      this.taskData.subtasks = this.subtasks.map(subtask => ({
        title: subtask.title,
        done: subtask.done
      }));
      this.taskData.date = this.momentDate ? this.momentDate.toDate() : new Date();      
      this.firebaseService.addDataToDatabase<Task>('tasks', this.taskData).then(async (docRef) => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.cancelForm(taskForm);
        }
      });
      this.taskAdded.emit();
      setTimeout(() => {
        this.router.navigate(['/board']);
      }, 3000);
    }
  }

  cancelForm(taskForm: NgForm) {
    this.formCancelled.emit();
    taskForm.resetForm();
    setTimeout(() => {
      for (const contact of this.contactList) {
        contact.checked = false;
      }
      this.searchContactInput = '';
      this.selectMediumPriorityAsDefault();
      this.subtaskTitle = ''
      this.subtasks = [];
    }, 200);
  }
}
