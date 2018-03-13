import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from '../prueba/prueba.component';
import { ViajarComponent } from '../viajar/viajar.component';
import { LoginComponent } from '../login/login.component';
import { ProfesorComponent } from '../profesor/profesor.component';
import { MallaComponent} from '../componentes-profesor/malla/malla.component';
import { AsignacionComponent } from '../componentes-profesor/asignacion/asignacion.component';
import { AsistenciaComponent } from '../componentes-profesor/asistencia/asistencia.component';
import { GrupoComponent } from '../componentes-profesor/grupo/grupo.component';
import { NotasComponent } from '../componentes-profesor/notas/notas.component';
import { UniversidadComponent } from '../universidad/universidad.component';
import { ComponentesEstudianteComponent} from '../componentes-estudiante/componentes-estudiante.component';


const routes: Routes = [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path:'quiero-viajar',
        component: ViajarComponent
      },
      {
        path:'profesor',
        component: ProfesorComponent

      },
      {
        path:'profesor-asignacion',
        component: AsignacionComponent

      },
      {
        path:'profesor-asistencia',
        component: AsistenciaComponent

      },
      {
        path:'profesor-grupo',
        component: GrupoComponent

      },
      {
        path:'profesor-malla',
        component: MallaComponent

      },
      {
        path:'profesor-notas',
        component: NotasComponent

      },
      {
        path:'profesor-universidades',
        component: UniversidadComponent

      },
      {
        path:'matricula-estudiante',
        component: ComponentesEstudianteComponent
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