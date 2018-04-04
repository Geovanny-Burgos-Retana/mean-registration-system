import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';

import { User } from '../../objects/Usuario';
import { Curso } from '../../objects/Curso';

import { CursoService } from '../../services/curso.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-menu',
  templateUrl: './teacher-menu.component.html',
  styleUrls: ['./teacher-menu.component.css']
})
export class TeacherMenuComponent implements OnInit {

	user: User;

    cursosImpartidos: Curso[];

	constructor(private router:Router, private recievedData: ActivatedRoute, private cursoService:CursoService) {
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
        this.cursoService.readCourseProfesor(this.user.nombre)
        	.subscribe(cursos => {
        		this.cursosImpartidos = cursos;
        	});
	}

	ngOnInit() {
	}

	malla() {
		this.router.navigate(['curriculums']);
	}

	grupo() {
		this.router.navigate(['group']);
	}

	universidad() {
		this.router.navigate(['universities']);
	}

	usuario() {
		this.router.navigate(['users']);
	}

	verCurso(curso: Curso) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                "_idGrupo": curso._id,
                "nombre": this.user.nombre
            }
        };
        this.router.navigate(['show-group-teacher'], navigationExtras);
    }
}
