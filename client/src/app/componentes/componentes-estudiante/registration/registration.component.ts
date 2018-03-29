import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';	

import { Curso } from '../../../objects/Curso';
import { User } from '../../../objects/Usuario';

import { CursoService } from '../../../services/curso.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	cursos: Curso[];
	user: User;

	constructor(private router:Router, private courseService:CursoService, private recievedData: ActivatedRoute) { 
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
        };
        this.recievedData.queryParams.subscribe(params => {
            this.user._id = params["_id"];
            this.user.nombre = params["nombre"];
            this.user.carnet = params["carnet"];
            this.user.escuela = params["escuela"];
            this.user.carrera = params["carrera"];
            this.user.universidad = params["universidad"];
        });
        console.log(this.user);
		this.cargarCursos();
	}

	ngOnInit() {
		this.cargarCursosMatriculados();
	}

	agregarEstudiante_Curso(curso: Curso) {
    	if (curso.isRegistration) {
    		this.desmatricular(curso);
    		curso.isRegistration = false;
    	} else {
    		this.matricular(curso);
    		curso.isRegistration = true;
    	}

  	}

  	cargarCursos(){
  		this.courseService.readGrupos()
  		.subscribe(courses => {
  			this.cursos = courses;
  		});	      
  	}

  	cargarCursosMatriculados() {
  		
  		this.courseService.readCourseStudent(this.user.carnet)
  			.subscribe(courses => {
  				for (var i = 0; i < courses.length; ++i) {
  					for (var j = 0; j < this.cursos.length; ++j) {
  						if (this.cursos[j]._id == courses[i]._id) {
  							this.cursos[j].isRegistration = true;
  						}
  					}
  				}
  			});

  	}

  	desmatricular(curso: Curso){
  		for (var i = 0; i < curso.estudiantes.length; ++i) {
  			if (curso.estudiantes[i] == this.user.carnet) {
  				curso.estudiantes.splice(i,1);
  			}
  		}
  		this.courseService.updateGrupo(curso)
    		.subscribe(user => {
    			if (user != null) {
    				alert("Actualizado");
    			} else {
    				alert("No actualizado");
    			}
    		});
  	}

  	matricular(curso: Curso){  		
    	curso.estudiantes.push(this.user.carnet);
    	this.courseService.updateGrupo(curso)
    		.subscribe(user => {
    			if (user != null) {
    				alert("Actualizado");
    			} else {
    				alert("No actualizado");
    			}
    		});
  	}

}
