import { Component, OnInit } from '@angular/core';

import {CursoService} from '../services/curso.service';
import {Curso} from '../objects/Curso';

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


  //Colecciones  
  cursos: Curso[];
  
//Instancia del servicio curo
  constructor(private curseService:CursoService) {
  	this.curseService.getCursos()
  	.subscribe(cursos => {
  		this.cursos = cursos;
  		console.log("lista cursos"+this.cursos);
  	})



  }
  
  ngOnInit() {
  }

  agregarCurso(curso){
  	console.log("curso: "+curso);
  	//this.posiblesCursos.push(curso);
  }


  mostrarCursos(){
  	console.log("lista cursos"+this.cursos);
  	  
  }

}
