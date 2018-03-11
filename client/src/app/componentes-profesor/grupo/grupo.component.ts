import { Component, OnInit } from '@angular/core';

import { CursoService } from '../../services/curso.service';

import { Curso } from '../../objects/Curso';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  materia: String;
  grupo: String;
  horario: String;
  universidad: String;
  profesor: String;
  curso: Curso;



  constructor(private curseService:CursoService){
  	this.curso = {
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

  addGrupo(){
  	event.preventDefault();
    if (this.materia != '' && this.grupo != '' && this.horario != '' && this.universidad != '' && this.profesor != '') {
      this.curso.nombre = this.materia;
      this.curso.horario = this.horario;
      this.curso.numeroGrupo = this.grupo;
      this.curso.profesor = this.profesor;
      this.curso.universidad = this.universidad;
      this.curseService.addGr(this.carreraObj)
      .subscribe(task => {
        this.materia = '';
        this.carreraObj = {
          nombre:'',
          materias:[]
        }
      })
    }
  }
}
