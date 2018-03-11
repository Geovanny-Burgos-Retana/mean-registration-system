import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { LoginService } from './services/login.service'
import { CarreraService } from './services/carrera.service';
import { CursoService } from './services/curso.service';
import { UniversidadService } from './services/universidad.service';
import { UsuarioService } from './services/usuario.service';

import { AppComponent } from './app.component';
import { PruebaComponent } from './prueba/prueba.component';
import { ViajarComponent } from './viajar/viajar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { MallaComponent } from './componentes-profesor/malla/malla.component';
import { GrupoComponent } from './componentes-profesor/grupo/grupo.component';
import { NotasComponent } from './componentes-profesor/notas/notas.component';
import { AsistenciaComponent } from './componentes-profesor/asistencia/asistencia.component';
import { AsignacionComponent } from './componentes-profesor/asignacion/asignacion.component';
import { UniversidadComponent } from './universidad/universidad.component';
import { ComponentesEstudianteComponent } from './componentes-estudiante/componentes-estudiante.component';


@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    ViajarComponent,
    LoginComponent,
    ProfesorComponent,
    MallaComponent,
    GrupoComponent,
    NotasComponent,
    AsistenciaComponent,
    AsignacionComponent,
    UniversidadComponent,
    ComponentesEstudianteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
    CarreraService,
    CursoService,
    UniversidadService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }