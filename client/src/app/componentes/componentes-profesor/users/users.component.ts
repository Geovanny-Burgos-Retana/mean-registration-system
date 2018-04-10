import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { UsuarioService } from '../../../services/usuario.service';

import { User } from '../../../objects/Usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	usuarios:User[];

    constructor(private router:Router, private usuarioService:UsuarioService) { 
    	this.usuarioService.readUsuarios()
    		.subscribe(usuarios => {
    			this.usuarios = usuarios;
    		});
    }

	ngOnInit() {

    }

    /*
        -Redireccionar a editación de un usuario específico
    */
	editarUsuario(usuario:User) {		
		const navigationExtras: NavigationExtras = {
            queryParams: {
            	"_id": usuario._id,
                "usuario": usuario.usuario,
                "contrasenia": usuario.contrasena,
                "universidad": usuario.universidad,
                "escuela": usuario.escuela,
                "tipo": usuario.tipo,
                "nombre": usuario.nombre,
                "carrera": usuario.carrera,
                "carnet": usuario.carnet
            }
        };
    	this.router.navigate(['user-details'], navigationExtras);
	}

    /*
        Eliminar un usuario localemte y en DB
    */
	eliminarUsuario(usuario:User) {		
		this.usuarioService.deleteUsuario(usuario._id)
			.subscribe(user => {
				if (user != null) {
					this.usuarioService.readUsuarios()
			    		.subscribe(ususarios => {
			    			this.usuarios = ususarios;
			    		});
				}
			});
	}
}
