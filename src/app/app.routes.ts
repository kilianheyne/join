import { Routes } from '@angular/router';
import { HelpPageComponent } from './components/main-layouts/help-page/help-page.component';
import { PrivacyPolicyComponent } from './components/main-layouts/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/main-layouts/legal-notice/legal-notice.component';
import { MainLayoutsComponent } from './components/main-layouts/main-layouts.component';
import { AuthLayoutsComponent } from './components/auth-layouts/auth-layouts.component';
import { BoardComponent } from './components/main-layouts/board/board.component';
import { AddTaskPageComponent } from './components/main-layouts/add-task-page/add-task-page.component';
import { ContactpageComponent } from './components/main-layouts/contactpage/contactpage.component';
import { SummaryComponent } from './components/main-layouts/summary/summary.component';
import { LoginScreenComponent } from './components/auth-layouts/login-screen/login-screen.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutsComponent,
        children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full' },
            { path: 'summary', component: SummaryComponent },
            { path: 'board', component: BoardComponent },
            { path: 'contacts', component: ContactpageComponent },
            { path: 'add-task', component: AddTaskPageComponent },
            { path: 'help', component: HelpPageComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'legal-notice', component: LegalNoticeComponent }
        ]
    },
    {
        path: '',
        component: AuthLayoutsComponent,
        children: [
            { path: 'login', component: LoginScreenComponent },
        ]
    },
    // fallback route
    { path: '**', redirectTo: '' }
];