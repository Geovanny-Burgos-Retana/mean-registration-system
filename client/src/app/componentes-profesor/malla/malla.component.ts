import { Component, OnInit } from '@angular/core';

import { Task } from '../../objects/Task'

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.css']
})
export class MallaComponent implements OnInit {

  tasks: Task[];
  materia: String;
  carrera: String;

  constructor() { 
	  	const newTask:Task = {
	  		_id: "1",
	  		nombre: "Lenguajes",
	  	}
		const newTask2:Task = {
			_id: "2",
			nombre: "Estructuras",
		}
		this.tasks = [newTask,newTask2];
	}

  ngOnInit() {
  }

  addMateria() {
    const newTask:Task = {
      _id: "3",
      nombre: this.materia
    };
    this.tasks.push(newTask);
    this.materia = "";
  }

  deleteTask(id) {
    console.log(id);
    const response = confirm('are you sure to delete it?');
    if (response ){
      for(let i = 0; i < this.tasks.length; i++) {
        if(this.tasks[i]._id == id) {
            this.tasks.splice(i, 1);
          }
        }
      
    }
  }

  registerMalla() {
    console.log(this.carrera);
    for (var i = 0; i < this.tasks.length; ++i) {
      console.log(this.tasks[i]._id);
      console.log(this.tasks[i].nombre);

    }
  }

}
