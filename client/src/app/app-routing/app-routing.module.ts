import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorComponent } from '../profesor/profesor.component';

import { StartLoginComponent } from '../componentes/start-login/start-login.component';
import { RegisterComponent } from '../componentes/register/register.component';
import { UsersComponent } from '../componentes/componentes-profesor/users/users.component';
import { UniversityComponent } from '../componentes/componentes-profesor/university/university.component';
import { CurriculumComponent } from '../componentes/componentes-profesor/curriculum/curriculum.component';
import { GroupComponent } from '../componentes/componentes-profesor/group/group.component';
import { RegistrationComponent } from '../componentes/componenetes-estudiante/registration/registration.component';

import { UserDetailsComponent } from '../componentes/detalles/user-details/user-details.component';
import { UniversityDetailsComponent } from '../componentes/detalles/university-details/university-details.component';
import { CurriculumDetailsComponent } from '../componentes/detalles/curriculum-details/curriculum-details.component';

const routes: Routes = [
      {
        path: '',
        component: StartLoginComponent,
      },
      {
        path:'profesor',
        component: ProfesorComponent

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
        path:'curriculum-details',
        component: CurriculumDetailsComponent
      },
      {
        path:'group',
        component: GroupComponent
      },
      {
        path:'registration',
        component:RegistrationComponent
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