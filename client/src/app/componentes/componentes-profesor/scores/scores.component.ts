import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Evaluacion } from '../../../objects/Evaluacion';
import { Curso } from '../../../objects/Curso';

import { EvaluacionService } from '../../../services/evaluacion.service';
import { CursoService } from '../../../services/curso.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

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

	actualizarNotas() {
		var bandera:Number = 0;
		try {
			for (var i = 0; i < this.evaluaciones.length; ++i) {
				for (var j = 0; j < this.evaluaciones[i].asignaciones.length; ++j) {
					this.evaluaciones[i].asignaciones[j].nota = parseInt(this.evaluaciones[i].asignaciones[j].nota.toString());
					if (this.evaluaciones[i].asignaciones[j].nota > 100 || this.evaluaciones[i].asignaciones[j].nota < 0) {
						bandera = 1;
					}
				}
				if (bandera != 1) {
					this.evaluacionService.update(this.evaluaciones[i]).subscribe();
				} else {
					alert("Usuario " + this.evaluaciones[i].carnet + " no actualizado. Nota incorrecta");
					bandera = 0;
				}
			}
			console.log(this.evaluaciones);
		} catch(err) {
			alert(err);
		}
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
