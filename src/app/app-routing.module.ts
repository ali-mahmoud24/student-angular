import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsFormComponent } from './students-form/students-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/new', component: StudentsFormComponent },
  { path: 'students/:studentId', component: StudentsFormComponent },
  // {
  //   path: 'students',
  //   component: StudentsListComponent,
  //   children: [
  //     { path: 'new', component: StudentsFormComponent },
  //     {
  //       path: ':studentId/edit',
  //       component: StudentsFormComponent,
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
