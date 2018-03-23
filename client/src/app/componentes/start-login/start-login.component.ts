import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

import { User } from '../../objects/Usuario';
import { Universidad } from '../../objects/Universidad';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-start-login',
	templateUrl: './start-login.component.html',
	styleUrls: ['./start-login.component.css']
})
export class StartLoginComponent implements OnInit {
	usuario: String;
	contrasenia: String;

  	constructor(private router:Router, private usuarioService:UsuarioService) {}

	ngOnInit() {	
		
	}

	iniciarSecion(){
		this.usuarioService.readUsuario(this.usuario, this.contrasenia)
			.subscribe(user => {
				if (user != null) {
					const navigationExtras: NavigationExtras = {
			            queryParams: {
			            	"_id": user._id,
			            	"nombre": user.nombre,
			            	"carnet": user.carnet
			            }
			        };
			    	this.router.navigate(['user-details'], navigationExtras);
					if (user.tipo == "estudiante") {      				
      					this.router.navigate(['registration'], navigationExtras);
    				} else if (user.tipo == "profesor") {
      					this.router.navigate(['profesor']);
    				}
				} else {
					alert("Usuario incorrecto");
				}
			});
	}

	registrarUsuario(){
		this.router.navigate(['registrar-usuario']);		
  	}
}
