import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


import { Curso } from '../objects/Curso';

@Injectable()
export class CursoService {
  domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {} 
    
    getCurso(name, pass):Observable<Curso>{  		
  		console.log(name);
  		console.log(pass);
  		console.log(`${this.domain}/api/cursos/${name}/${pass}`);
  		return this.http.get<Curso>(`${this.domain}/api/cursos/${name}/${pass}`)
  			.map(res => res);
  	}

//obtener todos los cursos
    getCursos():Observable<Curso[]>{      
      console.log(this.http.get<Curso[]>(`${this.domain}/api/cursos`)
        .map(res => res));
      return this.http.get<Curso[]>(`${this.domain}/api/cursos`)
        .map(res => res);
    }

  	addCurso(newCurso: Curso) {
    return this.http.post<Curso>(`${this.domain}/api/cursos`, newCurso)
      	.map(res => res);
  	}
   
    updateCurso(newCurso) {
      console.log('${this.domain}/api/cursos/update');
      console.log(newCurso);
      return this.http.put<Curso>(`${this.domain}/api/cursos/update`, newCurso)
        .map(res => res)
    }


}
