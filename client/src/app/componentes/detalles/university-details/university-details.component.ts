import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { UniversidadService } from '../../../services/universidad.service';

import { Universidad } from '../../../objects/Universidad';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.css']
})
export class UniversityDetailsComponent implements OnInit {
	_id: String;
	nombre: String;
	escuela: String;
	escuelas: String[];	

	constructor(private router:Router, private universidadService:UniversidadService,private recievedData: ActivatedRoute) { 
		this.recievedData.queryParams.subscribe(params => {
			this._id = params["_id"];
            this.nombre = params["nombre"];
            this.escuelas = params["escuelas"];
        });
	}

	ngOnInit() {
	
	}

	agregarEscuela() {
	    if (this.escuela != '') {    
			this.escuelas.push(this.escuela);
			this.escuela = '';
	    }
  	}

	eliminarEscuela(nombre:String) {
		const response = confirm('are you sure to delete it?');
	    if (response ){
	      for(let i = 0; i < this.escuelas.length; i++) {        
				if(this.escuelas[i] == nombre){
					this.escuelas.splice(i, 1);
				}
	        }
	    }
	}

	actualizarUniversidad() {
		if (this.nombre != "") {
			const universidadNuevo:Universidad = {
				_id: this._id,
		        nombre: this.nombre,
		        escuelas: this.escuelas
		    }; 
			this.universidadService.updateUniversidad(universidadNuevo)
				.subscribe(university => {
					if (university != null) {
						alert("Actualizado exitosamente!!");
						this.router.navigate(["universities"]);
					} else {
						alert("No se actualizo");
					}
				});
		} else {
			alert("Ingrese todos los datos");
		}
	}

}
