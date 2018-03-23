import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { CarreraService } from '../../../services/carrera.service';
import { MateriaService } from '../../../services/materia.service';

import { Carrera } from '../../../objects/Carrera';
import { Materia } from '../../../objects/Materia';
import { Tema } from '../../../objects/Tema';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-curriculum-details',
  templateUrl: './curriculum-details.component.html',
  styleUrls: ['./curriculum-details.component.css']
})
export class CurriculumDetailsComponent implements OnInit {	
	materia: String;
	tema:String;
	subtema:String;

	materias: Materia[];

	carrera: Carrera;

	materiaSeleccionada:Materia;
	temaSeleccionado:String;
	temas:Tema[];
	subtemas: String[];

	constructor(private router:Router, private carreraService:CarreraService,private recievedData: ActivatedRoute, private materiaService: MateriaService) { 
		this.carrera = {
        	_id:'',
        	nombre:'',
        	materias:[]
        }
        this.materias = [];
		this.recievedData.queryParams.subscribe(params => {
			this.carrera._id = params["_id"];
            this.carrera.nombre = params["nombre"];
            this.carrera.materias = params["materias"];
        });
		this.materiaService.readMateriasGrupo(this.carrera.nombre)
		.subscribe(materias => {
			this.materias = materias;
		});
		this.materiaSeleccionada = {
			nombre:'',
			carrera:'',
			temas: []
		}

	}

	ngOnInit() {
	
	}

	agregarMateria() {
	    if (this.materia != '') {
	    	var materia:Materia = {
	    		_id:'',
                nombre: this.materia,
                carrera: this.carrera.nombre,
                temas:[]
            }
            this.materias.push(materia);
			this.carrera.materias.push(this.materia);
			this.materia = '';
	    }
  	}

  	eliminarMateria(materia:Materia) {
      	for(let i = 0; i < this.materias.length; i++) {        
			if(this.materias[i].nombre == materia.nombre){
				this.materias.splice(i, 1);
			}
        }
        for(let i = 0; i < this.carrera.materias.length; i++) {
			if(this.carrera.materias[i] == materia.nombre){
				this.carrera.materias.splice(i, 1);
			}
        }
	}

	editarMateria(materia: Materia) {
        this.materiaSeleccionada = materia;
        this.temas = materia.temas;
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

	actualizarCarrera() {
		if (this.carrera.nombre != "") { 
			this.carreraService.updateMalla(this.carrera)
				.subscribe(curriculum => {
					if (curriculum != null) {
						this.actualizarMaterias();
					} else {
						alert("No se actualizo");
					}
				});
		} else {
			alert("Ingrese todos los datos");
		}
	}

	actualizarMaterias() {	
		for (var i = 0; i < this.materias.length; ++i) {
			if (this.materias[i]._id == '') {
				this.materiaService.createMaterias([this.materias[i]]).subscribe();
			} else {
				this.materiaService.updateMateria(this.materias[i]).subscribe();
			}
		}
	}

}
