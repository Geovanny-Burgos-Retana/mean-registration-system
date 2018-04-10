import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Mensaje } from '../../../objects/Mensaje';

import { ForoService } from '../../../services/foro.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-group',
  templateUrl: './show-group.component.html',
  styleUrls: ['./show-group.component.css']
})
export class ShowGroupComponent implements OnInit {
	
	idGrupo:String;
	nombre:String;
	carnet:String;

	mensaje: String;
	mensajes:Mensaje[] = [];

	constructor(private router:Router, private recievedData: ActivatedRoute, private foroService:ForoService) {
		this.recievedData.queryParams.subscribe(params => {
            this.idGrupo = params["_idGrupo"];
            this.nombre = params["nombre"];
            this.carnet = params["carnet"];
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
		-Crear objecto mensaje para guardarlo en la DB
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
		-Redireccionar con parametros a las evaluaciones del curso
	*/
	evaluaciones() {
		const navigationExtras: NavigationExtras = {
            queryParams: {
                "_idGrupo": this.idGrupo,
                "nombre": this.nombre,
                "carnet": this.carnet
            }
        };
        this.router.navigate(['show-scores'], navigationExtras);
	}

	/*
		-Redireccionar con parametros a la asistencia del curso
	*/
	asistencia() {
		const navigationExtras: NavigationExtras = {
            queryParams: {
                "_idGrupo": this.idGrupo,
                "nombre": this.nombre,
                "carnet": this.carnet
            }
        };
        this.router.navigate(['show-assistance'], navigationExtras);
	}

}
