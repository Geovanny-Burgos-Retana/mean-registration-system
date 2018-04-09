import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Asistencia } from '../../../objects/Asistencia';
import { ItemAsistencia } from '../../../objects/ItemAsistencia';
import { Curso } from '../../../objects/Curso';

import { CursoService } from '../../../services/curso.service';
import { AsistenciaService } from '../../../services/asistencia.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.css']
})
export class AssistanceComponent implements OnInit {
	idGrupo:String;

	fecha: String;

	curso:Curso;

	asistencias:Asistencia[] = [];

	asistenciasTemp: Asistencia[] = [];

	constructor(private router:Router, private recievedData: ActivatedRoute, private cursoService:CursoService, private asistenciaService: AsistenciaService) {
		this.recievedData.queryParams.subscribe(params => {
            this.idGrupo = params["_idGrupo"];
        });
        this.curso = {
			_id:"",
			estudiantes: [],
			nombre: "",
			numeroGrupo: "",
			profesor: "",
			horario: "",
			universidad:"",
			asignaciones:[]
		}		
	}

	ngOnInit() {
	}

	actualizarNotas() {		
		try {
			var fecha = new Date(this.fecha.toString());
			for (var i = 0; i < this.asistencias.length; ++i) {
				for (var j = 0; j < this.asistencias[i].asistencias.length; ++j) {
					if (this.asistencias[i].asistencias[j].fecha == this.fecha) {
						this.asistencias[i].asistencias[j].presente = this.asistenciasTemp[i].asistencias[0].presente;
					}
				}
				this.asistenciaService.update(this.asistencias[i]).subscribe();
			}
			this.fecha = "";
			this.asistencias = [];
			this.asistenciasTemp = [];			
		} catch(err) {
			alert(err);
		}
	}

	cargarFecha() {
		this.asistenciasTemp = [];
		var date:Date = new Date(this.fecha.toString());
		console.log(date.toString());
		if (date.toString() != "Invalid Date") {
			this.cursoService.readGrupoConID(this.idGrupo)
			.subscribe(curso => {
				this.curso = curso;				
				for (var i = 0; i < curso.estudiantes.length; ++i) {
					this.asistenciaService.readAsistenciasGrupoEstudiante(this.idGrupo, curso.estudiantes[i])
						.subscribe(docAsistencia => {
							var item: ItemAsistencia = {
								fecha: this.fecha,
								presente: false
							}
							var temp: Asistencia = {
								grupo: docAsistencia.grupo,
								carnet: docAsistencia.carnet,
								asistencias: [item]
							}
							docAsistencia.asistencias.push(item);
							this.asistenciasTemp.push(temp);
							this.asistencias.push(docAsistencia);
						});
				}
			});
		} else {
			alert("Fecha Invalida");
		}
	}

	cambiarPresencia(a: Asistencia) {
		a.asistencias[0].presente = !a.asistencias[0].presente;
		console.log(a);
	}

}
