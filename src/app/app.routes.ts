import { Routes } from '@angular/router';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { BoardComponent } from './board/board.component';
import { AddTaskPageComponent } from './add-task-page/add-task-page.component';
import { HelpPageComponent } from './help-page/help-page.component';

export const routes: Routes = [
    { path: '', component: BoardComponent },
    { path: 'board', component: BoardComponent },
    { path: 'contacts', component: ContactpageComponent },
    { path: 'add-task', component: AddTaskPageComponent },
    { path: 'help', component: HelpPageComponent}
];
