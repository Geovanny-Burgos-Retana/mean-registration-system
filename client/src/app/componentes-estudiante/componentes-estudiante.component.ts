import { Component, OnInit } from '@angular/core';

import { Secion } from '../objects/secion'; 

import {CursoService} from '../services/curso.service';
import {Curso} from '../objects/Curso';
import { SecionService } from '../services/secion.service';

@Component({
  selector: 'app-componentes-estudiante',
  templateUrl: './componentes-estudiante.component.html',
  styleUrls: ['./componentes-estudiante.component.css']
})
export class ComponentesEstudianteComponent implements OnInit {
  //atributos curso
  materia: String;
  grupo: String;
  horario: String;
  universidad: String;
  profesor: String;
  estudiantes: String [];
  posiblesCursos: String[];
  //estudiante de la secion
  nombreEstSecion: String;
  carnetEstSecion: String;

  //Colecciones  
  cursos: Curso[];
  seciones: Secion[];
  curso: Curso;
  
//Instancia del servicio curo
  constructor(private curseService:CursoService, private secionService: SecionService) {
  	this.curseService.getCursos()
  	.subscribe(cursos => {
  		this.cursos = cursos;
  		console.log("lista cursos"+this.cursos);
  	});
  	
  	

  	this.curso = {
  		_id: '',
  		nombre: '',
		numeroGrupo: '',
		profesor: '',
		estudiantes: [],
	  	horario: '',
	  	universidad: '',
  	}

  }
  
  ngOnInit() {
  }

  
  agregarEstACurso(curso: Curso){
  	//console.log(curso);
  	var bandera: Boolean;
  	bandera = true;
  	  	//console.log(this.seciones); 
  	for (var i = 0; i < curso.estudiantes.length; ++i) {
  		if(curso.estudiantes[i] == this.seciones[0].carnet){
  			bandera = false;
  			break;
  		}
  	}
  	if (bandera || curso.estudiantes.length == 0) {
  		this.curso.estudiantes.push(this.seciones[0].carnet);
  		this.curso._id = curso._id; 
  	}

  	console.log("curso. estudiantes "+this.curso.estudiantes);

  	this.curseService.updateCurso(this.curso)
  		.subscribe(curso => {
  			this.curso._id = '';
  			this.curso.estudiantes = [];
  		});
	
  }



  registrarMatricula(){
  	this.secionService.getSeciones()
  	.subscribe(seciones => {
  		this.seciones = seciones;
  		console.log(this.seciones);
  	});
  }

  
  mostrarCursos(){
  	console.log("lista cursos"+this.cursos);
  	  
  }

}
