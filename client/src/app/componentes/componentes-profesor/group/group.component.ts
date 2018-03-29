import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';	

import { Curso } from '../../../objects/Curso';
import { Asignacion } from '../../../objects/Asignacion';

import { CursoService } from '../../../services/curso.service';
import { UniversidadService } from '../../../services/universidad.service';
import { UsuarioService } from '../../../services/usuario.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
	curso: Curso;

	cursos: Curso[];

	selectedTipo: null;

	tiposEvaluciones = [
   		"quiz",
   		"proyecto",
   		"tarea"
    ];

    num: String;
    porcentaje: String;
    fecha: String;
    mydate = new Date('2014-04-03');

    sum: number = 0;


	constructor(private router:Router, private cursoService:CursoService, private usuarioService:UsuarioService, private universidadService:UniversidadService) { 		
		this.cursoService.readGrupos()
			.subscribe(courses => {
				this.cursos = courses;
			});
	}

	ngOnInit() {
		this.curso = {
			_id:'',
			nombre: '',
			numeroGrupo: '',
			profesor: '',
			estudiantes: [],
			horario: '',
			universidad: '',
			asignaciones: []			
		}
	}

	agregarAsignacion() {
		try {
			var asignacion:Asignacion = {
				tipo: this.selectedTipo,
				num: Number(this.num),
				porcentaje: Number(this.porcentaje),
				fecha: new Date(this.fecha.toString())
			}
			this.sum = this.sum + parseFloat(asignacion.porcentaje.toString());
			this.curso.asignaciones.push(asignacion);
		} catch (err) {
			alert("Parseo incorrecto");
		}
	}

	eliminarAsignacion(asignacion: Asignacion) {
		for (var i = 0; i < this.curso.asignaciones.length; ++i) {
			if(this.curso.asignaciones[i].tipo == asignacion.tipo && this.curso.asignaciones[i].num == asignacion.num){
				this.sum = this.sum - parseFloat(asignacion.porcentaje.toString());
				this.curso.asignaciones.splice(i,1);				
			}
		}
	}

	/*
        -Crear grupo si _id == ""
        -Actualizar si _id != ""
        -Ademas de validacion de universidad y usuario
    */
	registrarGrupo() {
		this.universidadService.readUniversidad(this.curso.universidad)
			.subscribe(universidad => {
				if (universidad != null) {
					this.usuarioService.readUsuarioName(this.curso.profesor)
						.subscribe(usuario => {
							if (usuario != null && this.curso._id == "") {
								this.cursoService.createGrupo(this.curso)
									.subscribe(curso => {
										this.cursoService.readGrupos()
											.subscribe(cursos => {
												this.cursos = cursos;
											});
									});
								this.clearData();
							} else if (usuario != null && this.curso._id != "") {
								this.cursoService.updateGrupo(this.curso)
									.subscribe(curso => {
										this.cursoService.readGrupos()
											.subscribe(cursos => {
												this.cursos = cursos;
											});
									});
								this.clearData();
							} else {
								console.log("Usuario inexistente");
							}
						});
				} else {
					console.log("Universidad inexistente");
				}
			});		
	}

	/*
        -Limpiar campos para empezar un nuevo registro
    */
    clearData() {
        this.curso._id = "";
        this.curso.nombre = '';
        this.curso.numeroGrupo = '';
        this.curso.profesor = '';
        this.curso.estudiantes = [];
        this.curso.horario = '';
        this.curso.universidad = '';
        this.curso.asignaciones = [];
        this.num = "";
        this.porcentaje = "";
        this.fecha = "";
    }

    /*
        -Cargar datos de un grupo para editarlo
    */
    editarGrupo(course:Curso) {    	
    	this.curso = course;
    	this.sum = 0;
    	for (var i = 0; i < course.asignaciones.length; ++i) {
    		this.sum += parseFloat(course.asignaciones[i].porcentaje.toString());
    	}
    }

    /*
		-Eliminar grupo de la tabla y la DB
    */
    eliminarGrupo(course:Curso) {
      	this.cursoService.deleteGrupo(course._id)
	  		.subscribe(course => {	  			
  				this.cursoService.readGrupos()
					.subscribe(cursos => {
						this.cursos = cursos;
					});
	  		});
    }
}