import { Component, OnInit } from '@angular/core';

import { UniversidadService } from '../services/universidad.service';
import { UsuarioService } from '../services/usuario.service';

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
  u: Universidad;
  universidades: Universidad[];

  constructor(private universidadService:UniversidadService, private usuarioService:UsuarioService) { 
  	this.universidad = {
  		nombre: '',
  		escuelas: []
  	}
    this.universidadService.getUniveridades()
      .subscribe(universidades => {
        this.universidades = universidades;
      });
  }

  ngOnInit() {
  }

  addEscuela() {
  	console.log(this.escuela);
    if (this.escuela != '') {
      console.log("Si");      
      this.universidad.escuelas.push(this.escuela);      
      this.escuela = '';
    }    
    console.log(this.universidad.escuelas);
  }

  deleteEscuela(nombre){
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
      this.universidadService.getUniversidad(this.universidad.nombre)
        .subscribe(universidad => {
           if (universidad == null) {
             console.log("Insert into");
              this.universidadService.addUniversidad(this.universidad)
                .subscribe(task => {
                  this.nombre = '';
                  this.universidad = {
                    nombre:'',
                    escuelas:[]                    
                }
                console.log(task);
              });
              this.universidades.push(this.universidad);
           } else {             
             console.log("Ya existe");
             for (var i = 0; i < universidad.escuelas.length; ++i) {
               for (var j = 0; j < this.universidad.escuelas.length; ++j) {
                 if (universidad.escuelas[i] == this.universidad.escuelas[j] ){                   
                   this.universidad.escuelas.splice(j, 1);
                 }
               }
             }
             this.universidad._id = universidad._id;
             this.universidadService.updateUniversidad(this.universidad)
                .subscribe(task => {
                  this.nombre = '';
                  this.universidad = {
                    nombre:'',
                    escuelas:[]                    
                }
                console.log(task);
              });
           }
        });
    }
  }
  
}
