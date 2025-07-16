import { Routes } from '@angular/router';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
    { path: '', component: BoardComponent },
    { path: 'board', component: BoardComponent },
    { path: 'contacts', component: ContactpageComponent },
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
