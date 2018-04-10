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
	carnet:String;
	evaluacion:Evaluacion;
	curso:Curso;

	/*
		-Carga documento con las evaluaciones del estudiante
	*/
	constructor(private router:Router, private recievedData: ActivatedRoute, private evaluacionService:EvaluacionService, private cursoService:CursoService) {
		this.recievedData.queryParams.subscribe(params => {
            this.idGrupo = params["_idGrupo"];
            this.carnet = params["carnet"];
        });
        this.cursoService.readGrupoConID(this.idGrupo)
        .subscribe(curso => {
        	this.curso = curso;
        	this.evaluacionService.readEvaluacionesGrupoEstudiante(this.idGrupo, this.carnet)
	        .subscribe(evaluacion => {
	        	this.evaluacion = evaluacion;
	        	console.log(this.evaluacion, this.curso);
	        });
        });        	
	}

	ngOnInit() {
		
	}

	/*
		-Calcular la nota final
	*/
	calcularNota():Number {
		var sum:number = 0;
		for (var i = 0; i < this.evaluacion.asignaciones.length; ++i) {
			sum += parseInt(this.evaluacion.asignaciones[i].nota.toString()) * parseFloat(this.curso.asignaciones[i].porcentaje.toString());
		}
		console.log(sum);
		return sum;
	}
}
