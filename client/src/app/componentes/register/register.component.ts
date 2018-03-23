import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import { UniversidadService } from '../../services/universidad.service';
import { CarreraService } from '../../services/carrera.service'

import { User } from '../../objects/Usuario';
import { Universidad } from '../../objects/Universidad';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	usuario: String;
	contrasenia: String;
	universidad: String;
	escuela: String;
	tipo:String;
	nombre:String;
	carrera:String;
	carnet:String;

  	constructor(private router:Router, private usuarioService:UsuarioService, private universidadService:UniversidadService, private carreraService:CarreraService) { }

	ngOnInit() {
	
	}

	registrarUsuario() {
		if (this.usuario != '' && this.contrasenia != '' && this.universidad != '' && this.escuela != '' && this.nombre != '' && this.carnet != '') {
			const usuarioNuevo:User = {
		        usuario: this.usuario,
		        contrasena: this.contrasenia,
		        universidad: this.universidad,
		        escuela: this.escuela,
		        tipo: this.tipo,
		        nombre: this.nombre,
		        carnet:this.carnet
		    };
			if (this.tipo.toLowerCase() == "estudiante") {
				this.registrarEstudiante(usuarioNuevo);
		    } else if(this.tipo.toLowerCase() == "profesor") {      
		      	this.registrarProfesor(usuarioNuevo);
		    } else {
		    	alert("Tipo incorrecto");
		    }		    
		} else {
			alert("Ingrese todos los datos");
		}		
	}

	//Se hace validaciones para registrar estudiante
	registrarEstudiante(usuarioNuevo: User) {
		usuarioNuevo.carrera = this.carrera;
		this.universidadService.readUniversidadEscuela(this.universidad, this.escuela)
		.subscribe(universidad => {
			if (universidad != null) {
				this.validarCarrera(usuarioNuevo);
			} else {
				alert("(Universidad, Escuela) invalida");
			}
		});
	}

	validarCarrera(usuarioNuevo: User){
		this.carreraService.readMalla(this.carrera)
		.subscribe(carrera => {
			if (carrera != null) {
				this.usuarioService.createUsuario(usuarioNuevo)
	      		.subscribe(user => {
			        if (user != null) {
			        	alert("Estudiante Registrado");
			        	this.carnet = '';this.nombre = '';this.usuario = '';this.contrasenia = '';this.universidad = '';this.escuela = '';this.carrera = '';this.tipo = '';
			        } else {
			        	alert("No registrado");
			        }
	      		});
			} else {
				alert("Carrera inexistente");
			}
		});
		
	}

	registrarProfesor(usuarioNuevo: User) {
		this.universidadService.readUniversidadEscuela(this.universidad, this.escuela)
		.subscribe(universidad => {
			console.log(universidad);
			if (universidad == null) {
				const universidadNueva:Universidad = {
					nombre: this.universidad,
					escuelas: [this.escuela]
				}
				this.universidadService.createUniversidad(universidadNueva).subscribe();				
			}
		});
		this.usuarioService.createUsuario(usuarioNuevo)
  		.subscribe(user => {
	        if (user != null) {
	        	alert("Profesor Registrado");
	        	this.carnet = '';this.nombre = '';this.usuario = '';this.contrasenia = '';this.universidad = '';this.escuela = '';this.carrera = '';this.tipo = '';
	        } else {
	        	alert("No registrado");
	        }
  		});
	}
}
