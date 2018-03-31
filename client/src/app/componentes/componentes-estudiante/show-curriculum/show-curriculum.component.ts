import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';	

import { Carrera } from '../../../objects/Carrera';
import { Tema } from '../../../objects/Tema';
import { Materia } from '../../../objects/Materia';

import { CarreraService } from '../../../services/carrera.service';
import { MateriaService } from '../../../services/materia.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-curriculum',
  templateUrl: './show-curriculum.component.html',
  styleUrls: ['./show-curriculum.component.css']
})
export class ShowCurriculumComponent implements OnInit {

	materias:Materia[];
	carrera: String;

	materia: Materia;

    str: String = " *  ";

	constructor(private router:Router, private carreraService:CarreraService, private recievedData: ActivatedRoute, private materiaService:MateriaService) { 
		this.recievedData.queryParams.subscribe(params => {
            this.carrera = params["carrera"];
        });        
        this.materiaService.readMateriasGrupo(this.carrera)
        	.subscribe(materias => {
        		this.materias = materias;
        	});
        this.materia = {
        	nombre:'',
        	carrera:'',
        	temas: [],
        }
	}

	ngOnInit() {
	}

	verMateria(materia:Materia) {
		this.materia = materia;
	}
	
}
