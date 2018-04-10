import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';	

import { Curso } from '../../../objects/Curso';
import { User } from '../../../objects/Usuario';
import { Evaluacion } from '../../../objects/Evaluacion';
import { NotaEvaluacion } from '../../../objects/NotaEvaluacion';
import { Asistencia } from '../../../objects/Asistencia';

import { CursoService } from '../../../services/curso.service';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { AsistenciaService } from '../../../services/asistencia.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	cursos: Curso[];
	user: User;

    cursosMatriculados: String[] = [];

	constructor(private router:Router, private evaluaicionService:EvaluacionService, private courseService:CursoService, private recievedData: ActivatedRoute, private assistanceService:AsistenciaService) { 
        this.user = {
            _id:'',
            nombre:'',
            carnet:'',
            universidad:'',
            escuela:'',
            carrera:'',
            usuario:'',
            contrasena:'',
            tipo:''
        }
        this.recievedData.queryParams.subscribe(params => {
            this.user._id = params["_id"];
            this.user.nombre = params["nombre"];
            this.user.carnet = params["carnet"];
            this.user.escuela = params["escuela"];
            this.user.carrera = params["carrera"];
            this.user.universidad = params["universidad"];
        });        
        this.cargarCursos();        
	}

	ngOnInit() {
        this.cargarCursosMatriculados();
	}

    /*
        -Validar estado de matricula del estudiante
    */
	agregarEstudiante_Curso(curso: Curso) {
    	if (curso.isRegistration) {
    		this.desmatricular(curso);
    		curso.isRegistration = false;
    	} else {
    		this.matricular(curso);    		
    	}
  	}

    /*
        -Cargar cursos que puede matricular el estudiante
    */
  	cargarCursos(){
  		this.courseService.readGrupos()
  		.subscribe(courses => {
  			this.cursos = courses;
  		});	      
  	}

    /*
        -Cargar cursos matriculados para mostrarlos como matriculados
    */
  	cargarCursosMatriculados() {
  		this.courseService.readCourseStudent(this.user.carnet)
  			.subscribe(courses => {
  				for (var i = 0; i < courses.length; ++i) {
  					for (var j = 0; j < this.cursos.length; ++j) {
  						if (this.cursos[j]._id == courses[i]._id) {
  							this.cursos[j].isRegistration = true;
                            this.cursosMatriculados.push(this.cursos[j].nombre);
  						}
  					}
  				}
  			});
  	}

    /*
        -Desmatricular al estudiante del curso y eliminar documentos generados para su evaluacion y asistencia
    */
  	desmatricular(curso: Curso){
  		for (var i = 0; i < curso.estudiantes.length; ++i) {
  			if (curso.estudiantes[i] == this.user.carnet) {
  				curso.estudiantes.splice(i,1);
  			}
  		}
        for (var i = 0; i < this.cursosMatriculados.length; ++i) {
            if (this.cursosMatriculados[i] == curso.nombre) {
                this.cursosMatriculados.splice(i, 1);
            }
        }
        this.assistanceService.delete(curso._id, this.user.carnet).subscribe();
        this.evaluaicionService.delete(curso._id, this.user.carnet).subscribe();
  		this.courseService.updateGrupo(curso).subscribe();
  	}

    /*
        -Matricular estudiante a curso y crear documentos para el control de evaluaciones y asistencia
    */
  	matricular(curso: Curso){
        if (this.esCursoMatriculado(curso.nombre)) {
            alert("Curso matriculado en otro grupo");
            curso.isRegistration = false;
        } else {
            curso.estudiantes.push(this.user.carnet);
            var evaluacion: Evaluacion = {
                grupo: "",
                carnet: "",
                asignaciones: []
            }
            evaluacion.grupo = curso._id;
            evaluacion.carnet = this.user.carnet;        
            for (var i = 0; i < curso.asignaciones.length; ++i) {
                var itemEvaluacion: NotaEvaluacion = {
                    tipo: "",
                    num: 0,
                    nota: 0
                }
                itemEvaluacion.tipo = curso.asignaciones[i].tipo;
                itemEvaluacion.num = curso.asignaciones[i].num;
                evaluacion.asignaciones.push(itemEvaluacion);
            }
            var asistencia: Asistencia = {
                grupo: curso._id,
                carnet: this.user.carnet,
                asistencias: []
            }
            this.cursosMatriculados.push(curso.nombre);
            this.evaluaicionService.create(evaluacion).subscribe();
            this.assistanceService.create(asistencia).subscribe();
            this.courseService.updateGrupo(curso).subscribe();            
            curso.isRegistration = true;
        }    	
  	}

    /*
        -Validación de curso para no matricular en mismo curso en dos grupos
    */
    esCursoMatriculado(nombreCurso: String) {
        for (var i = 0; i < this.cursosMatriculados.length;     ++i) {
            if (this.cursosMatriculados[i] == nombreCurso) {
                return true;
            }
        }
        return false;
    }

}
