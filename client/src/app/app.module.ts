import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CarreraService } from './services/carrera.service';
import { CursoService } from './services/curso.service';
import { UniversidadService } from './services/universidad.service';
import { UsuarioService } from './services/usuario.service';
import { MateriaService } from './services/materia.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProfesorComponent } from './profesor/profesor.component';
//import { MallaComponent } from './componentes-profesor/malla/malla.component';
//import { GrupoComponent } from './componentes-profesor/grupo/grupo.component';
import { NotasComponent } from './componentes-profesor/notas/notas.component';
import { AsistenciaComponent } from './componentes-profesor/asistencia/asistencia.component';
import { AsignacionComponent } from './componentes-profesor/asignacion/asignacion.component';
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
import { CurriculumDetailsComponent } from './componentes/detalles/curriculum-details/curriculum-details.component';
import { AssistanceComponent } from './componentes/componentes-profesor/assistance/assistance.component';
import { AssignmentComponent } from './componentes/componentes-profesor/assignment/assignment.component';
import { ScoresComponent } from './componentes/componentes-profesor/scores/scores.component';
import { RegistrationComponent } from './componentes/componenetes-estudiante/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfesorComponent,
    NotasComponent,
    AsistenciaComponent,
    AsignacionComponent,
    StartLoginComponent,
    RegisterComponent,
    UsersComponent,
    UserDetailsComponent,
    UniversityComponent,
    UniversityDetailsComponent,
    CurriculumComponent,
    GroupComponent,
    CurriculumDetailsComponent,
    AssistanceComponent,
    AssignmentComponent,
    ScoresComponent,
    RegistrationComponent
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
    MateriaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }