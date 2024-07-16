import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { StudyComponent } from './study/study.component';
import { ExamComponent } from './exam/exam.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'study', component: StudyComponent },
    { path: 'exam', component: ExamComponent },
];
