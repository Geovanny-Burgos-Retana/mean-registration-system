import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { CarreraService } from '../../../services/carrera.service';

import { Carrera } from '../../../objects/Carrera';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curriculum-details',
  templateUrl: './curriculum-details.component.html',
  styleUrls: ['./curriculum-details.component.css']
})
export class CurriculumDetailsComponent implements OnInit {
	_id: String;
	nombre: String;
	materia: String;
	materias: String[];	

	constructor(private router:Router, private carreraService:CarreraService,private recievedData: ActivatedRoute) { 
		this.recievedData.queryParams.subscribe(params => {
			this._id = params["_id"];
            this.nombre = params["nombre"];
            this.materias = params["materias"];
        });
	}

	ngOnInit() {
	
	}

	agregarMateria() {
	    if (this.materia != '') {    
			this.materias.push(this.materia);
			this.materia = '';
	    }
  	}

  	eliminarMateria(nombre:String) {
		const response = confirm('are you sure to delete it?');
	    if (response ){
	      for(let i = 0; i < this.materias.length; i++) {        
				if(this.materias[i] == nombre){
					this.materias.splice(i, 1);
				}
	        }
	    }
	}

	actualizarCarrera() {
		if (this.nombre != "") {
			const materiaNuevo:Carrera = {
				_id: this._id,
		        nombre: this.nombre,
		        materias: this.materias
		    }; 
			this.carreraService.updateMalla(materiaNuevo)
				.subscribe(ccurriculum => {
					if (ccurriculum != null) {
						alert("Actualizado exitosamente!!");
						this.router.navigate(["curriculums"]);
					} else {
						alert("No se actualizo");
					}
				});
		} else {
			alert("Ingrese todos los datos");
		}
	}

}
