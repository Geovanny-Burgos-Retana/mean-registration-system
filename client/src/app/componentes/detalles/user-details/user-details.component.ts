import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { UsuarioService } from '../../../services/usuario.service';
import { UniversidadService } from '../../../services/universidad.service';

import { User } from '../../../objects/Usuario';
import { Universidad } from '../../../objects/Universidad';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
	usuario: String;
	contrasenia: String;
	universidad: String;
	escuela: String;
	tipo:String;
	nombre:String;
	carrera:String;
	carnet:String;
	_id:String;

	constructor(private router:Router, private usuarioService:UsuarioService,private recievedData: ActivatedRoute, private universidadService:UniversidadService) { 
		this.recievedData.queryParams.subscribe(params => {
			this._id = params["_id"];
            this.usuario = params["usuario"];
            this.contrasenia = params["contrasenia"];
            this.universidad = params["universidad"];
            this.escuela = params["escuela"];
            this.tipo = params["tipo"];
            this.nombre = params["nombre"];
            this.carrera = params["carrera"];
            this.carnet = params["carnet"];
        });		
	}

	ngOnInit() {

	}

	actualizarUsuario() {
		if (this.usuario != "" && this.contrasenia != "" && this.universidad != "" && this.escuela != "" && this.nombre != "" && this.carnet != "") {
			const usuarioNuevo:User = {
				_id: this._id,
		        usuario: this.usuario,
		        contrasena: this.contrasenia,
		        universidad: this.universidad,
		        escuela: this.escuela,
		        tipo: this.tipo,
		        nombre: this.nombre,
		        carnet:this.carnet
		    }; 
			this.usuarioService.readUsuario(this.usuario, this.contrasenia)
				.subscribe(user => {					
					this.universidadService.readUniversidadEscuela(this.universidad, this.escuela)
						.subscribe(universidad => {
							if (universidad == null && this.tipo.toLowerCase() == "profesor") {
								console.log("Crear universidad y actualizar usuario");
								const universidadNueva:Universidad = {
									nombre: this.universidad,
									escuelas: [this.escuela]
								}
								this.universidadService.createUniversidad(universidadNueva).subscribe(universidad => {if (universidad != null) alert("Universidad Registrada") });
								this.actualizarUsuarioValidado(usuarioNuevo);
							} else if (universidad != null && (this.tipo.toLowerCase() == "estudiante" || this.tipo.toLowerCase() == "profesor")) {			
								console.log("Actualizar usuario");
								this.actualizarUsuarioValidado(usuarioNuevo);
							} else {
								alert("Universidad-Escuela inexistentes");
							}
						});
				});
		} else {
			alert("Ingrese todos los datos");
		}
	}

	validacionPreRegistro(university: Universidad, user:User, userNew:User) {		
		console.log(university);
		console.log(this.tipo);

		
	}

	actualizarUsuarioValidado(userNew:User){
		console.log(userNew);
		this.usuarioService.updateUsuario(userNew)
			.subscribe(usuario => {				
				if (usuario != null) {
					alert("Actualizado exitosamente!");
				} else {
					alert("No registrado");
				}
			});
	}
}

/*
this.usuarioService.updateUsuario(usuarioNuevo)
				.subscribe(user => {
					if (user != null) {
						alert("Actualizado exitosamente!!");
						this.router.navigate(["users"]);
					} else {
						alert("No se actualizo");
					}
				});
*/
