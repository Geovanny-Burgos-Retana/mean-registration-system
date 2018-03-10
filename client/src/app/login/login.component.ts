import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service'
import { User } from '../objects/Usuario';
import { Universidad } from '../objects/Universidad'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
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

  constructor(private router:Router, private loginService:LoginService) {  }

  ngOnInit() {  }

  login() {
    this.loginService.getUser(this.username, this.password)
      .subscribe(user => {
        console.log(user.tipo);
        this.user = user;
        this.redirectUser(user);
      });
  }

  redirectUser(res: User) {
    console.log(res.tipo);
    if (res.tipo == "estudiante") {
      this.router.navigate(['quiero-viajar']);
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