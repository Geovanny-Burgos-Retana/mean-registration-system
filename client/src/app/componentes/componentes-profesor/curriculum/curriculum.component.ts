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

	constructor(private router:Router, private carreraService:CarreraService, private materiaService: MateriaService) {
		this.carrera = {
			nombre: '',
			materias: []
		}
        this.materiaSeleccionada = {
            nombre:'',
            carrera:'',
            temas:[]
        }
        this.materias = [];
		this.carreraService.readMallas()
	      	.subscribe(curriculums => {
	        this.carreras = curriculums;
      	});	
	}

	ngOnInit() {
	
	}

	agregarMateria() {
    	if (this.materia != '') {
			var materia:Materia = {
                nombre: this.materia,
                carrera: this.nombre,
                temas:[]
            }            
            this.materias.push(materia);
            console.log(this.materias);
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
                this.materias.splice(i,1);
            }
        }
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

    registrarCarrera() {        
    	this.carreraService.readMalla(this.nombre)
		.subscribe(curriculum => {
			if ( curriculum == null) {
				this.carrera.nombre = this.nombre;
				this.carreraService.createMalla(this.carrera)
				.subscribe(curriculum1 => {
					if (curriculum1 != null) {
						this.carrera.nombre = '';
                        this.carrera.materias = [];
                        this.carreraService.readMallas()
                        .subscribe(curriculums => {
                            this.carreras = curriculums;
                        });
					} else {
						alert("No registrada");
					}
				});
                this.materiaService.createMaterias(this.materias)
                    .subscribe(materias => {
                        if (materias != null) {
                            this.carrera.nombre = '';
                            this.carrera.materias = [];
                            this.materias = [];
                            this.temas = [];
                            this.subtemas = [];
                            this.carreraService.readMallas()
                            .subscribe(curriculums => {
                                this.carreras = curriculums;
                            });
                        } else {
                            alert("No registrada");
                        }
                    });
			} else {
				alert("Ya existe!");
			}
		});
    }

    editarCarrera(carrera:Carrera) {
    	const navigationExtras: NavigationExtras = {
            queryParams: {
            	"_id": carrera._id,
                "nombre": carrera.nombre,
                "materias": carrera.materias
            }
        };
    	this.router.navigate(['curriculum-details'], navigationExtras);
    }

    eliminarCarrera(carrera:Carrera) {
    	const response = confirm('are you sure to delete it?');
    	if (response ){
	      	this.carreraService.deleteMalla(carrera._id)
	      		.subscribe(curriculum => {
	      			if (curriculum != null) {
	      				this.carreraService.readMallas()
                            .subscribe(curriculums => {
                                this.carreras = curriculums;
                            });
	      				alert("Eliminada exitosamente!");
	      			} else {
	      				alert("Error al eliminar");
	      			}
	      		});
	    }        
    }

    encontrarMateria(nombre:String): Materia {
        for (var i = 0; i < this.materias.length; ++i) {
            if (this.materias[i].nombre == nombre) {
                return this.materias[i];
            }
        }
        return null;
    }
}
