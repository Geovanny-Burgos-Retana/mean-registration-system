import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from '../prueba/prueba.component';
import { ViajarComponent } from '../viajar/viajar.component';
import { LoginComponent } from '../login/login.component';


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
        component: PruebaComponent
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