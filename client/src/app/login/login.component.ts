import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { SecionService } from '../services/secion.service';
import { User } from '../objects/Usuario';
import { Universidad } from '../objects/Universidad';
import { Secion } from '../objects/secion';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  secion: Secion;

  //Campos para login
  username: String;
  password: String;

  //Colecciones  
  universidades: Universidad[];

  //Campos para registro
  usuario: String;
  contrasenia: String;
  universidad: String;
  escuela: String;
  tipo:String;
  nombre:String;
  carrera:String;
  carnet:String;

  constructor(private router:Router, private loginService:LoginService, private secionService: SecionService) {  }

  ngOnInit() {  }

  login() {
    this.loginService.getUser(this.username, this.password)
      .subscribe(user => {
        console.log(user.tipo);
        this.user = user;
        this.redirectUser(user);
        this.registrarSecion(user);
      });
      
      
  }

  registrarSecion(res: User){
    console.log('registrarSecion:'+res.usuario);
    const newSecion:Secion = {
        usuario:res.usuario,
        contrasena: res.contrasena,
        universidad: res.universidad,
        escuela: res.universidad,
        tipo: res.tipo,
        nombre: res.nombre,
        carrera: res.carrera,
        carnet:res.carnet,

      };
      console.log('despues constructor'+this.usuario);
      this.secionService.addSecion(newSecion)
      .subscribe(task => {
        this.nombre = '';
        this.usuario = '';
        this.contrasenia = '';
        this.universidad = '';
        this.escuela = '';
        this.carrera = '';
        this.tipo = '';
      });
     
    //this.secionService.addSecion(res);

  }

  redirectUser(res: User) {
    console.log(res.tipo);
    if (res.tipo == "estudiante") {
      //this.router.navigate(['quiero-viajar']);
      this.router.navigate(['matricula-estudiante']);
    } else if (res.tipo == "profesor") {
      this.router.navigate(['profesor']);
    }    
  }

  registerUser() {
    if (this.tipo.toLowerCase() == "estudiante") {
      const newUser:User = {
        usuario: this.usuario,
        contrasena: this.contrasenia,
        universidad: this.universidad,
        escuela: this.escuela,
        tipo: this.tipo,
        nombre: this.nombre,
        carrera: this.carrera,
        carnet:this.carnet,
      };

      this.loginService.addUser(newUser)
      .subscribe(task => {
        this.nombre = '';
        this.usuario = '';
        this.contrasenia = '';
        this.universidad = '';
        this.escuela = '';
        this.carrera = '';
        this.tipo = '';
      });

    } else if(this.tipo.toLowerCase() == "profesor") {
      const newUser:User = {
        usuario: this.usuario,
        contrasena: this.contrasenia,
        universidad: this.universidad,
        escuela: this.escuela,
        tipo: this.tipo,
        nombre: this.nombre,        
        carnet:this.carnet,        
      };
      this.loginService.addUser(newUser)
      .subscribe(task => {
        this.nombre = '';
        this.usuario = '';
        this.contrasenia = '';
        this.universidad = '';
        this.escuela = '';
        this.carrera = '';
        this.tipo = '';
      });
    }    
  }

  /*toStringUniversidades(res: Universidad[]) {
    for (let idx in res) {
      let item = res[idx];
      console.log(item._id);
      console.log(item.nombre);
      for (var i = 0; i < item.escuelas.length; ++i) {
        console.log(item.escuelas[i]);
      }
      
    }
  }*/

}