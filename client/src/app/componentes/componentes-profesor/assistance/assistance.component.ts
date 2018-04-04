import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Evaluacion } from '../../../objects/Evaluacion';
import { Curso } from '../../../objects/Curso';

import { EvaluacionService } from '../../../services/evaluacion.service';
import { CursoService } from '../../../services/curso.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.css']
})
export class AssistanceComponent implements OnInit {
	idGrupo:String;

	curso:Curso;

	evaluaciones:Evaluacion[] = [];

	constructor(private router:Router, private recievedData: ActivatedRoute, private evaluacionService:EvaluacionService, private cursoService:CursoService) {
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
		this.cursoService.readGrupoConID(this.idGrupo)
			.subscribe(curso => {
				for (var i = 0; i < curso.estudiantes.length; ++i) {
					this.evaluacionService.readEvaluacionesGrupoEstudiante(this.idGrupo, curso.estudiantes[i])
						.subscribe(evaluacion => {					
							this.evaluaciones.push(evaluacion);
						});
				}
				this.curso = curso;
			});
		console.log(this.curso);
		console.log(this.evaluaciones);
	}

	ngOnInit() {
	}
	
}
