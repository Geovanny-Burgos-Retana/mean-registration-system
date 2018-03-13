import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


import { Curso } from '../objects/Curso';

@Injectable()
export class CursoService {
  domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {} 
    
    getCurso(name, numero):Observable<Curso>{  		
  		console.log(name);
//<<<<<<< HEAD
  		console.log(numero);
  		console.log(`${this.domain}/api/users/${name}/${numero}`);
  		return this.http.get<Curso>(`${this.domain}/api/cursos/${name}/${numero}`)
  			.map(res => res);
  	}

/*
    getCursos():Observable<Curso[]>{
//=======
  		console.log(pass);
  		console.log(`${this.domain}/api/cursos/${name}/${pass}`);
  		return this.http.get<Curso>(`${this.domain}/api/cursos/${name}/${pass}`)
  			.map(res => res);
  	}
    */

//obtener todos los cursos
    getCursos():Observable<Curso[]>{      
      //console.log(this.http.get<Curso[]>(`${this.domain}/api/cursos`)
        //.map(res => res));
//>>>>>>> camila
      return this.http.get<Curso[]>(`${this.domain}/api/cursos`)
        .map(res => res);
    }

  	addCurso(newCurso: Curso) {
    return this.http.post<Curso>(`${this.domain}/api/cursos`, newCurso)
      	.map(res => res);
  	}
   
    updateCurso(newCurso) {
//<<<<<<< HEAD
  //    return this.http.put<Curso>('${this.domain}/api/cursos/${newCurso._id}', newCurso)
//=======
      console.log('${this.domain}/api/cursos/update');
      console.log(newCurso);
      console.log("ksdfjhaskdhf"+newCurso.estudiantes);
      return this.http.put<Curso>(`${this.domain}/api/cursos/update`, newCurso)
//>>>>>>> camila
        .map(res => res)
    }
}
