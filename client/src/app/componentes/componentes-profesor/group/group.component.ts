import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';	

import { Curso } from '../../../objects/Curso';

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

	constructor(private router:Router, private cursoService:CursoService, private usuarioService:UsuarioService, private universidadService:UniversidadService) { 
		this.curso = {
			nombre: '',
			numeroGrupo: '',
			profesor: '',
			estudiantes: [],
			horario: '',
			universidad: ''
		}
		this.cursoService.readGrupos()
			.subscribe(courses => {
				this.cursos = courses;
			});
	}

	ngOnInit() {
	
	}

	registrarGrupo() {
    	this.universidadService.readUniversidad(this.curso.universidad)
		.subscribe(university => {
			if (university != null) {
				this.usuarioService.readUsuarioName(this.curso.profesor)
				.subscribe(user => {
					if (user != null) {
						this.cursoService.createGrupo(this.curso)
						.subscribe(course => {
							if (course != null) {
	                            this.curso.nombre = '';
	                            this.curso.estudiantes = [];
	                            this.curso.horario = '';
	                            this.curso.numeroGrupo = '';
	                            this.curso.profesor = '';
	                            this.curso.universidad = '';
	                            this.cursoService.readGrupos()
                                .subscribe(courses => {
                                    this.cursos = courses;
                                });
								alert("Registrada exitosamente!");
							} else {
								alert("No registrado");
							}
						});
					} else {
						alert("Usuario inexistente");
					}
				});
			} else {
				alert("Universidad inexistente");
			}
		});
    }

    editarGrupo(course:Curso) {
    	const navigationExtras: NavigationExtras = {
            queryParams: {
            	"_id": course._id,
                "nombre": course.nombre,
                "estudiantes": course.estudiantes,
                "numeroGrupo": course.numeroGrupo,
                "profesor": course.profesor,
                "horario": course.horario,
                "universidad": course.universidad
            }
        };
    	this.router.navigate([''], navigationExtras);
    }

    eliminarGrupo(course:Curso) {
      	this.cursoService.deleteGrupo(course._id)
  		.subscribe(course => {
  			if (course != null) {
  				this.cursoService.readGrupos()
					.subscribe(cursos => {
						this.cursos = cursos;
					});
  			} else {
  				alert("Error al eliminar");
  			}
  		});
    }

}
