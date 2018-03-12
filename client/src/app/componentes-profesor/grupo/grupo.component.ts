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
  cursos: Curso[];



  constructor(private curseService:CursoService){
  	this.curso = {
  		nombre: '',
		  numeroGrupo: '',
		  profesor: '',
		  estudiantes: [],
  		horario: '',
  		universidad: '',
  	}
    this.curseService.getCursos()
      .subscribe(cursos => {
        this.cursos = cursos;
      });
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
      this.curseService.getCurso(this.curso.nombre, this.curso.numeroGrupo)
        .subscribe(curso => {
          if (curso == null) {
            this.cursos.push(this.curso);
            this.curseService.addCurso(this.curso)
              .subscribe(task => {
                this.materia = '';
                this.grupo = '';
                this.horario = '';
                this.universidad = '';
                this.profesor = '';
                this.curso = {
                  nombre: '',
                  numeroGrupo: '',
                  profesor: '',
                  estudiantes: [],
                  horario: '',
                  universidad: '',
                }
            });
          }
        });
    }
  }
}
