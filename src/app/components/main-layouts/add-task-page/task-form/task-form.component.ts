import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TrimOnBlurDirective } from '../../../../directives/trim-on-blur.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '../../../../utils/custom-date-formats';
import { FirebaseService } from '../../../../services/firebase.service';
import { Contact } from '../../../../interfaces/contact';
import { Priority } from '../../../../interfaces/priority';
import { PriorityModel } from '../../../../models/priority.model';
import { trigger, style, animate, transition } from '@angular/animations';
import { Category } from '../../../../interfaces/category';
import { CategoryModel } from '../../../../models/category.model';
import { Subtask } from '../../../../interfaces/subtask';
import { WhiteButtonComponent } from "../../../general/white-button/white-button.component";
import { BlackButtonComponent } from "../../../general/black-button/black-button.component";
import { Task, TaskStatus } from '../../../../interfaces/task';
import { getDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import moment from 'moment';
import { DataService } from '../../../../services/data-service.service';

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
  @Input() editPage: string = 'false';
  @Input() editTaskData?: Task = undefined;

  @Output() taskAdded = new EventEmitter();
  @Output() taskUpdated = new EventEmitter();
  @Output() formCancelled = new EventEmitter();

  firebaseService = inject(FirebaseService);

  showTitle: boolean = false;
  buttonPadding = '8px 16px';
  isContactListOpen = false;
  isCategoryListOpen = false;
  categoryTitle = '';
  searchContactInput: string = '';
  contactList: Contact[] = [];
  subtaskTitle = '';
  subtasks: Subtask[] = [];
  minDate = moment().startOf('day');
  momentDate: moment.Moment | null = null;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('subtaskInput') private subtaskInput!: ElementRef;

  constructor(
    private router: Router,
    private dataService: DataService,
    private elRef: ElementRef
  ) {
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
    this.checkScreenSize();
    const current = this.dataService.value();
    if (current) {
      this.taskData.status = current;
    }

    if (this.editTaskData) {
      this.taskData = { ...this.editTaskData };
      this.momentDate = moment(this.taskData.date);
      this.checkSelectedContactInEditPage();
      this.checkSelectedCategoryInEditPage();
      this.addSelectedSubtasksInEditPage();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    this.showTitle = width > 640;
    this.buttonPadding = this.showTitle ? '8px 16px' : '8px';
  }

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

  checkSelectedContactInEditPage() {
    for (const user of this.taskData.users) {
      for (const contact of this.contactList) {
        if (contact.id === user) {
          contact.checked = true;
        }
      }
    }
  }

  checkSelectedCategoryInEditPage() {
    for (const category of this.getCategories()) {
      if (category.id === this.taskData.category) {
        this.categoryTitle = category.title;
      }
    }
  }

  addSelectedSubtasksInEditPage() {
    for (const subtask of this.taskData.subtasks) {
      this.subtasks.push({
        'title': subtask.title,
        'done': subtask.done,
        'edit': false
      })
    }
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

  getVisibleSelectedContacts(): Contact[] {
    return this.getSelectedContacts().slice(0, 3);
  }

  getRemainingUserCount(): number {
    const selected = this.getSelectedContacts();
    return selected.length > 3 ? selected.length - 3 : 0;
  }

  getPriorities(): Priority[] {
    return this.firebaseService.prioritiesList.slice().sort(PriorityModel.sort);
  }

  getCategories(): Category[] {
    return this.firebaseService.categoriesList.slice().sort(CategoryModel.sort);
  }

  addSubtask() {
    if (this.subtaskTitle.length > 0) {
      this.subtasks.unshift({
        'title': this.subtaskTitle,
        'done': false,
        'edit': false
      });
      this.subtaskTitle = '';

      setTimeout(() => {
        this.scrollToBottom();
      });
    }
  }

  private scrollToBottom(): void {
    const el = this.scrollContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  startEditSubtask(index: number) {
    this.subtasks[index].edit = true
    setTimeout(() => {
      this.subtaskInput.nativeElement.focus()
    });
  }

  deleteSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }

  deleteEmptySubtask(index: number) {
    const subtask = this.subtasks[index];
    if (subtask.title.trim() === '') {
      this.deleteSubtask(index);
    } else {
      subtask.edit = false;
    }
  }

  closeAllSubtaskEdit() {
    for (const [index, subtask] of this.subtasks.entries()) {
      this.deleteEmptySubtask(index)
    }
  }

  submitForm(taskForm: NgForm) {
    if (taskForm.invalid) {
      setTimeout(() => {
        this.scrollToFirstError();
      });
      return;
    }
    if (taskForm.valid && taskForm.submitted) {
      this.taskData.users = this.getSelectedContacts().map(contact => contact.id);
      this.taskData.subtasks = this.subtasks.map(subtask => ({
        title: subtask.title,
        done: subtask.done
      }));
      this.taskData.date = this.momentDate ? this.momentDate.toDate() : new Date();

      if (this.editTaskData) {
        this.updateTask();
      } else {
        this.createNewTask(taskForm);
      }
    }
  }

  createNewTask(taskForm: NgForm) {
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

  updateTask() {
    this.firebaseService.updateDataInDatabase<Task>('tasks', this.taskData.id ?? '', this.taskData);
    this.taskUpdated.emit(this.taskData);
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

  private scrollToFirstError(): void {
    const firstInvalidControl: HTMLElement | null =
      this.elRef.nativeElement.querySelector('.error');

    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidControl.focus(); // Optional: focus the field
    }
  }

  closeAllFormList(element = '') {
    if (element != 'contact') {
      this.isContactListOpen = false;
    }
    if (element != 'category') {
      this.isCategoryListOpen = false;
    }
    if (element != 'subtask') {
      this.closeAllSubtaskEdit();
    }
  }
}
