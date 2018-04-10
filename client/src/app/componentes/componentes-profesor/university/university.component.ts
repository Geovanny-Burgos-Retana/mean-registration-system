import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';	

import { UniversidadService } from '../../../services/universidad.service';

import { Universidad } from '../../../objects/Universidad';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
	nombre: String;
	escuela: String;

	universidad: Universidad;

	universidades: Universidad[];

	constructor(private router:Router, private universidadService:UniversidadService) {
		this.universidad = {
			nombre: '',
			escuelas: []
  		}
		this.universidadService.readUniversidades()
			.subscribe(universities => {
				this.universidades = universities;
			});		
	}

    ngOnInit() {
  	
    }

    /*
        -Agregar escuela a universidad en creación
    */
    agregarEscuela() {
    	if (this.escuela != '') {    
			this.universidad.escuelas.push(this.escuela);      
			this.escuela = '';
    	} 
    }

    /*
        -Eliminar escuela a universidad en creación
    */
    eliminarEscuela(nombre) {
    	const response = confirm('are you sure to delete it?');
	    if (response ){
	      	for(let i = 0; i < this.universidad.escuelas.length; i++) {        
		        if(this.universidad.escuelas[i] == nombre){
		            this.universidad.escuelas.splice(i, 1);
		        }          
	        }
	    }
    }

    /*
        Registrar universidad en DB
    */
    registrarUniversidad() {
    	this.universidadService.readUniversidad(this.nombre)
    		.subscribe(university => {
    			if (university == null) {
    				this.universidad.nombre = this.nombre;
    				this.universidadService.createUniversidad(this.universidad)
    					.subscribe(university1 => {
    						if (university1 != null) {
                                this.universidad.nombre = '';
                                this.universidad.escuelas = [];
                                this.universidadService.readUniversidades()
                                    .subscribe(universities => {
                                        this.universidades = universities;
                                    });
    							alert("Registrada exitosamente!");
    						} else {
    							alert("No registrada");
    						}
    					});
    			} else {
    				alert("Ya existe!");
    			}
    		});
    }

    /*
        -Redireccionar a editacion de una universidad seleccionada
    */
    editarUniversidad(universidad:Universidad) {
    	const navigationExtras: NavigationExtras = {
            queryParams: {
            	"_id": universidad._id,
                "nombre": universidad.nombre,
                "escuelas": universidad.escuelas
            }
        };
    	this.router.navigate(['university-details'], navigationExtras);
    }

    /*
        -Eliminar universidad de DB
    */
    eliminarUniversidad(universidad:Universidad) {
    	const response = confirm('are you sure to delete it?');
    	if (response ){
	      	this.universidadService.deleteUniversidad(universidad._id)
	      		.subscribe(university => {
	      			if (university != null) {
                        this.universidadService.readUniversidades()
                            .subscribe(universities => {
                                this.universidades = universities;
                            });
	      				alert("Eliminada exitosamente!");
	      			} else {
	      				alert("Error al eliminar");
	      			}
	      		});
	    }
    }
}
