import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { LoginService } from './services/login.service'

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
    AsignacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }