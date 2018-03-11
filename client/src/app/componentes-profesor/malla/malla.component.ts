import { Component, OnInit } from '@angular/core';

import { Carrera } from '../../objects/Carrera';

import { CarreraService } from '../../services/carrera.service';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.css']
})
export class MallaComponent implements OnInit {

  carreraObj: Carrera;
  materia: String;
  carrera: String;
  

  constructor(private carreraService:CarreraService) {
    this.carreraObj = {
      nombre:'',
      materias:[]
    }
  }

  ngOnInit() {
  }

  addMateria() {
    console.log(this.materia);
    if (this.materia != '') {
      console.log("Si");
      this.carreraObj.materias.push(this.materia);      
    }    
    console.log(this.carreraObj.materias);
  }

  deleteTask(nombre) {
    console.log(nombre);
    const response = confirm('are you sure to delete it?');
    if (response ){
      for(let i = 0; i < this.carreraObj.materias.length; i++) {        
          if(this.carreraObj.materias[i] == nombre){
            this.carreraObj.materias.splice(i, 1);
          }          
        }
      
    }
  }

  registerMalla() {
    event.preventDefault();
    if (this.carrera != '') {
      this.carreraObj.nombre = this.carrera;
      this.carreraService.addCarrera(this.carreraObj)
      .subscribe(task => {
        this.materia = '';
        this.carreraObj = {
          nombre:'',
          materias:[]
        }
      })
    }
    
  }

}
