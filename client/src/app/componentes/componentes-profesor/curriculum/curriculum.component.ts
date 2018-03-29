import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';	

import { Carrera } from '../../../objects/Carrera';
import { Materia } from '../../../objects/Materia';
import { Tema } from '../../../objects/Tema';

import { CarreraService } from '../../../services/carrera.service';
import { MateriaService } from '../../../services/materia.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {
	nombre: String;
	materia: String;
    tema: String;
    subtema: String;    

	carrera: Carrera;

	carreras: Carrera[];

    materias: Materia[];    
    temas: Tema[];
    subtemas: String[];    

    materiaSeleccionada: Materia;
    temaSeleccionado: String;

    materiasEliminadas:String[];

	constructor(private router:Router, private carreraService:CarreraService, private materiaService: MateriaService) {
		this.carreraService.readMallas()
    	    .subscribe(curriculums => {
    	        this.carreras = curriculums;
          	});
	}

	ngOnInit() {
	    this.carrera = {
            _id:'',
            nombre: '',
            materias: []
        }
        
        this.materiaSeleccionada = {
            nombre:'',
            carrera:'',
            temas:[]
        }

        this.materias = [];
        this.materiasEliminadas = [];
	}

	agregarMateria() {
    	if (this.materia != '') {
			var materia:Materia = {
                nombre: this.materia,
                carrera: this.carrera.nombre,
                temas:[]
            }            
            this.materias.push(materia);
            this.carrera.materias.push(this.materia);            
            this.materia = '';
    	}
    }

    eliminarMateria(materia: String) {
      	for(let i = 0; i < this.carrera.materias.length; i++) {
	        if(this.carrera.materias[i] == materia){
	            this.carrera.materias.splice(i, 1);
	        }
        }
        for (var i = 0; i < this.materias.length; ++i) {
            if (this.materias[i].nombre == materia) {         
                this.materiasEliminadas.push(this.materias[i]._id);
                this.materias.splice(i,1);
            }
        }
        console.log(this.materias);
    }

    editarMateria(materia: Materia) {
        this.materiaSeleccionada = materia;
        this.temas = materia.temas;
        console.log(this.materias);
    }

    agregarTema() {
        if (this.tema != '') {
            var tema:Tema = {
                nombre: this.tema,
                subtemas:[]
            }

            this.temas.push(tema);
            this.tema = '';
        }
    }

    eliminarTema(tema:Tema) {
        for(let i = 0; i < this.temas.length; i++) {
            if(this.temas[i].nombre == tema.nombre){
                this.temas.splice(i, 1);
            }          
        }
    }

    editarTema(tema: Tema) {
        this.subtemas = tema.subtemas;
        this.temaSeleccionado = tema.nombre;
    }

    agregarSubtema() {
        if (this.subtema != '') {
            this.subtemas.push(this.subtema);
            this.subtema = '';
        }
    }

    eliminarSubtema(subtema: String) {
        for(let i = 0; i < this.subtemas.length; i++) {
            if(this.subtemas[i] == subtema){
                this.subtemas.splice(i, 1);
            }          
        }
    }

    /*
        -Crear carrera si _id == ""
        -Actualizar si _id != ""
        -Tanto carreras como materias ligadas
    */
    registrarCarrera() {
        if (this.carrera._id == "" && this.carrera.nombre != "") {
            this.carreraService.createMalla(this.carrera)
                .subscribe(carrera => {
                    this.carreraService.readMallas()
                        .subscribe(carreras => {
                            this.carreras = carreras;
                        });
                });
            this.materiaService.createMaterias(this.materias).subscribe();
            this.clearData();            
        } else {
            this.carreraService.updateMalla(this.carrera)
                .subscribe(carrera => {
                    this.carreraService.readMallas()
                        .subscribe(carreras => {
                            this.carreras = carreras;
                        });
                });
            this.materiaService.deleteSubjectsForCareer(this.carrera.nombre).subscribe();
            this.materiaService.createMaterias(this.materias).subscribe();
            this.clearData();           
        }
    }

    /*
        -Limpiar campos para empezar un nuevo registro
    */
    clearData() {
        this.carrera._id = "";
        this.carrera.nombre = "";
        this.carrera.materias = [];
        this.materias = [];
        this.temas = [];
        this.subtemas = [];
        this.materiaSeleccionada.nombre = "";
        this.temaSeleccionado = "";
    }

    /*
        -Cargar datos de una carrera para editarla
    */
    editarCarrera(carrera:Carrera) {
        this.carrera = carrera;
        this.materiaService.readMateriasGrupo(this.carrera.nombre)
            .subscribe(materias => {
                this.materias = materias;
            });
    }

    /*
        -Eliminar carrera
        -Eliminar materias ligadas
        -Actualizar lista de carreras
    */
    eliminarCarrera(carrera:Carrera) {
      	this.carreraService.deleteMalla(carrera._id)
            .subscribe(carrera => {
                this.carreraService.readMallas()
                    .subscribe(carreras => {
                        this.carreras = carreras;
                    });
            });
        this.materiaService.deleteSubjectsForCareer(carrera.nombre).subscribe();        
    }
}
