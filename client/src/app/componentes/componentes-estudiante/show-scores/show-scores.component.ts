import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Evaluacion } from '../../../objects/Evaluacion';

import { EvaluacionService } from '../../../services/evaluacion.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-scores',
  templateUrl: './show-scores.component.html',
  styleUrls: ['./show-scores.component.css']
})
export class ShowScoresComponent implements OnInit {

	idGrupo:String;
	nombre:String;
	carnet:String;

	evaluacion: Evaluacion;

	constructor(private router:Router, private recievedData: ActivatedRoute, private evaluacionService:EvaluacionService) {
		this.recievedData.queryParams.subscribe(params => {
            this.idGrupo = params["_idGrupo"];
            this.nombre = params["nombre"];
            this.carnet = params["carnet"];
        });
        this.evaluacion = {
        	asignaciones: [],
        	carnet:'',
        	grupo:''
        }
	}

	ngOnInit() {
		this.evaluacionService.readEvaluacionesGrupoEstudiante(this.idGrupo, this.carnet)
			.subscribe(evaluacion => {
				this.evaluacion = evaluacion;
			});
		console.log(this.idGrupo, this.nombre, this.carnet);
	}
}
