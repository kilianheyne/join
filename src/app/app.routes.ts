import { Routes } from '@angular/router';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { AddTaskPageComponent } from './add-task-page/add-task-page.component';

export const routes: Routes = [
    {
        path: 'add-task',
        component: AddTaskPageComponent
    },
    {
        path: 'contacts',
        component: ContactpageComponent
    }
];
