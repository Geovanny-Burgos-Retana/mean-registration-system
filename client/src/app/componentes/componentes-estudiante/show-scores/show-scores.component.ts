import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Evaluacion } from '../../../objects/Evaluacion';
import { Curso } from '../../../objects/Curso';

import { EvaluacionService } from '../../../services/evaluacion.service';
import { CursoService } from '../../../services/curso.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-scores',
  templateUrl: './show-scores.component.html',
  styleUrls: ['./show-scores.component.css']
})
export class ShowScoresComponent implements OnInit {

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
				this.curso = curso;				
				for (var i = 0; i < curso.estudiantes.length; ++i) {
					this.evaluacionService.readEvaluacionesGrupoEstudiante(this.idGrupo, curso.estudiantes[i])
						.subscribe(evaluacion => {					
							this.evaluaciones.push(evaluacion);
						});
				}
			});
	}

	ngOnInit() {
	}

	calcularNota(e:Evaluacion):Number {
		var sum:number = 0;
		console.log("Calculando nota", e);
		for (var i = 0; i < e.asignaciones.length; ++i) {
			sum += parseInt(e.asignaciones[i].nota.toString()) * parseFloat(this.curso.asignaciones[i].porcentaje.toString());
			console.log(parseInt(e.asignaciones[i].nota.toString()));
			console.log(parseInt(this.curso.asignaciones[i].porcentaje.toString()));
		}
		console.log(sum);
		return sum;
	}
}
