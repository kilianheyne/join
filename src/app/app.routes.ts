import { Routes } from '@angular/router';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
    { path: 'board', component: BoardComponent },
    { path: 'contacts', component: ContactpageComponent },
];
