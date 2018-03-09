import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  login(){
  	
  	this.router.navigate(['quiero-viajar']);
    console.log("hola esto es un mensaje");
  }

  cargarProfesor(){
    this.router.navigate(['cargar-profesor']);
    console.log("hola muchahos!!!!!");

  }
  

}