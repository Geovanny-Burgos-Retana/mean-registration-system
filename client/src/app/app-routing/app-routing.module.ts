import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherMenuComponent } from '../componentes/teacher-menu/teacher-menu.component';


import { StartLoginComponent } from '../componentes/start-login/start-login.component';
import { RegisterComponent } from '../componentes/register/register.component';
import { UsersComponent } from '../componentes/componentes-profesor/users/users.component';
import { UniversityComponent } from '../componentes/componentes-profesor/university/university.component';
import { CurriculumComponent } from '../componentes/componentes-profesor/curriculum/curriculum.component';
import { GroupComponent } from '../componentes/componentes-profesor/group/group.component';
import { RegistrationComponent } from '../componentes/componentes-estudiante/registration/registration.component';
import { StudentMenuComponent } from '../componentes/student-menu/student-menu.component';
import { AssignmentsComponent } from '../componentes/componentes-estudiante/assignments/assignments.component';
import { ShowCurriculumComponent } from '../componentes/componentes-estudiante/show-curriculum/show-curriculum.component';
import { ShowGroupComponent } from '../componentes/componentes-estudiante/show-group/show-group.component';

import { ShowGroupTeacherComponent } from '../componentes/componentes-profesor/show-group-teacher/show-group-teacher.component';
import { UserDetailsComponent } from '../componentes/detalles/user-details/user-details.component';
import { UniversityDetailsComponent } from '../componentes/detalles/university-details/university-details.component';

const routes: Routes = [
      {
        path: '',
        component: StartLoginComponent,
      },
      {
        path:'teacher-menu',
        component: TeacherMenuComponent

      },
      {
        path:'registrar-usuario',
        component: RegisterComponent
      },
      {
        path:'users',
        component: UsersComponent
      },
      {
        path:'user-details',
        component: UserDetailsComponent
      },
      {
        path:'universities',
        component: UniversityComponent
      },
      {
        path:'university-details',
        component: UniversityDetailsComponent
      },
      {
        path:'curriculums',
        component: CurriculumComponent
      },
      {
        path:'group',
        component: GroupComponent
      },
      {
        path:'registration',
        component:RegistrationComponent
      },
      {
        path:'student-menu',
        component: StudentMenuComponent

      },
      {
        path:'assignment',
        component: AssignmentsComponent
      },
      {
        path:'show-curriculum',
        component: ShowCurriculumComponent
      },
      {
        path:'show-group',
        component: ShowGroupComponent
      },
      {
        path:'show-group-teacher',
        component: ShowGroupTeacherComponent
      }
  ];

@NgModule({
      imports: [
          RouterModule.forRoot(routes)
      ],
      exports: [
          RouterModule
      ],
      declarations: []
  })
export class AppRoutingModule { }