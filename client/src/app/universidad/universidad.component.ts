import { Component, OnInit } from '@angular/core';

import { UniversidadService } from '../services/universidad.service';

import { Universidad } from '../objects/Universidad';

@Component({
  selector: 'app-universidad',
  templateUrl: './universidad.component.html',
  styleUrls: ['./universidad.component.css']
})
export class UniversidadComponent implements OnInit {

  nombre: String;
  escuela: String;
  universidad: Universidad;

  constructor(private universidadService:UniversidadService) { 
  	this.universidad = {
  		nombre: '',
  		escuelas: []
  	}
  }

  ngOnInit() {
  }

  addEscuela() {
  	console.log(this.escuela);
    if (this.escuela != '') {
      console.log("Si");
      this.universidad.escuelas.push(this.escuela);      
    }    
    console.log(this.universidad.escuelas);
  }

  deleteUniversidad(nombre){
  	console.log(nombre);
    const response = confirm('are you sure to delete it?');
    if (response ){
      for(let i = 0; i < this.universidad.escuelas.length; i++) {        
          if(this.universidad.escuelas[i] == nombre){
            this.universidad.escuelas.splice(i, 1);
          }          
        }
      
    }
  }

  registerUniversidad() {
  	event.preventDefault();
    if (this.nombre != '') {
      this.universidad.nombre = this.nombre;
      /*// obtener universida ...
      if (//Revisar si la universidad esta nula univeridad == null) {
      	this.universidadService.addUniversidad(this.universidad)
      		.subscribe(task => {
        		this.nombre = '';
        		this.universidad = {
          		nombre:'',
          		escuelas:[]
        	}
      	})
      } else {

      }*/
      


    }
  }
  
}
