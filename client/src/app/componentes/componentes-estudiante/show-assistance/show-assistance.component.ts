import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Asistencia } from '../../../objects/Asistencia';

import { AsistenciaService } from '../../../services/asistencia.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-assistance',
  templateUrl: './show-assistance.component.html',
  styleUrls: ['./show-assistance.component.css']
})
export class ShowAssistanceComponent implements OnInit {

	idGrupo:String;
	carnet:String;
	asistencia: Asistencia;

	constructor(private router:Router, private recievedData: ActivatedRoute, private asistenciaService: AsistenciaService) {
		this.recievedData.queryParams.subscribe(params => {
            this.idGrupo = params["_idGrupo"];
            this.carnet = params["carnet"];
        });

        this.asistenciaService.readAsistenciasGrupoEstudiante(this.idGrupo, this.carnet)
        .subscribe(docAsistencia => {
        	this.asistencia = docAsistencia;
        });

	}

	ngOnInit() {
	}

}
