import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Mensaje } from '../../../objects/Mensaje';

import { ForoService } from '../../../services/foro.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-group-teacher',
  templateUrl: './show-group-teacher.component.html',
  styleUrls: ['./show-group-teacher.component.css']
})
export class ShowGroupTeacherComponent implements OnInit {

  
	idGrupo:String;
	nombre:String;
	mensaje: String;
	mensajes:Mensaje[] = [];

	constructor(private router:Router, private recievedData: ActivatedRoute, private foroService:ForoService) {
		this.recievedData.queryParams.subscribe(params => {
            this.idGrupo = params["_idGrupo"];
            this.nombre = params["nombre"];
        });
	}

	ngOnInit() {
		this.foroService.readMensajesGrupo(this.idGrupo)
			.subscribe(mensajes =>{
				this.mensajes = mensajes;
				console.log(this.mensajes);
			});
	}

	/*
		-Guardar mensaje de foro localmente y en DB
	*/
	nuevoMensaje() {
		var msg:Mensaje = {
			idGrupo: this.idGrupo,
			emisor: this.nombre,
			mensaje: this.mensaje
		}
		this.foroService.create([msg])
			.subscribe(mensaje => {
				if (mensaje != null) {
					this.mensajes.push(msg);
				}
			});
	}

	/*
		-Redireccionar a evaluaciones del grupo
	*/
	evaluaciones() {
		const navigationExtras: NavigationExtras = {
            queryParams: {
                "_idGrupo": this.idGrupo
            }
        };
        this.router.navigate(['scores'], navigationExtras);
	}

	/*
		-Redireccionar a asistencia del grupo
	*/
	asistencia() {
		const navigationExtras: NavigationExtras = {
            queryParams: {
                "_idGrupo": this.idGrupo
            }
        };
        this.router.navigate(['assistance'], navigationExtras);
	}

}
