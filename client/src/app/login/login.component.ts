import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service'
import { User } from '../objects/Usuario';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  name: String;
  pass: String;


  constructor(private router:Router, private loginService:LoginService) { 
    
  }

  ngOnInit() {
    console.log(this.user);
  }

  login(){
    this.loginService.getUser(this.name, this.pass)
      .subscribe(user => {
        this.user = user;
        this.redirectUser(user);
      });
  }

  redirectUser(res: User){
    if (res.tipo == "estudiante") {
      this.router.navigate(['quiero-viajar']);
    } else if (res.tipo == "profesor") {
      this.router.navigate(['profesor']);
    }
  }


  cargarProfesor(){
    this.router.navigate(['cargar-profesor']);
    console.log("hola muchahos!!!!!");

  }
  

}