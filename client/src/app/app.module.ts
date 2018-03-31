import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CarreraService } from './services/carrera.service';
import { CursoService } from './services/curso.service';
import { UniversidadService } from './services/universidad.service';
import { UsuarioService } from './services/usuario.service';
import { MateriaService } from './services/materia.service';
import { EvaluacionService } from './services/evaluacion.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
//import { ProfesorComponent } from './profesor/profesor.component';
//import { MallaComponent } from './componentes-profesor/malla/malla.component';
//import { GrupoComponent } from './componentes-profesor/grupo/grupo.component';
//import { UniversidadComponent } from './universidad/universidad.component';
//import { ComponentesEstudianteComponent } from './componentes-estudiante/componentes-estudiante.component';

import { StartLoginComponent } from './componentes/start-login/start-login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { UsersComponent } from './componentes/componentes-profesor/users/users.component';
import { UserDetailsComponent } from './componentes/detalles/user-details/user-details.component';
import { UniversityComponent } from './componentes/componentes-profesor/university/university.component';
import { UniversityDetailsComponent } from './componentes/detalles/university-details/university-details.component';
import { CurriculumComponent } from './componentes/componentes-profesor/curriculum/curriculum.component';
import { GroupComponent } from './componentes/componentes-profesor/group/group.component';
import { AssistanceComponent } from './componentes/componentes-profesor/assistance/assistance.component';
import { ScoresComponent } from './componentes/componentes-profesor/scores/scores.component';
import { RegistrationComponent } from './componentes/componentes-estudiante/registration/registration.component';
import { TeacherMenuComponent } from './componentes/teacher-menu/teacher-menu.component';
import { StudentMenuComponent } from './componentes/student-menu/student-menu.component';
import { AssignmentsComponent } from './componentes/componentes-estudiante/assignments/assignments.component';
import { ShowCurriculumComponent } from './componentes/componentes-estudiante/show-curriculum/show-curriculum.component';
import { ShowGroupComponent } from './componentes/componentes-estudiante/show-group/show-group.component';


@NgModule({
  declarations: [
    AppComponent,
    StartLoginComponent,
    RegisterComponent,
    UsersComponent,
    UserDetailsComponent,
    UniversityComponent,
    UniversityDetailsComponent,
    CurriculumComponent,
    GroupComponent,
    AssistanceComponent,
    ScoresComponent,
    RegistrationComponent,
    TeacherMenuComponent,
    StudentMenuComponent,
    AssignmentsComponent,
    ShowCurriculumComponent,
    ShowGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CarreraService,
    CursoService,
    UniversidadService,
    UsuarioService,
    MateriaService,
    EvaluacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }